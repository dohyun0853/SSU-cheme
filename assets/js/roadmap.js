/* ============================================================================
   숭실대학교 화학공학과 — 이수체계도 (guide.html #roadmap)
   ----------------------------------------------------------------------------
   · 학기별 과목표는 data.js 의 COURSES(49과목)에서 그대로 그립니다.
     그래서 교과과정 표와 이수체계도의 과목명·학점·개편 표시가 어긋나지 않습니다.
   · 선수·후속 흐름(CURRICULUM_FLOWS)과 트랙(TRACKS)도 data.js 에서 옵니다.
   · 영문 전환 시 과목명·트랙명은 i18n-content.js 사전을 씁니다.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var isEn = function () { return !!(window.I18N && window.I18N.isEn()); };
  var tr = function (ko, en) { return window.I18N ? window.I18N.pick(ko, en) : ko; };
  var cn = function (ko) { return window.I18N ? window.I18N.course(ko) : ko; };

  var TYPE_CLASS = { '전기': 'fnd', '전필': 'req', '전선': 'ele' };
  var TYPE_LABEL = { '전기': 'Foundation', '전필': 'Required', '전선': 'Elective' };
  var YEAR_LABEL = { 1: 'Year 1', 2: 'Year 2', 3: 'Year 3', 4: 'Year 4' };
  var TERM_LABEL = { 1: 'Spring semester', 2: 'Fall semester' };

  var activeTrack = 'all';

  function typeLabel(tp) { return isEn() ? (TYPE_LABEL[tp] || tp) : tp; }

  function credits(list) {
    return list.reduce(function (sum, c) {
      var n = Number(String(c.credit || '').split('/')[1]);
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
  }

  function trackOf(key) {
    if (!key || key === 'all' || typeof TRACKS === 'undefined') return null;
    return TRACKS.filter(function (t) { return t.key === key; })[0] || null;
  }

  function badge(c) {
    if (c.next) return '<span class="rm-badge">' + esc(isEn() ? 'Renamed 2027-1' : '27-1 개편') + '</span>';
    if (c.isNew) return '<span class="rm-badge is-new">' + esc(isEn() ? 'New' : '신설') + '</span>';
    return '';
  }

  function renderFilter() {
    var box = $('#rmFilter');
    if (!box) return;
    var items = [{ key: 'all', label: tr('전체 트랙', 'All tracks') }].concat(
      (typeof TRACKS === 'undefined' ? [] : TRACKS).map(function (t) {
        return { key: t.key, label: isEn() ? (t.en || t.name) : t.name };
      })
    );
    box.innerHTML = items.map(function (it) {
      var on = it.key === activeTrack;
      return '<button type="button" class="chip' + (on ? ' is-active' : '') + '" role="tab" aria-selected="' + on +
        '" data-rm-track="' + esc(it.key) + '">' + esc(it.label) + '</button>';
    }).join('');
    Array.prototype.forEach.call(box.querySelectorAll('[data-rm-track]'), function (btn) {
      btn.addEventListener('click', function () {
        activeTrack = btn.getAttribute('data-rm-track');
        render();
      });
    });
  }

  function courseItem(c, track) {
    var cls = TYPE_CLASS[c.type] || 'ele';
    var inTrack = !track || track.courses.indexOf(c.name) >= 0;
    var state = track ? (inTrack ? ' is-on' : ' is-dim') : '';
    return '<div class="rm-course is-' + cls + state + '" data-course="' + esc(c.name) + '">' +
      '<span class="rm-course-name">' + esc(cn(c.name)) + badge(c) + '</span>' +
      '<span class="rm-credit">' + esc(c.credit) + '</span>' +
      '</div>';
  }

  function renderGrid() {
    var grid = $('#rmGrid');
    if (!grid || typeof COURSES === 'undefined') return;
    var track = trackOf(activeTrack);

    var head = '<div class="rm-legend">' +
      ['전필', '전선', '전기'].map(function (tp) {
        return '<span><i class="rm-dot rm-dot--' + TYPE_CLASS[tp] + '" aria-hidden="true"></i>' + esc(typeLabel(tp)) + '</span>';
      }).join('') +
      '</div>';

    var body = [1, 2, 3, 4].map(function (y) {
      var rows = COURSES.filter(function (c) { return c.year === y; });
      var terms = [1, 2].map(function (term) {
        var list = rows.filter(function (c) { return c.term === term; });
        return '<div class="rm-term">' +
          '<div class="rm-term-head">' +
            '<h4>' + esc(isEn() ? TERM_LABEL[term] : (y + '-' + term)) + '</h4>' +
            '<span>' + esc(isEn() ? (list.length + ' courses · ' + credits(list) + ' credits') : (list.length + '과목 · ' + credits(list) + '학점')) + '</span>' +
          '</div>' +
          '<div class="rm-course-list">' + list.map(function (c) { return courseItem(c, track); }).join('') + '</div>' +
          '</div>';
      }).join('');

      return '<div class="rm-year">' +
        '<div class="rm-year-head">' +
          '<p class="rm-year-label">' + esc(isEn() ? YEAR_LABEL[y] : (y + '학년')) + '</p>' +
          '<p class="rm-year-meta">' + esc(isEn() ? (rows.length + ' courses') : (rows.length + '과목')) + '</p>' +
        '</div>' +
        '<div class="rm-terms">' + terms + '</div>' +
        '</div>';
    }).join('');

    grid.innerHTML = head + body;
  }

  function renderFlows() {
    var box = $('#rmFlows');
    if (!box || typeof CURRICULUM_FLOWS === 'undefined') return;
    box.innerHTML = CURRICULUM_FLOWS.map(function (f) {
      var steps = f.steps.map(function (name) { return '<span class="rm-step">' + esc(cn(name)) + '</span>'; })
        .join('<span class="rm-arrow" aria-hidden="true">→</span>');
      return '<div class="rm-flow">' +
        '<p class="rm-flow-title">' + esc(isEn() ? (window.I18N ? window.I18N.t(f.title) : f.title) : f.title) +
        (!isEn() && f.note ? '<em>' + esc(f.note) + '</em>' : '') + '</p>' +
        '<div class="rm-flow-steps">' + steps + '</div>' +
        '</div>';
    }).join('');
    if (window.I18N) window.I18N.apply(box);
  }

  function renderTracks() {
    var box = $('#rmTracks');
    if (!box || typeof TRACKS === 'undefined') return;
    box.innerHTML = TRACKS.map(function (t) {
      var profs = (typeof PROFESSORS === 'undefined' ? [] : PROFESSORS)
        .filter(function (p) { return (p.tags || []).indexOf(t.key) >= 0; })
        .map(function (p) { return p.name; });
      var chips = t.courses.map(function (name) {
        var c = COURSES.filter(function (x) { return x.name === name; })[0];
        var where = c ? (isEn() ? (YEAR_LABEL[c.year] + ' · ' + TERM_LABEL[c.term]) : (c.year + '-' + c.term)) : '';
        return '<span class="rm-track-chip">' + esc(cn(name)) +
          (where ? '<em>' + esc(where) + '</em>' : '') + '</span>';
      }).join('');
      return '<article class="rm-track">' +
        '<div class="rm-track-head">' +
          '<h4>' + esc(isEn() ? (t.en || t.name) : t.name) + '</h4>' +
          (isEn() ? '' : '<span class="rm-track-en">' + esc(t.en || '') + '</span>') +
        '</div>' +
        '<p>' + esc(isEn() ? (window.I18N ? window.I18N.t(t.summary) : t.summary) : t.summary) + '</p>' +
        '<div class="rm-track-list">' + chips + '</div>' +
        (profs.length ? '<p class="rm-track-prof"><b>' + esc(tr('연계 교수진', 'Faculty')) + '</b> ' + esc(profs.join(' · ')) + '</p>' : '') +
        '</article>';
    }).join('');
    if (window.I18N) window.I18N.apply(box);
  }

  function render() {
    renderFilter();
    renderGrid();
    renderFlows();
    renderTracks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  document.addEventListener('ssui18n', render);
})();
