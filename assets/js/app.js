/* ============================================================================
   숭실대학교 화학공학과 — 인터랙션 스크립트
   · 데이터는 data.js 에서만 가져옵니다. 이 파일은 화면을 그리는 역할만 합니다.
   · 라이브러리: Fuse.js(검색), Lucide(아이콘), AOS(스크롤 애니메이션)
     CDN이 막혀도 기본 검색·아이콘 없이 화면이 그대로 동작하도록 fallback을 둡니다.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------ helpers */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const ic = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const dateValue = (d) => {
    const t = Date.parse(d);
    return Number.isNaN(t) ? 0 : t;
  };
  const fmtViews = (n) => (n >= 1000 ? n.toLocaleString('ko-KR') : String(n));

  const TAG_ORDER = ['반도체', '배터리', '바이오', '고분자', '환경'];

  /* 관리자 모드 — admin-core.js / admin.js 가 없으면 항상 false */
  function adminActive() {
    return !!(window.SSUAdmin && window.SSUAdmin.Auth && window.SSUAdmin.Auth.isAuthed());
  }
  function adminBtns(kind, item, extra) {
    if (!adminActive()) return '';
    const id = esc(item._id || item.id || '');
    const board = extra && extra.board ? ` data-board="${esc(extra.board)}"` : '';
    const pin = kind === 'notice'
      ? `<button type="button" class="row-admin-btn${item.pinned ? ' is-on' : ''}" data-admin-act="notice-pin" data-id="${id}"${board} title="중요 공지 고정 토글" aria-label="중요 공지 고정 토글">${ic('pin')}</button>`
      : '';
    return `<span class="row-admin">
      ${pin}
      <button type="button" class="row-admin-btn" data-admin-act="${kind}-edit" data-id="${id}"${board}>${ic('pencil')}<span>수정</span></button>
      <button type="button" class="row-admin-btn is-danger" data-admin-act="${kind}-del" data-id="${id}"${board}>${ic('trash-2')}<span>삭제</span></button>
    </span>`;
  }

  /* 라이브러리 로드 실패 대비 */
  if (!window.Fuse) document.documentElement.classList.add('no-fuse');

  const icon = () => { if (window.lucide) window.lucide.createIcons(); };

  /* ------------------------------------------------------------ 1. 지표 */
  function renderStats() {
    const bar = $('#statBar');
    if (!bar || typeof STATS === 'undefined') return;
    bar.innerHTML = STATS.map((s) => `
      <div>
        <dt>${esc(s.value)}</dt>
        <dd>${esc(s.label)}<span>${esc(s.sub)}</span></dd>
      </div>`).join('');
  }

  /* ------------------------------------------------------------ 2. 연혁 */
  function renderTimeline() {
    const el = $('#timeline');
    if (!el || typeof HISTORY === 'undefined') return;
    el.innerHTML = HISTORY.map((h) => `
      <li>
        <span class="year">${esc(h.year)}</span>
        <span class="desc">${esc(h.text)}</span>
      </li>`).join('');
  }

  /* ------------------------------------------------------------ 3. 진로 */
  function renderCareers() {
    const el = $('#careerGrid');
    if (!el || typeof CAREERS === 'undefined') return;
    el.innerHTML = CAREERS.map((c) => `
      <div class="career-item">
        <h4>${esc(c.field)}</h4>
        <p>${esc(c.companies)}</p>
      </div>`).join('');
  }

  /* ------------------------------------------------------------ 4. 연구 분야 */
  function renderResearch() {
    const el = $('#researchList');
    if (!el || typeof RESEARCH_AREAS === 'undefined' || typeof PROFESSORS === 'undefined') return;

    el.innerHTML = RESEARCH_AREAS.map((area) => {
      const profs = PROFESSORS.filter((p) => p.tags.includes(area.key));
      return `
        <article class="research-row">
          <p class="research-num">${esc(area.num)}</p>
          <div class="research-body">
            <h3>${esc(area.title)}</h3>
            <p>${esc(area.desc)}</p>
          </div>
          <div class="research-side">
            <p class="research-count">${profs.length} labs</p>
            <div class="research-profs">
              ${profs.map((p) => `<button type="button" class="prof-chip" data-area="${esc(area.key)}" data-prof="${esc(p.id)}">${esc(p.name)}</button>`).join('')}
            </div>
          </div>
        </article>`;
    }).join('');

    $$('.prof-chip', el).forEach((chip) => {
      chip.addEventListener('click', () => {
        const profId = chip.dataset.prof;
        const areaKey = chip.dataset.area;

        // 해당 교수 연구실 카드가 화면에 보이도록 필터 조정
        if (labFilter !== '전체' && labFilter !== areaKey) {
          setLabFilter('전체');
        }

        // 해당 연구실 카드로 부드럽게 스크롤 이동 및 포커스 하이라이트
        setTimeout(() => {
          const card = document.querySelector(`.lab-card[data-id="${profId}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('is-highlighted');
            setTimeout(() => card.classList.remove('is-highlighted'), 2200);
          } else {
            const labs = $('#labs');
            if (labs) labs.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 60);
      });
    });
  }

  /* ------------------------------------------------------------ 5. 교수진·연구실 */
  let labFilter = '전체';
  let labFuse = null;
  let labQuery = '';

  function initials(name) {
    return name ? name.slice(-2) : '?';
  }

  function renderLabFilters() {
    const el = $('#labFilters');
    if (!el) return;
    const counts = {};
    TAG_ORDER.forEach((t) => { counts[t] = PROFESSORS.filter((p) => p.tags.includes(t)).length; });
    const items = [{ key: '전체', count: PROFESSORS.length }, ...TAG_ORDER.map((t) => ({ key: t, count: counts[t] }))];
    el.innerHTML = items.map((it) => `
      <button class="chip${it.key === labFilter ? ' is-active' : ''}" type="button" role="tab"
        aria-selected="${it.key === labFilter}" data-filter="${esc(it.key)}">
        ${esc(it.key)}<span class="count">${it.count}</span>
      </button>`).join('');

    $$('.chip', el).forEach((btn) => {
      btn.addEventListener('click', () => setLabFilter(btn.dataset.filter));
    });
  }

  function setLabFilter(key) {
    labFilter = key;
    $$('#labFilters .chip').forEach((b) => {
      const on = b.dataset.filter === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
    });
    renderLabs();
  }

  function getVisibleLabs() {
    let list = PROFESSORS.filter((p) => labFilter === '전체' || p.tags.includes(labFilter));
    if (labQuery && labFuse) {
      const ids = new Set(labFuse.search(labQuery).map((r) => r.item.id));
      list = list.filter((p) => ids.has(p.id));
    } else if (labQuery) {
      const q = labQuery.toLowerCase();
      list = list.filter((p) => [p.name, p.field, p.labName, p.research.join(' ')].join(' ').toLowerCase().includes(q));
    }
    return list;
  }

  function cardPhoto(p) {
    if (p.photo) {
      return `<div class="lab-photo"><img src="${esc(p.photo)}" alt="${esc(p.name)} 교수" loading="lazy" width="817" height="1061"></div>`;
    }
    return `<div class="lab-photo monogram"><span>${esc(initials(p.name))}</span></div>`;
  }

  function renderLabs() {
    const grid = $('#labGrid');
    if (!grid) return;
    const list = getVisibleLabs();

    grid.innerHTML = list.map((p) => `
      <article class="lab-card" data-id="${esc(p.id)}">
        ${cardPhoto(p)}
        <button class="lab-stretch" type="button" data-lab="${esc(p.labUrl || '')}"
          aria-label="${p.labUrl ? `${esc(p.name)} 교수 연구실 홈페이지 새 탭으로 열기` : `${esc(p.name)} 교수 프로필 보기`}"></button>
        <div class="lab-info">
          <div class="lab-name-row">
            <h3 class="lab-name">${esc(p.name)}</h3>
            <span class="lab-title">${esc(p.title)}</span>
          </div>
          <p class="lab-field">${esc(p.field || '학과 행정·특별임무 담당')}</p>
          ${p.labName ? `<p class="lab-lab"><strong>${esc(p.labName)}</strong>${esc(p.labRoom)}</p>` : '<p class="lab-lab"><strong>연구실 정보 없음</strong>전임교원 프로필 참고</p>'}
          <div class="lab-contact">
            <span>${ic('door-open')}${esc(p.office)}</span>
            <span>${ic('phone')}<a href="tel:${esc(p.tel.replace(/-/g, ''))}">${esc(p.tel)}</a></span>
            <span>${ic('mail')}<a href="mailto:${esc(p.email)}">${esc(p.email)}</a></span>
          </div>
          <div class="lab-actions">
            <button class="lab-more" type="button" data-profile="${esc(p.id)}"><span class="btn-label-desktop">프로필 보기</span><span class="btn-label-mobile">프로필</span> ${ic('arrow-right')}</button>
            ${p.labUrl ? `<span class="lab-home"><span class="btn-label-desktop">랩 홈페이지</span><span class="btn-label-mobile">연구실</span> ${ic('external-link')}</span>` : ''}
            ${adminBtns('prof', p)}
          </div>
        </div>
      </article>`).join('') + (labFilter === '전체' && !labQuery ? `
      <aside class="lab-card contact-tile">
        <p class="side-label">Department Office</p>
        <h3>학과 사무실 · 형남공학관 912호</h3>
        <p>입학·학사·연구실 안내는 학과 사무실로 문의하세요.</p>
        <a href="tel:02-820-0610">02-820-0610</a>
      </aside>` : '');

    $$('.lab-card[data-id]', grid).forEach((card) => {
      const stretch = card.querySelector('.lab-stretch');
      const labUrl = stretch.dataset.lab;
      stretch.addEventListener('click', () => {
        if (labUrl) window.open(labUrl, '_blank', 'noopener');
        else openProfile(card.dataset.id);
      });
      const profileBtn = card.querySelector('[data-profile]');
      if (profileBtn) profileBtn.addEventListener('click', () => openProfile(card.dataset.id));
    });

    const countEl = $('#labCount');
    if (countEl) countEl.textContent = list.length;
    const statusEl = $('#labStatus');
    if (statusEl) statusEl.textContent = labFilter === '전체' ? '전체 연구 분야' : `${labFilter} 분야`;
    const emptyEl = $('#labEmpty');
    if (emptyEl) emptyEl.hidden = list.length > 0;

    icon();
  }

  function buildLabFuse() {
    labFuse = null;
    if (!window.Fuse || typeof PROFESSORS === 'undefined') return;
    labFuse = new Fuse(PROFESSORS, {
      keys: [
        { name: 'name', weight: .4 },
        { name: 'field', weight: .25 },
        { name: 'labName', weight: .15 },
        { name: 'research', weight: .2 }
      ],
      threshold: .38,
      ignoreLocation: true
    });
  }

  function initLabSearch() {
    const input = $('#labSearch');
    const clear = $('#labSearchClear');
    if (!input) return;
    buildLabFuse();
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      labQuery = input.value.trim();
      if (clear) clear.hidden = labQuery.length === 0;
      t = setTimeout(renderLabs, 90);
    });
    if (clear) clear.addEventListener('click', () => {
      input.value = ''; labQuery = ''; clear.hidden = true; renderLabs(); input.focus();
    });
  }

  /* ------------------------------------------------------------ 6. 프로필 드로어 */
  let lastFocused = null;

  function openProfile(id) {
    const p = PROFESSORS.find((x) => x.id === id);
    if (!p) return;
    const drawer = $('#drawer');
    const body = $('#drawerBody');
    if (!drawer || !body) return;

    lastFocused = document.activeElement;

    body.innerHTML = `
      <div class="profile-head">
        <div class="profile-photo${p.photo ? '' : ' monogram'}">
          ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)} 교수">` : esc(initials(p.name))}
        </div>
        <div>
          <h2 id="drawerName">${esc(p.name)}</h2>
          <p class="profile-title">${esc(p.title)}</p>
          ${p.field ? `<p class="profile-field">${esc(p.field)}</p>` : ''}
          <div class="profile-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
      </div>

      <dl class="profile-meta">
        <div><dt>교수실</dt><dd>${esc(p.office)}</dd></div>
        ${p.labName ? `<div><dt>연구실</dt><dd>${esc(p.labName)} · ${esc(p.labRoom)}</dd></div>` : ''}
        <div><dt>전화</dt><dd><a href="tel:${esc(p.tel.replace(/-/g, ''))}">${esc(p.tel)}</a></dd></div>
        <div><dt>이메일</dt><dd><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></dd></div>
      </dl>

      ${p.edu && p.edu.length ? `
      <section class="profile-block">
        <h3>학력</h3>
        <ul class="profile-list-plain">
          ${p.edu.map((e) => {
            const [deg, ...rest] = e.split('·');
            return `<li><span class="deg">${esc(deg.trim())}</span>${esc(rest.join('·').trim())}</li>`;
          }).join('')}
        </ul>
      </section>` : ''}

      ${p.research && p.research.length ? `
      <section class="profile-block">
        <h3>연구 내용</h3>
        <ul>${p.research.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      </section>` : ''}

      ${p.career && p.career.length ? `
      <section class="profile-block">
        <h3>주요 경력</h3>
        <ul class="profile-career-list">
          ${p.career.map((c) => {
            const m = c.match(/^(\d{4}\s*~\s*(?:\d{4}|현재))\s*(.*)$/);
            if (m) {
              return `<li><span class="career-period">${esc(m[1])}</span><span class="career-desc">${esc(m[2])}</span></li>`;
            }
            return `<li><span class="career-desc full-width">${esc(c)}</span></li>`;
          }).join('')}
        </ul>
      </section>` : ''}

      <div class="profile-actions">
        ${p.labUrl ? `<a class="btn btn-primary" href="${esc(p.labUrl)}" target="_blank" rel="noopener">${ic('external-link')} 연구실 홈페이지</a>` : ''}
        <a class="btn btn-outline" href="mailto:${esc(p.email)}">${ic('mail')} 메일 보내기</a>
      </div>`;

    drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    icon();
    setTimeout(() => { const c = $('.drawer-close', drawer); if (c) c.focus(); }, 30);
  }

  function closeProfile() {
    const drawer = $('#drawer');
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function initDrawer() {
    $$('[data-close-drawer]').forEach((el) => el.addEventListener('click', closeProfile));
  }

  /* ------------------------------------------------------------ 7. 교과과정 */
  let currentYear = 1;

  function renderYearTabs() {
    const el = $('#yearTabs');
    if (!el) return;
    el.innerHTML = [1, 2, 3, 4].map((y) => {
      const n = COURSES.filter((c) => c.year === y).length;
      return `<button class="year-tab${y === currentYear ? ' is-active' : ''}" type="button" role="tab"
        aria-selected="${y === currentYear}" data-year="${y}">${y}학년<span class="n">${n}</span></button>`;
    }).join('');
    $$('.year-tab', el).forEach((b) => b.addEventListener('click', () => {
      currentYear = Number(b.dataset.year);
      renderYearTabs();
      renderCurriculum();
    }));
  }

  function renderCurriculum() {
    const panel = $('#curriculumPanel');
    if (!panel) return;
    const rows = COURSES.filter((c) => c.year === currentYear);

    panel.innerHTML = [1, 2].map((term) => {
      const list = rows.filter((c) => c.term === term);
      const credits = list.reduce((sum, c) => sum + (Number(String(c.credit).split('/')[1]) || 0), 0);
      return `
        <div class="term-col">
          <div class="term-head">
            <h4>${term}학기</h4>
            <span>${list.length}과목 · ${credits}학점</span>
          </div>
          <div class="course-list">
            ${list.map((c, i) => `
              <div class="course" data-key="${currentYear}-${term}-${i}">
                <button class="course-btn" type="button" aria-expanded="false">
                  <span class="course-type${c.type.indexOf('전필') === 0 ? ' required' : ''}">${esc(c.type)}</span>
                  <span class="course-name">${esc(c.name)}</span>
                  <span class="course-credit">${esc(c.credit)}</span>
                  ${ic('chevron-down')}
                </button>
                <div class="course-desc">
                  ${c.desc ? esc(c.desc) : '학과 교과목 안내에 상세 내용이 등록되어 있습니다.'}
                  <p class="course-meta">과목ID ${esc(c.code)} · 심화정도 ${esc(c.depth)}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>`;
    }).join('');

    $$('.course-btn', panel).forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.course');
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
    icon();
  }

  function renderGraduation() {
    const rows = $('#gradRows');
    if (!rows || typeof GRADUATION === 'undefined') return;
    rows.innerHTML = GRADUATION.rows.map((r) => `
      <li><span class="label">${esc(r.label)}</span><span class="value">${r.value}</span></li>`).join('');
    const note = $('#gradNote');
    if (note) note.textContent = GRADUATION.note;
  }

  /* ------------------------------------------------------------ 8. 공지사항 */
  const BOARD_META = {
    undergrad: { label: '학부공지', source: 'http://chemeng.ssu.ac.kr/sub/sub03_01.php' },
    grad: { label: '대학원공지', source: 'http://chemeng.ssu.ac.kr/sub/sub03_02.php' },
    job: { label: '취업·인턴십', source: 'http://chemeng.ssu.ac.kr/sub/sub03_04.php' }
  };

  let board = 'undergrad';
  let sortMode = 'latest';
  let noticeQuery = '';
  let noticeVisible = 12;
  const noticeFuse = {};

  function currentNotices() {
    let list = NOTICES[board].slice();
    if (sortMode === 'important') {
      list.sort((a, b) => (Number(b.pinned) - Number(a.pinned)) || (dateValue(b.date) - dateValue(a.date)));
    } else {
      list.sort((a, b) => dateValue(b.date) - dateValue(a.date));
    }
    if (noticeQuery) {
      const fuse = getNoticeFuse();
      if (fuse) {
        const ids = new Set(fuse.search(noticeQuery).map((r) => r.item));
        list = list.filter((n) => ids.has(n));
      } else {
        const q = noticeQuery.toLowerCase();
        list = list.filter((n) => String(n.title).toLowerCase().includes(q) || String(n.author).toLowerCase().includes(q));
      }
    }
    return list;
  }

  function getNoticeFuse() {
    if (noticeFuse[board] && noticeFuse[board]._q === undefined) return noticeFuse[board];
    if (!window.Fuse) return null;
    noticeFuse[board] = new Fuse(NOTICES[board], {
      keys: [{ name: 'title', weight: .8 }, { name: 'author', weight: .2 }],
      threshold: .32,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
    return noticeFuse[board];
  }

  function renderNotices() {
    const listEl = $('#noticeList');
    if (!listEl) return;
    const all = currentNotices();
    const shown = all.slice(0, noticeVisible);

    listEl.innerHTML = shown.map((n) => `
      <li class="notice-row${adminActive() ? ' has-admin' : ''}">
        <span class="notice-date">${esc(n.date)}</span>
        <span class="notice-title">
          ${n.pinned ? '<span class="pin">중요</span>' : ''}
          <a href="${esc(n.url || BOARD_META[board].source)}" target="_blank" rel="noopener">${esc(n.title)}</a>
        </span>
        <span class="notice-views">${fmtViews(n.views)}</span>
        ${adminBtns('notice', n, { board: board })}
      </li>`).join('');

    const count = $('#noticeCount');
    if (count) {
      count.textContent = all.length === NOTICES[board].length
        ? `${all.length}건`
        : `검색 결과 ${all.length}건`;
    }
    const note = $('#noticeSortNote');
    if (note) note.textContent = sortMode === 'latest' ? '등록일 최신순' : '중요공지 우선';

    const empty = $('#noticeEmpty');
    if (empty) empty.hidden = all.length > 0;

    const foot = $('.notice-foot');
    const oldMore = $('#noticeMore');
    if (oldMore) oldMore.remove();
    if (all.length > noticeVisible && foot) {
      const btn = document.createElement('button');
      btn.id = 'noticeMore';
      btn.type = 'button';
      btn.className = 'btn btn-outline';
      btn.style.marginRight = 'auto';
      btn.style.height = '42px';
      btn.style.fontSize = '13px';
      btn.textContent = `더 보기 (${all.length - noticeVisible}건)`;
      btn.addEventListener('click', () => { noticeVisible += 12; renderNotices(); });
      foot.prepend(btn);
    }

    const src = $('#noticeSource');
    if (src) {
      src.href = BOARD_META[board].source;
      src.childNodes[0].nodeValue = `${BOARD_META[board].label} 전체 보기 `;
    }
  }

  function setNoticeBoard(key, opts) {
    if (!BOARD_META[key]) return;
    const changed = key !== board;
    board = key;
    noticeVisible = 12;
    $$('#noticeTabs .notice-tab').forEach((t) => {
      const on = t.dataset.board === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    renderNotices();
    const listEl = $('#noticeList');
    if (changed && listEl && opts && opts.slide) {
      listEl.classList.remove('is-sliding');
      void listEl.offsetWidth;
      listEl.classList.add('is-sliding');
    }
  }

  /* 하드웨어 가속 터치 스와이프 — 모바일에서 게시판 탭을 좌우로 넘깁니다.
     (passive 리스너 + Layout Thrash 없는 단일 측정으로 스크롤을 막지 않습니다) */
  function initNoticeSwipe() {
    const panel = $('#notices .notice-panel');
    if (!panel || !('ontouchstart' in window)) return;
    const order = ['undergrad', 'grad', 'job'];
    let sx = 0, sy = 0, active = false, horizontal = false;

    panel.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      active = true;
      horizontal = false;
    }, { passive: true });

    panel.addEventListener('touchmove', (e) => {
      if (!active || e.touches.length !== 1) return;
      const dx = Math.abs(e.touches[0].clientX - sx);
      const dy = Math.abs(e.touches[0].clientY - sy);
      if (dx > 14 && dx > dy) horizontal = true;
    }, { passive: true });

    panel.addEventListener('touchend', (e) => {
      if (!active) { return; }
      active = false;
      if (!horizontal) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      const i = order.indexOf(board);
      const next = dx < 0 ? order[Math.min(i + 1, order.length - 1)] : order[Math.max(i - 1, 0)];
      if (next !== board) setNoticeBoard(next, { slide: true });
    }, { passive: true });
  }

  function initNotices() {
    if (typeof NOTICES === 'undefined') return;

    $$('#noticeTabs .notice-tab').forEach((tab) => {
      tab.addEventListener('click', () => setNoticeBoard(tab.dataset.board));
    });
    initNoticeSwipe();

    $$('.sort-toggle button').forEach((btn) => {
      btn.addEventListener('click', () => {
        sortMode = btn.dataset.sort;
        $$('.sort-toggle button').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        renderNotices();
      });
    });

    const input = $('#noticeSearch');
    if (input) {
      let t;
      input.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          noticeQuery = input.value.trim();
          noticeVisible = 12;
          renderNotices();
        }, 90);
      });
    }
  }

  /* ------------------------------------------------------------ 9. 학사 안내 카드 */
  function renderGuides() {
    const el = $('#guideGrid');
    if (!el || typeof GUIDES === 'undefined') return;
    el.innerHTML = GUIDES.map((g) => `
      <article class="guide-card">
        <p class="en">${esc(g.en)}</p>
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.text)}</p>
        <a class="link-arrow" href="${esc(g.link)}" target="_blank" rel="noopener">${esc(g.linkText)} ${ic('arrow-up-right')}</a>
      </article>`).join('');
  }

  /* ------------------------------------------------------------ 10. 통합 검색 팔레트 */
  const paletteIndex = [];
  let paletteFuse = null;
  let paletteActive = -1;
  let paletteResults = [];

  function buildPaletteIndex() {
    paletteIndex.length = 0;
    if (typeof PROFESSORS !== 'undefined') {
      PROFESSORS.forEach((p) => paletteIndex.push({
        type: '교수진', icon: 'user-round', title: `${p.name} ${p.title}`,
        meta: p.field || p.labName || '학과',
        kw: [p.name, p.field, p.labName, p.research.join(' '), p.tags.join(' ')].join(' '),
        run: () => { closePalette(); openProfile(p.id); }
      }));
    }
    if (typeof NOTICES !== 'undefined') {
      Object.keys(NOTICES).forEach((b) => NOTICES[b].forEach((n) => paletteIndex.push({
        type: BOARD_META[b].label, icon: 'megaphone', title: n.title,
        meta: n.date, kw: n.title,
        run: () => { window.open(n.url, '_blank', 'noopener'); }
      })));
    }
    if (typeof COURSES !== 'undefined') {
      COURSES.forEach((c) => paletteIndex.push({
        type: '교과목', icon: 'book-open', title: c.name,
        meta: `${c.year}학년 ${c.term}학기`,
        kw: [c.name, c.desc, `${c.year}학년`].join(' '),
        run: () => {
          closePalette();
          currentYear = c.year;
          renderYearTabs(); renderCurriculum();
          $('#curriculum').scrollIntoView({ behavior: 'smooth' });
        }
      }));
    }
    if (window.Fuse) {
      paletteFuse = new Fuse(paletteIndex, {
        keys: [{ name: 'title', weight: .7 }, { name: 'kw', weight: .3 }],
        threshold: .34,
        ignoreLocation: true
      });
    }
  }

  function searchPalette(q) {
    if (!q) return [];
    if (paletteFuse) return paletteFuse.search(q).slice(0, 12).map((r) => r.item);
    const s = q.toLowerCase();
    return paletteIndex.filter((i) => (i.title + ' ' + i.kw).toLowerCase().includes(s)).slice(0, 12);
  }

  function renderPaletteResults(q) {
    const box = $('#paletteResults');
    if (!box) return;
    if (!q) {
      box.innerHTML = `<div class="palette-group-label">빠른 이동</div>` + [
        ['교수진·연구실', '#labs', 'users'],
        ['교과과정', '#curriculum', 'book-open'],
        ['공지사항', '#notices', 'megaphone'],
        ['오시는 길', '#contact', 'map-pin']
      ].map(([label, href, ico]) => `
        <button class="palette-item" type="button" data-href="${href}">
          ${ic(ico)}<span class="t">${label}</span><span class="m">이동</span>
        </button>`).join('');
      $$('.palette-item', box).forEach((b) => b.addEventListener('click', () => {
        closePalette();
        const t = $(b.dataset.href);
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      }));
      icon();
      return;
    }

    paletteResults = searchPalette(q);
    paletteActive = paletteResults.length ? 0 : -1;

    if (!paletteResults.length) {
      box.innerHTML = '<div class="palette-empty">검색 결과가 없습니다. 다른 키워드로 검색해 보세요.</div>';
      return;
    }

    const groups = {};
    paletteResults.forEach((r, i) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push({ ...r, index: i });
    });

    box.innerHTML = Object.keys(groups).map((type) => `
      <div class="palette-group-label">${esc(type)}</div>
      ${groups[type].map((r) => `
        <button class="palette-item${r.index === paletteActive ? ' is-active' : ''}" type="button" data-index="${r.index}">
          ${ic(r.icon)}<span class="t">${esc(r.title)}</span><span class="m">${esc(r.meta)}</span>
        </button>`).join('')}
    `).join('');

    $$('.palette-item', box).forEach((b) => {
      b.addEventListener('click', () => { paletteResults[Number(b.dataset.index)].run(); });
      b.addEventListener('mousemove', () => setPaletteActive(Number(b.dataset.index)));
    });
    icon();
  }

  function setPaletteActive(i) {
    if (i < 0 || i >= paletteResults.length) return;
    paletteActive = i;
    $$('.palette-item').forEach((el) => {
      el.classList.toggle('is-active', Number(el.dataset.index) === i);
    });
  }

  function openPalette() {
    const p = $('#palette');
    if (!p) return;
    p.hidden = false;
    document.body.style.overflow = 'hidden';
    const input = $('#globalSearch');
    renderPaletteResults('');
    setTimeout(() => input && input.focus(), 30);
  }

  function closePalette() {
    const p = $('#palette');
    if (!p || p.hidden) return;
    p.hidden = true;
    document.body.style.overflow = '';
    const input = $('#globalSearch');
    if (input) input.value = '';
    const trigger = $('#openSearch');
    if (trigger) trigger.focus();
  }

  function initPalette() {
    buildPaletteIndex();
    const open = $('#openSearch');
    if (open) open.addEventListener('click', openPalette);
    $$('[data-close-palette]').forEach((el) => el.addEventListener('click', closePalette));

    const input = $('#globalSearch');
    if (input) {
      let t;
      input.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => renderPaletteResults(input.value.trim()), 80);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setPaletteActive(Math.min(paletteActive + 1, paletteResults.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPaletteActive(Math.max(paletteActive - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const r = paletteResults[paletteActive];
          if (r) r.run();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      const isK = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
      if (isK) { e.preventDefault(); openPalette(); }
      if (e.key === 'Escape') { closePalette(); closeProfile(); }
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault(); openPalette();
      }
    });
  }

  /* ------------------------------------------------------------ 11. 헤더·스크롤 */
  function initScroll() {
    const header = $('#siteHeader');
    const toTop = $('#toTop');

    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 12);
      if (toTop) toTop.classList.toggle('is-visible', y > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initNav() {
    const header = $('#siteHeader');
    const toggle = $('#menuToggle');
    const drawer = $('#mobileDrawer');
    const backdrop = $('#drawerBackdrop');
    const closeBtn = $('#drawerClose');

    function openDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      backdrop.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    }

    function closeDrawer() {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => { if (!drawer.classList.contains('is-open')) backdrop.hidden = true; }, 320);
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        if (drawer && drawer.classList.contains('is-open')) closeDrawer();
        else openDrawer();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    if (drawer) {
      $$('.mobile-nav-link', drawer).forEach((link) => {
        link.addEventListener('click', (e) => {
          closeDrawer();
          const targetId = link.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const target = $(targetId);
            if (target) {
              setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 180);
            }
          }
        });
      });
    }

    $$('#primaryNav a').forEach((a) => a.addEventListener('click', () => {
      if (header) header.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }));

    const sections = $$('main section[id]');
    const links = $$('#primaryNav a');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((s) => obs.observe(s));
  }

  /* ------------------------------------------------------------ 12. 관리자 갱신 */
  function resetNoticeFuse() {
    Object.keys(noticeFuse).forEach((k) => { delete noticeFuse[k]; });
  }

  function refreshNotices() {
    resetNoticeFuse();
    renderNotices();
    icon();
  }

  function refreshLabs() {
    buildLabFuse();
    renderResearch();
    renderLabFilters();
    renderLabs();
  }

  function refreshAll() {
    resetNoticeFuse();
    renderStats();
    renderTimeline();
    renderCareers();
    buildLabFuse();
    renderResearch();
    renderLabFilters();
    renderLabs();
    renderNotices();
    renderGuides();
    buildPaletteIndex();
    icon();
  }

  /* 관리자 화면(admin.js / admin-portal.js)이 쓰는 최소한의 공개 API */
  window.SSUApp = {
    refreshAll: refreshAll,
    refreshNotices: refreshNotices,
    refreshLabs: refreshLabs,
    openProfile: openProfile,
    closeProfile: closeProfile,
    currentBoard: () => board,
    setBoard: (b) => setNoticeBoard(b),
    scrollTo: (sel) => {
      const t = $(sel);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function initPillarCards() {
    $$('.pillar-card[data-filter]').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = card.dataset.filter;
        if (filter) {
          setLabFilter(filter);
          const target = $('#labs');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /* ------------------------------------------------------------ 모바일 4대 산업 캐러셀 & 인디케이터 */
  function initPillarCarousel() {
    const stack = $('#pillarStack');
    const dotsWrap = $('#pillarDots');
    if (!stack || !dotsWrap) return;

    const dots = dotsWrap.querySelectorAll('.dot');
    const cards = stack.querySelectorAll('.pillar-card');
    if (!dots.length || !cards.length) return;

    // 스크롤 시 현재 활성화된 카드 점 표시
    stack.addEventListener('scroll', () => {
      const scrollLeft = stack.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 12;
      const activeIdx = Math.min(Math.max(Math.round(scrollLeft / cardWidth), 0), cards.length - 1);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIdx);
      });
    }, { passive: true });

    // 점 클릭 시 해당 카드로 스크롤 이동
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 12;
        stack.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
      });
    });

    // 자동 가로 스와이프 (모바일 화면에서 3.5초마다 부드럽게 순환)
    let autoTimer = null;
    let isInteracting = false;

    function startAutoSwipe() {
      if (window.innerWidth > 900) return;
      stopAutoSwipe();
      autoTimer = setInterval(() => {
        if (isInteracting) return;
        const scrollLeft = stack.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 12;
        const nextIdx = (Math.round(scrollLeft / cardWidth) + 1) % cards.length;
        stack.scrollTo({ left: cardWidth * nextIdx, behavior: 'smooth' });
      }, 3500);
    }

    function stopAutoSwipe() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    stack.addEventListener('touchstart', () => { isInteracting = true; }, { passive: true });
    stack.addEventListener('touchend', () => {
      isInteracting = false;
      setTimeout(() => { isInteracting = false; }, 1000);
    }, { passive: true });

    startAutoSwipe();
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) stopAutoSwipe();
      else if (!autoTimer) startAutoSwipe();
    });
  }

  /* ------------------------------------------------------------ init */
  function boot() {
    initPillarCards();
    initPillarCarousel();
    renderStats();
    renderTimeline();
    renderCareers();
    renderResearch();
    renderLabFilters();
    initLabSearch();
    renderLabs();
    renderYearTabs();
    renderCurriculum();
    renderGraduation();
    renderGuides();
    initNotices();
    renderNotices();
    initDrawer();
    initPalette();
    initScroll();
    initNav();
    icon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
