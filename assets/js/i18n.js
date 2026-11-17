/* ============================================================================
   숭실대학교 화학공학과 — 한국어 / English 전환 (KR | EN)
   ----------------------------------------------------------------------------
   · 화면의 한국어 문구를 영어로 바꿔 줍니다. HTML 은 한국어 그대로 두고,
     이 파일의 사전(DICT)에 있는 문구만 영어로 치환합니다.
   · 사전에 없는 문구는 한국어로 남습니다(오류 없이 그대로 표시).
   · 문구를 고치거나 새로 넣을 때: HTML 의 한국어 문구와 사전의 키(따옴표 앞부분)가
     똑같아야 합니다. 띄어쓰기·줄바꿈은 자동으로 정리해 비교합니다.
   · 교과목명·교수진·본문 번역은 i18n-content.js 에 모아 두었습니다.
   · 선택한 언어는 브라우저에 기억되고(localStorage), 주소에 ?lang=en 을 붙여도 됩니다.
   ========================================================================== */
(function (global) {
  'use strict';

  var STORE_KEY = 'ssucheme.lang';

  /* ------------------------------------------------------------------ 사전 */
  var DICT = {
    /* 상단 유틸바 · 헤더 · 내비게이션 */
    '본문으로 건너뛰기': 'Skip to content',
    '숭실대학교 공과대학 화학공학과': 'College of Engineering, Soongsil University',
    '스마트LMS': 'Smart LMS',
    '슈패스': 'SSU-PATH',
    '중앙도서관': 'Central Library',
    '캠퍼스맵': 'Campus Map',
    '웹메일': 'Webmail',
    '숭실대학교 홈': 'Soongsil University',
    '📱 앱 설치': '📱 Get the app',
    '화학공학과': 'Chemical Engineering',
    '학과 소개': 'About',
    '연구 분야': 'Research',
    '교수진 및 연구실': 'Faculty & Labs',
    '학부 교과과정': 'Curriculum',
    '학과 공지사항': 'Notices',
    '입학 및 진로': 'Admissions & Careers',
    '오시는 길': 'Visit Us',
    '검색': 'Search',
    '숭실대 주요 서비스': 'Soongsil University services',
    '스마트LMS ↗': 'Smart LMS ↗',
    '슈패스 ↗': 'SSU-PATH ↗',
    '중앙도서관 ↗': 'Central Library ↗',
    '웹메일 ↗': 'Webmail ↗',
    '숭실대 홈 ↗': 'Soongsil University ↗',
    '형남공학관 912호 · 02-820-0610': 'Hyeongnam Engineering Hall 912 · +82-2-820-0610',
    '입학 및 진로 (학사안내)': 'Admissions & Careers (Academic Guide)',

    /* 첫 화면 */
    '분자를 설계하고,': 'We design molecules',
    '산업의 다음': 'and build what',
    '을 만든다': 'industry does next',
    '숭실대학교 화학공학과는 창의적 분자 설계와 첨단 공정 공학을 바탕으로 반도체·이차전지·바이오·첨단소재 산업을 선도하는 미래 인재를 양성합니다.':
      'The Department of Chemical Engineering at Soongsil University educates engineers who lead the semiconductor, battery, bio, and advanced materials industries through creative molecular design and advanced process engineering.',
    '학과소개 보기': 'About the Department',
    '진리와 봉사 · VERITAS ET SERVITIUM · Since 1967': 'Truth and Service · VERITAS ET SERVITIUM · Since 1967',
    '5대 연구분야 전체 보기': 'Explore all five research areas',
    '반도체 · 이차전지 · 바이오 · 고분자 · 환경': 'Semiconductors · Batteries · Bio · Polymers · Environment',

    /* 지표 */
    '학과 설립': 'Founded',
    '전임교원': 'Faculty',
    '연구실': 'Laboratories',
    '전공 교과목': 'Major courses',

    /* 학과 소개 */
    '1967년 설립된 숭실대학교 화학공학과는 반도체·에너지·바이오·소재·환경 산업의 공통 기반이 되는 학문을 가르치고 연구합니다.':
      'Founded in 1967, the Department of Chemical Engineering teaches and researches the discipline that underpins the semiconductor, energy, bio, materials, and environmental industries.',
    '학과장 · 교수': 'Chair · Professor',
    '학과장': 'Chair',
    '교육 목적': 'Educational Purpose',
    '폭넓은 소양을 갖춘 인성교육을 바탕으로 이론과 실제를 겸비하여, 문제 분석에서 해법 제시에 이르기까지 전 과정을 실행할 수 있는 종합적인 공학 능력을 갖춘 인재를 배양합니다. 특히 21세기의 중요 분야인 IT·NT·ET·BT와 화학공학을 결합하여 시대의 흐름에 맞는 공학 및 기술 전문가를 양성합니다.':
      'Grounded in a broad liberal education, the department develops engineers who combine theory and practice and can carry a problem from analysis to solution. We integrate chemical engineering with IT, NT, ET, and BT — the fields that define this century — to train engineers and technical specialists who move with their time.',
    '지구촌 시대에 맞춰 공학교육을 내실화하고 국제교류를 통해 국제 사회에서 활약할 뿐 아니라, 국가와 사회에 봉사하는 인재를 기르는 것을 지향합니다.':
      'We strengthen engineering education for a global era and, through international exchange, aim to raise engineers who work on the world stage and serve the nation and society.',
    '교육 목표': 'Educational Objectives',
    '수학·물리·화학 등 기초과학 지식을 바탕으로 창의적 연구와 응용 능력을 기른다.':
      'Build creative research and applied skills on a foundation of mathematics, physics, and chemistry.',
    '효율성과 환경을 함께 고려하는 화학공정 해석 및 설계 능력을 갖춘다.':
      'Develop the ability to analyze and design chemical processes that weigh efficiency together with the environment.',
    '국제 경쟁력 확보를 위한 의사전달 능력과 정보화 대응력을 갖춘다.':
      'Gain the communication skills and digital fluency needed to compete internationally.',
    '기독교적 가치관과 봉사정신을 갖춘 공학 인재로 성장한다.':
      'Grow as engineers grounded in Christian values and a spirit of service.',
    '학과 연혁': 'History',
    '“분자를 다루는 일은 결국,': '“Working with molecules is, in the end,',
    '세상이 쓰는 물건을 바꾸는 일입니다.”': 'changing the things the world uses.”',
    '숭실대학교 화학공학과': 'Department of Chemical Engineering, Soongsil University',
    '학과 주요 사업 및 성과': 'Programs and Achievements',
    '수소에너지에서 AI 신에너지로 이어진 특성화 사업과 산학연계 인재양성 기반입니다.':
      'Specialization programs that carried the department from hydrogen energy to AI-driven new energy, together with the industry-linked training that supports them.',
    '졸업 후 진로': 'Career Paths',
    '화학공학 졸업생은 반도체·전자, 정유·석유화학, 소재, 제약·바이오, 식품, 에너지, 엔지니어링까지 산업 전반으로 진출합니다.':
      'Our graduates move into semiconductors and electronics, refining and petrochemicals, materials, pharmaceuticals and bio, food, energy, and engineering.',

    /* 연구 분야 */
    '소재 합성, 계면 현상, 공정 설계라는 공통된 방법론 위에서 다섯 개의 산업 축으로 연구가 이어집니다. 각 분야의 교수진과 연구실로 바로 연결됩니다.':
      'Five industrial axes of research rest on one shared methodology — materials synthesis, interfacial phenomena, and process design. Each area links directly to its faculty and laboratories.',
    '전임교원 14명, 10개 연구실입니다. 연구 분야를 선택하면 해당 교수진만 표시되며, 자체 랩 웹사이트가 있는 경우 카드를 누르면 새 탭으로 연결됩니다. ‘프로필 보기’에서 학력·연구 내용·경력을 확인할 수 있습니다.':
      'Fourteen full-time faculty members and ten laboratories. Choose a research area to filter the list; where a lab runs its own website, the card opens it in a new tab. Use “Profile” for education, research, and career details.',
    '명의 교수진': 'faculty members',
    '전체 연구 분야': 'All research areas',
    '분야': 'area',
    '조건에 맞는 교수진이 없습니다. 다른 연구 분야를 선택해 보세요.':
      'No faculty match this filter. Try another research area.',
    '교수명·연구 키워드 검색': 'Name or research keyword',
    '프로필 보기': 'Profile',
    '프로필': 'Profile',
    '랩 홈페이지': 'Lab website',
    '연구실 정보 없음': 'Lab information not listed',
    '전임교원 프로필 참고': 'See the faculty profile',
    '학과 행정·특별임무 담당': 'Department administration and special assignments',
    '학과 사무실': 'Department Office',
    '입학·학사·연구실 안내는 학과 사무실로 문의하세요.': 'For admissions, academic affairs, and laboratory inquiries, contact the department office.',
    '형남공학관 912호': 'Hyeongnam Hall 912',
    '교수실': 'Office',
    '연구실': 'Laboratory',
    '전화': 'Phone',
    '이메일': 'Email',
    '학력': 'Education',
    '연구 내용': 'Research',
    '주요 경력': 'Career',
    '연구실 홈페이지': 'Laboratory website',
    '메일 보내기': 'Send email',
    '닫기': 'Close',

    /* 교과과정 */
    '2026학년도 화학공학과 편성표 기준, 학년별 전공 교과목 49개입니다. 과목을 누르면 강의 내용을 확인할 수 있습니다.':
      'Forty-nine major courses across four years, as listed in the 2026 curriculum. Select a course to read its description.',
    '이수구분 — 전기: 전공기초 · 전필: 전공필수 · 전선: 전공선택. 2026학년도 화학공학과 편성표(2026-05-27 교과과정 변경 반영)를 기준으로 정리했으며, 입학 학년도에 따라 적용 교과과정이 다를 수 있습니다. 과목ID는 학과 교과과정표 기준입니다.':
      'Course types — Foundation: major foundation · Required: major required · Elective: major elective. The list follows the 2026 curriculum (including the 2026-05-27 revision); the curriculum that applies to you depends on the year you entered. Course IDs follow the department curriculum table.',
    '2027-1학기 개편 예정': 'Renamed from 2027-1',
    '— 화공열역학1 → 화공열역학 및 응용, 화공유체역학 → 화공유체역학응용, 촉매공학 → 촉매반응공학, 고분자화학 → 고분자화학 및 중합, 공정시스템 → 공정시스템 설계, 분리공정 → 분리공정 및 응용, 전기화학에너지공학 → 전기화학응용공학, 종합설계1 → 캡스톤디자인 및 AI 활용.':
      '— Chemical Engineering Thermodynamics 1 → Thermodynamics and Applications, Fluid Mechanics for Chemical Engineers → Applied Fluid Mechanics, Catalysis Engineering → Catalytic Reaction Engineering, Polymer Chemistry → Polymer Chemistry and Polymerization, Process Systems → Process Systems Design, Separation Processes → Separation Processes and Applications, Electrochemical Energy Engineering → Applied Electrochemical Engineering, Capstone Design 1 → Capstone Design with AI.',
    '졸업요건 · 단일전공': 'Graduation · Single major',
    '학점': 'credits',
    '학과 졸업요건 상세 안내': 'Full graduation requirements',
    '이수체계도 보기': 'Course roadmap',
    '이수체계도 — 선수과목·트랙 로드맵': 'Course Roadmap — Prerequisites and Tracks',
    '1~4학년 전공 49과목을 학기 순서대로 놓고, 선수·후속 흐름과 트랙별 권장 과목을 한눈에 볼 수 있게 정리했습니다.':
      'All 49 major courses laid out by semester, with the recommended prerequisite sequence and the courses that make up each track.',

    /* 공지 */
    '학부·대학원·취업 게시판의 최신 글입니다. 제목이나 작성자로 검색할 수 있으며, 각 글은 학과 홈페이지 원문으로 연결됩니다.':
      'The latest posts from the undergraduate, graduate, and career boards. Search by title or author; each post links to its original page on the department website.',
    '학부공지': 'Undergraduate',
    '대학원공지': 'Graduate',
    '취업·인턴십': 'Careers & Internships',
    '최신순': 'Newest',
    '중요공지순': 'Pinned first',
    '등록일 최신순': 'Newest first',
    '중요공지 우선': 'Pinned first',
    '등록일': 'Date',
    '제목': 'Title',
    '조회': 'Views',
    '관리': 'Manage',
    '검색 결과가 없습니다. 다른 검색어를 입력해 보세요.': 'No results. Try another search term.',
    '학부공지 전체 보기': 'All undergraduate notices',
    '제목·작성자 검색': 'Title or author',
    '중요': 'Pinned',
    '게시판': 'Board',
    '게시일': 'Posted',
    '작성자': 'Author',
    '첨부 파일': 'Attachments',
    '원문 보기': 'Open original',
    '본문': 'Contents',    /* 접근성 라벨·부가 문구 */
    '검색어 지우기': 'Clear search',
    '맨 위로': 'Back to top',
    '주요 메뉴': 'Main menu',
    '모바일 메뉴': 'Mobile menu',
    '주요 서비스': 'University services',
    '숭실대학교 주요 서비스': 'Soongsil University services',
    '바로가기': 'Quick links',
    '숭실대학교 화학공학과 홈으로': 'Department of Chemical Engineering home',
    '스마트폰 홈 화면에 앱으로 추가': 'Add this site to your home screen',
    '연구 분야 필터': 'Research area filter',
    '교수진 검색': 'Search faculty',
    '공지사항 검색': 'Search notices',
    '공지 게시판 선택': 'Choose notice board',
    '정렬 기준': 'Sort order',
    '학년 선택': 'Choose year',
    '게시판': 'Board',
    '전체': 'All',
    '대학원공지 전체 보기': 'All graduate notices',
    '취업·인턴십 전체 보기': 'All career notices',
    '트랙 선택': 'Choose track',
    '언어 선택 / Language': 'Language',
    '표를 좌우로 밀면 전체 열을 볼 수 있습니다.': 'Swipe the table sideways to see every column.',

    '학과 홈페이지에 게시된 공지입니다. 본문과 첨부 파일은 학과 홈페이지 원문에서 확인하실 수 있습니다.':
      'This notice is posted on the department website. The full text and any attachments are available on the original page.',
    '이전 글': 'Previous',
    '다음 글': 'Next',

    /* 입학 및 진로 */
    '대학원 진학, 졸업 요건, 교환학생까지 — 학과 생활에 필요한 안내를 한곳에 모았습니다.':
      'Graduate study, graduation requirements, and exchange programs — the practical guidance for life in the department, in one place.',
    '형남공학관 912호 · 학사조교 이찬미, 이지숙': 'Hyeongnam Hall 912 · Academic coordinators Lee Chan-mi, Lee Ji-suk',
    '학과에 문의하기': 'Contact the department',
    '대학원 입학': 'Graduate Admission',
    '졸업 요건': 'Graduation Requirements',
    '교환학생': 'Exchange Program',
    '석사·박사 과정은 학과 연구실 단위로 모집합니다. 3대 세부전공과 학과간 협동과정, 전형 배점 기준 및 4대 장학제도를 확인하세요.':
      'Master’s and doctoral admission is organized by research laboratory. Review the three sub-majors, the interdisciplinary program, the evaluation criteria, and the four main scholarship schemes.',
    '단일전공 기준 133학점(전공 84학점), 복수·부전공 학점표, 졸업논문 및 대체 자격증, 영어인증 기준을 상세히 안내합니다.':
      'A single major requires 133 credits (84 in the major). Credit tables for double and minor programs, the graduation thesis and its alternatives, and the English certification requirement.',
    '해외 자매대학 1:1 파견, ACUCA, UMAP 등 4대 파견 프로그램 유형과 학과 전공 학점 인정 절차를 확인하세요.':
      'Four exchange routes — one-to-one partner exchange, ACUCA, UMAP, and more — and how major credits earned abroad are recognized.',
    '대학원 입학 상세 안내': 'Graduate admission details',
    '졸업요건 상세 안내': 'Graduation requirements',
    '교환학생 상세 안내': 'Exchange program details',

    /* 오시는 길 */
    '서울특별시 동작구 상도로 369 숭실대학교 형남공학관 912호': 'Hyeongnam Engineering Hall 912, Soongsil University, 369 Sangdo-ro, Dongjak-gu, Seoul 06978, Korea',
    '숭실대학교 형남공학관 (화학공학과 912호)': 'Hyeongnam Engineering Hall, Soongsil University (Department of Chemical Engineering, Room 912)',
    '주소': 'Address',
    '서울특별시 동작구 상도로 369': '369 Sangdo-ro, Dongjak-gu, Seoul',
    '숭실대학교 형남공학관 912호 (06978)': 'Hyeongnam Engineering Hall 912, Soongsil University (06978)',
    '대표전화': 'Telephone',
    '팩스': 'Fax',
    '사무실': 'Office',
    '지하철': 'Subway',
    '7호선 숭실대입구(살피재)역 3번 출구': 'Line 7, Soongsil University (Salpijae) Station, Exit 3',
    '버스': 'Bus',
    '간선 501, 506, 641, 650, 750, 751, 752, 753 · 지선 5511, 5517': 'Trunk 501, 506, 641, 650, 750, 751, 752, 753 · Branch 5511, 5517',
    '지도에서 보기': 'Open in map',
    '숭실대학교 형남공학관 전경': 'Hyeongnam Engineering Hall, Soongsil University',
    '숭실대학교 형남공학관 위치 지도': 'Map — Hyeongnam Engineering Hall, Soongsil University',

    /* 푸터 */
    '학과 안내': 'Department',
    '학사 안내': 'Academic',
    '기존 홈페이지': 'Legacy website',
    '대학 홈페이지': 'University website',
    '스마트폰 앱 설치': 'Install mobile app',
    '관리자 로그인': 'Administrator',
    '06978 서울특별시 동작구 상도로 369 숭실대학교 형남공학관 912호': 'Hyeongnam Engineering Hall 912, Soongsil University, 369 Sangdo-ro, Dongjak-gu, Seoul 06978',
    'Department of Chemical Engineering, Soongsil University': 'Department of Chemical Engineering, Soongsil University',

    /* 통합 검색 팔레트 */
    '빠른 이동': 'Quick links',
    '교수진·연구실': 'Faculty & labs',
    '교과과정': 'Curriculum',
    '공지사항': 'Notices',
    '이동': 'Go',
    '열기': 'Open',
    '교수명, 연구 키워드, 공지, 과목명을 검색하세요': 'Search faculty, research keywords, notices, or courses',
    '검색 결과가 없습니다. 다른 키워드로 검색해 보세요.': 'No results. Try another keyword.',
    '교수진': 'Faculty',
    '교과목': 'Course',
    '교수진 · 연구실': 'Faculty & labs',
    '메뉴 열기': 'Open menu',
    '메뉴 닫기': 'Close menu',
    '통합 검색': 'Search',
    '통합 검색 열기': 'Open search',

    /* 학사·대학원 안내(guide.html) 공통 */
    '홈': 'Home',
    '학사 및 대학원 종합 안내': 'Academic and Graduate Guide',
    '숭실대학교 화학공학과 학사 학위 취득 요건, 대학원 입학 및 장학금 지원 요강, 해외 교환학생 파견 절차에 관한 상세 정보를 한곳에 정리하였습니다.':
      'Degree requirements for the bachelor’s program, graduate admission and scholarship guidelines, and the exchange program procedure — all in one place.',
    '메인 홈으로': 'Back to home',
    '교수진 및 연구실 보기': 'Faculty and laboratories',
    '경로': 'Breadcrumb',
    '섹션 바로가기': 'Section links'
  };

  /* ------------------------------------------------------------ 정규식 규칙
     숫자가 섞인 문구는 사전 대신 규칙으로 바꿉니다. */
  var RULES = [
    [/^(\d)학년$/, function (m) { return 'Year ' + m[1]; }],
    [/^(\d)학기$/, function (m) { return m[1] === '1' ? 'Spring semester' : 'Fall semester'; }],
    [/^(\d+)과목 · (\d+)학점$/, function (m) { return m[1] + ' courses · ' + m[2] + ' credits'; }],
    [/^(\d+)건$/, function (m) { return m[1] + ' posts'; }],
    [/^검색 결과 (\d+)건$/, function (m) { return m[1] + ' results'; }],
    [/^더 보기 \((\d+)건\)$/, function (m) { return 'Show more (' + m[1] + ')'; }],
    [/^(.+) 분야$/, function (m) { return m[1] + ' research area'; }],
    [/^과목ID 미부여\(신설\)$/, function () { return 'Course ID not yet assigned'; }],
    [/^과목ID (\S+)$/, function (m) { return 'Course ID ' + m[1]; }],
    [/^심화정도 (.+)$/, function (m) { return 'Depth ' + m[1]; }],
    [/^형남공학관 ([\d\-]+)호$/, function (m) { return 'Hyeongnam Hall ' + m[1]; }],
    [/^연구관 ([\d\-]+)호$/, function (m) { return 'Research Building ' + m[1]; }],
    [/^문화관 ([\d\-]+)호$/, function (m) { return 'Culture Hall ' + m[1]; }],
    [/^전산관 ([\d\-]+)호$/, function (m) { return 'Computing Center ' + m[1]; }]
  ];

  var CONTENT = {};          // i18n-content.js 가 채웁니다 (교과목·교수진·본문)
  var lang = 'ko';

  /* 사전 키 비교용 정리 — 줄바꿈·연속 공백과 보이지 않는 문자(word joiner 등)를 없앱니다. */
  function norm(s) {
    return String(s == null ? '' : s)
      .replace(/[\u2060\u200b\u00ad\ufeff]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function lookup(text) {
    var key = norm(text);
    if (!key) return null;
    if (DICT[key] != null) return DICT[key];
    if (CONTENT[key] != null) return CONTENT[key];
    for (var i = 0; i < RULES.length; i++) {
      var m = key.match(RULES[i][0]);
      if (m) return RULES[i][1](m);
    }
    return null;
  }

  /* --------------------------------------------------------------- 적용 */
  var SKIP_TAGS = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE|SVG)$/;

  function shouldSkip(node) {
    var p = node.parentElement;
    if (!p) return true;
    if (SKIP_TAGS.test(p.tagName)) return true;
    if (p.closest('[data-no-i18n]')) return true;
    return false;
  }

  function setText(node, value) {
    if (node.nodeValue === value) return;
    if (node.__ko == null) node.__ko = node.nodeValue;
    node.__en = value;
    node.nodeValue = value;
  }

  function restore(node) {
    if (node.__ko == null) return;
    if (node.__en != null && node.nodeValue !== node.__en) return;  // 화면 쪽에서 다시 쓴 문구
    node.nodeValue = node.__ko;
    node.__en = null;
  }

  function applyText(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (shouldSkip(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (lang === 'ko') { restore(node); return; }
      var v = lookup(node.nodeValue);
      if (v == null) return;
      var raw = node.nodeValue;
      var lead = (raw.match(/^\s*/) || [''])[0];
      var trail = (raw.match(/\s*$/) || [''])[0];
      setText(node, lead + v + trail);
    });
  }

  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

  function applyAttrs(root) {
    if (!root.querySelectorAll) return;
    ATTRS.forEach(function (attr) {
      var nodes = root.querySelectorAll('[' + attr + ']');
      Array.prototype.forEach.call(nodes, function (el) {
        if (el.closest('[data-no-i18n]')) return;
        if (!el.__i18nAttr) el.__i18nAttr = {};
        if (lang === 'ko') {
          var o = el.__i18nAttr[attr];
          if (!o) return;
          if (el.getAttribute(attr) === o.en) el.setAttribute(attr, o.ko);
          return;
        }
        var cur = el.getAttribute(attr);
        if (!cur || !cur.trim()) return;
        var v = lookup(cur);
        if (v == null) return;
        if (!el.__i18nAttr[attr]) el.__i18nAttr[attr] = { ko: cur };
        el.__i18nAttr[attr].en = v;
        if (cur !== v) el.setAttribute(attr, v);
      });
    });
  }

  function apply(root) {
    var scope = root || document.body;
    if (!scope) return;
    applyText(scope);
    applyAttrs(scope);
  }

  /* --------------------------------------------------------------- 공개 API */
  var TITLES = {
    ko: '숭실대학교 화학공학과 | Department of Chemical Engineering',
    en: 'Department of Chemical Engineering | Soongsil University'
  };

  function updateDocumentTitle() {
    var el = document.documentElement;
    var ko = el.getAttribute('data-title-ko') || TITLES.ko;
    var en = el.getAttribute('data-title-en') || TITLES.en;
    document.title = lang === 'ko' ? ko : en;
  }

  function syncToggles() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-set-lang]'), function (btn) {
      var on = btn.getAttribute('data-set-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function set(next, opts) {
    var l = next === 'en' ? 'en' : 'ko';
    lang = l;
    document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'ko');
    document.documentElement.setAttribute('data-lang', l);
    try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* private mode */ }
    apply(document.body);
    syncToggles();
    updateDocumentTitle();
    if (!opts || opts.announce !== false) {
      document.dispatchEvent(new CustomEvent('ssui18n', { detail: { lang: l } }));
    }
    return l;
  }

  function readInitial() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'ko') return q;
      var s = localStorage.getItem(STORE_KEY);
      if (s === 'en' || s === 'ko') return s;
    } catch (e) { /* ignore */ }
    return 'ko';
  }

  function bind() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-set-lang]'), function (btn) {
      btn.addEventListener('click', function () { set(btn.getAttribute('data-set-lang')); });
    });
  }

  function boot() {
    bind();
    var initial = readInitial();
    if (initial === 'en') set('en', { announce: false });
    else {
      document.documentElement.setAttribute('data-lang', 'ko');
      updateDocumentTitle();
      syncToggles();
    }
  }

  global.I18N = {
    /* 사전 확장 — i18n-content.js 에서 호출 */
    extend: function (obj) {
      Object.keys(obj || {}).forEach(function (k) { CONTENT[k] = obj[k]; });
      if (lang === 'en') apply(document.body);
    },
    /* 지금 언어가 영어인지 */
    isEn: function () { return lang === 'en'; },
    lang: function () { return lang; },
    /* 한국어/영어 중 지금 언어의 문구 (동적 렌더링에서 사용) */
    pick: function (ko, en) { return lang === 'en' ? en : ko; },
    /* 교과목명·교수진 번역 조회 (없으면 원문) */
    course: function (koName) {
      if (lang !== 'en') return koName;
      var v = CONTENT['course:' + koName];
      return v || koName;
    },
    courseDesc: function (koName) {
      var v = CONTENT['desc:' + koName];
      return v || '';
    },
    prof: function (key, fallback) {
      if (lang !== 'en') return fallback;
      var v = CONTENT['prof:' + key];
      return v == null ? fallback : v;
    },
    t: function (ko) {
      if (lang !== 'en') return ko;
      var v = lookup(ko);
      return v == null ? ko : v;
    },
    apply: apply,
    set: set
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
