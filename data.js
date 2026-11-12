/* ============================================================================
   숭실대학교 화학공학과 — 학과 데이터 파일 (data.js)
   ----------------------------------------------------------------------------
   이 파일만 고치면 홈페이지 내용이 바뀝니다. index.html / app.js 는 건드리지 않아도 됩니다.
   데이터 출처: 숭실대학교 화학공학과 공식 홈페이지(chemeng.ssu.ac.kr), 2026년 11월 수집
   자세한 수정 방법은 같은 폴더의 "AI_유지보수_가이드.md" 참고.
   ============================================================================ */

/* ----------------------------------------------------------------------------
   1. 학과 기본 정보
   ---------------------------------------------------------------------------- */
const DEPT = {
  nameKo: "숭실대학교 화학공학과",
  nameEn: "Department of Chemical Engineering",
  univEn: "Soongsil University",
  slogan: "1967년 설립, 반도체·에너지·바이오·고분자·환경을 잇는 화학공학",
  address: "06978 서울특별시 동작구 상도로 369 숭실대학교 형남공학관 912호",
  tel: "02-820-0610",
  fax: "02-812-5378",
  founded: 1967,
  site: "http://chemeng.ssu.ac.kr"
};

/* 주요 지표 (홈 상단 카운터) */
const STATS = [
  { value: "1967", label: "학과 설립", sub: "Soongsil University" },
  { value: "14", label: "전임교원", sub: "Full-time faculty" },
  { value: "12", label: "연구실", sub: "Research laboratories" },
  { value: "48", label: "전공 교과목", sub: "Major courses" }
];

/* ----------------------------------------------------------------------------
   2. 연혁 — 학과소개 타임라인
   ---------------------------------------------------------------------------- */
const HISTORY = [
  { year: "1967.12", text: "숭실대학교 공과대학 화학공학과 설립" },
  { year: "1998", text: "공과대학 환경·화학공학과로 개명" },
  { year: "1999", text: "5개 학과군으로 모집 (환경·화공 / 섬유 / 전기 / 기계 / 산업정보시스템공학과군)" },
  { year: "2001", text: "3개 학과군으로 모집 (환경·화공 / 기계 / 산업정보시스템공학과군)" },
  { year: "2004", text: "공과대학 환경·화학공학과로 모집" },
  { year: "2011", text: "공과대학 화학공학과로 모집" }
];

/* ----------------------------------------------------------------------------
   3. 연구 분야 — 연구 키워드 필터와 1:1로 연결됩니다.
      (교수진 tags 의 값과 정확히 같은 이름을 써야 카운트가 맞습니다)
   ---------------------------------------------------------------------------- */
const RESEARCH_AREAS = [
  { key: "반도체", num: "01", title: "반도체·디스플레이 소재",
    desc: "배선·캡핑 공정, 공정 가스 처리, 플렉시블 디스플레이용 광학·봉지 소재, 양자점 소자까지 — 소재 합성과 공정을 함께 다룹니다.",
    tags: ["반도체"] },
  { key: "배터리", num: "02", title: "이차전지·에너지 소자",
    desc: "연료전지·수전해·전기촉매에서 차세대 이차전지 소재까지, 에너지 변환과 저장의 계면을 설계합니다.",
    tags: ["배터리"] },
  { key: "바이오", num: "03", title: "바이오·나노의약",
    desc: "바이오마커·체외진단, 지능형 나노전달체, 오가노이드, 단백질·약물 결정화로 진단과 치료의 도구를 만듭니다.",
    tags: ["바이오"] },
  { key: "고분자", num: "04", title: "고분자·정밀소재",
    desc: "리빙 중합 기반 정밀 고분자 설계, 열가소성 탄성체, 자기치유 소재, 유기전자용 고분자까지 분자 구조에서 물성을 제어합니다.",
    tags: ["고분자"] },
  { key: "환경", num: "05", title: "환경·탄소중립 공정",
    desc: "대기오염물질·온실가스 처리, 다공성 소재 기반 분리, CCUS·직접공기포집, 공정 통합 최적화로 지속가능한 공정을 설계합니다.",
    tags: ["환경"] }
];

/* ----------------------------------------------------------------------------
   4. 교수진 — 전임교원 14명
      · tags: "반도체" | "배터리" | "바이오" | "고분자" | "환경" (복수 선택 가능)
      · labUrl: 연구실 홈페이지 주소 (없으면 "")
   ---------------------------------------------------------------------------- */
const PROFESSORS = [
  {
    id: "ryu", name: "류희욱", title: "교수", field: "화학공학, 환경공학",
    tags: ["바이오", "환경"],
    office: "형남공학관 904호", labName: "환경생물공학 연구실", labRoom: "형남공학관 915호",
    tel: "02-820-0611", email: "hwryu@ssu.ac.kr", labUrl: "https://www.ssueblab.com/",
    photo: "assets/faculty/류희욱.jpg",
    edu: ["학사 · 숭실대학교 화학공학전공 (1987)", "석사 · 한국과학기술원 화학공학전공 (1989)", "박사 · 한국과학기술원 화학공학전공 (1993)"],
    research: ["바이오공정과 바이오에너지·바이오고분자 생산", "폐가스·폐수·지하수의 생물학적 처리", "석유·석탄의 생물학적 탈황과 금속 회수", "온실가스 저감을 위한 미생물 공정", "뷰티공학: 천연 화장품 소재와 생물공학 응용"],
    career: ["2008 ~ 현재 숭실대학교 화학공학과 교수", "2002 ~ 2008 숭실대학교 환경화학공학과 부교수", "1993 ~ 1994 University of Minnesota 박사후연구원"]
  },
  {
    id: "kwon", name: "권혁회", title: "교수", field: "촉매공학, 대기오염관리공학, 반도체환경",
    tags: ["반도체", "배터리", "환경"],
    office: "형남공학관 902호", labName: "촉매 및 대기공학 연구실", labRoom: "형남공학관 818호",
    tel: "02-820-0618", email: "hkwon@ssu.ac.kr", labUrl: "",
    photo: "assets/faculty/권혁회.jpg",
    edu: ["학사 · 서울대학교 공업화학 (1989)", "석사 · 서울대학교 공업화학 (1991)", "박사 · University of Michigan, Chemical Engineering (1998)"],
    research: ["반도체 공정 가스(PFCs) 처리·농축 기술", "연료전지 전극촉매와 연료개질 촉매", "전이금속 탄화물·질화물 합성과 촉매 특성", "광촉매를 이용한 대기오염물질 제거", "분리막과 균질촉매를 결합한 미세오염물질 분해"],
    career: ["2012 ~ 현재 숭실대학교 화학공학과 교수", "2006 ~ 2012 숭실대학교 화학공학과 부교수", "1999 ~ 2001 숭실대학교 환경화학공학과 전임강사"]
  },
  {
    id: "park", name: "박경원", title: "교수", field: "에너지 나노 소재",
    tags: ["배터리"],
    office: "형남공학관 901호", labName: "에너지 소자 및 소재 연구실", labRoom: "형남공학관 817호",
    tel: "02-820-0613", email: "kwpark@ssu.ac.kr", labUrl: "https://www.energyssu.com/",
    photo: "assets/faculty/박경원.jpg",
    edu: ["학사 · 성균관대학교 재료공학전공 (1996)", "석사 · 광주과학기술원 신소재공학전공 (1998)", "박사 · 광주과학기술원 신소재공학전공 (2003)"],
    research: ["고효율·저비용 연료전지와 저온형 수전해", "차세대 이차전지 소자 및 소재", "나노구조 에너지 소재 합성과 전기화학 응용", "에너지 변환·저장 소자 설계"],
    career: ["2005 ~ 현재 숭실대학교 화학공학과 교수", "2004 ~ 2005 Pennsylvania State University 박사후연구원", "2012·2013·2015 숭실대학교 Best SFP 교수상"]
  },
  {
    id: "kim-iw", name: "김일원", title: "교수", field: "결정공학, 바이오재료",
    tags: ["바이오"],
    office: "형남공학관 909호", labName: "바이오재료공학 연구실", labRoom: "형남공학관 917호",
    tel: "02-820-0614", email: "iwkim@ssu.ac.kr", labUrl: "https://biomatlab.ssu.ac.kr",
    photo: "assets/faculty/김일원.jpg",
    edu: ["학사 · 서울대학교 공업화학 (1996)", "석사 · 서울대학교 공업화학 (1998)", "박사 · University of Michigan, Macromolecular Science & Engineering (2004)"],
    research: ["결정화 기술을 이용한 제약물질 설계", "약물 생체이용률 제어를 위한 제제 기술", "고분자로 제어하는 약물·바이오미네랄 결정화", "결정 성장 기작과 계면 현상 분석"],
    career: ["2007 ~ 현재 숭실대학교 화학공학과 교수", "2004 ~ 2007 New York University 화학과 연구원", "2021 ~ 현재 Pharmaceutics·PLOS ONE 편집위원"]
  },
  {
    id: "kim-yg", name: "김윤곤", title: "교수", field: "생물화학공학, 생체분자공학",
    tags: ["바이오"],
    office: "형남공학관 905호", labName: "세포 및 생체분자공학 연구실", labRoom: "형남공학관 823호",
    tel: "02-828-7099", email: "ygkim@ssu.ac.kr", labUrl: "http://cbelab.org/",
    photo: "assets/faculty/김윤곤.jpg",
    edu: ["학사 · 충남대학교 화학공학과 (2002)", "석사 · 서울대학교 생물화학공학 (2004)", "박사 · 서울대학교 생물화학공학 (2008)"],
    research: ["질병 진단·모니터링용 바이오마커 스크리닝", "차세대 체외진단(IVD) 시스템 개발", "바이오의약품 제조공정과 품질 평가", "장내 환경 모사 시스템과 host-microbe 상호작용", "항생제 내성균 제어 기술"],
    career: ["2012 ~ 현재 숭실대학교 화학공학과 교수", "2009 ~ 2012 Harvard University 박사후연구원", "2008 ~ 2009 Harvard Medical School 박사후연구원"]
  },
  {
    id: "jung", name: "정재현", title: "교수", field: "지능형 나노바이오소재, 계면공학, 약물전달학",
    tags: ["바이오"],
    office: "형남공학관 910호", labName: "하이브리드 나노바이오 공학 연구실 (HNB Lab)", labRoom: "형남공학관 819호",
    tel: "02-828-7043", email: "nfejjh@ssu.ac.kr", labUrl: "https://hnbssu.wixsite.com/hnblab",
    photo: "assets/faculty/정재현.jpg",
    edu: ["학사 · 연세대학교 화학공학전공 (2001)", "석사 · KAIST 생명화학공학전공 (2003)", "박사 · KAIST 생명화학공학전공 (2007)"],
    research: ["진단과 치료가 동시에 가능한 지능형 나노전달체", "유·무기 하이브리드 생체모방 소재", "세포 기반 3차원 바이오-액추에이터 소자", "오가노이드 기반 생체영향평가·코스메슈티컬"],
    career: ["2025.09 ~ 현재 숭실대학교 화학공학과 정교수", "2019.09 ~ 2025.08 숭실대학교 화학공학과 부교수", "2008 ~ 2013 University of Illinois Urbana-Champaign 박사후연구원"]
  },
  {
    id: "lim", name: "임태호", title: "부교수", field: "반도체 공정, 전기화학소재",
    tags: ["반도체", "배터리"],
    office: "형남공학관 908호", labName: "전기화학공정 연구실", labRoom: "형남공학관 814호",
    tel: "02-820-0617", email: "taeholim@ssu.ac.kr", labUrl: "https://limslabssu.wixsite.com/eplab",
    photo: "assets/faculty/임태호.jpg",
    edu: ["학사 · 서울대학교 화학생물공학부 (2007)", "석사 · 서울대학교 화학생물공학부 (2009)", "박사 · 서울대학교 화학생물공학부 (2013)"],
    research: ["반도체 배선·캡핑 공정과 금속박막 형성", "연료전지·수전해·CO₂ 전환용 전기촉매", "태양전지용 Si·비Si 무기 반도체", "재료의 전기화학적 특성 평가·분석"],
    career: ["2016 ~ 현재 숭실대학교 화학공학과 부교수", "2015 ~ 2016 University of Texas at Austin 박사후연구원", "2014 ~ 2015 Carnegie Mellon University 박사후연구원"]
  },
  {
    id: "kang", name: "강범구", title: "부교수", field: "기능성 고분자 정밀중합 및 응용",
    tags: ["고분자"],
    office: "형남공학관 903호", labName: "기능성 고분자 재료 연구실 (FPM Lab)", labRoom: "형남공학관 815호",
    tel: "02-820-0615", email: "bkang@ssu.ac.kr", labUrl: "https://kbgsjy.wixsite.com/fpm-ssu",
    photo: "assets/faculty/강범구.jpg",
    edu: ["학사 · 성균관대학교 고분자시스템공학과 (2005)", "석사 · 광주과학기술원 신소재공학부 (2007)", "박사 · 광주과학기술원 신소재공학부 (2012)"],
    research: ["리빙 중합 기반 기능성 고분자 합성", "블록·별·그래프트 공중합체 구조 설계", "고성능 열가소성 탄성체", "OLED·메모리용 고분자 전자 소재", "자기치유형 열가역 블록 공중합체"],
    career: ["2019 ~ 현재 숭실대학교 화학공학과 부교수", "2016 ~ 2019 LG화학 중앙연구소 책임연구원", "2015 ~ 2016 Princeton University 박사후연구원"]
  },
  {
    id: "lee", name: "이준협", title: "교수", field: "고분자공학, 디스플레이공학",
    tags: ["반도체", "고분자"],
    office: "형남공학관 911호", labName: "나노/마이크로 공학 연구실 (NMEL)", labRoom: "형남공학관 920호",
    tel: "02-829-8329", email: "junhyuplee@ssu.ac.kr", labUrl: "https://nmelssu.wixsite.com/nmelab",
    photo: "assets/faculty/이준협.jpg",
    edu: ["학사 · 서울대학교 응용화학부 (1999)", "석사 · 서울대학교 응용화학부 (2001)", "박사 · 서울대학교 응용화학부 (2005)"],
    research: ["접착제·필름·입자용 기능성 고분자 소재", "유기-무기 하이브리드와 고분자 나노복합체", "플렉시블 디스플레이 광학·봉지 소재", "양자점 디스플레이 소자 구조와 공정"],
    career: ["2020 ~ 현재 숭실대학교 화학공학과 교수", "2005 ~ 2012 삼성전자·삼성디스플레이 책임·수석연구원", "2013 ~ 2020 명지대학교 화학공학과 교수"]
  },
  {
    id: "eum", name: "엄기원", title: "부교수", field: "다공성 나노 소재, 에너지·환경 분리 흡착",
    tags: ["환경"],
    office: "형남공학관 906호", labName: "다공성 유·무기 나노 소재 연구실 (POINT Lab)", labRoom: "형남공학관 920호",
    tel: "02-829-8328", email: "kiwon.eum@ssu.ac.kr", labUrl: "https://sites.google.com/view/pointlab/home",
    photo: "assets/faculty/엄기원.jpg",
    edu: ["학사 · 고려대학교 화공생명공학과 (2009)", "석사 · 고려대학교 화공생명공학과 (2011)", "박사 · Georgia Institute of Technology, Chemical & Biomolecular Engineering (2016)"],
    research: ["MOF·제올라이트·규칙성 실리카 등 다공성 나노소재 설계", "후처리 개질을 통한 흡착·확산 특성 정밀 제어", "분리막·흡착제 기반 에너지 효율 분리 공정", "단결정 구조 분석과 기능성 박막 코팅"],
    career: ["2020 ~ 현재 숭실대학교 화학공학과 부교수", "2017 ~ 2019 University of Minnesota 박사후연구원", "2021 미원상사 신진과학자상 (한국공업화학회)"]
  },
  {
    id: "ahn", name: "안윤호", title: "부교수", field: "열역학, 가스 저장 및 분리, 에너지·환경 소재",
    tags: ["배터리", "환경"],
    office: "형남공학관 303-1호", labName: "에너지환경시스템 연구실 (EESL)", labRoom: "형남공학관 916호",
    tel: "02-829-8327", email: "yhahn@ssu.ac.kr", labUrl: "https://sites.google.com/view/ssueesl/home",
    photo: "assets/faculty/안윤호.jpg",
    edu: ["학사 · KAIST 생명화학공학과 (2012)", "석사 · KAIST 생명화학공학과 (2014)", "박사 · KAIST 생명화학공학과 (2017)"],
    research: ["클러스레이트 하이드레이트 기반 수소·천연가스 저장", "CH₄–CO₂ 치환과 온실가스 포집·격리", "중공사·섬유형 흡착제와 기체 분리막", "가스 하이드레이트의 열역학·속도론"],
    career: ["2026 ~ 현재 숭실대학교 화학공학과 부교수", "2020 ~ 2025 숭실대학교 화학공학과 조교수", "2018 ~ 2020 Georgia Institute of Technology 박사후연구원"]
  },
  {
    id: "jung-hw", name: "정호원", title: "조교수", field: "공정 모델링, 공정 통합·최적화, 탄소저감 공정",
    tags: ["환경"],
    office: "연구관 309호", labName: "공정통합·시스템모델링 연구실 (PRISM Lab)", labRoom: "형남공학관 821호",
    tel: "02-850-1492", email: "howoun@ssu.ac.kr", labUrl: "https://sites.google.com/view/ssu-prism",
    photo: "assets/faculty/정호원.jpg",
    edu: ["학사 · 고려대학교 화공생명공학과 (2016)", "석사 · KAIST 생명화학공학과 (2018)", "박사 · KAIST 생명화학공학과 (2023)"],
    research: ["화학공정 정밀 모델링과 시뮬레이션", "베이지안 최적화·머신러닝 기반 공정 설계", "CCUS와 직접공기포집(DAC) 공정", "에너지 통합과 지속가능 공정 최적화"],
    career: ["2026 ~ 현재 숭실대학교 화학공학과 조교수", "2025 ~ 2026 한국에너지기술연구원 선임연구원", "2023 ~ 2024 University of Southern California 박사후연구원"]
  },
  {
    id: "yang", name: "양태욱", title: "조교수 (교육중점)", field: "고분자재료, 결정공학 공정",
    tags: ["고분자"],
    office: "문화관 112호", labName: "", labRoom: "",
    tel: "02-828-7246", email: "taugi@ssu.ac.kr", labUrl: "",
    photo: "assets/faculty/양태욱.jpg",
    edu: ["학사 · 서울대학교 화학생물공학부 (2007)", "석사 · 서울대학교 화학생물공학부 (2009)", "박사 · 서울대학교 화학생물공학부 (2016)"],
    research: ["고분자 구조와 물성의 상관관계", "고분자–무기물 계면 상호작용과 결정 성장 제어"],
    career: ["2019 ~ 현재 숭실대학교 화학공학과 조교수", "2017 ~ 2019 숭실대학교 화학공학과 초빙교수", "2016 ~ 2018 서울대학교 화학공정신기술연구소 박사후연구원"]
  },
  {
    id: "park-ks", name: "박교식", title: "부교수 (특별임무중점)", field: "",
    tags: [],
    office: "전산관 217호", labName: "", labRoom: "",
    tel: "02-828-7346", email: "safetyguy@ssu.ac.kr", labUrl: "",
    photo: "assets/faculty/박교식.jpg",
    edu: [],
    research: [],
    career: []
  },
];

/* ----------------------------------------------------------------------------
   5. 교과과정 — 2024학년도 화학공학과 편성표
      구조: { year: 학년, term: 학기, type: 이수구분, code: 과목ID, name: 과목명,
              credit: 시간/학점, depth: 심화정도, desc: 강의 내용 }
   ---------------------------------------------------------------------------- */
const COURSES = [
  { year: 1, term: 1, type: "전기", code: "21505767", name: "공학수학1", credit: "3/3", depth: "핵심", desc: "공학의 기초가 되는 미분과 적분의 이론 및 그 응용을 배우는 과목으로 함수의 정의, 함수의 극한과 연속성, 도함수의 정의와 응용, 미분법, 적분 이론과 다양한 적분법, 초월함수의 미분과 적분, 편도함수와 그 응용 등의 주제를 다룬다." },
  { year: 1, term: 1, type: "전기", code: "21505778", name: "공학물리1", credit: "3/3", depth: "핵심", desc: "화학공학 전공의 기초가 되는 물리학 원리를 다루고, 공학 문제에 적용하는 훈련을 한다." },
  { year: 1, term: 1, type: "전선", code: "21505770", name: "공학화학1", credit: "3/3", depth: "핵심", desc: "화학공학을 전공하고자 하는 1학년 학생들을 위한 공학화학 강의로 화학 전 분야에 관한 기초적인 지식, 개념 및 원리를 제공한다." },
  { year: 1, term: 2, type: "전기", code: "21503537", name: "화공양론1", credit: "3/3", depth: "핵심", desc: "화학공정 계산의 기초가 되는 단위환산과 물질수지, 에너지수지의 개념을 다룬다." },
  { year: 1, term: 2, type: "전기", code: "21505668", name: "고급공학수학1", credit: "3/3", depth: "핵심", desc: "공학수학을 바탕으로 공학의 기본 및 응용 교과목에 나타나는 수학적 문제의 해결능력을 배양함과 아울러 공학에 있어서 수학의 역할 및 중요성을 인식시킨다. 강의 내용은 일계 및 이계 선형 미분방정식의 급수해, 라플라스변환, 푸리에해석으로 구성된다." },
  { year: 1, term: 2, type: "전선", code: "21505411", name: "공학화학2", credit: "3/3", depth: "핵심", desc: "화학의 기초 원리와 제 법칙에 대하여 강의하고 무기 및 유기공업화학의 기초가 되는 무기, 유기분야를 공부하여 화학의 이론과 기본법칙, 무기 및 유기분야에 관한 공업화학실험의 기초를 습득하고 연구한다." },
  { year: 1, term: 2, type: "전선", code: "21505410", name: "재료과학", credit: "3/3", depth: "핵심", desc: "재료의 본질적인 구조와 특성에 관한 기본적인 지식의 탐구와 이해로 공업재료의 적절한 선택과 응용력을 배양하는 데 중점을 두고 강의한다. 본 과목의 주요 강의내용은 다음과 같다. - 재료의 원자결합 및 구조, 평형상태도, 열처리, 금속재료, 세라믹 재료, 고분자 재료, 복합재료, 공업재료의 특성 및 선택." },
  { year: 1, term: 2, type: "전선", code: "21500966", name: "화공에너지입문", credit: "1/1", depth: "핵심", desc: "에너지의 생산·변환·저장 흐름과 화학공학이 담당하는 에너지 기술을 소개한다." },
  { year: 2, term: 1, type: "전기", code: "21502262", name: "화공양론2", credit: "3/3", depth: "핵심", desc: "화학공장에서 발생하는 전반적 문제해결의 기초가 되는 물질수지, 에너지수지 등 실제 화학공장에서 수반되는 문제를 응용하여 습득케 하고 화학공정에 대한 기초개념과 계산능력을 기르게 한다." },
  { year: 2, term: 1, type: "전필", code: "21502858", name: "화공기초실험1", credit: "2/1", depth: "핵심", desc: "화학공학과 공업화학에서 다루게 되는 각종 시료에서 특정 성분의 함량을 측정하는 방법을 다룬다. 중량분석과 부피분석법을 적용하게 되므로 화학평형, 농도계산법, 용해도, 침전, 각종분리조작법, 화학천칭, 시료채취법에 관한 기본지식 및 원리의 이해가 필요하다. 또한 화학실험에서 사용되는 각종 실험기구의 취급법을 숙지할 필요가 있다. 질량분석에서는 각종 원소들을 정량하고 부피분석에서는 산⋅염기 적정, 침전적정, 착화학물 및 산화⋅환원적정에 관하여 실험한다." },
  { year: 2, term: 1, type: "전선", code: "21501146", name: "공업유기화학1", credit: "3/3", depth: "핵심", desc: "기본유기화학물의 합성법, 구조와 성질 및 반응기구를 개관하며 기초유기화학을 화학공업과 연관시켜 강의한다. 또한, 유기화학에 있어서 기본이 되는 반응을 단위공정별로 그 반응기구, 열역학적 고찰, 합성공정 및 공업적 응용에 관하여 강의한다." },
  { year: 2, term: 1, type: "전선", code: "21501132", name: "공업물리화학1", credit: "3/3", depth: "핵심", desc: "화학공학과 환경공학 전반에 걸쳐 기초가 되는 필수적 법칙과 이론을 강의한다. 주요 학습 내용은 열역학 법칙들과 기체상태 방정식, 순수한 물질의 물리적 변환과 상평형도의 이해, 혼합물과 화학평형 등의 기초이론을 포함하며 다양한 현상들의 수학적 표현과 해석법을 다룬다." },
  { year: 2, term: 1, type: "전선", code: "21503538", name: "환경에너지공학개론", credit: "3/3", depth: "핵심", desc: "환경과 인간의 생활, 환경공학의 중요성, 환경공학자의 역할 등을 소개하고, 수질, 대기 그리고 토양 등과 관련된 환경오염의 처리 방법 등 환경공학 전반에 관한 기초 개념들을 습득하도록 한다." },
  { year: 2, term: 2, type: "전필", code: "21502895", name: "화공기초실험2", credit: "2/1", depth: "핵심", desc: "화학공학과 공업화학에서 다루게 되는 각종 시료에서 특정 성분의 함량을 측정하는 방법을 다룬다. 중량분석과 부피분석법을 적용하게 되므로 화학평형, 농도계산법, 용해도, 침전, 각종분리조작법, 화학천칭, 시료채취법에 관한 기본지식 및 원리의 이해가 필요하다. 또한 화학실험에서 사용되는 각종 실험기구의 취급법을 숙지할 필요가 있다. 질량분석에서는 각종 원소들을 정량하고 부피분석에서는 산⋅염기 적정, 침전적정, 착화학물 및 산화⋅환원적정에 관하여 실험한다." },
  { year: 2, term: 2, type: "전필", code: "21505614", name: "반응공학", credit: "3/3", depth: "핵심", desc: "균질반응(액상 및 기상, 단일 및 복합반응)을 수행하는 이상형 반응기와 관련된 기본적인 지식을 얻고 이를 활용하여 반응기를 설계하는 기법을 다룬다." },
  { year: 2, term: 2, type: "전선", code: "21500405", name: "공업유기화학2", credit: "3/3", depth: "핵심", desc: "공업유기화학2 에서는 유기화합물의 구조에 대한 이해 및 공업유기화학1에서 다루지 않았던 다양한 종류의 화학반응을 다룬다. 또한 벤젠고리를 포함하고 있는 방향족 화합물의 특성을 다루며, 알코올, 카르보닐, 방향족 화합물의 유도체를 만드는 반응을 배우며 자유라디칼에 대한 기본적인 개념 및 반응을 배운다." },
  { year: 2, term: 2, type: "전선", code: "21503486", name: "수처리공학", credit: "3/3", depth: "핵심", desc: "생활하수, 공장폐수 및 침출수 등에 대한 오염부하와 오염이 미치는 일반적인 현상 및 이들을 처리하여 환경을 보전하는 방법을 공학에 바탕을 두고 강의한다." },
  { year: 2, term: 2, type: "전선", code: "21505557", name: "선형대수", credit: "3/3", depth: "핵심", desc: "화학공학을 포함한 대부분의 순수과학과 응용 공학 분야에서의 물리, 화학적 현상들을 해석하고, 그 현상을 논리적으로 규명하며 그 결과를 응용하는데 필요한 수학적 지식을 습득하고, 응용력을 배양하는데 목표를 둔다. 공학적 수요가 많은 백터의 미적분과 선형대수학을 위주로 강의한다." },
  { year: 2, term: 2, type: "전선", code: "21506203", name: "공업물리화학2", credit: "3/3", depth: "핵심", desc: "화학공학과 환경공학 전반에 걸쳐 일어나는 여러 반응을 체계적으로 다루기 위한 기초이론을 강의한다. 분자운동론, 여러 가지 화학반응 속도론을 다루며 수식을 이용해 표현하고 해석하는 방법을 습득한다. 고체 표면을 이해하고 거기에서의 여러 가지 프로세스를 강의한다." },
  { year: 3, term: 1, type: "전필", code: "21504362", name: "화학공학실험", credit: "2/1", depth: "핵심", desc: "화학공학의 기초가 되는 물성 즉, 밀도, 점성도, 굴절율, 증기압 등의 측정방법 및 기술을 습득하기 위한 실험이다. 또한, 유체역학 및 전열공학에서 다루는 유체의 유동과 전열에 대한 이론을 Reynold실험, 유체유동실험, 열전도도 및 계수측정 등의 실험을 통하여 익힌다." },
  { year: 3, term: 1, type: "전필", code: "21503253", name: "화공유체역학", credit: "3/3", depth: "핵심", desc: "유체에 대한 일반이론, 즉 유체의 특성 및 거동, 유체의 마찰손실, 수송 및 혼합 등에 관한 여러 가지 이론과 현장에서 많이 사용하는 장치들의 원리와 특성 등에 관해 교육한다." },
  { year: 3, term: 1, type: "전필", code: "21502265", name: "화공열역학1", credit: "3/3", depth: "핵심", desc: "열역학의 기본법칙 응용으로서 열역학성질의 규명, 상평형 및 화학평형, 에너지 변환의 실태를 연관시켜 강의한다." },
  { year: 3, term: 1, type: "전선", code: "21500406", name: "화공통계및수치해석", credit: "3/3", depth: "핵심", desc: "화학공학 분야에 필요한 다양한 수치 해석 이론 및 기법을 소개하고, 프로그래밍을 통해 화학공학의 중요한 문제들에 적용하는 방법을 다룬다." },
  { year: 3, term: 1, type: "전선", code: "21505165", name: "고분자화학", credit: "3/3", depth: "심화", desc: "고분자물질의 분자구조 및 특성, 합성고분자의 중합반응에 있어서 반응기구와 공정, 고분자의 물성, 즉 열적, 기계적, 전기적 성질 및 플라스틱의 성형, 고분자의 분석 및 시험법 등 고분자 전반에 관하여 강의한다." },
  { year: 3, term: 1, type: "전선", code: "21504363", name: "촉매공학", credit: "3/3", depth: "심화", desc: "균질반응계의 이론을 토대로 비기초 반응, 비등온 반응, 비정상상태 반응계의 해석을 도입하여 촉매반응기를 설계하는 기법을 다룬다." },
  { year: 3, term: 1, type: "전선", code: "21500407", name: "생물분자공학", credit: "3/3", depth: "심화", desc: "생물 분자에 대한 기본적인 정의 및 생체 내/외에서의 생리 활성 작용 이해를 목표로 함. 또한 단백질 생산 및 분리정제 시스템, 단백질 의약 제제, 그리고 생물촉매인 효소의 특성과 효소의 반응속도 등에 대한 기본 개념을 소개한다." },
  { year: 3, term: 2, type: "전필", code: "21501165", name: "공정제어", credit: "3/3", depth: "핵심", desc: "여러 가지 화학공정계의 독특성에 관한 기초지식과 기본적인 제어이론을 강의하고 공정제어계의 이론적인 해근방법 및 안전성에 관한 문제를 광범위하게 취급한다. 각종 제어장치의 원리, 구조, 특성 및 변수결정법을 강의한 다음, 간단한 공정에의 응용에서 시작하여 복잡한 화학공장의 주요 공정에 적용하는 문제에 이르기까지 다양한 과제를 소개하여 이론과 실제의 연결을 이해시킨다." },
  { year: 3, term: 2, type: "전선", code: "21503652", name: "기기분석", credit: "3/3", depth: "심화", desc: "각종 화학물질의 물성에 대한 정량 및 정성분석을 수행한다. 여러 종류의 기기에 대한 측정원리와 작동방법을 이해하고, 실제로 이들 기기를 사용하여 물성측정과 분석을 수행함으로써 앞으로 현장에서 각 기기의 활용이 가능하도록 지도한다" },
  { year: 3, term: 2, type: "전선", code: "21502266", name: "화공열역학2", credit: "3/3", depth: "심화", desc: "열역학의 기본법칙 응용으로서 열역학성질의 규명, 상평형 및 화학평형, 에너지 변환의 실태를 연관시켜 강의한다." },
  { year: 3, term: 2, type: "전선", code: "21504364", name: "화공기기분석실험", credit: "2/1", depth: "심화", desc: "대기와 수중에 존재하는 유해물질의 특성을 이해하고, 유해물질의 종류에 따라서 정량과 정성을 하는 방법을 강의한다. 또한 이러한 유해물질이 인체에 미치는 영향에 대하여 고찰하고, 특성을 파악하는데 있다. 유해물질을 분석하기 위한 여러 가지 기기를 사용하며, 기기의 특성에 따른 한계농도 등에 대하여 강의한다. 주요 기기로는 TOC, UV photospectrometer, AA, HPLC 그리고 Turbidity meter등의 사용방법도 습득하게 된다." },
  { year: 3, term: 2, type: "전선", code: "21500431", name: "유기재료공학", credit: "3/3", depth: "심화", desc: "합성수지, 합성고무 및 합성섬유 등 유기재료의 제법, 성질, 가공법 등에 대하여 강의한다" },
  { year: 3, term: 2, type: "전선", code: "21501770", name: "열및물질전달", credit: "3/3", depth: "핵심", desc: "열에대한 흐름에 대한 이론과 원리 및 그에 관련된 장치의 구조와 설계 방법을 강의한다" },
  { year: 3, term: 2, type: "전선", code: "21508006", name: "반도체공학", credit: "3/3", depth: "심화", desc: "반도체의 기본적인 물리적인 특성을 이해하고, 반도체에 기초한 전자소자 (pn접합 다이오드, 전계 트랜지스터)의 구동원리를 배운다. 또한 반도체 공정의 기초를 학습한다." },
  { year: 3, term: 2, type: "전선", code: "21504091", name: "신재생에너지공학", credit: "3/3", depth: "심화", desc: "태양전지, 연료전지, 바이오매스 등 신재생 에너지 변환·저장 기술의 원리와 시스템을 다룬다." },
  { year: 4, term: 1, type: "전선", code: "21506554", name: "종합설계1", credit: "3/3", depth: "심화", desc: "공장설계의 설계, 비용후산, 투자비의 경제변화 및 공정의 선택 등의 기술면, 최적설계 방법 등을 강의한다." },
  { year: 4, term: 1, type: "전선", code: "21500408", name: "고분자물성", credit: "3/3", depth: "심화", desc: "고분자의 분자량, 결정화 및 형태학, 유리 전이 온도와 녹는점, 고분자 용액, 그리고 점성 및 탄성을 중심으로 고분자 물성의 기초를 익힌다." },
  { year: 4, term: 1, type: "전선", code: "21503484", name: "분리공정", credit: "3/3", depth: "심화", desc: "화학공업에서 행해지는 물리적 분리조작, 즉 정류, 추출, 흡수, 흡착 등에 관련 이론과 실제장치를 설계, 제작할 수 있는 기법을 강의한다." },
  { year: 4, term: 1, type: "전선", code: "21503487", name: "공정시스템", credit: "3/3", depth: "심화", desc: "공정 시스템은 일반적으로 공업적인 공정의 최적화를 위한 관련분야에 대한 설계를 목적으로 한다. 특히 기초설계공정에서의 여러 가능한 공정의 취사선택을 위한 각 공정의 최적화, 또한 이에 필요한 여러 고급 최적화 기술 및 전산기를 이용한 공정모사기법의 훈련 등이 교과목의 근간을 이룬다." },
  { year: 4, term: 1, type: "전선", code: "21503650", name: "생물화학공학", credit: "3/3", depth: "심화", desc: "생명공학과 관련된 유전자공학, 세포배양기술, 신의약 생산기술 등에 대한 전반적인 이해와 생명공학과 화학공학을 접목시킨 생물화학공학 분야에 대한 기초 지식들을 강의한다. 효소공학, 세포이용 생물공정, 발효공학, 생물질 분리공정 등 생물공정의 공학적 측면을 강의한다." },
  { year: 4, term: 1, type: "전선", code: "21502538", name: "석유및정밀화학", credit: "3/3", depth: "심화", desc: "석유화학공업, 즉 석유화학의 원료 및 이를 출발 원료로 하는 석유화학제품과 또한 이와 관련된 유기공업화학에 관련된 제 분야를 강의한다." },
  { year: 4, term: 1, type: "전선", code: "21503651", name: "대기오염방지공학", credit: "3/3", depth: "심화", desc: "각종 대기오염의 발생 및 그 영향과 이들의 확산을 통한 이동에 대한 이론을 강의하고 이를 저감 및 처리하는 방법을 다룬다" },
  { year: 4, term: 1, type: "전선", code: "21500774", name: "전기화학에너지공학", credit: "3/3", depth: "심화", desc: "전기화학의 기초 원리와 함께 전지·연료전지·수전해 소자의 재료와 성능 평가를 다룬다." },
  { year: 4, term: 2, type: "전선", code: "21500411", name: "종합설계2", credit: "3/3", depth: "심화", desc: "화학공학에서 배운 이론과 실습을 바탕으로 실제 제조공정이나 처리공정에 대한 시스템을 설계하고 분석할 수 있는 능력을 배양한다." },
  { year: 4, term: 2, type: "전선", code: "21500409", name: "안전및방재공학", credit: "3/3", depth: "심화", desc: "화학공정의 안전성을 확보하여 화학공업의 방재 시스템을 구축하는 방법을 소개하고, 국내외 최신 안전관리 기술을 강의한다." },
  { year: 4, term: 2, type: "전선", code: "21500966", name: "미래전지공학", credit: "3/3", depth: "심화", desc: "리튬이온 이후의 차세대 이차전지 소재와 소자 설계, 안전성 이슈를 다룬다." },
  { year: 4, term: 2, type: "전선", code: "21504106", name: "나노소재공학", credit: "3/3", depth: "심화", desc: "나노소재의 합성과 구조·물성 분석, 그리고 소자 응용까지의 흐름을 다룬다." },
  { year: 4, term: 2, type: "전선", code: "21501877", name: "이동현상", credit: "3/3", depth: "심화", desc: "화학공학과정에서 접할 수 있는 운동량, 에너지 및 물질전달 현상에 관한 기본적인 이해와 아울러 이들 전달현상을 이론적으로 규명하고 해석함으로써 화학공정의 성능을 개선할 수 있는 화학공학자의 이론적인 배경을 구축하는 것이 목적이다. 여러 종류의 유체에 관련된 유체역학, 정상상태와 비정상 상태에서의 열전달 및 물질전달 현상을 이론적으로 해석하여 공정상의 문제 해결방법을 습득하도록 강의한다." },
  { year: 4, term: 2, type: "전선", code: "21500410", name: "콜로이드계면화학", credit: "3/3", depth: "심화", desc: "콜로이드계면공학은 콜로이드와 계면의 특성에 대한 체계적인 이해를 바탕으로 생활공간은 물론 의약학 및 화장품 등 첨단산업기술에 적용 가능한 콜로이드와 계면을 화학공학적 관점에서 다룬다. 콜로이드계면공학은 '계면에너지와 구조', '분자구조와 배향', '계면전기 현상', '초분자 결집체', '표면과 필름' 및 '콜로이드와 비평형 분산'에 대한 기본적인 개념을 이해하고 실제 산업기술 및 제품에 응용할 수 있는 능력을 함양한다." },
];

/* ----------------------------------------------------------------------------
   6. 졸업요건 — 단일전공 / 2021~2022학년도 입학자 기준 (학과 홈페이지 졸업요건 안내)
   ---------------------------------------------------------------------------- */
const GRADUATION = {
  total: 133,
  rows: [
    { label: "교양 필수", value: 16 },
    { label: "교양 선택", value: 12 },
    { label: "전공 기초", value: 18 },
    { label: "전공 선택·필수", value: 66 },
    { label: "일반 선택", value: 21 }
  ],
  note: "복수전공자는 주전공 42학점·복수전공 42학점을 이수합니다. 입학 학년도에 따라 기준이 다르므로 학과 졸업요건 페이지를 확인하세요."
};

/* ----------------------------------------------------------------------------
   7. 공지사항 — 최신순으로 정렬되어 있습니다. (pinned: 상단 고정 중요 공지)
      · 새 공지를 추가할 때는 배열 맨 앞에 아래 형식으로 한 줄만 넣으면 됩니다.
        { date: "2026-11-12", title: "제목", author: "관리자", views: 0, pinned: false, url: "원문 주소" }
      · 학부 / 대학원 / 취업·인턴십 세 게시판을 각각 관리합니다.
   ---------------------------------------------------------------------------- */
const NOTICES = {
  undergrad: [
    { date: "2026-11-10", title: "2026-2학기 AX특성화학과 비교과프로그램 학과세미나 일정 안내: 2차", author: "관리자", views: 138, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=783" },
    { date: "2026-10-23", title: "2026-2학기(2027년 2월 졸업대상자) 대체 서류 제출 안내: 기한 11/16(월) ~ 12/21(월)", author: "관리자", views: 424, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=782" },
    { date: "2026-10-15", title: "2026 제44회 형남과학상 공모전: 참가접수 10/13(화) ~11/13(금)", author: "관리자", views: 447, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=781" },
    { date: "2026-05-27", title: "2026학년도 교과과정 변경 안내: 교과목 변경표", author: "관리자", views: 2504, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=772" },
    { date: "2026-01-02", title: "[중요] 2025-2학기 진로지도상담 여부 백마성적장학금 미반영 안내", author: "관리자", views: 5814, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=759" },
    { date: "2025-03-06", title: "2026년 2학기 작업형 대여 안내(2026.09.01~2027. 2. 28)", author: "관리자", views: 5549, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=737" },
    { date: "2024-10-11", title: "2026학년도 2학기 학부 논문심사 안내", author: "관리자", views: 1003, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=720" },
    { date: "2023-08-09", title: "[중요] 현장실습학기제 전공학점 인정 변경 안내: 시행시기 2023-2학기", author: "관리자", views: 3331, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=662" },
    { date: "2018-06-25", title: "[화공인재양성장학금] 규정 및 수상자 명단 안내", author: "관리자", views: 5340, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=319" },
    { date: "2026-09-28", title: "2026 전기화학공정연구실 (임태호 교수님) 대학원 신입학생 모집", author: "관리자", views: 696, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=780" },
    { date: "2026-09-02", title: "[화학공학과] 2026-2학기 전공과목 증원 안내: 공업유기화학2", author: "관리자", views: 769, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=779" },
    { date: "2026-08-28", title: "[화학공학과] 2026-2학기 전공과목 증원 안내: 화공열역학2", author: "관리자", views: 651, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=778" },
    { date: "2026-08-19", title: "2026학년도 이도영 장학금 신청 안내: 신청기간 8/24(월) ~ 9/9(수) 근무시간중", author: "관리자", views: 849, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=777" },
    { date: "2026-08-19", title: "2026학년도 2학기 한국장학재단 국가장학금 2차 신청 안내 : 기간  2026.08.12.(수) 09:00~2026.09.09.(수) 18:00", author: "관리자", views: 551, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=776" },
    { date: "2026-07-21", title: "2026학년도 2학기 학과근로장학생 모집 안내:  2026년 8월 3일(월) 10:00 ~ 8월 7일(금) 17:00", author: "관리자", views: 1027, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=775" },
    { date: "2026-07-02", title: "2026학년도 2학기 백마성적장학금 학과선발 기준 안내", author: "관리자", views: 1419, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=774" },
    { date: "2026-06-08", title: "2026-여름방학 AX특성화학과 비교과 프로그램(신청: 6/8(월)~6/14(일))", author: "관리자", views: 2193, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=773" },
    { date: "2026-05-21", title: "2026-2학기 교내장학금 신청 안내", author: "관리자", views: 768, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=771" },
    { date: "2026-05-21", title: "2026학년도 2학기 한국장학재단 국가장학금 1차 신청 안내: 2026.05.22.(금) 9:00~2026.06.22.(월) 18:00까지", author: "관리자", views: 1341, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=770" },
    { date: "2026-05-14", title: "2026-여름방학 학부연구생 모집(박경원 교수 연구실): 신청기한 ~5/22(금)까지", author: "관리자", views: 1008, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=769" },
    { date: "2026-05-14", title: "2026-1학기 특성화학과 비교과 프로그램(화학공학과세미나)_2,3차", author: "관리자", views: 762, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=768" },
    { date: "2026-05-07", title: "2026-1학기 논문 및 대체 서류 제출 안내", author: "관리자", views: 1671, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=767" },
    { date: "2026-05-04", title: "2026-1학기 특성화학과 비교과 프로그램(화학공학과세미나)", author: "관리자", views: 812, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=766" },
    { date: "2026-03-30", title: "2026-1학기 공업유기화학1 중간고사 일정 안내: 4월 28일(화) 오후 8:00 백마관 308호, 403호", author: "관리자", views: 1360, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=765" },
    { date: "2026-03-20", title: "2026-1학기 (주)제일하이텍 장학생 신청 안내: 신청기간 2026. 03. 23(월) ~ 2026. 04. 03(금) 10:00~17:00", author: "관리자", views: 1336, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=764" },
    { date: "2026-03-06", title: "2026-1학기 전공강의 강의실 변경 안내: 3월 6일 기준", author: "관리자", views: 1742, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=763" },
    { date: "2026-03-04", title: "2026-1학기 전공과목 증원 안내: 3월 9일 수강신청 가능", author: "관리자", views: 1758, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=762" },
    { date: "2026-02-26", title: "2026-1학기 전공과목 증원 안내: 3월 3일 수강신청 가능", author: "관리자", views: 2102, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=761" },
    { date: "2026-01-09", title: "2026학년도 1학기 백마성적장학금 자격요건 안내", author: "관리자", views: 4318, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=760" },
    { date: "2025-12-30", title: "2025-2학기 논문 및 논문대체서류 제출 명단 안내: 미입력 문의 ~12/31(수) 15:00", author: "관리자", views: 3709, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=758" },
    { date: "2025-12-19", title: "[교외장학 신청]  2026년도 선암장학재단 장학생 선발 신청: ~1/7(수)", author: "관리자", views: 3169, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=757" },
    { date: "2025-12-15", title: "2025-겨울방학 특성화학과 비교과 프로그램(신청: 12/12(금)~12/17(수))", author: "관리자", views: 3794, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=756" },
    { date: "2025-11-26", title: "2025-겨울방학 학부연구생 모집(박경원 교수 연구실): 신청기한 ~12/3(수)까지", author: "관리자", views: 4045, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=755" },
    { date: "2025-11-25", title: "2026학년도 1학기 한국장학재단 국가장학금 1차 신청 안내: 11/20(목) ~ 12/26(금) 18:00", author: "관리자", views: 3241, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=754" },
    { date: "2025-11-06", title: "우수기업 현직자와 함께하는 일자리 수요데일 [주]유한양행: 신청기한 10/29 ~ 11/10(월)", author: "관리자", views: 4862, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=753" },
    { date: "2025-11-04", title: "2025-2학기 특성화학과 비교과 프로그램(화학공학과세미나)", author: "관리자", views: 4387, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=751" },
    { date: "2025-10-15", title: "2025학년도 제43회 형남과학상 공모전: 신청기간 10/13(월) ~ 11.07(금) 17:00", author: "관리자", views: 4419, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=750" },
    { date: "2025-09-29", title: "2025-2학기 논문심사 안내", author: "관리자", views: 3510, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=749" },
    { date: "2025-09-29", title: "2025-2학기(2026년 3월 졸업대상자) 논문대체 서류 제출 안내", author: "관리자", views: 3472, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=748" },
    { date: "2025-08-11", title: "2025-2학기 전공과목 증원 안내: 8월 28일 반영", author: "관리자", views: 3659, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=747" },
    { date: "2025-07-29", title: "2025-2학기 학과근로 모집 안내: 지원 및 서류제출기간 8/4(월) 10:00 ~ 8/8일(금) 17:00", author: "관리자", views: 3935, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=746" },
    { date: "2025-07-23", title: "2025학년도 1학기 논문 및 논문대체서류 제출 명단 안내: 7월 22일 기준", author: "관리자", views: 1954, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=745" },
    { date: "2025-07-08", title: "2025학년도 2학기 백마성적우수장학생 학과선발 기준 안내", author: "관리자", views: 3988, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=744" },
    { date: "2025-06-24", title: "제약바이오 GMP 챌린지 리그: 신청기간 6/6~6/27", author: "관리자", views: 3962, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=743" },
    { date: "2025-06-20", title: "2025학년도 이도영 장학금 신청 안내: 8/1(금)~ 8/29(금)", author: "관리자", views: 3714, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=742" },
    { date: "2025-06-12", title: "2025-여름방학 특성화학과 비교과 프로그램(신청: 6/12(목)~6/15(일))", author: "관리자", views: 4388, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=741" },
    { date: "2025-06-02", title: "2025-여름방학 학부연구생 모집(박경원 교수 연구실): 신청기한 ~6/5(목)까지", author: "관리자", views: 4202, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=739" },
    { date: "2025-05-01", title: "2025-1학기(2025년 8월 졸업대상자) 논문대체 서류 제출 안내: 5/21~6/24(화)", author: "관리자", views: 3766, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=738" },
    { date: "2025-03-06", title: "2025-1학기 전공과목 증원 안내: 처리일자 3월 7일 16시", author: "관리자", views: 713, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=736" },
    { date: "2025-02-18", title: "2025-1학기 전공과목 증원 안내: 증원처리 일자 2월 27일(목)", author: "관리자", views: 1357, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=735" },
    { date: "2025-01-24", title: "2025학년도 1학기 학과근로장학생 모집 안내: 신청 및 제출기한 2/3(월) ~ 2/7(금) 17:00", author: "관리자", views: 964, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=734" },
    { date: "2025-01-14", title: "2025-1학기 백마성적우수장학 학과선발 기준 안내", author: "관리자", views: 1221, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=733" },
    { date: "2025-01-10", title: "화학공학과, ‘2024년 지역연계형 수소산업 혁신인재양성사업’ 장학금 수여식 개최", author: "관리자", views: 2978, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=732" },
    { date: "2024-12-27", title: "2025년 2월 졸업예정자 졸업논문 성적 입력 현황 안내: 이의 및 문의기한 ~12/31(화)", author: "관리자", views: 1008, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=731" },
    { date: "2024-12-17", title: "2025년도 선암장학재단 장학생 신청 안내: 신청기한 1월 6일(월)", author: "관리자", views: 668, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=730" },
    { date: "2024-12-13", title: "2024년 지역연계형 수소산업 혁신인재양성사업 장학생 선발 결과 발표(2차)", author: "관리자", views: 2805, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=729" },
    { date: "2024-12-11", title: "2024-겨울방학 특성화학과 비교과 프로그램(신청: 12/13(금)~12/17(화) 오후 3시까지)", author: "관리자", views: 1140, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=728" },
    { date: "2024-12-05", title: "2024년 지역연계형 수소산업 혁신인재양성사업 장학생 선발(12/5(목)-12/10(화) 17:00)", author: "관리자", views: 2769, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=727" },
    { date: "2024-11-25", title: "2024학년도 특성화학과 학생만족도 조사 실시(~12/21(토))", author: "관리자", views: 2173, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=726" },
    { date: "2024-11-22", title: "2025학년도 1학기 한국장학재단 국가장학금 1차 신청 안내: 신청기간  2024.11.21.(목) 09:00~2024.12.26.(목) 18:00", author: "관리자", views: 705, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=725" },
    { date: "2024-11-13", title: "2024-2학기 특성화학과 비교과 프로그램(사전신청: ~11/22(금)까지)_화학공학과 세미나(4차)", author: "관리자", views: 2530, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=724" },
    { date: "2024-11-05", title: "2025 다공성 유 무기 나노소재 연구실 (엄기원 교수님) 대학원생 및 학부생 모집", author: "관리자", views: 2477, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=723" },
    { date: "2024-10-31", title: "[2차 장학생 선발 기준] 2024년 지역연계형 수소산업 혁신인재양성사업 장학생_선발일정: 추후안내예정", author: "관리자", views: 2490, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=722" },
    { date: "2024-10-17", title: "[한국수소연합] 제3회 수소의날 및 수소WEEK 개최_2024년 지역연계형 수소산업 혁신인재양성사업", author: "관리자", views: 958, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=721" },
    { date: "2024-10-11", title: "2024학년도 2학기 논문대체 자격 서류 제출 안내: 제출기간 11/1~12/20", author: "관리자", views: 1330, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=719" },
    { date: "2024-10-08", title: "2024-2학기 특성화학과 비교과 프로그램(사전신청: ~10/10(목) 15:00 까지)_화학공학과 세미나", author: "관리자", views: 2230, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=718" },
    { date: "2024-09-13", title: "2024년 지역연계형 수소산업 혁신인재양성사업 장학생 선발 결과 발표", author: "관리자", views: 2754, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=717" },
    { date: "2024-09-03", title: "2024-2학기 수강정정기간 증원 안내: 9월 6일(금) 10:00", author: "관리자", views: 770, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=715" },
    { date: "2024-09-02", title: "2024학년도 이도영 장학금 신청 안내: 9/3(수) ~ 9/13(금) 10:00~17:00", author: "관리자", views: 2379, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=714" },
    { date: "2024-09-02", title: "2024-2학기수강정정기간 증원 안내: 수강신청 가능일 9월 3일(화) 10:00", author: "관리자", views: 2302, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=713" },
    { date: "2024-08-28", title: "2024년 지역연계형 수소산업 혁신인재양성사업 장학생 선발(9/2(월)-9/11(수) 09:00~17:00)", author: "관리자", views: 2997, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=712" },
    { date: "2024-08-14", title: "2024년 8월 졸업자 명단 및 학위증 수령 안내", author: "관리자", views: 944, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=711" },
    { date: "2024-08-09", title: "[대학원 과목 신규개설] 산학연계-수소에너지", author: "관리자", views: 2507, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=710" },
    { date: "2024-08-09", title: "2024학년도 2학기 한국장학재단 국가장학금 2차 신청 안내: 신청기간 8/14(수) ~ 9/11(수)", author: "관리자", views: 431, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=709" },
    { date: "2024-08-08", title: "2024학년도 2학기 창업지원단 개설 교과목 안내", author: "관리자", views: 407, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=708" },
    { date: "2024-08-07", title: "2024학년도 숭실인재양성장학생 모집 공고: 지원기한 ~8/14(수) 17:00", author: "관리자", views: 478, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=707" },
    { date: "2024-08-07", title: "2024학년도 2학기 수강신청 정정기간 증원 교과목 안내: 수강신청 가능일자 9월 2일(월) 10:00", author: "관리자", views: 3182, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=706" },
    { date: "2024-07-26", title: "2024학년도 2학기 학과근로 장학생 선발: 신청 및 지원서 제출기간 8/1(월) 10:00 ~ 8/7(금) 17:00", author: "관리자", views: 427, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=705" },
    { date: "2024-07-22", title: "2024-2학기 백마성적우수장학 학과선발 규정 안내", author: "관리자", views: 771, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=704" },
    { date: "2024-07-04", title: "2024년 8월 졸업대상자 졸업논문 및 대체서류 제출 명단 안내: 7월 4일 기준", author: "관리자", views: 961, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_01.php?boardid=notice1&mode=view&idx=703" }
  ],
  grad: [
    { date: "2024-10-23", title: "2025학년도 전기 정시모집 면접고사 면접조 및 대기시간 안내", author: "관리자", views: 1889, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=62" },
    { date: "2023-02-07", title: "2023학년도 1학기 논문지도교수 위촉 및 변경 안내: 제출기한 3/1~3/9", author: "관리자", views: 4894, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=60" },
    { date: "2023-02-06", title: "2023학년도 1학기 연구 등록: 3/15~17(금)", author: "관리자", views: 4298, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=59" },
    { date: "2023-01-18", title: "2023-1학기 입학성적우수장학금 및 일반장학금 수혜자 소득증빙 서류 제출 안내: ~1/20(금)", author: "관리자", views: 4315, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=58" },
    { date: "2021-06-29", title: "2021-2학기 영구수료 해제(학위논문 제출가능연한 연장) 신청 안내", author: "관리자", views: 6243, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=57" },
    { date: "2020-02-06", title: "일반대학원 외국어시험 폐지 안내: 2020년 8월 졸업자부터 적용", author: "관리자", views: 2696, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=37" },
    { date: "2025-04-22", title: "[채용 공고] 전주대학교 과학교육과 화학 분야 신임 교수 초빙 안내", author: "관리자", views: 595, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=63" },
    { date: "2021-06-04", title: "제 2회 숭실 스마트 산학융합 공모전", author: "관리자", views: 4633, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=56" },
    { date: "2021-05-21", title: "(한국연구재단) 2021년 한국 이공계 대학원생 캐나다 연수사업 2차 공모 안내", author: "관리자", views: 4420, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=55" },
    { date: "2021-05-20", title: "2021-2 석·박사통합과정 지원 및 선발 안내", author: "관리자", views: 4506, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=54" },
    { date: "2021-04-20", title: "[현대차 정몽구 스칼러십  2021 온드림 미래산업 인재 학부/대학원 장학생 선발]", author: "관리자", views: 2215, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=53" },
    { date: "2020-10-12", title: "제38회 형남과학상 공모 안내(★신청기간: 10.12.(월)~10.22.(목) 17:00까지)", author: "관리자", views: 1895, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=52" },
    { date: "2020-09-08", title: "[한국화학공학회] 2020년도 가을 총회 및 학술대회: 10/14~10/16 (온라인 개최)", author: "관리자", views: 1091, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=51" },
    { date: "2020-09-01", title: "2020년 제16회 삼성전기 논문대상 공모 안내: 초록접수 9/1~9/21", author: "관리자", views: 1008, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=50" },
    { date: "2020-08-06", title: "숭실대학교 산학협력단 청년TLO 참가자(전임연구원 채용) 모집 공고: 신청기간 ~ 8/17(월)", author: "관리자", views: 1062, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=49" },
    { date: "2020-08-06", title: "2020학년도 2학기 수강신청 및 관련 사항 안내", author: "관리자", views: 1763, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=48" },
    { date: "2020-08-06", title: "2020학년도 2학기 대학원 종합시험 실시 안내: 접수기간 8/4(화) ~ 8/6(목)", author: "관리자", views: 2772, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=47" },
    { date: "2020-08-06", title: "2019학년도 전·후기(제92회) 학위수여식 안내: 8/14(금) 10:30", author: "관리자", views: 2269, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=46" },
    { date: "2020-06-17", title: "2020-2학기 영구수료 해제(학위논문 제출가능연한 연장) 신청 안내: 신청기한 8/3(월 10:00) ~ 8/14(금) 17:00", author: "관리자", views: 1720, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=45" },
    { date: "2020-05-27", title: "2020학년도 2학기 석·박사통합과정 지원 지원 안내: 지원기간 6/8(월) ~ 6/26 (금)", author: "관리자", views: 1750, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=44" },
    { date: "2020-05-19", title: "2020학년도 후기 대학원 수시 모집요강", author: "관리자", views: 1769, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=43" },
    { date: "2020-04-24", title: "[현대차 정몽구 재단] 2020 온드림 미래산업 인재 학부/대학원 장학생 선발: 온라인 신청기한 4/3~4/29", author: "관리자", views: 877, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=42" },
    { date: "2020-04-14", title: "각 군 현역병 모집일정(4월)", author: "관리자", views: 715, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=41" },
    { date: "2020-04-07", title: "코로나19 관련 2020-1학기 수업운영 방식 및 수강신청 관련 최종확정내용 안내", author: "관리자", views: 1630, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=40" },
    { date: "2020-03-10", title: "2020-1학기 연구등록 안내: 신청기간 3/16~3/18(수)", author: "관리자", views: 1810, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=39" },
    { date: "2020-03-05", title: "2020-1학기 학생증 발급 추가 신청 안내: 3/9(월)~3/11(수)", author: "관리자", views: 1435, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=38" },
    { date: "2020-01-15", title: "2020학년도 1학기 대학원 종합시험 실시 안내: 접수기간 2/4(화) ~ 2/6(목)", author: "관리자", views: 1512, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=36" },
    { date: "2020-01-14", title: "2020학년도 1학기 대학원 강의시간표 조회 및 수강신청 안내", author: "관리자", views: 1664, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=35" },
    { date: "2019-12-23", title: "포스코케미칼 R&D 산학장학생 모집", author: "관리자", views: 795, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=34" },
    { date: "2019-11-07", title: "2020학년도 1학기 석·박사통합과정 지원 안내: 지원 기간 12/2~12/20", author: "관리자", views: 975, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=33" },
    { date: "2019-09-18", title: "2019학년도 후기 자연계 대학원 전문연구요원 편입대상자 선발: 신청기간 9/17~10/2", author: "관리자", views: 989, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=32" },
    { date: "2019-08-22", title: "제6회 POSTECH 박태준미래전략연구소 대학(원)생 공모전", author: "관리자", views: 1182, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=31" },
    { date: "2019-07-30", title: "2018학년도 후기 학위수여식: 8월 16일(금) 11:00", author: "관리자", views: 851, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=30" },
    { date: "2019-07-24", title: "2019학년도 2학기 대학원 강의시간표 조회 및 수강신청 안내", author: "관리자", views: 978, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=29" },
    { date: "2019-07-15", title: "[채용 공고] 나노입자연구단(서울대학교 현택환 교수 연구단)에서 연구원 2인(유기합성 1인, 바이오 1인)", author: "관리자", views: 991, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=28" },
    { date: "2019-05-27", title: "2019학년도 여름방학 대학원 외국어시험 대체강좌 실시 안내 : 예비수강신청 5/27~5/29", author: "관리자", views: 778, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=27" },
    { date: "2019-05-16", title: "2019학년도 2학기 석박사통합과정 지원 및 선발 안내: 지원기간 6/3 ~ 6/21(금) 17:00", author: "관리자", views: 839, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=26" },
    { date: "2018-11-16", title: "2019학년도 1학기 석·박사통합과정 지원 및 선발: 지원기간 12/3~12/21 17:00", author: "관리자", views: 1004, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=25" },
    { date: "2018-11-07", title: "2018학년도 겨울방학 대학원 외국어시험 대체강좌 실시 안내: 수강신청 기간: 11/19~11/21", author: "관리자", views: 1004, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=24" },
    { date: "2018-11-03", title: "2019학년도 전기 신입생 장학생 지원 안내 (입학성적우수장학) : 11월 7일까지 제출", author: "관리자", views: 1055, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=23" },
    { date: "2018-08-06", title: "2018학년도 2학기 수료생 논문등록(연구등록)안내: 등록기간 9/18~20", author: "관리자", views: 896, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=22" },
    { date: "2018-06-20", title: "2018학년도 2학기 대학원 외국어 및 종합시험 실시 안내", author: "관리자", views: 910, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=21" },
    { date: "2018-05-21", title: "2018학년도 2학기 학·석사연계과정 지원 및 선발 안내: 지원기간 6/11~6/29 17:00", author: "관리자", views: 1020, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=20" },
    { date: "2018-05-15", title: "2018학년도 여름방학 대학원 외국어시험 대체강좌 안내: 5/28~6/1 17:00 예비수강신청", author: "관리자", views: 933, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=19" },
    { date: "2018-05-15", title: "2018학년도 2학기 석·박사통합과정 지원 및 선발 안내: 6/4~6/20 17:00", author: "관리자", views: 933, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=18" },
    { date: "2018-02-20", title: "2018학년도 1학기 석·박사통합과정 지원 및 선발 안내: 12/21 마감", author: "숭실대화공과", views: 966, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=17" },
    { date: "2018-02-20", title: "2017학년도 겨울방학 대학원 외국어시험 대체강좌 안내: 예비수강신청 2017년 11월 20일(월) ∼ 2017년 11월 22일(수) 3일간, 9:00∼17:00", author: "숭실대화공과", views: 940, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=16" },
    { date: "2018-02-20", title: "2018학년도 전기 대학원 석사과정 입학성적우수장학생 선발: ~11/8(수) 지원마감", author: "숭실대화공과", views: 1165, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=15" },
    { date: "2018-02-20", title: "2017학년도 1학기 대학원 외국어 및 종합시험 실시:신청 2/7~9 16:00", author: "숭실대화공과", views: 829, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=14" },
    { date: "2018-02-20", title: "2017학년도 1학기 학·석사연계과정 지원 및 선발 안내:신청 12/12~12/30", author: "숭실대화공과", views: 913, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=13" },
    { date: "2018-02-20", title: "2016학년도 겨울방학 대학원 외국어시험 대체강좌 안내", author: "숭실대화공과", views: 789, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=12" },
    { date: "2018-02-20", title: "2017학년도 1학기 석·박사통합과정 지원 및 선발 안내: 지원 12/5~12/21", author: "숭실대화공과", views: 824, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=11" },
    { date: "2018-02-20", title: "이공계 연구자를 위한 영어논문 작성 워크샵 안내:11/08(화) 15:00", author: "숭실대화공과", views: 1557, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=9" },
    { date: "2018-02-20", title: "2017학년도 전기 대학원 입학성적우수장학생 지원 안내:~11/2(수)", author: "숭실대화공과", views: 864, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=8" },
    { date: "2018-02-20", title: "화학공학과 대학원 학위논문 양식 안내(영문)", author: "숭실대화공과", views: 711, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=7" },
    { date: "2018-02-20", title: "화학공학과 대학원 학위논문 양식 안내(국문)", author: "숭실대화공과", views: 737, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=6" },
    { date: "2018-02-20", title: "2016-2학기 대학원 공개발표 심사 일정 안내", author: "숭실대화공과", views: 665, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=5" },
    { date: "2018-02-20", title: "2016년도 후기 대학연구기관 전문연구요원 편입대상자 선발 공고:~9/23", author: "숭실대화공과", views: 747, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=4" },
    { date: "2018-02-20", title: "2016학년도 2학기 수료생 연구등록(논문등록) 안내: 9/19~21", author: "숭실대화공과", views: 668, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=3" },
    { date: "2018-02-20", title: "2016학년도 2학기 논문지도교수 위촉 및 변경 신청: 9/1~15", author: "숭실대화공과", views: 737, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=2" },
    { date: "2018-02-20", title: "2016학년도 2학기 석·박사통합과정 지원 및 선발 안내:6/7~20", author: "숭실대화공과", views: 679, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_02.php?boardid=notice2&mode=view&idx=1" }
  ],
  job: [
    { date: "2026-11-11", title: "GMTCK 동계인턴십 안내: 지원기간 11/4(화) ~ 11/15(일) 자정까지", author: "관리자", views: 13, pinned: true, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=212" },
    { date: "2022-12-27", title: "[[한국NOF메탈코팅스] 채용공고_기술영업 부문 인재 모집", author: "관리자", views: 5902, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=211" },
    { date: "2022-12-07", title: "[숭실대학교 진로취업센터] 12월 소식", author: "관리자", views: 5289, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=210" },
    { date: "2022-11-17", title: "(DIG 에어가스) 채용 공고 안내", author: "관리자", views: 4704, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=209" },
    { date: "2022-08-25", title: "(D-3) 공대,IT 졸업생을 위한 “나에게 맞는 직업설계” (신청마감: 8/22(일) 22시까지)", author: "관리자", views: 4896, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=208" },
    { date: "2022-07-13", title: "[숭실대 진로취업팀] 2022학년도 강소기업 취업희망 콘테스트", author: "관리자", views: 5239, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=207" },
    { date: "2022-04-14", title: "[2022온드림 미래산업/사회통합 장학생 모집]", author: "관리자", views: 4298, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=206" },
    { date: "2022-04-14", title: "[쓰리이솔루션] 신입사원 채용[스타트업에서 함께 성장할 가족같은 직원을 모집합니다]", author: "관리자", views: 3990, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=205" },
    { date: "2022-03-14", title: "[삼성SDI] 2022 상반기 삼성SDI 3급 신입사원 채용", author: "관리자", views: 4253, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=204" },
    { date: "2021-11-24", title: "한국연구재단 기후변화대응기술개발사업 관련「생활밀착형 VOCs 피해 저감을 위 한 선진형 핵심기술 개발」 연구단 기술설명회 개최 안내", author: "관리자", views: 3903, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=201" },
    { date: "2021-11-01", title: "2021 스웨덴-대한민국 노벨메모리얼프로그램", author: "관리자", views: 3289, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=200" },
    { date: "2021-10-12", title: "[한화토탈]2021 하반기 한화토탈 산학장학생 모집(~10.22(금))", author: "관리자", views: 2324, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=199" },
    { date: "2021-09-27", title: "[(주)하은테크] 2021년 (주)하은테크 하반기 공개채용", author: "관리자", views: 1608, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=198" },
    { date: "2021-09-15", title: "[LX하우시스] 2021 하반기 신입 연구원 / 산학장학생 채용", author: "관리자", views: 1593, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=197" },
    { date: "2021-09-15", title: "[롯데정밀화학] 2021년 하반기 롯데정밀화학 신입채용 일반전형 모집", author: "관리자", views: 1637, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=196" },
    { date: "2021-09-15", title: "[DB그룹] 2021년 하반기 DB그룹 신입채용(~10.07(목))", author: "관리자", views: 1105, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=195" },
    { date: "2021-09-15", title: "[현대제철] 2021 하반기 현대제철 신입/경력 채용 모집(~9/26(일))", author: "관리자", views: 848, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=194" },
    { date: "2021-09-15", title: "[효성그룹] 2022 효성그룹 신입사원 공개채용", author: "관리자", views: 872, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=192" },
    { date: "2021-09-15", title: "[삼성에스원] 2021 하반기 3급 신입사원 채용", author: "관리자", views: 818, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=191" },
    { date: "2021-09-15", title: "[S-OIL]  2021 S-OIL 신입사원 채용(~9/26)", author: "관리자", views: 855, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=190" },
    { date: "2021-09-15", title: "[일진그룹] 2021 하반기 신입/경력사원 채용 (~9/17)", author: "관리자", views: 738, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=188" },
    { date: "2021-09-15", title: "[현대모비스] '21년 하반기 SW 개발자 신입 대규모 채용(~9.27 마감)", author: "관리자", views: 766, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=187" },
    { date: "2021-09-15", title: "[현대오일뱅크] 2021년 신입사원 채용(~9/23)", author: "관리자", views: 754, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=186" },
    { date: "2021-09-15", title: "[두산] 2021 하반기 신입/산학장학생 채용(오픈카톡상담회)", author: "관리자", views: 728, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=185" },
    { date: "2021-09-14", title: "[한화토탈] 2021 한화토탈 수지제품 연구원 경력채용 (~9/27(월))", author: "관리자", views: 718, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=184" },
    { date: "2021-08-31", title: "[한화시스템/ICT]  2021년 초급 개발자 수시 채용", author: "관리자", views: 756, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=183" },
    { date: "2021-08-31", title: "[현대엔지니어링] 2022년 신입사원 공개채용", author: "관리자", views: 737, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=182" },
    { date: "2021-08-31", title: "[현대엔지니어링]  2021년 스마트 건설기술 공모전 접수", author: "관리자", views: 748, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=181" },
    { date: "2021-08-31", title: "[LINE] 2021 SW개발 신입 LINER 공개채용", author: "관리자", views: 628, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=180" },
    { date: "2021-08-31", title: "[카카오] 2022 카카오 신입개발자 블라인드 채용", author: "관리자", views: 796, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=179" },
    { date: "2021-08-31", title: "[일진그룹] 2021 하반기 신입/경력사원 채용 (~9/12)", author: "관리자", views: 663, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=178" },
    { date: "2021-08-31", title: "[넥슨컴퍼니] 2021년 채용형인턴십 넥토리얼 모집", author: "관리자", views: 761, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=177" },
    { date: "2021-08-31", title: "[SK그룹] 2021 하반기 SK 신입 채용", author: "관리자", views: 675, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=176" },
    { date: "2021-08-12", title: "2021 화학·바이오ISC 켐바이오넷 지1기 청년기자단 모집", author: "관리자", views: 875, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=175" },
    { date: "2021-08-12", title: "[현대모비스] 2021 현대모비스 연구장학생 선발(~8.17(화) 오전 10시)", author: "관리자", views: 1000, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=174" },
    { date: "2021-08-12", title: "[현대자동차그룹] 2021 현대엔지비 Softeer 정기 코딩 테스트 (~8.25(수))", author: "관리자", views: 698, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=173" },
    { date: "2021-08-12", title: "2021 모의 IMO 총회", author: "관리자", views: 917, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=172" },
    { date: "2021-08-12", title: "[현대모비스] '21 MOBIS 알고리즘 경진대회 홍보 협조 요청", author: "관리자", views: 747, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=171" },
    { date: "2021-08-12", title: "[MBC] 2021 MBC 신입사원 공개채용 (~8.17)", author: "관리자", views: 715, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=170" },
    { date: "2021-08-12", title: "[㈜에보닉코리아] Business Development(BD) Internship", author: "관리자", views: 642, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=169" },
    { date: "2021-08-12", title: "[㈜밥코리아] Service Engineer 인재 모집(~9/30(목))", author: "관리자", views: 678, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=168" },
    { date: "2021-08-12", title: "[한국화학연구원] 2021 화학창의콘텐츠 공모전(~8/31(화))", author: "관리자", views: 663, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=167" },
    { date: "2021-05-28", title: "2021학년도 (재)롯데장학재단 38기 멘토링 장학생 선발 안내", author: "관리자", views: 966, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=166" },
    { date: "2021-05-28", title: "[한국환경공단] 제2회 대학생 통합환경관리 경진대회 개최", author: "관리자", views: 1001, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=165" },
    { date: "2021-04-23", title: "서울과학기술대학교 차세대에너지재료 실험실 박사 후 연구원 모집", author: "관리자", views: 1376, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=164" },
    { date: "2021-04-20", title: "[현대자동차]2021 현대자동차 연구장학생 모집", author: "관리자", views: 1264, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=163" },
    { date: "2021-04-20", title: "[카카오] 2021 카카오 인턴십 모집  (Service & Biz, Tech)", author: "관리자", views: 1089, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=162" },
    { date: "2021-04-20", title: "플랜트산업 전문인력 양성과정(화공, 환경)", author: "관리자", views: 1567, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=161" },
    { date: "2021-04-20", title: "[포스코건설]  2021 상반기 채용연계형 인턴 신입 채용 (~5.3 13시)", author: "관리자", views: 990, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=160" },
    { date: "2021-04-20", title: "[DL건설] 2021년 DL건설 신입사원 수시채용", author: "관리자", views: 819, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=159" },
    { date: "2021-03-04", title: "[한국화학공학회] 봄 총회 및 학술대회", author: "관리자", views: 1091, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=157" },
    { date: "2021-03-04", title: "[과학기술정보통신부]2021년도 연구안전 서포터스 모집 안내", author: "관리자", views: 1073, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=156" },
    { date: "2021-03-03", title: "[삼성SDI] 2021년 상반기 신입사원 채용 랜선 리크루팅(온라인상담) 진행", author: "관리자", views: 1218, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=155" },
    { date: "2021-03-03", title: "◼︎두산그룹 2021 상반기 채용연계형 인턴 모집 (~3/15)", author: "관리자", views: 1446, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=154" },
    { date: "2021-02-25", title: "[현대모비스] 각 부문/BU별 대규모 신입사원 채용", author: "관리자", views: 1012, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=153" },
    { date: "2021-02-23", title: "[LIG넥스원] 2021년 상반기 LIG넥스원 신입/경력 공개채용", author: "관리자", views: 952, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=152" },
    { date: "2021-02-23", title: "[현대모비스] 2021 현대모비스 연구장학생 모집", author: "관리자", views: 1113, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=151" },
    { date: "2021-02-23", title: "2021 상반기 SK하이닉스 신입사원 수시 채용", author: "관리자", views: 1109, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=150" },
    { date: "2020-11-06", title: "2021년 동계 UST 연구인턴십 모집안내 홍보", author: "관리자", views: 1353, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=149" },
    { date: "2020-10-21", title: "화학공학 뷰티실습실 임상자 모집(기간:~11/30일까지)", author: "관리자", views: 1410, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=148" },
    { date: "2020-10-15", title: "한국플랜트산업협회 온라인 취업 스킬 설명회", author: "관리자", views: 1123, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=147" },
    { date: "2020-10-14", title: "[펄어비스] 2020하반기 펄어비스 개발직군 수시채용", author: "관리자", views: 1250, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=146" },
    { date: "2020-10-14", title: "[켐바이오넷] 2020 화학·바이오 온라인 일자리 박람회", author: "관리자", views: 1686, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=145" },
    { date: "2020-10-12", title: "OCI 2020 하반기 신입사원 공개채용", author: "관리자", views: 1152, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=144" },
    { date: "2020-10-12", title: "2020년 반도체산업 온라인 채용박람회(★신청기간: ~10. 14.(수) 24시까지)", author: "관리자", views: 896, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=143" },
    { date: "2020-09-11", title: "현대삼호중공업 대졸 신입사원 채용: 9/10 ~ 9/21 15:00", author: "관리자", views: 948, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=142" },
    { date: "2020-09-09", title: "[2020 바이오헬스 일자리 박람회]온라인 운영 프로그램 안내", author: "관리자", views: 1058, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=141" },
    { date: "2020-09-08", title: "[삼성엔지니어링] 2020년 하반기 채용 공고 : ~9/14", author: "관리자", views: 1006, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=140" },
    { date: "2020-09-08", title: "[포스코케미칼] '20년 하반기 산학장학생 모집 (석사 대상)", author: "관리자", views: 945, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=139" },
    { date: "2020-09-08", title: "[포스코그룹] 포스코/인터내셔널/건설 신입사원 채용(~9.18)", author: "관리자", views: 815, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=138" },
    { date: "2020-09-07", title: "[현대오트론] 2020년 하반기 현대오트론 신입사원 채용: ~9/21", author: "관리자", views: 728, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=137" },
    { date: "2020-08-27", title: "[한국전자산업협동조합] 서울시 뉴딜일자리 사업 무료 취업교육 안내", author: "관리자", views: 826, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=136" },
    { date: "2020-08-27", title: "[현대엔지비] 2020 매치업 신에너지자동차 온라인 교육 프로그램 교육생 모집 (8.20~상시)", author: "관리자", views: 906, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=135" },
    { date: "2020-08-27", title: "[현대자동차] 2020 현대자동차 연구개발본부 신입 상시 채용: ~8/30", author: "관리자", views: 913, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=134" },
    { date: "2020-08-14", title: "중점연구소 보조인력 채용 공고: 접수기간 ~8/21(금) 18:00", author: "관리자", views: 828, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=133" },
    { date: "2020-08-06", title: "숭실대학교 산학협력단 청년TLO 참가자(전임연구원 채용) 모집 공고: 신청기간 ~ 8/17(월)", author: "관리자", views: 909, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=132" },
    { date: "2020-07-27", title: "GS칼텍스 <취준동고동락> 프로그램 안내: 모집기간 7/21~8/3(월)", author: "관리자", views: 941, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=131" },
    { date: "2020-06-01", title: "SK넥실리스 2020 상반기 신입/경력사원 채용 [~6/5(금)까지]", author: "관리자", views: 1194, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=128" },
    { date: "2020-05-15", title: "[한국상하수도협회] 수질측정 및 분석사 양성과정 2020년 2차 모집 (~5.31) /", author: "관리자", views: 1077, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=127" },
    { date: "2020-04-09", title: "[삼성전자 반도체연구소] 반도체연구소 채용", author: "관리자", views: 1958, pinned: false, url: "http://chemeng.ssu.ac.kr/sub/sub03_04.php?boardid=recruit&mode=view&idx=126" }
  ]
};

/* ----------------------------------------------------------------------------
   8. 진로 — 학과 홈페이지에 소개된 주요 진출 기업
   ---------------------------------------------------------------------------- */
const CAREERS = [
  { field: "반도체·전자", companies: "삼성전자, SK하이닉스, 동진쎄미켐, LG전자" },
  { field: "정유·석유화학", companies: "LG화학, 롯데케미컬, 한국카본" },
  { field: "소재·금속", companies: "POSCO, 고려제강, 만호제강" },
  { field: "제약·바이오", companies: "GC녹십자, 유한양행, 한미약품" },
  { field: "식품", companies: "CJ제일제당, 롯데제과, 하이트맥주" },
  { field: "에너지·엔지니어링", companies: "SK, 한국가스공사, 삼성엔지니어링, LG엔지니어링" }
];

/* ----------------------------------------------------------------------------
   9. 학사 안내 카드 — 입학·학사·교환학생
   ---------------------------------------------------------------------------- */
const GUIDES = [
  { title: "대학원 입학", en: "Graduate Admission",
    text: "석사·박사 과정은 학과 연구실 단위로 모집합니다. 지원 전 관심 연구실의 연구 주제와 논문을 먼저 확인하는 것이 좋습니다.",
    link: "http://chemeng.ssu.ac.kr/sub/sub05_02.php", linkText: "대학원 입학 안내" },
  { title: "졸업 요건", en: "Graduation",
    text: "단일전공 기준 졸업학점 133학점. 전공 84학점(전공기초 18 + 전공선택·필수 66)과 교양 28학점을 포함합니다.",
    link: "http://chemeng.ssu.ac.kr/sub/sub02_04_01.php", linkText: "졸업요건 자세히" },
  { title: "교환학생", en: "Exchange Program",
    text: "숭실대학교 국제교류팀과 학과 지도를 통해 해외 대학 교환·방문학생 과정을 이수할 수 있습니다.",
    link: "http://chemeng.ssu.ac.kr/sub/sub02_05.php", linkText: "교환학생 안내" }
];
