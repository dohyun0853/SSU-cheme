/* ============================================================================
   숭실대학교 화학공학과 — 관리자 포털 (admin-portal.js)
   ----------------------------------------------------------------------------
   admin.html 전용. admin-core.js 위에서 네 개 탭을 그립니다.
     ① 공지사항 ② 교수진·연구실 ③ 보존·GitHub 동기화 ④ 보안 설정
   ========================================================================== */
(function () {
  'use strict';

  if (!window.SSUAdmin) return;
  const A = window.SSUAdmin;
  const { Auth, Store, UI } = A;
  const esc = A.esc;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const PAGE_SIZE = 25;
  const TAB_META = {
    notices: { title: '공지사항 관리', hash: '#notices' },
    faculty: { title: '교수진·연구실 관리', hash: '#faculty' },
    sync: { title: '보존 · GitHub 동기화', hash: '#sync' },
    security: { title: '보안 설정', hash: '#security' }
  };

  const state = {
    tab: 'notices',
    board: 'all',
    query: '',
    sort: 'latest',
    page: 1,
    facQuery: '',
    facTag: 'all',
    builtCache: null
  };

  /* ------------------------------------------------------------ helpers */
  const fmtNum = (n) => Number(n || 0).toLocaleString('ko-KR');
  const fmtBytes = (n) => (n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`);
  const dateVal = (d) => { const t = Date.parse(d); return Number.isNaN(t) ? 0 : t; };
  const initials = (name) => (name ? name.slice(-2) : '?');
  const hhmm = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };
  const icons = () => UI.icons();

  function built() {
    if (!state.builtCache) {
      const content = Store.buildDataJs();
      state.builtCache = {
        content,
        bytes: new TextEncoder().encode(content).length,
        sha: Store.contentHash(content),
        at: new Date()
      };
    }
    return state.builtCache;
  }
  const invalidate = () => { state.builtCache = null; };

  /* ------------------------------------------------------------ 세션 */
  function showLogin(message) {
    $('#adminApp').hidden = true;
    $('#loginScreen').hidden = false;
    const err = $('#loginError');
    if (message) { err.textContent = message; err.hidden = false; }
    icons();
    const id = $('#loginForm').querySelector('[name=id]');
    if (id) setTimeout(() => id.focus(), 80);
  }

  function showApp() {
    $('#loginScreen').hidden = true;
    $('#adminApp').hidden = false;
    const id = Auth.currentId();
    $('#sideUserId').textContent = id;
    $('#sideAvatar').textContent = (id || '관').slice(0, 1).toUpperCase();
    $('#sideSession').textContent = `세션 ${Auth.sessionLeftMin()}분 남음`;
    renderSideCounts();
    renderAll();
    icons();
  }

  function renderSideCounts() {
    $('#navNoticeCount').textContent = fmtNum(Store.noticeCount());
    $('#navProfCount').textContent = fmtNum(Store.professors().length);
  }

  /* ------------------------------------------------------------ 탭 */
  function setTab(tab, opts) {
    if (!TAB_META[tab]) tab = 'notices';
    state.tab = tab;
    $$('.sa-tab').forEach((el) => { el.hidden = el.id !== 'tab-' + tab; });
    $$('.sa-side-nav a[data-tab]').forEach((el) => el.classList.toggle('is-active', el.dataset.tab === tab));
    $('#pageTitle').textContent = TAB_META[tab].title;
    if (!(opts && opts.silent)) {
      try { history.replaceState(null, '', TAB_META[tab].hash); } catch (e) { /* noop */ }
    }
    if (tab === 'sync') renderSync();
    if (tab === 'security') renderSecurity();
    if (tab === 'faculty') renderFaculty();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ------------------------------------------------------------ 전체 렌더 */
  function renderAll() {
    renderNoticeStats();
    renderNotices();
    renderFaculty();
    renderSync();
    renderSecurity();
    renderChrome();
  }

  function renderChrome() {
    const savedAt = Store.savedAt();
    const hasLocal = Store.hasLocal();
    const badge = $('#localBadge');
    badge.textContent = hasLocal ? '로컬 수정본 반영 중' : '원본 data.js 그대로';
    badge.classList.toggle('is-on', hasLocal);
    $('#statSaved').textContent = savedAt ? A.stamp(savedAt) : '저장 이력 없음';
    const footer = $('#footMeta');
    footer.textContent = `공지 ${fmtNum(Store.noticeCount())}건 · 교수진 ${fmtNum(Store.professors().length)}명 · ${hasLocal ? '로컬 수정본 사용 중' : '원본 data.js'} · 세션 ${Auth.sessionLeftMin()}분 남음`;
  }

  /* ------------------------------------------------------------ ① 공지 통계 */
  function renderNoticeStats() {
    const all = Store.allNotices();
    const counts = {
      undergrad: Store.notices('undergrad').length,
      grad: Store.notices('grad').length,
      job: Store.notices('job').length
    };
    $('#statNotices').textContent = fmtNum(all.length);
    $('#statNoticesSub').textContent = `학부 ${counts.undergrad} · 대학원 ${counts.grad} · 취업 ${counts.job}`;
    $('#statPinned').textContent = fmtNum(all.filter((n) => n.pinned).length);
    const cutoff = Date.now() - 30 * 86400000;
    const recent = all.filter((n) => dateVal(n.date) >= cutoff).length;
    $('#statRecent').textContent = fmtNum(recent);
    $('#statRecentSub').textContent = '최근 30일 등록';

    $('#cntAll').textContent = all.length;
    $('#cntUndergrad').textContent = counts.undergrad;
    $('#cntGrad').textContent = counts.grad;
    $('#cntJob').textContent = counts.job;
    renderSideCounts();
  }

  /* ------------------------------------------------------------ ① 공지 목록 */
  function filteredNotices() {
    let list = state.board === 'all'
      ? Store.allNotices()
      : Store.notices(state.board).map((n) => Object.assign({ _board: state.board }, n));

    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter((n) => String(n.title).toLowerCase().includes(q) || String(n.author).toLowerCase().includes(q));
    }
    const sorters = {
      latest: (a, b) => dateVal(b.date) - dateVal(a.date),
      oldest: (a, b) => dateVal(a.date) - dateVal(b.date),
      views: (a, b) => (Number(b.views) || 0) - (Number(a.views) || 0),
      pinned: (a, b) => (Number(b.pinned) - Number(a.pinned)) || (dateVal(b.date) - dateVal(a.date))
    };
    return list.sort(sorters[state.sort] || sorters.latest);
  }

  function renderNotices() {
    const list = filteredNotices();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PAGE_SIZE;
    const rows = $('#noticeRows');
    if (!rows) return;

    rows.innerHTML = list.slice(start, start + PAGE_SIZE).map((n) => `
      <tr data-id="${esc(n._id)}"${n.pinned ? ' class="is-pinned"' : ''}>
        <td class="c-pin">
          <button type="button" class="sa-pin${n.pinned ? ' is-on' : ''}" data-act="notice-pin" data-id="${esc(n._id)}"
            title="${n.pinned ? '중요 공지 고정 해제' : '중요 공지로 고정'}" aria-pressed="${n.pinned}">
            <i data-lucide="pin"></i>
          </button>
        </td>
        <td class="c-board"><span class="sa-board sa-board--${esc(n._board)}">${esc(Store.boardLabel[n._board])}</span></td>
        <td class="c-date">${esc(n.date)}</td>
        <td class="c-title">
          <button type="button" class="sa-title" data-act="notice-edit" data-id="${esc(n._id)}" title="클릭해서 수정">
            ${esc(n.title)}
          </button>
        </td>
        <td class="c-author">${esc(n.author)}</td>
        <td class="c-num">${fmtNum(n.views)}</td>
        <td class="c-manage">
          ${n.url ? `<a class="sa-icon-btn" href="${esc(n.url)}" target="_blank" rel="noopener" title="원문 열기" aria-label="원문 열기"><i data-lucide="external-link"></i></a>` : ''}
          <button type="button" class="sa-icon-btn" data-act="notice-edit" data-id="${esc(n._id)}" title="수정" aria-label="수정"><i data-lucide="pencil"></i></button>
          <button type="button" class="sa-icon-btn is-danger" data-act="notice-del" data-id="${esc(n._id)}" title="삭제" aria-label="삭제"><i data-lucide="trash-2"></i></button>
        </td>
      </tr>`).join('');

    $('#noticeEmpty').hidden = list.length > 0;
    rows.hidden = list.length === 0;

    const pager = $('#noticePager');
    if (list.length <= PAGE_SIZE) {
      pager.innerHTML = list.length
        ? `<span class="sa-pager-info">${fmtNum(list.length)}건 · 전체</span>`
        : '';
    } else {
      const nums = [];
      const win = 2;
      for (let p = 1; p <= pages; p++) {
        if (p === 1 || p === pages || Math.abs(p - state.page) <= win) nums.push(p);
        else if (nums[nums.length - 1] !== '…') nums.push('…');
      }
      pager.innerHTML = `
        <span class="sa-pager-info">${fmtNum(list.length)}건 중 ${start + 1}–${Math.min(start + PAGE_SIZE, list.length)}</span>
        <div class="sa-pager-btns">
          <button type="button" class="sa-page" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="이전">‹</button>
          ${nums.map((p) => (p === '…'
            ? '<span class="sa-page-gap">…</span>'
            : `<button type="button" class="sa-page${p === state.page ? ' is-active' : ''}" data-page="${p}">${p}</button>`)).join('')}
          <button type="button" class="sa-page" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''} aria-label="다음">›</button>
        </div>`;
    }
    icons();
  }

  /* ------------------------------------------------------------ ② 교수진 */
  function renderFaculty() {
    const grid = $('#facultyGrid');
    if (!grid) return;
    let list = Store.professors().slice();
    if (state.facTag !== 'all') list = list.filter((p) => (p.tags || []).indexOf(state.facTag) >= 0);
    if (state.facQuery) {
      const q = state.facQuery.toLowerCase();
      list = list.filter((p) => [p.name, p.field, p.labName, (p.research || []).join(' ')].join(' ').toLowerCase().includes(q));
    }

    grid.innerHTML = list.map((p) => `
      <article class="sa-fac">
        <div class="sa-fac-photo${p.photo ? '' : ' is-mono'}">
          ${p.photo
            ? `<img src="${esc(p.photo)}" alt="${esc(p.name)} 교수" loading="lazy" onerror="this.parentNode.classList.add('is-mono');this.parentNode.textContent='${esc(initials(p.name))}'">`
            : `<span>${esc(initials(p.name))}</span>`}
        </div>
        <div class="sa-fac-body">
          <header>
            <h3>${esc(p.name)}</h3>
            <span class="sa-fac-title">${esc(p.title)}</span>
          </header>
          <p class="sa-fac-field">${esc(p.field || '전문 분야 미등록')}</p>
          ${(p.tags || []).length ? `<div class="sa-fac-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
          <dl class="sa-fac-meta">
            <div><dt>교수실</dt><dd>${esc(p.office || '—')}</dd></div>
            <div><dt>연구실</dt><dd>${esc(p.labName ? `${p.labName}${p.labRoom ? ' · ' + p.labRoom : ''}` : '—')}</dd></div>
            <div><dt>연락</dt><dd>${esc(p.tel || '—')}${p.email ? ` · <a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ''}</dd></div>
            <div><dt>홈페이지</dt><dd>${p.labUrl ? `<a href="${esc(p.labUrl)}" target="_blank" rel="noopener">${esc(p.labUrl.replace(/^https?:\/\//, ''))}</a>` : '—'}</dd></div>
          </dl>
          <div class="sa-fac-actions">
            <span class="sa-fac-count">연구 ${fmtNum((p.research || []).length)}건</span>
            <button type="button" class="sa-btn sa-btn--xs" data-act="prof-edit" data-id="${esc(p.id)}"><i data-lucide="pencil"></i>수정</button>
            <button type="button" class="sa-btn sa-btn--xs sa-btn-danger" data-act="prof-del" data-id="${esc(p.id)}"><i data-lucide="trash-2"></i>삭제</button>
          </div>
        </div>
      </article>`).join('');

    $('#facultyEmpty').hidden = list.length > 0;
    icons();
  }

  /* ------------------------------------------------------------ ③ 보존·동기화 */
  function renderSync() {
    const b = built();
    $('#syncNoticeCount').textContent = fmtNum(Store.noticeCount());
    $('#syncProfCount').textContent = fmtNum(Store.professors().length);
    $('#dataSize').textContent = fmtBytes(b.bytes);
    $('#dataSha').textContent = b.sha.slice(0, 16) + '…';
    $('#dataSha').setAttribute('title', b.sha);
    $('#dataBuiltAt').textContent = A.stamp(b.at);
    $('#dataFingerprint').textContent = 'SHA ' + b.sha.slice(0, 8);

    const preview = b.content.split('\n').slice(0, 26).join('\n');
    const pre = $('#dataPreview');
    pre.textContent = preview + '\n' + '…';
    const chip = $('#ghState');
    if (!chip.dataset.mode) {
      chip.textContent = Store.hasLocal() ? '커밋 대기' : '대기';
      chip.classList.toggle('is-warn', Store.hasLocal());
    }
    const save = Store.gh.settings();
    if (save) {
      if (save.owner) $('#ghOwner').value = save.owner;
      if (save.repo) $('#ghRepo').value = save.repo;
      if (save.path) $('#ghPath').value = save.path;
      if (save.branch) $('#ghBranch').value = save.branch;
      if (save.message) $('#ghMessage').value = save.message;
      if (save.token && !$('#ghToken').value) $('#ghToken').value = save.token;
    }
  }

  function logLine(text, kind) {
    const box = $('#ghLog');
    if (!box) return;
    const first = box.querySelector('.sa-log-line.is-muted');
    if (first) first.remove();
    const p = document.createElement('p');
    p.className = 'sa-log-line' + (kind ? ' is-' + kind : '');
    p.innerHTML = `<span class="sa-log-time">${hhmm()}</span><span>${text}</span>`;
    box.appendChild(p);
    box.scrollTop = box.scrollHeight;
  }

  function setGhState(text, mode) {
    const chip = $('#ghState');
    chip.textContent = text;
    chip.dataset.mode = mode || '';
    chip.classList.remove('is-on', 'is-warn', 'is-error');
    if (mode) chip.classList.add('is-' + mode);
  }

  function ghOptions() {
    return {
      owner: $('#ghOwner').value.trim(),
      repo: $('#ghRepo').value.trim(),
      path: $('#ghPath').value.trim() || 'data.js',
      branch: $('#ghBranch').value.trim() || 'main'
    };
  }
  function ghToken() { return $('#ghToken').value.trim(); }

  function saveGhSettings() {
    const o = ghOptions();
    o.message = $('#ghMessage').value.trim();
    o.token = ghToken();
    Store.gh.saveSettings(o);
  }

  function ghValidate() {
    const o = ghOptions();
    if (!o.owner || !o.repo) { UI.toast('소유자와 저장소를 입력하세요.', 'error'); return false; }
    if (!ghToken()) {
      UI.toast('Personal access token을 입력하세요.', 'error');
      $('#ghToken').focus();
      return false;
    }
    return true;
  }

  async function ghCheck() {
    if (!ghValidate()) return;
    const o = ghOptions();
    saveGhSettings();
    setGhState('확인 중', 'warn');
    logLine(`<strong>${esc(o.owner + '/' + o.repo)}</strong> · <code>${esc(o.path)}</code>@${esc(o.branch)} 확인 중…`, 'muted');
    try {
      const r = await Store.gh.read(o, ghToken());
      if (!r.ok) {
        setGhState('확인 실패', 'error');
        logLine(`실패 (${r.status}) — ${esc(r.message)}`, 'error');
        UI.toast(`원격 확인 실패: ${r.message}`, 'error');
        return;
      }
      if (r.missing) {
        setGhState('원격에 파일 없음', 'warn');
        logLine('원격에 해당 경로의 파일이 없습니다. 커밋하면 새로 만들어집니다.', 'warn');
        return;
      }
      const same = r.content === built().content;
      setGhState(same ? '동기화됨' : '변경 있음', same ? 'on' : 'warn');
      logLine(`원격 <code>${esc(o.path)}</code> · ${fmtBytes(r.size)} · ${esc(String(r.sha).slice(0, 8))}`, 'muted');
      logLine(same
        ? '원격과 지금 화면의 내용이 같습니다. 커밋할 변경 사항이 없습니다.'
        : '원격과 내용이 다릅니다. 아래 <strong>GitHub에 커밋</strong>으로 반영할 수 있습니다.', same ? 'ok' : 'warn');
    } catch (err) {
      setGhState('확인 실패', 'error');
      logLine(`네트워크 오류 — ${esc(err && err.message ? err.message : String(err))}`, 'error');
      UI.toast('네트워크 오류로 원격 상태를 확인하지 못했습니다.', 'error');
    }
  }

  async function ghPush() {
    if (!ghValidate()) return;
    const o = ghOptions();
    const msg = $('#ghMessage').value.trim() || 'chore(data): 관리자 포털에서 학과 데이터 갱신';
    const b = built();

    const ok = await UI.confirm({
      eyebrow: 'GitHub 커밋',
      title: '지금 내용을 저장소에 올릴까요?',
      desc: `${o.owner}/${o.repo} 의 ${o.path} 를 교체합니다.`,
      body: `<ul class="sa-confirm-list">
          <li><span>공지</span><strong>${fmtNum(Store.noticeCount())}건</strong></li>
          <li><span>교수진</span><strong>${fmtNum(Store.professors().length)}명</strong></li>
          <li><span>파일</span><strong>${fmtBytes(b.bytes)} · SHA ${b.sha.slice(0, 8)}</strong></li>
          <li><span>브랜치</span><strong>${esc(o.branch)}</strong></li>
        </ul>
        <p class="sa-quiet">커밋은 저장소에 영구 기록되며, 1~2분 뒤 홈페이지에 반영됩니다.</p>`,
      okText: '커밋'
    });
    if (!ok) return;

    saveGhSettings();
    const btn = document.querySelector('[data-act="gh-push"]');
    const label = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '<i data-lucide="loader-circle"></i>올리는 중…'; icons(); }
    setGhState('커밋 중', 'warn');

    try {
      const r = await Store.gh.push(o, ghToken(), b.content, msg);
      if (!r.ok) {
        setGhState(r.conflict ? '충돌' : '실패', 'error');
        logLine(`커밋 실패 (${r.status}) — ${esc(r.message)}`, 'error');
        if (r.status === 401) logLine('토큰이 만료되었거나 권한이 없습니다. Contents: Read and write 권한을 확인하세요.', 'error');
        if (r.status === 403) logLine('권한 부족 또는 요청 한도 초과입니다. 저장소 권한과 잠시 뒤 재시도를 확인하세요.', 'error');
        if (r.status === 404) logLine('저장소를 찾지 못했습니다. 소유자·저장소 이름과 토큰의 저장소 선택 범위를 확인하세요.', 'error');
        if (r.conflict) logLine('원격이 먼저 바뀌었습니다. 원격 상태 확인 후 다시 시도하세요.', 'warn');
        UI.toast(`커밋 실패: ${r.message}`, 'error');
        return;
      }
      if (r.unchanged) {
        setGhState('동기화됨', 'on');
        logLine('원격과 내용이 같아 새 커밋을 만들지 않았습니다.', 'muted');
        UI.toast('변경 사항이 없습니다.');
        return;
      }
      setGhState('커밋 완료', 'on');
      logLine(`커밋 완료 · <code>${esc(String(r.commitSha || '').slice(0, 10))}</code>`, 'ok');
      if (r.commitUrl) {
        logLine(`<a href="${esc(r.commitUrl)}" target="_blank" rel="noopener">GitHub에서 커밋 열기 ↗</a>`, 'muted');
      }
      logLine('GitHub Pages 재배포까지 보통 1~2분 걸립니다.', 'muted');
      UI.toast('GitHub에 커밋했습니다. 1~2분 뒤 홈페이지에 반영됩니다.');
    } catch (err) {
      setGhState('실패', 'error');
      logLine(`네트워크 오류 — ${esc(err && err.message ? err.message : String(err))}`, 'error');
      UI.toast('네트워크 오류로 커밋하지 못했습니다.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = label; icons(); }
    }
  }

  /* ------------------------------------------------------------ ④ 보안 */
  function renderSecurity() {
    const cred = {
      id: Auth.currentId(),
      updated: Auth.updatedAt()
    };
    $('#credId').textContent = cred.id;
    $('#credUpdated').textContent = cred.updated ? A.stamp(new Date(cred.updated)) : '변경 이력 없음';
    const chip = $('#credChip');
    chip.textContent = Auth.isDefault() ? '기본 계정' : '변경됨';
    chip.classList.toggle('is-warn', Auth.isDefault());
  }

  /* ------------------------------------------------------------ 편집 모달 */
  function openNoticeEditor(notice) {
    const isNew = !notice;
    const board = isNew ? (state.board === 'all' ? 'undergrad' : state.board) : notice._board;
    const modal = UI.open({
      wide: true,
      eyebrow: isNew ? '새 공지' : '공지 수정',
      title: isNew ? '공지사항 등록' : '공지사항 수정',
      desc: isNew ? '등록 후 이 브라우저에 저장됩니다. 방문자에게 보이려면 GitHub에 커밋하세요.' : '',
      body: UI.noticeForm(isNew ? null : notice, { board })
    });
    const form = modal.querySelector('[data-sa-form=notice]');
    const err = form.querySelector('[data-sa-error]');
    modal.querySelector('[data-sa-cancel]').addEventListener('click', () => UI.close());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const r = UI.readNoticeForm(form);
      if (r.error) {
        err.textContent = r.error; err.hidden = false;
        const f = form.querySelector(`[name=${r.field}]`);
        if (f) f.focus();
        return;
      }
      if (isNew) Store.addNotice(r.fields.board, r.fields);
      else Store.updateNotice(notice._id, r.fields);
      UI.close();
      UI.toast(isNew ? '공지를 등록했습니다.' : '공지를 수정했습니다.');
    });
  }

  function openProfessorEditor(prof) {
    const isNew = !prof;
    const modal = UI.open({
      wide: true,
      eyebrow: isNew ? '새 교수진' : '교수진 수정',
      title: isNew ? '교수진 추가' : '교수진 정보 수정',
      desc: '교수진 카드·프로필·연구분야 카운트에 함께 반영됩니다.',
      body: UI.professorForm(prof)
    });
    const form = modal.querySelector('[data-sa-form=professor]');
    const err = form.querySelector('[data-sa-error]');
    modal.querySelector('[data-sa-cancel]').addEventListener('click', () => UI.close());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const r = UI.readProfessorForm(form);
      if (r.error) {
        err.textContent = r.error; err.hidden = false;
        const f = form.querySelector(`[name=${r.field}]`);
        if (f) f.focus();
        return;
      }
      if (isNew) Store.addProfessor(r.fields);
      else Store.updateProfessor(prof.id, r.fields);
      UI.close();
      UI.toast(isNew ? '교수진을 추가했습니다.' : '교수진 정보를 수정했습니다.');
    });
  }

  /* ------------------------------------------------------------ 이벤트 */
  function bind() {
    /* 로그인 */
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const res = Auth.login(form.querySelector('[name=id]').value, form.querySelector('[name=pw]').value);
      const err = $('#loginError');
      if (!res.ok) {
        err.textContent = res.error;
        err.hidden = false;
        form.querySelector('[name=pw]').select();
        return;
      }
      err.hidden = true;
      form.reset();
      showApp();
    });

    /* 사이드바 */
    $$('.sa-side-nav a[data-tab]').forEach((a) => {
      a.addEventListener('click', (e) => { e.preventDefault(); setTab(a.dataset.tab); });
    });
    $$('[data-logout]').forEach((b) => b.addEventListener('click', async () => {
      const ok = await UI.confirm({ eyebrow: '로그아웃', title: '관리자 모드에서 나갈까요?', desc: '다시 들어오려면 비밀번호가 필요합니다.', okText: '로그아웃' });
      if (!ok) return;
      Auth.logout();
      showLogin();
      UI.toast('로그아웃했습니다.');
    }));

    /* 공지 필터 */
    $$('#boardTabs button').forEach((b) => b.addEventListener('click', () => {
      state.board = b.dataset.board;
      state.page = 1;
      $$('#boardTabs button').forEach((x) => {
        const on = x === b;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-selected', String(on));
      });
      renderNotices();
    }));

    const search = $('#noticeSearch');
    const clear = $('#noticeSearchClear');
    let st;
    search.addEventListener('input', () => {
      clearTimeout(st);
      clear.hidden = !search.value;
      st = setTimeout(() => { state.query = search.value.trim(); state.page = 1; renderNotices(); }, 120);
    });
    clear.addEventListener('click', () => {
      search.value = ''; clear.hidden = true; state.query = ''; state.page = 1; renderNotices(); search.focus();
    });
    $('#noticeSort').addEventListener('change', (e) => { state.sort = e.target.value; state.page = 1; renderNotices(); });

    /* 페이지 이동 */
    $('#noticePager').addEventListener('click', (e) => {
      const b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      const p = Number(b.dataset.page);
      const pages = Math.max(1, Math.ceil(filteredNotices().length / PAGE_SIZE));
      if (p >= 1 && p <= pages) { state.page = p; renderNotices(); }
    });

    /* 교수진 필터 */
    let ft;
    $('#facultySearch').addEventListener('input', (e) => {
      clearTimeout(ft);
      ft = setTimeout(() => { state.facQuery = e.target.value.trim(); renderFaculty(); }, 120);
    });
    $('#facultyTag').addEventListener('change', (e) => { state.facTag = e.target.value; renderFaculty(); });

    /* 공지·교수진 동작 (행 단위) */
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      const id = btn.dataset.id;

      if (act === 'notice-new') { openNoticeEditor(null); return; }
      if (act === 'prof-new') { openProfessorEditor(null); return; }

      if (act === 'notice-edit') {
        const f = Store.findNotice(id);
        if (f) openNoticeEditor(f.notice);
        return;
      }
      if (act === 'notice-pin') {
        const pinned = Store.togglePin(id);
        UI.toast(pinned ? '중요 공지로 고정했습니다.' : '중요 공지 고정을 해제했습니다.');
        return;
      }
      if (act === 'notice-del') {
        const f = Store.findNotice(id);
        if (!f) return;
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '공지 삭제',
          title: '이 공지를 삭제할까요?',
          desc: f.notice.title,
          body: '<p class="sa-quiet">삭제는 이 브라우저에만 적용됩니다. GitHub에 커밋해야 방문자에게도 반영됩니다.</p>',
          okText: '삭제'
        });
        if (!ok) return;
        Store.deleteNotice(id);
        UI.toast('공지를 삭제했습니다.');
        return;
      }
      if (act === 'prof-edit') {
        const f = Store.findProfessor(id);
        if (f) openProfessorEditor(f.professor);
        return;
      }
      if (act === 'prof-del') {
        const f = Store.findProfessor(id);
        if (!f) return;
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '교수진 삭제',
          title: `${f.professor.name} 교수님을 삭제할까요?`,
          body: '<p class="sa-quiet">교수진 카드·프로필·연구분야 카운트에서 빠집니다. 사진 파일은 그대로 남습니다.</p>',
          okText: '삭제'
        });
        if (!ok) return;
        Store.deleteProfessor(id);
        UI.toast('교수진을 삭제했습니다.');
        return;
      }

      /* 보존 */
      if (act === 'download-datajs') {
        Store.downloadDataJs();
        logLine('data.js 파일을 내려받았습니다.', 'ok');
        UI.toast('data.js를 내려받았습니다.');
        return;
      }
      if (act === 'download-json') {
        Store.downloadBackupJson();
        UI.toast('백업 JSON을 내려받았습니다.');
        return;
      }
      if (act === 'copy-datajs') {
        const ok = await Store.copyDataJs();
        UI.toast(ok ? 'data.js 코드를 클립보드에 복사했습니다.' : '복사하지 못했습니다. 내려받기를 이용하세요.', ok ? undefined : 'error');
        return;
      }

      /* GitHub */
      if (act === 'gh-check') { ghCheck(); return; }
      if (act === 'gh-push') { ghPush(); return; }

      /* 되돌리기 */
      if (act === 'reset-local') {
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '로컬 수정본 비우기',
          title: '이 브라우저의 편집 내용을 모두 버릴까요?',
          body: '<p class="sa-quiet">내려받은 data.js가 없다면 되살릴 수 없습니다. 먼저 <strong>data.js 내려받기</strong>를 권합니다.</p>',
          okText: '비우기'
        });
        if (!ok) return;
        Store.resetLocal();
        UI.toast('원본 상태로 되돌렸습니다.');
        return;
      }
      if (act === 'reset-cred') {
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '계정 초기화',
          title: '기본 계정으로 되돌릴까요?',
          desc: 'admin / ssu1967! 로 다시 로그인하게 됩니다.',
          okText: '초기화'
        });
        if (!ok) return;
        Auth.resetToDefault();
        Auth.start(Auth.defaultId);
        UI.toast('기본 계정으로 초기화했습니다.');
        showApp();
        return;
      }
    });

    /* 계정 변경 */
    $('#credForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const err = form.querySelector('[data-sa-error]');
      const res = Auth.change(
        form.querySelector('[name=id]').value,
        form.querySelector('[name=pw]').value,
        form.querySelector('[name=currentPw]').value,
        form.querySelector('[name=confirmPw]').value
      );
      if (!res.ok) {
        err.textContent = res.error; err.hidden = false;
        const f = form.querySelector(`[name=${res.field}]`);
        if (f) f.focus();
        return;
      }
      err.hidden = true;
      form.reset();
      renderSecurity();
      $('#sideUserId').textContent = Auth.currentId();
      $('#sideAvatar').textContent = Auth.currentId().slice(0, 1).toUpperCase();
      UI.toast('계정 정보를 변경했습니다.');
    });

    /* 데이터가 바뀌면 화면·지문 갱신 */
    document.addEventListener('ssuadmin:data', () => {
      invalidate();
      renderNoticeStats();
      renderNotices();
      renderFaculty();
      if (state.tab === 'sync') renderSync();
      renderChrome();
    });

    /* 해시로 탭 열기 */
    window.addEventListener('hashchange', () => {
      const tab = location.hash.replace('#', '');
      if (TAB_META[tab]) setTab(tab, { silent: true });
    });
  }

  /* ------------------------------------------------------------ 시작 */
  function boot() {
    bind();
    const tab = location.hash.replace('#', '');
    if (!Auth.isAuthed()) { showLogin(); return; }
    showApp();
    setTab(TAB_META[tab] ? tab : 'notices', { silent: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
