/* ============================================================================
   숭실대학교 화학공학과 — 메인 페이지 관리자 연동 (admin.js)
   ----------------------------------------------------------------------------
   index.html 에만 붙습니다. admin-core.js 가 있어야 동작합니다.
     · 푸터의 '관리자 로그인' → 로그인 모달
     · 로그인 후 상단 '관리자 모드' 바 + [관리자 포털 가기] [로그아웃]
     · 공지 목록·교수진 카드에 [수정] [삭제] 퀵 버튼, 섹션에 [새 공지 등록]
   ========================================================================== */
(function () {
  'use strict';

  if (!window.SSUAdmin) return;
  const A = window.SSUAdmin;
  const { Auth, Store, UI } = A;
  const esc = A.esc;

  const barId = 'ssuAdminBar';
  const toolbarClass = 'sa-section-toolbar';

  /* ---------------------------------------------------------------- 상태 */
  function active() { return Auth.isAuthed(); }

  /* ---------------------------------------------------------------- 로그인 모달 */
  function openLogin() {
    if (active()) { announceActive(); return; }
    const modal = UI.open({
      narrow: true,
      eyebrow: 'Administrator',
      title: '관리자 로그인',
      desc: '학과 홈페이지의 공지·교수진 정보를 직접 고칠 수 있는 관리자 모드입니다.',
      body: `
        <form class="sa-form" data-sa-form="login" novalidate>
          <label class="sa-field">
            <span class="sa-label">아이디</span>
            <input name="id" type="text" class="sa-input" autocomplete="username" value="${esc(Auth.defaultId)}" required>
          </label>
          <label class="sa-field">
            <span class="sa-label">비밀번호</span>
            <input name="pw" type="password" class="sa-input" autocomplete="current-password" placeholder="••••••••" required>
          </label>
          <p class="sa-form-error" data-sa-error hidden></p>
          <div class="sa-form-actions">
            <button type="button" class="sa-btn" data-sa-cancel>취소</button>
            <button type="submit" class="sa-btn sa-btn-primary">로그인</button>
          </div>
          <p class="sa-login-note">
            최초 계정은 <code>${esc(Auth.defaultId)}</code> / <code>${esc(Auth.defaultPw)}</code> 이며,
            로그인 후 <strong>관리자 포털 › 보안 설정</strong>에서 바꿀 수 있습니다.
          </p>
        </form>`
    });
    const form = modal.querySelector('[data-sa-form=login]');
    const err = form.querySelector('[data-sa-error]');
    modal.querySelector('[data-sa-cancel]').addEventListener('click', () => UI.close());
    setTimeout(() => { const p = form.querySelector('[name=pw]'); if (p) p.focus(); }, 140);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = form.querySelector('[name=id]').value;
      const pw = form.querySelector('[name=pw]').value;
      const res = Auth.login(id, pw);
      if (!res.ok) {
        err.textContent = res.error;
        err.hidden = false;
        form.querySelector('[name=pw]').select();
        return;
      }
      UI.close();
      activate();
      UI.toast('관리자 모드로 전환했습니다.');
    });
  }

  function announceActive() {
    UI.toast('이미 관리자 모드입니다. 상단 바에서 포털로 이동할 수 있습니다.', 'warn');
  }

  /* ---------------------------------------------------------------- 상단 바 */
  function buildBar() {
    if (document.getElementById(barId)) return;
    const bar = document.createElement('div');
    bar.id = barId;
    bar.className = 'sa-admin-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', '관리자 모드');
    bar.innerHTML = `
      <div class="wrap sa-admin-bar-inner">
        <p class="sa-admin-state">
          <span class="sa-pulse" aria-hidden="true"></span>
          <strong>관리자 모드 실행 중</strong>
          <span class="sa-admin-meta">EDIT MODE · ${esc(Auth.currentId())}</span>
        </p>
        <div class="sa-admin-bar-actions">
          <a class="sa-bar-btn sa-bar-btn--solid" href="admin.html">
            <i data-lucide="layout-dashboard"></i><span>관리자 포털 가기</span>
          </a>
          <button type="button" class="sa-bar-btn" data-admin-logout>
            <i data-lucide="log-out"></i><span>로그아웃</span>
          </button>
        </div>
      </div>`;
    const header = document.getElementById('siteHeader');
    document.body.insertBefore(bar, header || document.body.firstChild);
    bar.querySelector('[data-admin-logout]').addEventListener('click', logout);
    document.documentElement.classList.add('is-admin');
    document.body.classList.add('is-admin');
    UI.icons();
  }

  function removeBar() {
    const bar = document.getElementById(barId);
    if (bar) bar.remove();
    document.documentElement.classList.remove('is-admin');
    document.body.classList.remove('is-admin');
  }

  /* ---------------------------------------------------------------- 섹션 툴바 */
  function buildToolbars() {
    const noticesHead = document.querySelector('#notices .section-head');
    if (noticesHead && !noticesHead.querySelector('[data-admin-act="notice-new"]')) {
      const p = document.createElement('div');
      p.className = toolbarClass;
      p.innerHTML = `
        <span class="sa-toolbar-label">${esc(Store.noticeCount())}건 관리 중</span>
        <button type="button" class="sa-toolbar-btn" data-admin-act="notice-new">
          <i data-lucide="plus"></i><span>새 공지 등록</span>
        </button>`;
      noticesHead.appendChild(p);
    }

    const labsHead = document.querySelector('#labs .section-head');
    if (labsHead && !labsHead.querySelector('[data-admin-act="prof-new"]')) {
      const p = document.createElement('div');
      p.className = toolbarClass;
      p.innerHTML = `
        <span class="sa-toolbar-label">${esc(Store.professors().length)}명 관리 중</span>
        <button type="button" class="sa-toolbar-btn" data-admin-act="prof-new">
          <i data-lucide="user-plus"></i><span>새 교수진 추가</span>
        </button>`;
      labsHead.appendChild(p);
    }
    UI.icons();
  }

  function removeToolbars() {
    document.querySelectorAll('.' + toolbarClass).forEach((el) => el.remove());
  }

  function refreshToolbarLabels() {
    const n = document.querySelector('#notices .' + toolbarClass + ' .sa-toolbar-label');
    if (n) n.textContent = Store.noticeCount() + '건 관리 중';
    const p = document.querySelector('#labs .' + toolbarClass + ' .sa-toolbar-label');
    if (p) p.textContent = Store.professors().length + '명 관리 중';
  }

  /* ---------------------------------------------------------------- 활성/비활성 */
  function activate() {
    buildBar();
    buildToolbars();
    if (window.SSUApp) window.SSUApp.refreshAll();
    refreshToolbarLabels();
    UI.icons();
  }

  function deactivate() {
    removeBar();
    removeToolbars();
    if (window.SSUApp) window.SSUApp.refreshAll();
  }

  function logout() {
    Auth.logout();
    deactivate();
    UI.toast('관리자 모드에서 나왔습니다.');
  }

  /* ---------------------------------------------------------------- 편집 모달 */
  function openNoticeEditor(notice, board) {
    const isNew = !notice;
    const modal = UI.open({
      wide: true,
      eyebrow: isNew ? '새 공지' : '공지 수정',
      title: isNew ? '공지사항 등록' : '공지사항 수정',
      desc: isNew
        ? '등록한 공지는 이 브라우저에 먼저 저장되고, 관리자 포털에서 GitHub에 반영하면 모든 방문자에게 보입니다.'
        : '수정 내용은 저장 즉시 이 브라우저의 홈페이지에 반영됩니다.',
      body: UI.noticeForm(notice, { board: board })
    });
    const form = modal.querySelector('[data-sa-form=notice]');
    const err = form.querySelector('[data-sa-error]');
    modal.querySelector('[data-sa-cancel]').addEventListener('click', () => UI.close());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const r = UI.readNoticeForm(form);
      if (r.error) {
        err.textContent = r.error;
        err.hidden = false;
        const f = form.querySelector(`[name=${r.field}]`);
        if (f) f.focus();
        return;
      }
      if (isNew) Store.addNotice(r.fields.board, r.fields);
      else Store.updateNotice(notice._id, r.fields);
      UI.close();
      if (window.SSUApp) {
        window.SSUApp.setBoard(r.fields.board);
        window.SSUApp.scrollTo('#notices');
      }
      refreshToolbarLabels();
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
        err.textContent = r.error;
        err.hidden = false;
        const f = form.querySelector(`[name=${r.field}]`);
        if (f) f.focus();
        return;
      }
      if (isNew) Store.addProfessor(r.fields);
      else Store.updateProfessor(prof.id, r.fields);
      UI.close();
      if (window.SSUApp) {
        window.SSUApp.refreshAll();
        window.SSUApp.scrollTo('#labs');
      }
      refreshToolbarLabels();
      UI.toast(isNew ? '교수진을 추가했습니다.' : '교수진 정보를 수정했습니다.');
    });
  }

  /* ---------------------------------------------------------------- 이벤트 위임 */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-admin-act]');
    if (!btn) return;
    const act = btn.dataset.adminAct;
    if (!/^notice-|^prof-/.test(act)) return;
    e.preventDefault();
    e.stopPropagation();

    if (act === 'notice-new') { openNoticeEditor(null, window.SSUApp ? window.SSUApp.currentBoard() : 'undergrad'); return; }
    if (act === 'prof-new') { openProfessorEditor(null); return; }

    const id = btn.dataset.id;

    if (/^notice-/.test(act)) {
      const found = Store.findNotice(id);
      if (!found) { UI.toast('해당 공지를 찾지 못했습니다. 새로고침 후 다시 시도하세요.', 'error'); return; }
      if (act === 'notice-edit') { openNoticeEditor(found.notice, found.board); return; }
      if (act === 'notice-pin') {
        const pinned = Store.togglePin(id);
        if (window.SSUApp) window.SSUApp.refreshNotices();
        UI.toast(pinned ? '중요 공지로 고정했습니다.' : '중요 공지 고정을 해제했습니다.');
        return;
      }
      if (act === 'notice-del') {
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '공지 삭제',
          title: '이 공지를 삭제할까요?',
          desc: found.notice.title,
          body: `<p class="sa-quiet">이 브라우저에서 즉시 사라지며, 관리자 포털에서 GitHub에 반영해야 홈페이지에서도 삭제됩니다.</p>`,
          okText: '삭제'
        });
        if (!ok) return;
        Store.deleteNotice(id);
        if (window.SSUApp) window.SSUApp.refreshNotices();
        refreshToolbarLabels();
        UI.toast('공지를 삭제했습니다.');
        return;
      }
    }

    if (/^prof-/.test(act)) {
      const found = Store.findProfessor(id);
      if (!found) { UI.toast('해당 교수진을 찾지 못했습니다. 새로고침 후 다시 시도하세요.', 'error'); return; }
      if (act === 'prof-edit') { openProfessorEditor(found.professor); return; }
      if (act === 'prof-del') {
        const ok = await UI.confirm({
          danger: true,
          eyebrow: '교수진 삭제',
          title: `${found.professor.name} 교수님을 목록에서 삭제할까요?`,
          body: `<p class="sa-quiet">교수진 카드·프로필·연구분야 카운트에서 함께 빠집니다. 사진 파일은 삭제되지 않습니다.</p>`,
          okText: '삭제'
        });
        if (!ok) return;
        Store.deleteProfessor(id);
        if (window.SSUApp) window.SSUApp.refreshAll();
        refreshToolbarLabels();
        UI.toast('교수진을 삭제했습니다.');
        return;
      }
    }
  }, true);

  /* 다른 탭에서 데이터가 바뀌면 따라갑니다. */
  window.addEventListener('storage', (e) => {
    if (e.key !== A.constants.K_DATA && e.key !== A.constants.K_SESSION) return;
    const authed = Auth.isAuthed();
    if (authed && !document.getElementById(barId)) activate();
    if (!authed && document.getElementById(barId)) deactivate();
    if (window.SSUApp) window.SSUApp.refreshAll();
  });

  /* ---------------------------------------------------------------- 시작 */
  function boot() {
    const link = document.getElementById('adminLoginLink');
    if (link) link.addEventListener('click', (e) => { e.preventDefault(); openLogin(); });

    const params = new URLSearchParams(location.search);
    if (params.get('admin') === 'login' || location.hash === '#admin') {
      setTimeout(openLogin, 220);
      return;
    }
    if (active()) activate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
