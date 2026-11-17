/* ============================================================================
   숭실대학교 화학공학과 — guide.html (학사·대학원 안내) 영문 문구
   ----------------------------------------------------------------------------
   guide.html 의 한국어 문구를 영어로 바꿔 주는 사전입니다(i18n.js 확장).
   키는 guide.html 에 적힌 한국어 문구와 같아야 하고, 띄어쓰기·줄바꿈은 자동으로
   정리해 비교합니다. 원문을 고치면 이 파일의 키도 함께 고쳐 주세요.
   ========================================================================== */
(function (global) {
  'use strict';
  var I18N = global.I18N;
  if (!I18N) { console.warn('[i18n] i18n.js 를 먼저 불러와야 합니다.'); return; }

  I18N.extend({
    /* ---------------------------------------------------------- 상단·탭 */
    '🧭 이수체계도': '🧭 Course roadmap',
    '🎓 졸업 요건 안내': '🎓 Graduation requirements',
    '🏛️ 대학원 입학 요강': '🏛️ Graduate admission',
    '✈️ 해외 교환학생': '✈️ Exchange programs',
    '숭실대학교 홈 ↗': 'Soongsil University ↗',

    /* ---------------------------------------------------------- 1. 졸업 요건 */
    '1. 학부 졸업 요건': '1. Undergraduate Degree Requirements',
    '화학공학과 학사 학위를 취득하기 위한 학번별 졸업학점, 전공 이수 기준, 졸업논문제 및 대체 인정 요건입니다.':
      'Graduation credits by cohort, major requirements, and the graduation thesis and its approved alternatives for the bachelor’s degree.',
    '졸업 이수학점 기준 (2021학번 이후 입학자)': 'Credit requirements (students entering from 2021)',
    '단일전공 기준 총 133학점 이상을 이수해야 하며, 전공기초 18학점과 전공선택/필수 66학점을 포함해 전공 총 84학점을 충족해야 합니다.':
      'A single major requires at least 133 credits in total, including 18 credits of major foundation and 66 credits of major electives and required courses — 84 credits in the major.',
    '구분': 'Category',
    '교양필수': 'General education required',
    '교양선택': 'General education elective',
    '전공 이수학점': 'Major credits',
    '일반선택': 'Free electives',
    '총 졸업학점': 'Total credits',
    '전공기초': 'Major foundation',
    '전공(필수/선택)': 'Major (required/elective)',
    '단일전공': 'Single major',
    '복수전공자 (화공 주전공)': 'Double major (Chemical Engineering first)',
    '복수전공 42': '42 in the second major',
    '부전공자 (화공 주전공)': 'Minor (Chemical Engineering first)',
    '부전공 21': '21 in the minor',
    '타과생 화공 복수전공': 'Chemical Engineering as a second major',
    '화공 60학점 이수': '60 credits in Chemical Engineering',
    '💡 학번별 졸업학점 유의사항:': '💡 Credits by cohort:',
    '2019~2020학번 입학자': 'Entering 2019–2020',
    ': 총 133학점 (교양필수 17, 교양선택 12~17, 전공기초 18, 전공 66)':
      ': 133 credits (general education required 17, elective 12–17, major foundation 18, major 66)',
    '2014~2018학번 입학자': 'Entering 2014–2018',
    ': 총 140학점 (교양필수 14, 교양선택 20, 전공기초 18, 전공 66, 일반선택 22)':
      ': 140 credits (general education required 14, elective 20, major foundation 18, major 66, free electives 22)',
    '편입생 및 외국인 학생의 경우 학과 조교실 및 소속 단과대학 교학팀에서 개별 학점 인정을 확인하시기 바랍니다.':
      'Transfer and international students should confirm individual credit recognition with the department office and the college academic affairs team.',
    '전공기초(전기) 이수 과목 — 5과목 15학점': 'Major foundation courses — 5 courses, 15 credits',
    '교과과정 편성표(2024~2026학년도) 기준, 전공기초는': 'In the curriculum tables for 2024–2026, major foundation consists of',
    '전기(전공기초) 5과목 15학점': '5 foundation courses (15 credits)',
    '입니다. 1학년 기초 과목 가운데 공학화학1·2는 전공기초가 아니라':
      '. Among the first-year courses, Engineering Chemistry 1 and 2 are not foundation courses but',
    '전공선택(전선)': 'major electives',
    '이므로 아래 두 표를 구분해 확인하세요.': ', so read the two tables below separately.',
    '이수시기': 'Term',
    '과목명': 'Course',
    '학점 / 시수': 'Credits / hours',
    '이수구분': 'Type',
    '과목 성격 및 내용': 'Content',
    '1학년 1학기': 'Year 1, Spring',
    '1학년 2학기': 'Year 1, Fall',
    '2학년 1학기': 'Year 2, Spring',
    '전기 (전공기초)': 'Foundation',
    '전선 (전공선택)': 'Elective',
    '상미분방정식, 라플라스 변환, 공학적 모델링 기초': 'Ordinary differential equations, Laplace transforms, engineering modeling',
    '고전역학, 회전운동, 진동 및 열역학 기초': 'Classical mechanics, rotational motion, oscillations, thermodynamics',
    '물질수지 기초, 재순환 및 바이패스 공정 해석': 'Material balances, recycle and bypass streams',
    '선형대수학, 행렬 연산, 벡터 미적분학': 'Linear algebra, matrix operations, vector calculus',
    '물질수지·에너지수지의 공정 응용, 화학공정 계산능력': 'Process applications of material and energy balances; process calculations',
    '1학년 기초 전공선택 (전선) — 2과목 6학점': 'First-year electives — 2 courses, 6 credits',
    '화학양론, 원자구조, 화학결합 및 물질의 상태': 'Chemical stoichiometry, atomic structure, bonding, states of matter',
    '화학평형, 열역학, 반응속도론 및 전기화학': 'Chemical equilibrium, thermodynamics, kinetics, electrochemistry',
    '📌 이수구분을 헷갈리지 마세요:': '📌 Mind the course type:',
    '위': 'The',
    "졸업 이수학점 기준표의 '전공기초 18학점'": '18 credits of major foundation in the credit table',
    '은 2021~2022학번 졸업요건표의 표기입니다. 교과과정 편성표 기준으로는':
      ' is the figure used in the graduation requirements for the 2021–2022 cohorts. In the curriculum table it is split into',
    '1학년 기초 전공선택 2과목 6학점': '2 first-year electives (6 credits)',
    '으로 나뉘어 편성되어 있습니다.': '.',
    '공학화학1·2는 교과과정 편성표상': 'Engineering Chemistry 1 and 2 are listed as',
    '전선(전공선택)': 'major electives',
    '과목입니다.': 'in the curriculum table.',
    '본인 학번의 졸업요건은 입학 학년도 기준으로 적용되므로, 수강신청 전 학과 사무실(02-820-0610)에서 한 번 더 확인하세요.':
      'Requirements follow the year you entered, so confirm them with the department office (+82-2-820-0610) before registering.',
    '졸업논문제 및 대체 인정 요건': 'Graduation thesis and approved alternatives',
    '화학공학과는 학사학위 취득을 위해 졸업논문 제출 또는 규정된 대체 요건 충족을 필수로 요구합니다.':
      'The department requires either a graduation thesis or one of the approved alternatives.',
    '방식 A. 졸업논문제 (연구논문 제출)': 'Option A. Graduation thesis (research paper)',
    '신청 시기': 'Application',
    ': 4학년 1학기 초 지도교수 배정 신청': ': apply for a supervisor at the start of the first semester of year 4',
    '연구 수행': 'Research',
    ': 배정된 연구실에서 1~2개 학기 동안 졸업 연구 수행': ': one or two semesters of research in the assigned laboratory',
    '논문 제출': 'Submission',
    ': 4학년 2학기 종강 전(6월 / 12월) 학사학위 청구논문 완성본 및 심사 승인서 제출':
      ': submit the completed thesis and the approval form before the end of the second semester of year 4 (June or December)',
    '방식 B. 졸업논문 대체 인정': 'Option B. Approved alternatives',
    '아래 요건 중 하나를 충족하고 관련 증빙서류를 제출하면 졸업논문으로 대체 승인됩니다.':
      'Meeting one of the requirements below and submitting the evidence is accepted in place of the thesis.',
    '국가기술자격증 취득': 'National technical qualification',
    '(기사 등급 이상)': '(engineer level or above)',
    '공인학술지 논문 게재': 'Publication in a peer-reviewed journal',
    '(주저자 또는 공동저자)': '(first or co-author)',
    '특허 출원 또는 등록': 'Patent filed or registered',
    '(발명자 등재)': '(named inventor)',
    '산학 캡스톤디자인': 'Industry capstone design',
    '우수 결과물 선정': 'selected as an outstanding project',
    '📋 졸업논문 대체 인정 국가기술자격증 종목 (기사급):': '📋 Accepted national technical qualifications (engineer level):',
    '화공기사, 화약류제조기사, 가스기사, 대기환경기사, 수질환경기사, 폐기물처리기사, 산업안전기사, 에너지관리기사, 생물공학기사, 화학분석기사, 원자력기사 등 * 대체 인정 서류는 매 학기 말(1학기 6월, 2학기 12월) 지정된 기한 내에 학과 사무실로 제출해야 합니다.':
      'Chemical Engineering Engineer, Explosives Manufacturing Engineer, Gas Engineer, Air Environment Engineer, Water Quality Environment Engineer, Waste Treatment Engineer, Industrial Safety Engineer, Energy Management Engineer, Biotechnology Engineer, Chemical Analysis Engineer, Nuclear Engineer, and others. * Submit the supporting documents to the department office by the deadline at the end of each semester (June and December).',
    '공학인증(ABEEK) 및 공인영어 졸업인증': 'ABEEK accreditation and English certification',
    '1. 공학교육인증 (ABEEK)': '1. Engineering accreditation (ABEEK)',
    '한국공학교육인증원이 제시하는 화학공학 전문프로그램 기준을 충족해야 합니다.':
      'Students must meet the chemical engineering program criteria of the Accreditation Board for Engineering Education of Korea.',
    '(기초과학·수학) 30학점 이상 이수': '(basic science and mathematics) at least 30 credits',
    '전공주제': 'Major subjects',
    '(설계 12학점 포함) 54학점 이상 이수': '(including 12 credits of design) at least 54 credits',
    '졸업 전': 'Before graduation',
    '학습성과 포트폴리오(PD)': 'program outcomes portfolio (PD)',
    '심사 통과': 'must pass review',
    '2. 공인영어 졸업인증 점수': '2. English certification scores',
    '졸업 심사 전까지 아래 공인영어시험 성적표 중 하나를 제출해야 합니다.':
      'Submit one of the following test scores before the graduation review.',
    '700점 이상': '700 or above',
    '71점 이상': '71 or above',
    '327점 이상': '327 or above',
    'IM2 이상 ·': 'IM2 or above ·',
    '토익스피킹': 'TOEIC Speaking',
    '120점 이상': '120 or above',

    /* ---------------------------------------------------------- 2. 대학원 */
    '2. 대학원 입학 및 장학제도': '2. Graduate Admission and Scholarships',
    '반도체·배터리·바이오·소재 산업의 글로벌 연구 인력으로 도약하는 숭실대학교 일반대학원 화학공학과 입학 요강입니다.':
      'Admission guidelines for graduate study in Chemical Engineering at Soongsil University — a route into global research careers in semiconductors, batteries, bio, and materials.',
    '모집 학위과정 및 세부전공': 'Degree programs and sub-majors',
    '2027학년도 전기 일반대학원 정시모집 요강 기준입니다. 화학공학과의 박사과정 세부전공은':
      'Based on the 2027 spring general graduate admission guidelines. The doctoral sub-majors are',
    '화학공학 · 에너지융합공학 · 뷰티공학': 'Chemical Engineering · Energy Convergence Engineering · Beauty Engineering',
    '의': '',
    '3대 세부전공': 'three sub-majors',
    '이며, 안전·보건 분야는 일반대학원': '. Safety and health is offered separately as an',
    '학과간 협동과정': 'interdisciplinary program',
    '으로 별도 운영됩니다.': ' of the general graduate school.',
    '학위과정': 'Program',
    '수업연한': 'Duration',
    '개설 세부전공 (3대)': 'Sub-majors (three)',
    '신입학 / 편입학': 'New / transfer entry',
    '비고': 'Notes',
    '석사과정 (MS)': 'Master’s (MS)',
    '2년 (4학기)': '2 years (4 semesters)',
    '1. 화학공학': '1. Chemical Engineering',
    '(공정설계, 촉매, 분리공정, 반응공학)': '(process design, catalysis, separations, reaction engineering)',
    '2. 에너지융합공학': '2. Energy Convergence Engineering',
    '(이차전지, 수소/연료전지, 전기화학)': '(batteries, hydrogen and fuel cells, electrochemistry)',
    '3. 뷰티공학': '3. Beauty Engineering',
    '(천연물 소재, 제형공학, 기능성 바이오)': '(natural materials, formulation, functional bio)',
    '박사과정 (PhD)': 'Doctoral (PhD)',
    '2~3년': '2–3 years',
    '석·박사 통합과정': 'Combined MS–PhD',
    '4년 (석사논문 면제)': '4 years (master’s thesis waived)',
    '신입학': 'New entry',
    '학사학위 소지(예정)자': 'Holders (or expected holders) of a bachelor’s degree',
    '석사학위 소지(예정)자': 'Holders (or expected holders) of a master’s degree',
    '🔗 학과간 협동과정 — 별도 모집:': '🔗 Interdisciplinary program — separate admission:',
    '안전·보건융합학과': 'Department of Safety and Health Convergence',
    '(세부전공: 안전·보건융합공학)는 일반대학원 학과간 협동과정으로, 화학공학과 개설 세부전공과 별도로 모집합니다.':
      ' (sub-major: Safety and Health Convergence Engineering) is an interdisciplinary program of the general graduate school, admitted separately from the chemical engineering sub-majors.',
    '* 화학공학과 박사과정 개설 세부전공은 화학공학·에너지융합공학·뷰티공학 3개입니다.':
      '* Chemical Engineering offers three doctoral sub-majors: chemical engineering, energy convergence engineering, and beauty engineering.',
    '전형 방법 및 평가 배점': 'Evaluation and scoring',
    '대학원 선발은': 'Admission combines',
    '1단계 서류심사(100점)': 'a stage 1 document review (100 points)',
    '와': 'with',
    '2단계 구술평가(200점)': 'a stage 2 oral evaluation (200 points)',
    '를 종합해 이루어집니다.': '.',
    '2027학년도 전기 일반대학원 정시모집 요강 기준': 'Based on the 2027 spring admission guidelines.',
    '1단계 — 서류심사 (100점)': 'Stage 1 — Document review (100 points)',
    '과정': 'Program',
    '학사 성적': 'Bachelor’s record',
    '석사 성적': 'Master’s record',
    '학업계획서': 'Study plan',
    '경력우대': 'Experience',
    '총점': 'Total',
    '석사과정': 'Master’s',
    '100점': '100',
    '박사과정': 'Doctoral',
    '20점': '20',
    '30점': '30',
    '석사과정 학사 성적은': 'For the master’s program the bachelor’s record uses the',
    '총 산술평균': 'overall arithmetic mean',
    '을 반영하며, 박사과정의 경력우대 점수는 서류심사 경력우대 점수 부여 여부를 학과별 심사과정에서 결정합니다.':
      '; for the doctoral program, whether experience points are awarded is decided in the department’s own review.',
    '2단계 — 구술평가 (200점)': 'Stage 2 — Oral evaluation (200 points)',
    '평가 기준': 'Criteria',
    '석사 · 박사 공통': 'Master’s and doctoral',
    '200점': '200',
    '연구 및 학업수행능력 (전공의 적합성, 교육배경)': 'Research and academic ability (fit for the major, educational background)',
    '전공지식, 적성, 교육경험 (전공수행능력, 전공이해정도, 경력배경)': 'Major knowledge, aptitude, and educational experience',
    '창의력 (특허·수상 등 포함)': 'Creativity (including patents and awards)',
    '학문에 대한 열의와 진지성': 'Enthusiasm and seriousness about scholarship',
    '위 내용을': 'Assessed',
    '종합적으로 판단하여 평가점수 산정': 'as a whole to arrive at the score',
    '📝 참고:': '📝 Note:',
    '학과 사정에 따라 구술평가 이외의 영어능력 평가 등 추가 시험이 시행될 수 있습니다. 박사과정 경력우대 가산점은 서류 제출기간 내 관련서류를 제출한 경우에 한해 부여됩니다.':
      'The department may add further tests, such as an English assessment, alongside the oral evaluation. Experience points for the doctoral program are awarded only when the supporting documents are submitted within the application period.',
    '대학원 핵심 장학제도': 'Key graduate scholarships',
    '대학원생들이 경제적 부담 없이 학업과 연구에 몰입할 수 있도록 폭넓은 장학 혜택을 지원합니다.':
      'Broad support so graduate students can focus on study and research.',
    '1. 입학성적우수장학금 (본교 출신 우대)': '1. Entrance merit scholarship (Soongsil graduates)',
    '숭실대학교 학부 졸업예정자가 본교 일반대학원 화학공학과 석사 또는 석박통합과정에 진학할 경우, 학부 누적 성적에 따라 등록금 전액 또는 일부를 감면 지원합니다.':
      'Soongsil undergraduates entering the master’s or combined MS–PhD program in Chemical Engineering receive a full or partial tuition waiver based on their cumulative record.',
    '2. Research Assistant (RA) 연구장학금': '2. Research assistantship (RA)',
    '학과 연구실이 수행하는 국가 R&D 과제(BK21 FOUR, 한국연구재단, 산업통상자원부 등) 및 기업 산학과제에 참여하는 연구원에게 매월 연구장려금(인건비)과 등록금을 지원합니다.':
      'Students joining national R&D projects (BK21 FOUR, the National Research Foundation, the Ministry of Trade, Industry and Energy, and others) or industry projects receive a monthly research stipend and tuition support.',
    '3. Teaching Assistant (TA) 조교장학금': '3. Teaching assistantship (TA)',
    '학과 학사 업무를 지원하는 학사조교나 학부 실험과목(화공기초실험, 화학공학실험 등) 실습 지도를 담당하는 실험조교로 선발된 대학원생에게 수업료의 50~100%를 장학금으로 지급합니다.':
      'Graduate students serving as academic assistants or laboratory instructors for undergraduate courses (Basic Chemical Engineering Laboratory, Chemical Engineering Laboratory, and others) receive 50–100% of tuition as a scholarship.',
    '4. 정부초청 및 외국인 유학생 장학금': '4. Government and international student scholarships',
    '국가 정부초청장학생(GKS)으로 입학한 외국인 학생 및 본교에 재학 중인 우수 외국인 대학원생에게 수업료 및 생활비를 차등 지원합니다.':
      'International students admitted through the Global Korea Scholarship (GKS) and outstanding international graduate students receive tiered tuition and living-cost support.',
    '대학원 지원 절차 4단계 가이드': 'Applying: four steps',
    '대학원 진학은 연구실(Lab) 단위로 운영되므로, 원서 접수 전 지도교수님과의 사전 컨택을 강력히 권장합니다.':
      'Admission is organized by laboratory, so contacting a prospective supervisor before applying is strongly recommended.',
    '연구실 탐색': 'Find a laboratory',
    '홈페이지 연구분야(반도체, 배터리, 바이오, 고분자, 환경) 및 10개 랩 소개를 확인하고 관심 연구실을 탐색합니다.':
      'Review the research areas (semiconductors, batteries, bio, polymers, environment) and the ten laboratories, and identify the ones that interest you.',
    '지도교수 사전면담': 'Meet the supervisor',
    '관심 지도교수님께 이메일로 이력서(CV), 자기소개, 성적표를 첨부하여 사전 연구실 면담을 신청합니다.':
      'Email the professor you would like to work with, attaching a CV, a short introduction, and your transcript, and ask for a meeting.',
    '온라인 원서접수': 'Apply online',
    '숭실대 일반대학원 입학처 웹사이트에서 원서를 접수하고 학업계획서 등 증빙서류를 제출합니다 (전기 10~11월 / 후기 4~5월).':
      'Apply on the Soongsil general graduate admissions website and upload your study plan and supporting documents (spring: October–November; fall: April–May).',
    '구술평가 및 합격': 'Interview and admission',
    '학과 구술면접 전형에 응시한 후 최종 합격자 발표를 확인하고 등록금을 납부합니다.':
      'Take the departmental oral evaluation, then confirm the final result and pay tuition.',
    '숭실대학교 일반대학원 입학처 바로가기 ↗': 'Soongsil general graduate admissions ↗',

    /* ---------------------------------------------------------- 3. 교환학생 */
    '3. 해외 교환학생 프로그램': '3. Exchange Programs',
    '글로벌 화학공학 인재로 성장하기 위해 본교와 학술교류협정이 체결된 해외 자매대학에 파견되어 수학하는 제도입니다.':
      'Study at a partner university abroad under an academic exchange agreement with Soongsil.',
    '교환학생 프로그램 유형 (4대 트랙)': 'Program types (four tracks)',
    '숭실대학교 국제처를 통해 전 세계 50여 개국 400여 개 유수 자매대학으로 파견될 수 있습니다.':
      'Through the Office of International Affairs, students can go to more than 400 partner universities in about 50 countries.',
    '프로그램명': 'Program',
    '주요 협정 기관 및 국가': 'Partners and countries',
    '등록금 납부 형태': 'Tuition',
    '파견 기간': 'Duration',
    '순수교환': 'Pure exchange',
    '(Exchange)': '(Exchange)',
    '본교 자매대학 1:1 교환': 'One-to-one exchange with a partner university',
    '미국, 유럽, 일본, 중국 등 전 세계 자매대학': 'Partner universities worldwide — the US, Europe, Japan, China, and elsewhere',
    '본교에만 등록금 납부 (상대교 면제)': 'Tuition paid to Soongsil only (waived at the host)',
    '1학기 또는 1년': 'One semester or one year',
    'ACUCA 교환학생': 'ACUCA exchange',
    '아시아 기독교 대학 연맹 약 34개교 (일본, 대만, 홍콩, 필리핀, 태국 등)':
      'About 34 members of the Association of Christian Universities and Colleges in Asia (Japan, Taiwan, Hong Kong, the Philippines, Thailand, and others)',
    '최대 2학기': 'Up to two semesters',
    'UMAP 교환학생': 'UMAP exchange',
    '아시아·태평양 지역 33개국 약 370개 대학 연합체 학점교류': 'Credit exchange with about 370 universities in 33 Asia-Pacific economies through UMAP',
    'CREPUQ 교환학생': 'CREPUQ exchange',
    '캐나다 퀘벡 주립대 연합체 (프랑스어·영어권 대학)': 'Quebec university consortium in Canada (French- and English-language universities)',
    '1학기': '1 semester',
    '방문교환': 'Visiting',
    '(Visiting)': '(Visiting)',
    'SAF 방문학생 (Study Abroad)': 'SAF study abroad',
    '미국, 영국, 캐나다, 호주 등 아이비리그 및 명문대 50여 개교': 'About 50 leading universities in the US, UK, Canada, and Australia, including Ivy League schools',
    '본교 및 상대교 양교 등록금 (SAF 장학 지원)': 'Tuition at both universities (SAF scholarships available)',
    '지원 자격 및 선발 기준': 'Eligibility',
    '1. 학기 이수 요건': '1. Semesters completed',
    '본교 2학기 이상 수료자 (파견 시점 기준 3학기~7학기 재학 예정자, 마지막 8학기는 본교에서 이수 권장)':
      'At least two semesters completed at Soongsil (students in their third to seventh semester when they leave; the final eighth semester is best completed at Soongsil).',
    '2. 학업 성적 기준': '2. Grade requirement',
    '직전 학기까지의 전 학년 평점평균(CGPA)이': 'A cumulative GPA (CGPA) through the previous semester of at least',
    '3.0 / 4.5 이상': '3.0 / 4.5',
    '(파견교에 따라 3.5 이상 요구 대학 있음)': '(some host universities require 3.5 or above)',
    '3. 공인어학성적': '3. Language scores',
    '영어권': 'English',
    'TOEFL iBT 79~80점 이상 또는 IELTS 6.0~6.5 이상': 'TOEFL iBT 79–80 or IELTS 6.0–6.5',
    '일본어권': 'Japanese',
    'JLPT N2 이상': 'JLPT N2 or above',
    '중국어권': 'Chinese',
    'HSK 5급 이상': 'HSK level 5 or above',
    '전공 학점 인정 절차 (Step-by-Step)': 'How major credits are recognized',
    '⚠️ 화학공학과 전공학점 인정 중요 수칙:': '⚠️ Important:',
    '해외 대학에서 이수한 과목을 숭실대 화학공학과 전공선택(전선) 학점으로 인정받으려면,':
      'To have courses taken abroad counted as Chemical Engineering major electives,',
    '파견 전 반드시 학과장님과의 사전 면담 및 <전공과목 이수인정원> 승인':
      'and obtain approval on the prior course approval form from the department chair before departure',
    '을 받아야 합니다.': '.',
    '일반 교양이나 일반선택(일선)은 자유롭게 인정 가능하나, 전공학점은 화학공학 교과목 편성표와의 연계성을 엄격히 심사합니다.':
      'General education and free electives are recognized freely, but major credits are reviewed strictly against the chemical engineering curriculum.',
    '학기당 최대 19학점, 1년 파견 시 최대 36학점까지 인정받을 수 있습니다.':
      'Up to 19 credits per semester, and up to 36 credits for a full year abroad.',
    '단계 01': 'Step 01',
    '파견 전 사전 승인': 'Approval before departure',
    "파견교 개설 과목 실라버스를 지참하여 학과장님 면담 후 '전공 이수인정원' 사전 날인을 받습니다.":
      'Bring the syllabi of the courses you plan to take, meet the chair, and have the prior course approval form signed.',
    '단계 02': 'Step 02',
    '현지 수강 및 수학': 'Study abroad',
    '현지 대학에서 정규 수업을 수강하며, 만약 수강 과목이 변경될 경우 학과 이메일로 변경 승인을 신청합니다.':
      'Take your courses at the host university; if your course list changes, request approval by email.',
    '단계 03': 'Step 03',
    '공식 성적표 수령': 'Official transcript',
    '귀국 후 상대교 국제처로부터 밀봉된 공식 영문 성적표(Official Transcript)를 수령합니다.':
      'After returning, obtain a sealed official transcript from the host university.',
    '단계 04': 'Step 04',
    'u-SAINT 학점 전환': 'Credit transfer in u-SAINT',
    '숭실대 u-SAINT 학사시스템에서 학점 전환을 신청하고, 학과 사무실 및 국제처의 최종 승인을 완료합니다.':
      'Apply for credit transfer in u-SAINT and complete final approval with the department office and the Office of International Affairs.',
    '숭실대학교 국제처 국제교류팀 공지 바로가기 ↗': 'Soongsil international exchange notices ↗',
    '학과 사무실 학사 상담 안내': 'Academic advising',
    '졸업사정, 학점 이수, 대학원 연구실 컨택에 관한 추가 문의는 형남공학관 912호 학과 사무실로 방문하세요.':
      'For questions about graduation review, credits, or contacting a laboratory, visit the department office in Hyeongnam Hall 912.',

    /* ---------------------------------------------------------- 표·부가 문구 */
    '이수체계도 보기': 'Course roadmap',
    '권장 이수 흐름은 학과가 권장하는 순서이며, 공식 선수과목 지정과 다를 수 있습니다. 본인 학번의 교과과정·선수과목은 학과 사무실에서 확인하세요.':
      'The sequence shows the order the department recommends; it may differ from formally designated prerequisites. Check the curriculum and prerequisites for your cohort with the department office.'
  });
})(window);
