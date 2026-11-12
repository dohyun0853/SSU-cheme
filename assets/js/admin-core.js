/* ============================================================================
   숭실대학교 화학공학과 — 관리자 코어 (admin-core.js)
   ----------------------------------------------------------------------------
   index.html 과 admin.html 이 함께 쓰는 공통 모듈입니다. 화면을 그리지 않고,
   아래 다섯 가지만 담당합니다.

     ① 로그인·세션        Auth    — 기본 계정 admin / ssu1967! (보안 탭에서 변경)
     ② 편집 레이어        Store   — data.js 위에 덮어쓰는 localStorage 저장소
     ③ data.js 생성       Store.buildDataJs / download / copy
     ④ GitHub 커밋        Store.pushToGitHub (Contents API)
     ⑤ 공통 UI            UI      — 모달·확인창·토스트·폼(공지/교수진)

   노출: window.SSUAdmin
   ========================================================================== */
(function () {
  'use strict';

  /* ==========================================================================
     0. 저장소 · 유틸
     ========================================================================== */
  const memoryStore = {};
  const LS = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return Object.prototype.hasOwnProperty.call(memoryStore, k) ? memoryStore[k] : null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { memoryStore[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete memoryStore[k]; } }
  };
  const SS = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return LS.get('ss:' + k); } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { LS.set('ss:' + k, v); } },
    del(k) { try { sessionStorage.removeItem(k); } catch (e) { LS.del('ss:' + k); } }
  };

  const K_CRED = 'ssucheme.admin.cred.v1';
  const K_FAIL = 'ssucheme.admin.fail.v1';
  const K_DATA = 'ssucheme.admin.data.v1';
  const K_SESSION = 'ssucheme.admin.session.v1';
  const K_GH = 'ssucheme.admin.gh.v1';

  const SESSION_HOURS = 12;
  const DEFAULT_ID = 'admin';
  const ALT_ID = 'dohyun0853';
  const DEFAULT_PW = 'ssu1967!';
  const SALT = 'ssucheme::admin::v1::';
  const MAX_FAIL = 5;
  const LOCK_MS = 60 * 1000;

  const BOARDS = ['undergrad', 'grad', 'job'];
  const BOARD_LABEL = { undergrad: '학부공지', grad: '대학원공지', job: '취업·인턴십' };
  const BOARD_SOURCE = {
    undergrad: 'http://chemeng.ssu.ac.kr/sub/sub03_01.php',
    grad: 'http://chemeng.ssu.ac.kr/sub/sub03_02.php',
    job: 'http://chemeng.ssu.ac.kr/sub/sub03_04.php'
  };
  const TAGS = ['반도체', '배터리', '바이오', '고분자', '환경'];

  const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const pad2 = (n) => String(n).padStart(2, '0');
  const stamp = (d = new Date()) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  const uid = (prefix) => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ==========================================================================
     1. SHA-256 (UTF-8, 의존성 없음) — 비밀번호 해시 · 내용 지문
     ========================================================================== */
  const K256 = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ]);

  function sha256Hex(input) {
    const bytes = new TextEncoder().encode(String(input));
    const len = bytes.length;
    const buf = new Uint8Array(Math.ceil((len + 9) / 64) * 64);
    buf.set(bytes);
    buf[len] = 0x80;
    const view = new DataView(buf.buffer);
    view.setUint32(buf.length - 8, Math.floor((len * 8) / 4294967296));
    view.setUint32(buf.length - 4, (len * 8) >>> 0);

    const H = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ]);
    const w = new Uint32Array(64);
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));

    for (let off = 0; off < buf.length; off += 64) {
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4);
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K256[i] + w[i]) >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0;
        d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    let out = '';
    for (let i = 0; i < 8; i++) out += H[i].toString(16).padStart(8, '0');
    return out;
  }
  const hash = (v) => sha256Hex(SALT + String(v));

  /* ==========================================================================
     1.5 입력 살균 — DOMPurify (cure53)
     --------------------------------------------------------------------------
     관리자 입력(공지 제목·작성자, 교수 프로필)과 브라우저에 저장된 수정본을
     화면에 넣기 전에 태그를 모두 걷어냅니다. 화면 출력은 app.js가 한 번 더
     HTML 이스케이프하므로 이중 방어입니다. CDN이 막히면 같은 규칙의
     화이트리스트 살균으로 대체합니다.
     ========================================================================== */
  const Sanitizer = {
    lib: null,
    init() {
      this.lib = (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') ? window.DOMPurify : null;
      return !!this.lib;
    },
    /* 텍스트 필드: 실제 HTML 태그가 들어 있을 때만 살균합니다.
       (게시판 제목의 <취준동고동락> 처럼 괄호를 쓴 한글은 그대로 보존) */
    text(value, max) {
      let s = String(value == null ? '' : value);
      if (/<\/?[a-zA-Z][^>]*>/.test(s)) {
        if (!this.lib) this.init();
        if (this.lib) {
          s = this.lib.sanitize(s, { ALLOWED_TAGS: [], ALLOWED_ATTR: [], KEEP_CONTENT: true });
        } else {
          /* DOM 미로드·CDN 차단 시 같은 효과의 폴백: script/style 본문 차단 후 태그 제거 */
          s = s.replace(/<(script|style|iframe|object)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
          s = s.replace(/<\/?[a-zA-Z][^>]*>/g, '');
        }
      }
      s = s.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();
      if (max && s.length > max) s = s.slice(0, max);
      return s;
    },
    /* 링크: http(s)만 허용 (javascript:, data:, vbscript: 차단) */
    url(value) {
      const s = String(value == null ? '' : value).trim();
      if (!s) return '';
      if (!/^https?:\/\//i.test(s)) return '';
      if (/[\s"'<>`]/.test(s)) return '';
      return s;
    },
    /* 여러 줄(학력·연구·경력): 줄 단위로 살균 */
    lines(list) {
      if (!Array.isArray(list)) return [];
      return list.map((v) => this.text(v, 300)).filter(Boolean);
    }
  };
  Sanitizer.init();

  /* ==========================================================================
     2. 원본 데이터 접근 — data.js 는 const 선언이라 window 에 붙지 않습니다.
        같은 전역 스코프에서 직접 이름으로 읽습니다.
     ========================================================================== */
  function g(name) {
    switch (name) {
      case 'DEPT': return typeof DEPT !== 'undefined' ? DEPT : null;
      case 'STATS': return typeof STATS !== 'undefined' ? STATS : null;
      case 'HISTORY': return typeof HISTORY !== 'undefined' ? HISTORY : null;
      case 'RESEARCH_AREAS': return typeof RESEARCH_AREAS !== 'undefined' ? RESEARCH_AREAS : null;
      case 'PROFESSORS': return typeof PROFESSORS !== 'undefined' ? PROFESSORS : null;
      case 'COURSES': return typeof COURSES !== 'undefined' ? COURSES : null;
      case 'GRADUATION': return typeof GRADUATION !== 'undefined' ? GRADUATION : null;
      case 'NOTICES': return typeof NOTICES !== 'undefined' ? NOTICES : null;
      case 'CAREERS': return typeof CAREERS !== 'undefined' ? CAREERS : null;
      case 'GUIDES': return typeof GUIDES !== 'undefined' ? GUIDES : null;
      default: return null;
    }
  }

  const base = {
    DEPT: clone(g('DEPT')),
    STATS: clone(g('STATS')),
    HISTORY: clone(g('HISTORY')),
    RESEARCH_AREAS: clone(g('RESEARCH_AREAS')),
    PROFESSORS: clone(g('PROFESSORS')) || [],
    COURSES: clone(g('COURSES')),
    GRADUATION: clone(g('GRADUATION')),
    NOTICES: clone(g('NOTICES')) || {},
    CAREERS: clone(g('CAREERS')),
    GUIDES: clone(g('GUIDES'))
  };

  function replaceArray(target, next) {
    if (!Array.isArray(target) || !Array.isArray(next)) return;
    target.length = 0;
    next.forEach((item) => target.push(item));
  }
  function noticeArray(board) {
    const N = g('NOTICES');
    if (!N) return null;
    if (!Array.isArray(N[board])) N[board] = [];
    return N[board];
  }

  /* 공지 고유키: 원문 URL(게시글 번호 포함) → 없으면 날짜+제목 지문 */
  function noticeKey(n) {
    if (n.url) return 'u:' + n.url;
    return 'd:' + n.date + '|' + sha256Hex(String(n.title || '')).slice(0, 12);
  }
  function normalizeNotice(n) {
    const o = {
      date: String(n.date || '').slice(0, 10),
      title: Sanitizer.text(n.title, 200),
      author: Sanitizer.text(n.author, 40) || '관리자',
      views: Math.max(0, Number(n.views) || 0),
      pinned: !!n.pinned,
      url: Sanitizer.url(n.url)
    };
    o._id = n._id || noticeKey(o);
    return o;
  }
  function normalizeProfessor(p) {
    return {
      id: p.id || uid('p-'),
      name: Sanitizer.text(p.name, 20),
      title: Sanitizer.text(p.title, 20) || '교수',
      field: Sanitizer.text(p.field, 80),
      tags: Array.isArray(p.tags) ? p.tags.filter((t) => TAGS.indexOf(t) >= 0) : [],
      office: Sanitizer.text(p.office, 40),
      labName: Sanitizer.text(p.labName, 60),
      labRoom: Sanitizer.text(p.labRoom, 40),
      tel: Sanitizer.text(p.tel, 24),
      email: Sanitizer.text(p.email, 60),
      labUrl: Sanitizer.url(p.labUrl),
      photo: Sanitizer.url(p.photo) || Sanitizer.text(p.photo, 120),
      edu: Sanitizer.lines(p.edu),
      research: Sanitizer.lines(p.research),
      career: Sanitizer.lines(p.career)
    };
  }

  function ensureIds() {
    BOARDS.forEach((b) => {
      const arr = noticeArray(b);
      if (!arr) return;
      const seen = Object.create(null);
      for (let i = 0; i < arr.length; i++) {
        const n = normalizeNotice(arr[i]);
        if (seen[n._id]) n._id = n._id + '#' + i;
        seen[n._id] = true;
        arr[i] = n;
      }
    });
    const profs = g('PROFESSORS');
    if (profs) for (let i = 0; i < profs.length; i++) if (!profs[i].id) profs[i].id = uid('p-');
  }

  /* ==========================================================================
     3. Auth — 로그인 · 세션 · 계정 변경
     ========================================================================== */
  function readCred() {
    try {
      const raw = LS.get(K_CRED);
      if (!raw) return null;
      const o = JSON.parse(raw);
      return o && o.pwHash ? o : null;
    } catch (e) { return null; }
  }
  function activeCred() {
    const c = readCred();
    if (c) return { id: c.id || DEFAULT_ID, pwHash: c.pwHash, custom: true, updatedAt: c.updatedAt || null };
    return { id: DEFAULT_ID, pwHash: hash(DEFAULT_PW), custom: false, updatedAt: null };
  }
  function readFail() {
    try { return JSON.parse(LS.get(K_FAIL) || '{}') || {}; } catch (e) { return {}; }
  }
  function writeFail(o) { LS.set(K_FAIL, JSON.stringify(o)); }

  const Auth = {
    defaultId: DEFAULT_ID,
    defaultAlias: ALT_ID,
    defaultPw: DEFAULT_PW,
    sessionHours: SESSION_HOURS,

    isDefault() { return !readCred(); },
    currentId() { return activeCred().id; },
    updatedAt() { return activeCred().updatedAt; },

    lockRemaining() {
      const f = readFail();
      if (f.lockUntil && f.lockUntil > Date.now()) return Math.ceil((f.lockUntil - Date.now()) / 1000);
      return 0;
    },

    login(id, pw) {
      const lock = this.lockRemaining();
      if (lock > 0) return { ok: false, code: 'locked', error: `로그인 시도가 많아 잠시 잠겼습니다. ${lock}초 뒤 다시 시도하세요.` };

      const cred = activeCred();
      const inputId = String(id == null ? '' : id).trim();
      const ids = cred.custom ? [cred.id] : [DEFAULT_ID, ALT_ID];
      const idOk = ids.some((x) => x.toLowerCase() === inputId.toLowerCase());
      const pwOk = hash(String(pw == null ? '' : pw)) === cred.pwHash;

      if (idOk && pwOk) {
        writeFail({ count: 0, lockUntil: 0 });
        this.start(cred.id);
        return { ok: true };
      }
      const f = readFail();
      const count = (f.count || 0) + 1;
      const next = { count, lockUntil: count >= MAX_FAIL ? Date.now() + LOCK_MS : 0 };
      if (next.lockUntil) next.count = 0;
      writeFail(next);
      return {
        ok: false,
        code: 'bad',
        error: next.lockUntil
          ? `비밀번호를 ${MAX_FAIL}회 틀렸습니다. 1분 뒤 다시 시도하세요.`
          : `아이디 또는 비밀번호가 맞지 않습니다. (${MAX_FAIL - count + 1}회 남음)`
      };
    },

    start(id) {
      const now = Date.now();
      const payload = { id: id, at: now, exp: now + SESSION_HOURS * 3600 * 1000 };
      try { LS.set(K_SESSION, JSON.stringify(payload)); } catch (e) { /* noop */ }
    },
    session() {
      try {
        const raw = LS.get(K_SESSION);
        if (!raw) return null;
        const s = JSON.parse(raw);
        if (!s || !s.exp || s.exp < Date.now()) { LS.del(K_SESSION); return null; }
        return s;
      } catch (e) { return null; }
    },
    isAuthed() { return !!this.session(); },
    sessionLeftMin() {
      const s = this.session();
      return s ? Math.max(0, Math.round((s.exp - Date.now()) / 60000)) : 0;
    },
    logout() { LS.del(K_SESSION); },

    change(id, pw, currentPw, confirmPw) {
      const cred = activeCred();
      if (hash(String(currentPw == null ? '' : currentPw)) !== cred.pwHash) {
        return { ok: false, field: 'currentPw', error: '현재 비밀번호가 맞지 않습니다.' };
      }
      const nextId = String(id == null ? '' : id).trim() || cred.id;
      const nextPw = String(pw == null ? '' : pw);
      if (!/^[A-Za-z0-9_.-]{3,20}$/.test(nextId)) {
        return { ok: false, field: 'id', error: '아이디는 영문·숫자·._- 3~20자로 입력하세요.' };
      }
      if (nextPw) {
        if (nextPw.length < 8) return { ok: false, field: 'pw', error: '비밀번호는 8자 이상으로 입력하세요.' };
        if (!/[A-Za-z]/.test(nextPw) || !/[0-9]/.test(nextPw)) {
          return { ok: false, field: 'pw', error: '영문과 숫자를 각각 하나 이상 넣어 주세요.' };
        }
        if (nextPw !== String(confirmPw == null ? '' : confirmPw)) {
          return { ok: false, field: 'confirmPw', error: '비밀번호 확인이 일치하지 않습니다.' };
        }
      }
      const payload = {
        id: nextId,
        pwHash: nextPw ? hash(nextPw) : cred.pwHash,
        updatedAt: new Date().toISOString()
      };
      LS.set(K_CRED, JSON.stringify(payload));
      this.start(nextId);
      return { ok: true, changed: { id: nextId, pw: !!nextPw } };
    },

    resetToDefault() {
      LS.del(K_CRED);
      LS.del(K_FAIL);
    }
  };

  /* ==========================================================================
     4. Store — 편집 레이어 + data.js 생성 + GitHub 커밋
     ========================================================================== */
  const Store = {
    boards: BOARDS,
    boardLabel: BOARD_LABEL,
    boardSource: BOARD_SOURCE,
    tags: TAGS,

    /* ---- 읽기 ---- */
    professors() { return g('PROFESSORS') || []; },
    stats() { return g('STATS') || []; },
    notices(board) { return noticeArray(board) || []; },

    localSnapshot() {
      const raw = LS.get(K_DATA);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch (e) { return null; }
    },
    hasLocal() { return !!this.localSnapshot(); },

    allNotices() {
      const out = [];
      BOARDS.forEach((b) => this.notices(b).forEach((n) => out.push(Object.assign({ _board: b }, n))));
      return out;
    },
    noticeCount() { return BOARDS.reduce((s, b) => s + this.notices(b).length, 0); },

    findNotice(id) {
      for (let i = 0; i < BOARDS.length; i++) {
        const b = BOARDS[i];
        const arr = this.notices(b);
        const idx = arr.findIndex((n) => n._id === id);
        if (idx >= 0) return { board: b, notice: arr[idx], index: idx };
      }
      return null;
    },
    findProfessor(id) {
      const list = this.professors();
      const idx = list.findIndex((p) => p.id === id);
      return idx >= 0 ? { professor: list[idx], index: idx } : null;
    },

    /* ---- 수정 ---- */
    addNotice(board, fields) {
      const b = BOARDS.indexOf(board) >= 0 ? board : 'undergrad';
      const n = normalizeNotice(Object.assign({
        date: new Date().toISOString().slice(0, 10),
        author: '관리자',
        views: 0,
        pinned: false,
        url: BOARD_SOURCE[b]
      }, fields));
      n._id = uid('n-');
      this.notices(b).unshift(n);
      this.save();
      return n;
    },

    updateNotice(id, fields) {
      const found = this.findNotice(id);
      if (!found) return null;
      const arr = this.notices(found.board);
      const next = normalizeNotice(Object.assign({}, found.notice, fields));
      next._id = found.notice._id;
      const targetBoard = BOARDS.indexOf(fields && fields.board) >= 0 ? fields.board : found.board;
      if (targetBoard !== found.board) {
        arr.splice(found.index, 1);
        this.notices(targetBoard).unshift(next);
      } else {
        arr[found.index] = next;
      }
      this.save();
      return next;
    },

    deleteNotice(id) {
      const found = this.findNotice(id);
      if (!found) return false;
      this.notices(found.board).splice(found.index, 1);
      this.save();
      return true;
    },

    togglePin(id) {
      const found = this.findNotice(id);
      if (!found) return null;
      found.notice.pinned = !found.notice.pinned;
      this.save();
      return found.notice.pinned;
    },

    addProfessor(fields) {
      const p = normalizeProfessor(Object.assign({ id: uid('p-'), title: '교수' }, fields));
      if (!fields || !fields.id) p.id = uid('p-');
      this.professors().push(p);
      this.syncStats();
      this.save();
      return p;
    },

    updateProfessor(id, fields) {
      const found = this.findProfessor(id);
      if (!found) return null;
      const merged = normalizeProfessor(Object.assign({}, found.professor, fields));
      merged.id = found.professor.id;
      this.professors()[found.index] = merged;
      this.save();
      return merged;
    },

    deleteProfessor(id) {
      const found = this.findProfessor(id);
      if (!found) return false;
      this.professors().splice(found.index, 1);
      this.syncStats();
      this.save();
      return true;
    },

    /* 상단 지표의 '전임교원' 숫자를 실제 인원에 맞춥니다. */
    syncStats() {
      const stats = this.stats();
      const target = stats.find((s) => /전임교원/.test(s.label));
      if (target) target.value = String(this.professors().length);
    },

    /* ---- 저장 / 초기화 ---- */
    save() {
      const snapshot = {
        v: 1,
        savedAt: Date.now(),
        professors: clone(this.professors()),
        notices: {},
        stats: clone(this.stats())
      };
      BOARDS.forEach((b) => { snapshot.notices[b] = clone(this.notices(b)); });
      LS.set(K_DATA, JSON.stringify(snapshot));
      document.dispatchEvent(new CustomEvent('ssuadmin:data', { detail: { source: 'store' } }));
      return snapshot;
    },

    savedAt() {
      const s = this.localSnapshot();
      return s && s.savedAt ? new Date(s.savedAt) : null;
    },

    /* localStorage 의 수정본을 현재 화면 데이터에 반영 (부팅 시 1회) */
    boot() {
      const s = this.localSnapshot();
      if (s && s.v === 1) {
        try {
          if (Array.isArray(s.professors)) replaceArray(g('PROFESSORS'), s.professors.map(normalizeProfessor));
          if (s.notices) BOARDS.forEach((b) => {
            if (Array.isArray(s.notices[b])) replaceArray(noticeArray(b), s.notices[b].map(normalizeNotice));
          });
          if (Array.isArray(s.stats) && s.stats.length) replaceArray(g('STATS'), s.stats);
        } catch (e) { console.warn('[SSUAdmin] 저장본 복원 실패', e); }
      }
      ensureIds();
      document.dispatchEvent(new CustomEvent('ssuadmin:boot'));
    },

    resetLocal() {
      LS.del(K_DATA);
      if (Array.isArray(base.PROFESSORS)) replaceArray(g('PROFESSORS'), clone(base.PROFESSORS));
      if (base.NOTICES) BOARDS.forEach((b) => replaceArray(noticeArray(b), clone(base.NOTICES[b] || [])));
      if (Array.isArray(base.STATS)) replaceArray(g('STATS'), clone(base.STATS));
      ensureIds();
      document.dispatchEvent(new CustomEvent('ssuadmin:data', { detail: { source: 'reset' } }));
    },

    /* ---- data.js 생성 ---- */
    exportObject() {
      const notices = {};
      BOARDS.forEach((b) => {
        notices[b] = this.notices(b).map((n) => {
          const clean = { date: n.date, title: n.title, author: n.author, views: n.views, pinned: n.pinned, url: n.url };
          return clean;
        });
      });
      return {
        DEPT: clone(g('DEPT')),
        STATS: clone(g('STATS')),
        HISTORY: clone(g('HISTORY')),
        RESEARCH_AREAS: clone(g('RESEARCH_AREAS')),
        PROFESSORS: clone(this.professors()),
        COURSES: clone(g('COURSES')),
        GRADUATION: clone(g('GRADUATION')),
        NOTICES: notices,
        CAREERS: clone(g('CAREERS')),
        GUIDES: clone(g('GUIDES'))
      };
    },

    buildDataJs(at = new Date()) {
      const D = this.exportObject();
      const lines = [];
      lines.push('/* ============================================================================');
      lines.push('   숭실대학교 화학공학과 — 학과 데이터 파일 (data.js)');
      lines.push('   ----------------------------------------------------------------------------');
      lines.push('   이 파일만 고치면 홈페이지 내용이 바뀝니다. index.html / app.js 는 건드리지 않아도 됩니다.');
      lines.push('   데이터 출처: 숭실대학교 화학공학과 공식 홈페이지(chemeng.ssu.ac.kr), 2026년 11월 수집');
      lines.push('   관리자 포털(admin.html)에서 내려받거나 GitHub에 커밋한 파일입니다.');
      lines.push(`   최종 반영: ${stamp(at)} (KST) · 공지 ${this.noticeCount()}건 · 교수진 ${this.professors().length}명`);
      lines.push('   자세한 수정 방법은 같은 폴더의 "AI_유지보수_가이드.md" 참고.');
      lines.push('   ============================================================================ */');
      lines.push('');

      const blocks = [
        ['1. 학과 기본 정보', 'DEPT', D.DEPT],
        ['주요 지표 (홈 상단 카운터)', 'STATS', D.STATS],
        ['2. 연혁 — 학과소개 타임라인', 'HISTORY', D.HISTORY],
        ['3. 연구 분야 — 연구 키워드 필터와 1:1로 연결됩니다.\n      (교수진 tags 의 값과 정확히 같은 이름을 써야 카운트가 맞습니다)', 'RESEARCH_AREAS', D.RESEARCH_AREAS],
        ['4. 교수진 — 14명 전임교원. photo 는 assets/faculty/ 파일명입니다.', 'PROFESSORS', D.PROFESSORS],
        ['5. 교과과정 — 4개 학년 × 2학기', 'COURSES', D.COURSES],
        ['6. 졸업요건', 'GRADUATION', D.GRADUATION],
        ['7. 공지사항 — 게시판별 최신순. pinned 는 중요공지', 'NOTICES', D.NOTICES],
        ['8. 진로 — 졸업생 진출 분야', 'CAREERS', D.CAREERS],
        ['9. 학사 안내 카드', 'GUIDES', D.GUIDES]
      ];

      blocks.forEach(([label, name, value]) => {
        lines.push('/* ----------------------------------------------------------------------------');
        label.split('\n').forEach((l) => lines.push('   ' + l));
        lines.push('   ---------------------------------------------------------------------------- */');
        lines.push(`const ${name} = ` + printable(value) + ';');
        lines.push('');
      });

      return lines.join('\n').replace(/\n{3,}/g, '\n\n');
    },

    contentHash(text) { return sha256Hex(text); },

    applyToPage() {
      document.dispatchEvent(new CustomEvent('ssuadmin:data', { detail: { source: 'apply' } }));
    },

    /* ---- 내려받기 / 복사 ---- */
    download(filename, text, mime) {
      const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 400);
    },
    downloadDataJs() {
      this.download('data.js', this.buildDataJs(), 'text/javascript;charset=utf-8');
    },
    downloadBackupJson() {
      const payload = {
        exportedAt: new Date().toISOString(),
        site: '숭실대학교 화학공학과',
        notices: this.noticeCount(),
        professors: this.professors().length,
        data: this.exportObject()
      };
      this.download(`학과데이터_백업_${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
    },
    async copyDataJs() {
      const text = this.buildDataJs();
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        ta.remove();
        return ok;
      }
    },

    /* ---- GitHub Contents API ---- */
    gh: {
      owner: 'dohyun0853',
      repo: 'SSU-cheme',
      path: 'data.js',
      branch: 'main',

      settings() {
        try { return JSON.parse(SS.get(K_GH) || 'null') || null; } catch (e) { return null; }
      },
      saveSettings(o) { SS.set(K_GH, JSON.stringify(o)); },

      headers(token) {
        return {
          Accept: 'application/vnd.github+json',
          Authorization: 'Bearer ' + token,
          'X-GitHub-Api-Version': '2022-11-28'
        };
      },

      url(opts) {
        const path = String(opts.path || 'data.js').replace(/^\/+/, '');
        return `https://api.github.com/repos/${encodeURIComponent(opts.owner)}/${encodeURIComponent(opts.repo)}/contents/${path}`;
      },

      /* ---- Octokit (octokit/octokit.js) — 가능하면 공식 클라이언트로 커밋 ---- */
      _octokit: null,
      _octokitToken: null,
      _octokitTried: false,

      async client(token) {
        if (this._octokit && this._octokitToken === token) return this._octokit;
        if (this._octokitTried && this._octokitToken === token) return this._octokit;
        this._octokitTried = true;
        this._octokitToken = token;
        try {
          const mod = await import('https://cdn.jsdelivr.net/npm/octokit@4/+esm');
          const Ctor = mod && (mod.Octokit || (mod.default && mod.default.Octokit));
          this._octokit = Ctor ? new Ctor({ auth: token, request: { retries: 2 } }) : null;
        } catch (e) {
          this._octokit = null;
        }
        return this._octokit;
      },

      async readOctokit(client, opts) {
        try {
          const res = await client.rest.repos.getContent({
            owner: opts.owner, repo: opts.repo, path: String(opts.path).replace(/^\/+/, ''), ref: opts.branch || 'main'
          });
          const d = res.data;
          if (Array.isArray(d)) return { ok: false, status: 0, message: '경로가 폴더입니다. 파일 경로를 지정하세요.', via: 'octokit' };
          return { ok: true, status: 200, sha: d.sha, size: d.size, content: b64ToUtf8(d.content || ''), via: 'octokit' };
        } catch (err) {
          if (err && err.status === 404) return { ok: true, missing: true, status: 404, via: 'octokit' };
          return { ok: false, status: (err && err.status) || 0, message: (err && err.message) || '원격 파일을 읽지 못했습니다.', via: 'octokit' };
        }
      },

      async pushOctokit(client, opts, content, message) {
        const remote = await this.readOctokit(client, opts);
        if (!remote.ok) return remote;
        if (!remote.missing && remote.content === content) {
          return { ok: true, unchanged: true, sha: remote.sha, via: 'octokit' };
        }
        try {
          const params = {
            owner: opts.owner,
            repo: opts.repo,
            path: String(opts.path).replace(/^\/+/, ''),
            message: message || 'chore(data): 관리자 포털에서 학과 데이터 갱신',
            content: utf8ToB64(content),
            branch: opts.branch || 'main'
          };
          if (remote.sha) params.sha = remote.sha;
          const res = await client.rest.repos.createOrUpdateFileContents(params);
          const d = res.data || {};
          return {
            ok: true,
            status: res.status,
            sha: d.content && d.content.sha,
            commitSha: d.commit && d.commit.sha,
            commitUrl: d.commit && d.commit.html_url,
            via: 'octokit'
          };
        } catch (err) {
          return {
            ok: false,
            status: (err && err.status) || 0,
            message: (err && err.message) || '커밋에 실패했습니다.',
            conflict: !!(err && err.status === 409),
            via: 'octokit'
          };
        }
      },

      /* ---- 기본 경로: REST Contents API (Octokit CDN이 막힌 경우) ---- */
      async read(opts, token) {
        const client = await this.client(token);
        if (client) return this.readOctokit(client, opts);
        return this.readRest(opts, token);
      },

      async readRest(opts, token) {
        const res = await fetch(this.url(opts) + '?ref=' + encodeURIComponent(opts.branch || 'main'), {
          headers: this.headers(token),
          cache: 'no-store'
        });
        if (res.status === 404) return { ok: true, missing: true, status: 404, via: 'rest' };
        const body = await res.json().catch(() => ({}));
        if (!res.ok) return { ok: false, status: res.status, message: (body && body.message) || '원격 파일을 읽지 못했습니다.', via: 'rest' };
        return {
          ok: true,
          status: res.status,
          sha: body.sha,
          size: body.size,
          content: body.content ? b64ToUtf8(body.content) : '',
          via: 'rest'
        };
      },

      async push(opts, token, content, message) {
        const client = await this.client(token);
        if (client) return this.pushOctokit(client, opts, content, message);
        return this.pushRest(opts, token, content, message);
      },

      async pushRest(opts, token, content, message) {
        const remote = await this.readRest(opts, token);
        if (!remote.ok) return remote;
        if (!remote.missing && remote.content === content) {
          return { ok: true, unchanged: true, sha: remote.sha, via: 'rest' };
        }
        const payload = {
          message: message || 'chore(data): 관리자 포털에서 학과 데이터 갱신',
          content: utf8ToB64(content),
          branch: opts.branch || 'main'
        };
        if (remote.sha) payload.sha = remote.sha;
        const res = await fetch(this.url(opts), {
          method: 'PUT',
          headers: Object.assign({ 'Content-Type': 'application/json' }, this.headers(token)),
          body: JSON.stringify(payload)
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          return {
            ok: false,
            status: res.status,
            message: (body && body.message) || '커밋에 실패했습니다.',
            conflict: res.status === 409,
            via: 'rest'
          };
        }
        return {
          ok: true,
          status: res.status,
          sha: body.content && body.content.sha,
          commitSha: body.commit && body.commit.sha,
          commitUrl: body.commit && body.commit.html_url,
          via: 'rest'
        };
      }
    }
  };

  /* ---- base64 (UTF-8) ---- */
  function utf8ToB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }
  function b64ToUtf8(b64) {
    const bin = atob(String(b64).replace(/\s/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  /* data.js 본문: JSON 을 그대로 쓰되 키의 따옴표는 떼어 원본 파일과 같은 모양으로 */
  function printable(value) {
    const json = JSON.stringify(value == null ? null : value, null, 2);
    return json.replace(/^(\s*)"([A-Za-z_$][\w$]*)":/gm, '$1$2:');
  }

  /* ==========================================================================
     5. UI — 토스트 · 모달 · 확인창 · 폼
     ========================================================================== */
  const UI = {
    icons() { try { if (window.lucide) window.lucide.createIcons(); } catch (e) { /* noop */ } },

    toast(message, kind) {
      let host = document.getElementById('saToastHost');
      if (!host) {
        host = document.createElement('div');
        host.id = 'saToastHost';
        host.className = 'sa-toast-host';
        document.body.appendChild(host);
      }
      const el = document.createElement('div');
      el.className = 'sa-toast' + (kind ? ' is-' + kind : '');
      el.setAttribute('role', 'status');
      el.innerHTML = `<i data-lucide="${kind === 'error' ? 'alert-circle' : kind === 'warn' ? 'alert-triangle' : 'check'}"></i><span>${esc(message)}</span>`;
      host.appendChild(el);
      UI.icons();
      requestAnimationFrame(() => el.classList.add('is-in'));
      setTimeout(() => {
        el.classList.remove('is-in');
        setTimeout(() => el.remove(), 260);
      }, kind === 'error' ? 4600 : 3200);
    },

    modalHost() {
      let host = document.getElementById('saModalHost');
      if (!host) {
        host = document.createElement('div');
        host.id = 'saModalHost';
        host.className = 'sa-modal-host';
        document.body.appendChild(host);
      }
      host.hidden = false;
      return host;
    },

    close() {
      const host = document.getElementById('saModalHost');
      if (!host) return;
      const panel = host.querySelector('.sa-modal');
      if (panel) {
        panel.classList.remove('is-in');
        const opener = panel._opener;
        setTimeout(() => {
          host.innerHTML = '';
          host.hidden = true;
          document.body.classList.remove('sa-locked');
          if (opener && opener.focus) opener.focus();
        }, 160);
      } else {
        host.innerHTML = '';
        host.hidden = true;
      }
    },

    open(opts) {
      const o = opts || {};
      const host = UI.modalHost();
      const opener = document.activeElement;
      host.innerHTML = `
        <div class="sa-modal${o.wide ? ' is-wide' : ''}${o.narrow ? ' is-narrow' : ''}" role="dialog" aria-modal="true" aria-label="${esc(o.title || '관리자')}">
          <div class="sa-modal-backdrop" data-sa-close></div>
          <div class="sa-modal-panel">
            <header class="sa-modal-head">
              <div>
                ${o.eyebrow ? `<p class="sa-eyebrow">${esc(o.eyebrow)}</p>` : ''}
                <h2>${esc(o.title || '')}</h2>
                ${o.desc ? `<p class="sa-modal-desc">${o.desc}</p>` : ''}
              </div>
              <button type="button" class="sa-modal-x" data-sa-close aria-label="닫기">
                <i data-lucide="x"></i>
              </button>
            </header>
            <div class="sa-modal-body">${o.body || ''}</div>
            ${o.footer === false ? '' : `<footer class="sa-modal-foot">${o.footer || ''}</footer>`}
          </div>
        </div>`;
      const modal = host.firstElementChild;
      modal._opener = opener;
      document.body.classList.add('sa-locked');
      modal.querySelectorAll('[data-sa-close]').forEach((el) => el.addEventListener('click', () => UI.close()));
      UI.icons();
      requestAnimationFrame(() => modal.classList.add('is-in'));
      const first = modal.querySelector('input:not([type=hidden]), textarea, select');
      if (first) setTimeout(() => { try { first.focus(); } catch (e) { /* noop */ } }, 120);
      return modal;
    },

    confirm(opts) {
      const o = opts || {};
      return new Promise((resolve) => {
        const modal = UI.open({
          narrow: true,
          eyebrow: o.eyebrow || '확인',
          title: o.title || '계속할까요?',
          desc: o.desc || '',
          body: o.body || '',
          footer: `
            <button type="button" class="sa-btn" data-sa-cancel>${esc(o.cancelText || '취소')}</button>
            <button type="button" class="sa-btn ${o.danger ? 'sa-btn-danger' : 'sa-btn-primary'}" data-sa-ok>${esc(o.okText || '확인')}</button>`
        });
        let done = false;
        const finish = (v) => { if (done) return; done = true; UI.close(); resolve(v); };
        modal.querySelector('[data-sa-ok]').addEventListener('click', () => finish(true));
        modal.querySelector('[data-sa-cancel]').addEventListener('click', () => finish(false));
        modal.querySelectorAll('[data-sa-close]').forEach((el) => el.addEventListener('click', () => finish(false)));
        modal.addEventListener('sa-dismissed', () => finish(false));
      });
    },

    /* ---------------- 공지 폼 ---------------- */
    noticeForm(n, opts) {
      const o = opts || {};
      const board = o.board || (n && n._board) || 'undergrad';
      const isNew = !n;
      const v = n || { date: new Date().toISOString().slice(0, 10), title: '', author: '관리자', views: 0, pinned: false, url: '' };
      return `
        <form class="sa-form" data-sa-form="notice" novalidate>
          <div class="sa-field-row">
            <label class="sa-field">
              <span class="sa-label">게시판 <em>필수</em></span>
              <select name="board" class="sa-input">
                ${BOARDS.map((b) => `<option value="${b}"${b === board ? ' selected' : ''}>${BOARD_LABEL[b]}</option>`).join('')}
              </select>
            </label>
            <label class="sa-field">
              <span class="sa-label">등록일 <em>필수</em></span>
              <input name="date" type="date" class="sa-input" value="${esc(v.date)}" required>
            </label>
            <label class="sa-field sa-field--sm">
              <span class="sa-label">조회수</span>
              <input name="views" type="number" min="0" step="1" class="sa-input" value="${esc(v.views)}">
            </label>
          </div>

          <label class="sa-field">
            <span class="sa-label">제목 <em>필수</em></span>
            <input name="title" type="text" class="sa-input" maxlength="200" value="${esc(v.title)}" placeholder="예: 2026-2학기 수강신청 정정 기간 안내" required>
            <span class="sa-hint">학과 홈페이지 게시판 제목과 같게 적으면 관리가 쉽습니다. (최대 200자)</span>
          </label>

          <div class="sa-field-row">
            <label class="sa-field">
              <span class="sa-label">작성자</span>
              <input name="author" type="text" class="sa-input" maxlength="40" value="${esc(v.author || '관리자')}">
            </label>
            <label class="sa-field sa-field--grow">
              <span class="sa-label">원문 링크</span>
              <input name="url" type="url" class="sa-input" value="${esc(v.url)}" placeholder="http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=…">
              <span class="sa-hint">비워 두면 게시판 첫 페이지로 연결됩니다.</span>
            </label>
          </div>

          <label class="sa-check">
            <input name="pinned" type="checkbox"${v.pinned ? ' checked' : ''}>
            <span><strong>중요 공지로 고정</strong><span>목록 맨 위에 '중요' 표지와 함께 고정됩니다.</span></span>
          </label>

          <p class="sa-form-error" data-sa-error hidden></p>
          <div class="sa-form-actions">
            <button type="button" class="sa-btn" data-sa-cancel>취소</button>
            <button type="submit" class="sa-btn sa-btn-primary">${isNew ? '공지 등록' : '변경 저장'}</button>
          </div>
        </form>`;
    },

    readNoticeForm(form) {
      const fd = new FormData(form);
      const fields = {
        board: String(fd.get('board') || 'undergrad'),
        date: String(fd.get('date') || '').trim(),
        title: String(fd.get('title') || '').trim(),
        author: String(fd.get('author') || '관리자').trim() || '관리자',
        views: Math.max(0, parseInt(fd.get('views'), 10) || 0),
        url: String(fd.get('url') || '').trim(),
        pinned: !!form.querySelector('[name=pinned]').checked
      };
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) return { error: '등록일을 YYYY-MM-DD 형식으로 선택하세요.', field: 'date' };
      if (!fields.title) return { error: '제목을 입력하세요.', field: 'title' };
      if (fields.title.length > 200) return { error: '제목은 200자 이내로 입력하세요.', field: 'title' };
      if (fields.url && !/^https?:\/\//i.test(fields.url)) return { error: '링크는 http:// 또는 https:// 로 시작해야 합니다.', field: 'url' };
      if (!fields.url) fields.url = BOARD_SOURCE[fields.board];
      return { fields };
    },

    /* ---------------- 교수진 폼 ---------------- */
    professorForm(p) {
      const isNew = !p;
      const v = p || { name: '', title: '교수', field: '', tags: [], office: '', labName: '', labRoom: '', tel: '', email: '', labUrl: '', photo: '', edu: [], research: [], career: [] };
      const lines = (arr) => (arr || []).join('\n');
      const year = new Date().getFullYear();
      return `
        <form class="sa-form" data-sa-form="professor" novalidate>
          <div class="sa-field-row">
            <label class="sa-field sa-field--sm">
              <span class="sa-label">성함 <em>필수</em></span>
              <input name="name" type="text" class="sa-input" maxlength="20" value="${esc(v.name)}" placeholder="홍길동" required>
            </label>
            <label class="sa-field sa-field--sm">
              <span class="sa-label">직위</span>
              <select name="title" class="sa-input">
                ${['교수', '부교수', '조교수', '조교수(교육중점)', '부교수(특별임무중점)', '명예교수', '초빙교수'].map((t) => `<option${t === v.title ? ' selected' : ''}>${t}</option>`).join('')}
              </select>
            </label>
            <label class="sa-field sa-field--grow">
              <span class="sa-label">전문 분야</span>
              <input name="field" type="text" class="sa-input" maxlength="80" value="${esc(v.field)}" placeholder="예: 촉매공학, 반도체환경">
            </label>
          </div>

          <div class="sa-field">
            <span class="sa-label">연구 분야 태그 <em>복수 선택</em></span>
            <div class="sa-tags">
              ${TAGS.map((t) => `
                <label class="sa-tag">
                  <input type="checkbox" name="tags" value="${t}"${(v.tags || []).indexOf(t) >= 0 ? ' checked' : ''}>
                  <span>${t}</span>
                </label>`).join('')}
            </div>
            <span class="sa-hint">홈페이지 '연구분야' 카운트와 '교수진·연구실' 필터가 이 태그로 계산됩니다.</span>
          </div>

          <div class="sa-field-row">
            <label class="sa-field">
              <span class="sa-label">교수실</span>
              <input name="office" type="text" class="sa-input" maxlength="40" value="${esc(v.office)}" placeholder="형남공학관 904호">
            </label>
            <label class="sa-field">
              <span class="sa-label">연구실 이름</span>
              <input name="labName" type="text" class="sa-input" maxlength="60" value="${esc(v.labName)}" placeholder="환경생물공학 연구실">
            </label>
            <label class="sa-field">
              <span class="sa-label">연구실 호수</span>
              <input name="labRoom" type="text" class="sa-input" maxlength="40" value="${esc(v.labRoom)}" placeholder="형남공학관 915호">
            </label>
          </div>

          <div class="sa-field-row">
            <label class="sa-field">
              <span class="sa-label">전화</span>
              <input name="tel" type="text" class="sa-input" maxlength="24" value="${esc(v.tel)}" placeholder="02-820-0611">
            </label>
            <label class="sa-field">
              <span class="sa-label">이메일</span>
              <input name="email" type="email" class="sa-input" maxlength="60" value="${esc(v.email)}" placeholder="name@ssu.ac.kr">
            </label>
            <label class="sa-field sa-field--grow">
              <span class="sa-label">연구실 홈페이지</span>
              <input name="labUrl" type="url" class="sa-input" value="${esc(v.labUrl)}" placeholder="https://…">
            </label>
          </div>

          <label class="sa-field">
            <span class="sa-label">사진 경로</span>
            <input name="photo" type="text" class="sa-input" value="${esc(v.photo)}" placeholder="assets/faculty/홍길동.jpg">
            <span class="sa-hint">사진 파일을 assets/faculty/ 에 올린 뒤 파일명을 적습니다. 비워 두면 이름 첫 글자 모노그램이 표시됩니다.</span>
          </label>

          <div class="sa-field-row sa-field-row--stack">
            <label class="sa-field">
              <span class="sa-label">학력 <em>줄마다 한 항목</em></span>
              <textarea name="edu" class="sa-textarea" rows="3" placeholder="학사 · 숭실대학교 화학공학전공 (1990)">${esc(lines(v.edu))}</textarea>
            </label>
            <label class="sa-field">
              <span class="sa-label">연구 내용 <em>줄마다 한 항목</em></span>
              <textarea name="research" class="sa-textarea" rows="4" placeholder="촉매 반응 공정 설계">${esc(lines(v.research))}</textarea>
            </label>
            <label class="sa-field">
              <span class="sa-label">주요 경력 <em>줄마다 한 항목</em></span>
              <textarea name="career" class="sa-textarea" rows="3" placeholder="${year} ~ 현재 숭실대학교 화학공학과 교수">${esc(lines(v.career))}</textarea>
            </label>
          </div>

          <p class="sa-form-error" data-sa-error hidden></p>
          <div class="sa-form-actions">
            <button type="button" class="sa-btn" data-sa-cancel>취소</button>
            <button type="submit" class="sa-btn sa-btn-primary">${isNew ? '교수진 추가' : '변경 저장'}</button>
          </div>
        </form>`;
    },

    readProfessorForm(form) {
      const fd = new FormData(form);
      const lines = (name) => String(fd.get(name) || '').split('\n').map((s) => s.trim()).filter(Boolean);
      const fields = {
        name: String(fd.get('name') || '').trim(),
        title: String(fd.get('title') || '교수'),
        field: String(fd.get('field') || '').trim(),
        tags: Array.from(form.querySelectorAll('[name=tags]:checked')).map((el) => el.value),
        office: String(fd.get('office') || '').trim(),
        labName: String(fd.get('labName') || '').trim(),
        labRoom: String(fd.get('labRoom') || '').trim(),
        tel: String(fd.get('tel') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        labUrl: String(fd.get('labUrl') || '').trim(),
        photo: String(fd.get('photo') || '').trim(),
        edu: lines('edu'),
        research: lines('research'),
        career: lines('career')
      };
      if (!fields.name) return { error: '성함을 입력하세요.', field: 'name' };
      if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return { error: '이메일 형식을 확인하세요.', field: 'email' };
      if (fields.labUrl && !/^https?:\/\//i.test(fields.labUrl)) return { error: '홈페이지 주소는 http:// 또는 https:// 로 시작해야 합니다.', field: 'labUrl' };
      return { fields };
    }
  };

  /* Esc 로 모달 닫기 (확인창은 sa-dismissed 로 결과를 정리합니다) */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const host = document.getElementById('saModalHost');
    if (!host || !host.firstElementChild) return;
    host.firstElementChild.dispatchEvent(new CustomEvent('sa-dismissed'));
    UI.close();
  });

  /* ==========================================================================
     6. 내보내기
     ========================================================================== */
  window.SSUAdmin = {
    version: '1.0.0',
    Auth: Auth,
    Store: Store,
    UI: UI,
    Sanitizer: Sanitizer,
    sha256: sha256Hex,
    hash: hash,
    base: base,
    esc: esc,
    clone: clone,
    uid: uid,
    stamp: stamp,
    constants: {
      BOARDS: BOARDS,
      BOARD_LABEL: BOARD_LABEL,
      BOARD_SOURCE: BOARD_SOURCE,
      TAGS: TAGS,
      DEFAULT_ID: DEFAULT_ID,
      DEFAULT_PW: DEFAULT_PW,
      SESSION_HOURS: SESSION_HOURS,
      K_DATA: K_DATA,
      K_CRED: K_CRED,
      K_SESSION: K_SESSION,
      K_GH: K_GH
    }
  };

  /* 저장본을 화면 데이터에 반영 (app.js 부팅 전) */
  Store.boot();
})();
