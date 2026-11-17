/* ============================================================================
   숭실대학교 화학공학과 — 영문 콘텐츠 사전 (i18n-content.js)
   ----------------------------------------------------------------------------
   i18n.js 의 사전을 확장합니다. data.js 의 값(교과목·교수진·성과·연구분야)과
   guide.html 본문의 영어 문구를 여기에 모읍니다.
   · 교과목명:  'course:한국어 과목명'
   · 과목 설명: 'desc:한국어 과목명'
   · 교수진:    'prof:키'   (교수진 소개 문구)
   · 일반 문구:  '한국어 문구': 'English'
   ========================================================================== */
(function (global) {
  'use strict';
  var I18N = global.I18N;
  if (!I18N) { console.warn('[i18n] i18n.js 를 먼저 불러와야 합니다.'); return; }

  I18N.extend({
    '숭실대학교': 'Soongsil University',

    /* ---------------------------------------------------------- 연구 분야 */
    '반도체': 'Semiconductors',
    '배터리': 'Batteries',
    '바이오': 'Bio',
    '고분자': 'Polymers',
    '환경': 'Environment',
    '반도체·디스플레이 소재': 'Semiconductor and Display Materials',
    '배선·캡핑 공정, 공정 가스 처리, 플렉시블 디스플레이용 광학·봉지 소재, 양자점 소자까지 — 소재 합성과 공정을 함께 다룹니다.':
      'Interconnect and capping processes, process gas treatment, optical and encapsulation materials for flexible displays, and quantum-dot devices — materials synthesis and processing together.',
    '이차전지·에너지 소자': 'Batteries and Energy Devices',
    '연료전지·수전해·전기촉매에서 차세대 이차전지 소재까지, 에너지 변환과 저장의 계면을 설계합니다.':
      'From fuel cells, water electrolysis, and electrocatalysis to next-generation battery materials — designing the interfaces where energy is converted and stored.',
    '바이오·나노의약': 'Bio and Nanomedicine',
    '바이오마커·체외진단, 지능형 나노전달체, 오가노이드, 단백질·약물 결정화로 진단과 치료의 도구를 만듭니다.':
      'Biomarkers and in-vitro diagnostics, smart nanocarriers, organoids, and protein and drug crystallization — tools for diagnosis and treatment.',
    '고분자·정밀소재': 'Polymers and Precision Materials',
    '리빙 중합 기반 정밀 고분자 설계, 열가소성 탄성체, 자기치유 소재, 유기전자용 고분자까지 분자 구조에서 물성을 제어합니다.':
      'Precision polymers by living polymerization, thermoplastic elastomers, self-healing materials, and polymers for organic electronics — controlling properties from molecular structure.',
    '환경·탄소중립 공정': 'Environment and Carbon-Neutral Processes',
    '대기오염물질·온실가스 처리, 다공성 소재 기반 분리, CCUS·직접공기포집, 공정 통합 최적화로 지속가능한 공정을 설계합니다.':
      'Air pollutant and greenhouse gas treatment, separations with porous materials, CCUS and direct air capture, and process integration for sustainable plants.',
    '연구 분야 보기': 'View research area',

    /* ---------------------------------------------------------- 연혁 */
    '숭실대학교 공과대학 화학공학과 설립': 'Department of Chemical Engineering founded, College of Engineering',
    '공과대학 환경·화학공학과로 개명': 'Renamed Department of Environmental and Chemical Engineering',
    '5개 학과군으로 모집 (환경·화공 / 섬유 / 전기 / 기계 / 산업정보시스템공학과군)':
      'Admission through five departmental groups (environmental and chemical, textiles, electrical, mechanical, industrial information systems)',
    '3개 학과군으로 모집 (환경·화공 / 기계 / 산업정보시스템공학과군)':
      'Admission through three departmental groups (environmental and chemical, mechanical, industrial information systems)',
    '공과대학 환경·화학공학과로 모집': 'Admission as the Department of Environmental and Chemical Engineering',
    '공과대학 화학공학과로 모집': 'Admission as the Department of Chemical Engineering',

    /* ---------------------------------------------------------- 주요 사업·성과 */
    '숭실대 AX특성화학과 선정': 'Selected as a Soongsil AX specialization department',
    'AI 신에너지': 'AI new energy',
    '교내 4개 학과 선정 — 화학공학과 · 기계공학부 · 경제학과 · 물리학과':
      'One of four departments selected — Chemical Engineering, Mechanical Engineering, Economics, and Physics',
    "특화 분야 'AI 신에너지' — 전공 전반의 AI 융합, AI 중심교과목 확대":
      'Specialty: AI new energy — AI integrated across the major, with more AI-focused courses',
    '화학공학과 연간 최대 1억 3,400만 원 지원 (4개년)': 'Up to KRW 134 million a year for four years',
    '선도 특성화학과 연속 선정': 'Repeatedly selected as a leading specialization department',
    '수소에너지': 'Hydrogen energy',
    "'수소에너지' 분야 선도 특성화학과 선정 — 입학정원 증원 및 4년 집중 육성":
      'Selected as a leading specialization department in hydrogen energy — increased intake and four years of focused support',
    '2026년 AX특성화학과 선정으로 연속 이어짐': 'Continued with the 2026 AX specialization selection',
    '서울시 지역연계형 수소산업 혁신인재양성사업': 'Seoul regional hydrogen industry talent development program',
    '산업통상자원부 · 교육부': 'Ministry of Trade, Industry and Energy · Ministry of Education',
    '화학공학과 주관 학과 선정 (박경원 교수 총괄책임), 사업비 4억 9,500만 원 수주':
      'Chemical Engineering selected as the lead department (Prof. Kyung-Won Park, PI) with KRW 495 million in funding',
    '도심형 수소에너지 전주기(생산·저장·운송·활용·안전) 산학연계 인재 양성':
      'Industry-linked training across the urban hydrogen value chain — production, storage, transport, use, and safety',
    '평가 · 인프라': 'Evaluation & Infrastructure',
    '산업계관점 대학평가와 연구·장학 기반': 'Industry evaluation and the research and scholarship base',
    '산업계관점 대학평가 화학공학과 우수(2021) · 정유석유화학 분야 최우수(2017)':
      'Excellent in the industry-perspective university evaluation (2021); best in refining and petrochemicals (2017)',
    '4단계 BK21(지능형반도체) 및 차세대반도체 혁신융합대학 사업 연계 참여':
      'Participating in BK21 FOUR (intelligent semiconductors) and the next-generation semiconductor innovation program',
    '매년 2,000만 원 규모 선배장학금(이도영 장학금 등) 운영': 'An alumni scholarship program of about KRW 20 million each year (including the Lee Do-young Scholarship)',
    '마이크로디그리 2개 과정(환경에너지전자 · 바이오헬스케어) 운영': 'Two micro-degree tracks — environmental energy electronics and bio healthcare',

    /* ---------------------------------------------------------- 진로 분야 */
    '반도체·전자': 'Semiconductors & Electronics',
    '정유·석유화학': 'Refining & Petrochemicals',
    '소재·금속': 'Materials & Metals',
    '제약·바이오': 'Pharmaceuticals & Bio',
    '식품': 'Food',
    '에너지·엔지니어링': 'Energy & Engineering',

    /* ---------------------------------------------------------- 학사 안내 카드 */
    '대학원 입학': 'Graduate Admission',
    '졸업 요건': 'Graduation Requirements',
    '교환학생': 'Exchange Program',

    /* ---------------------------------------------------------- 교과목명 */
    'course:공학수학1': 'Engineering Mathematics 1',
    'course:공학물리1': 'Engineering Physics 1',
    'course:공학화학1': 'Engineering Chemistry 1',
    'course:화공양론1': 'Material and Energy Balances 1',
    'course:고급공학수학1': 'Advanced Engineering Mathematics 1',
    'course:공학화학2': 'Engineering Chemistry 2',
    'course:재료과학': 'Materials Science',
    'course:화공에너지입문': 'Introduction to Energy in Chemical Engineering',
    'course:화공양론2': 'Material and Energy Balances 2',
    'course:화공기초실험1': 'Basic Chemical Engineering Laboratory 1',
    'course:공업유기화학1': 'Industrial Organic Chemistry 1',
    'course:공업물리화학1': 'Industrial Physical Chemistry 1',
    'course:환경에너지공학개론': 'Introduction to Environmental and Energy Engineering',
    'course:화공기초실험2': 'Basic Chemical Engineering Laboratory 2',
    'course:반응공학': 'Chemical Reaction Engineering',
    'course:공업유기화학2': 'Industrial Organic Chemistry 2',
    'course:수처리공학': 'Water Treatment Engineering',
    'course:선형대수': 'Linear Algebra',
    'course:공업물리화학2': 'Industrial Physical Chemistry 2',
    'course:화학공학실험': 'Chemical Engineering Laboratory',
    'course:화공유체역학': 'Fluid Mechanics for Chemical Engineers',
    'course:화공열역학1': 'Chemical Engineering Thermodynamics 1',
    'course:화공통계및수치해석': 'Statistics and Numerical Methods',
    'course:고분자화학': 'Polymer Chemistry',
    'course:촉매공학': 'Catalysis Engineering',
    'course:생물분자공학': 'Biomolecular Engineering',
    'course:AI인체모사비임상시험': 'AI-Driven Human-Replica Preclinical Testing',
    'course:공정모사와 제어': 'Process Simulation and Control',
    'course:기기분석': 'Instrumental Analysis',
    'course:화공열역학2': 'Chemical Engineering Thermodynamics 2',
    'course:화공기기분석실험': 'Instrumental Analysis Laboratory',
    'course:고분자공학': 'Polymer Engineering',
    'course:열및물질전달': 'Heat and Mass Transfer',
    'course:반도체공학': 'Semiconductor Engineering',
    'course:신재생에너지시스템공학': 'Renewable Energy Systems Engineering',
    'course:종합설계1': 'Capstone Design 1',
    'course:고분자물성': 'Polymer Properties',
    'course:분리공정': 'Separation Processes',
    'course:공정시스템': 'Process Systems',
    'course:생물화학공학': 'Biochemical Engineering',
    'course:석유및정밀화학': 'Petroleum and Fine Chemicals',
    'course:대기오염방지공학': 'Air Pollution Control Engineering',
    'course:전기화학에너지공학': 'Electrochemical Energy Engineering',
    'course:종합설계2': 'Capstone Design 2',
    'course:안전및방재공학': 'Safety and Loss Prevention Engineering',
    'course:차세대전지공학': 'Next-Generation Battery Engineering',
    'course:나노소재공학': 'Nanomaterials Engineering',
    'course:이동현상': 'Transport Phenomena',
    'course:콜로이드계면공학': 'Colloid and Interface Engineering',
    /* 2027-1 개편 예정 과목명 */
    'course:화공유체역학응용': 'Applied Fluid Mechanics',
    'course:화공열역학 및 응용': 'Thermodynamics and Applications',
    'course:고분자화학 및 중합': 'Polymer Chemistry and Polymerization',
    'course:촉매반응공학': 'Catalytic Reaction Engineering',
    'course:신재생에너지시스템 공학': 'Renewable Energy Systems Engineering',
    'course:공정시스템 설계': 'Process Systems Design',
    'course:분리공정 및 응용': 'Separation Processes and Applications',
    'course:전기화학응용공학': 'Applied Electrochemical Engineering',
    'course:캡스톤디자인 및 AI 활용': 'Capstone Design with AI',

    /* ---------------------------------------------------------- 교과목 설명 */
    'desc:공학수학1': 'Calculus for engineering: limits and continuity, differentiation and its applications, integration techniques, transcendental functions, and partial derivatives.',
    'desc:공학물리1': 'The physics that underlies chemical engineering, applied to engineering problems.',
    'desc:공학화학1': 'Foundations of chemistry for first-year students — the core concepts, principles, and laws of the field.',
    'desc:화공양론1': 'Unit conversion, material balances, and energy balances: the basis of chemical process calculations.',
    'desc:고급공학수학1': 'Series solutions of first- and second-order linear differential equations, Laplace transforms, and Fourier analysis.',
    'desc:공학화학2': 'Chemical principles and laws, inorganic and organic industrial chemistry, and the basics of industrial chemistry laboratory work.',
    'desc:재료과학': 'Atomic bonding and structure, phase diagrams, heat treatment, and the properties of metals, ceramics, polymers, and composites.',
    'desc:화공에너지입문': 'How energy is produced, converted, and stored, and the energy technologies chemical engineering provides.',
    'desc:화공양론2': 'Material and energy balances applied to real plants, building the process calculation skills used throughout the major.',
    'desc:화공기초실험1': 'Gravimetric and volumetric analysis — chemical equilibrium, concentration calculations, solubility, precipitation, separation techniques, and instrument handling.',
    'desc:공업유기화학1': 'Synthesis, structure, properties, and reaction mechanisms of basic organic compounds, tied to industrial processes.',
    'desc:공업물리화학1': 'Laws of thermodynamics, equations of state, phase equilibria of pure substances, mixtures, and chemical equilibrium.',
    'desc:환경에너지공학개론': 'Environmental engineering fundamentals — pollution of water, air, and soil, and the methods used to treat it.',
    'desc:화공기초실험2': 'The second basic laboratory course: quantitative analysis and instrumental techniques.',
    'desc:반응공학': 'Ideal reactors for homogeneous gas and liquid reactions, and the methods used to design them.',
    'desc:공업유기화학2': 'Aromatic compounds and their derivatives, alcohols and carbonyl compounds, free-radical reactions, and further reaction types.',
    'desc:수처리공학': 'Pollution loads in municipal and industrial wastewater, and the engineering methods used to treat them.',
    'desc:선형대수': 'Vectors, matrices, and linear algebra, with the calculus needed to model and solve engineering problems.',
    'desc:공업물리화학2': 'Kinetic theory, chemical reaction kinetics, and the physics of solid surfaces and surface processes.',
    'desc:화학공학실험': 'Measurement of density, viscosity, refractive index, and vapor pressure, with fluid-flow and heat-transfer experiments.',
    'desc:화공유체역학': 'Fluid properties and behavior, friction losses, transport and mixing, and the principles of the equipment used in practice.',
    'desc:화공열역학1': 'Thermodynamic properties, phase and chemical equilibrium, and energy conversion.',
    'desc:화공통계및수치해석': 'Statistical and numerical methods for chemical engineering problems, applied through programming.',
    'desc:고분자화학': 'Polymer structure and properties, polymerization mechanisms and processes, thermal, mechanical, and electrical behavior, processing, and analysis.',
    'desc:촉매공학': 'Non-elementary, non-isothermal, and transient catalytic reaction systems, and the design of catalytic reactors.',
    'desc:생물분자공학': 'Biomolecules and their activity in and out of the body, protein production and purification, biopharmaceuticals, and enzyme kinetics.',
    'desc:AI인체모사비임상시험': 'AI-based human-replica models such as organoids and organ-on-a-chip, and the design and evaluation of preclinical studies.',
    'desc:공정모사와 제어': 'The characteristics of chemical processes, control theory and stability, controller principles, and applications from single units to whole plants.',
    'desc:기기분석': 'Quantitative and qualitative analysis by instrument — measurement principles, operation, and hands-on property measurement.',
    'desc:화공열역학2': 'Further thermodynamics: property relations, phase and chemical equilibrium, and energy conversion.',
    'desc:화공기기분석실험': 'Analysis of hazardous substances in air and water using TOC, UV spectroscopy, AA, HPLC, and turbidity measurement.',
    'desc:고분자공학': 'Manufacture, structure, properties, and processing of synthetic resins, rubbers, and fibers.',
    'desc:열및물질전달': 'Heat flow theory and the structure and design of heat-transfer equipment.',
    'desc:반도체공학': 'Semiconductor physics and the operating principles of devices — pn junctions and field-effect transistors — with the basics of fabrication.',
    'desc:신재생에너지시스템공학': 'Principles and systems of renewable conversion and storage — solar cells, fuel cells, and biomass.',
    'desc:종합설계1': 'Plant design: process selection, cost estimation, investment analysis, and optimization methods.',
    'desc:고분자물성': 'Molecular weight, crystallinity and morphology, the glass transition and melting, polymer solutions, and viscoelasticity.',
    'desc:분리공정': 'Distillation, extraction, absorption, and adsorption — the theory and design of industrial separation equipment.',
    'desc:공정시스템': 'Process optimization and selection in conceptual design, advanced optimization techniques, and process simulation.',
    'desc:생물화학공학': 'Genetic engineering, cell culture, biopharmaceutical production, enzyme technology, fermentation, and bioseparation.',
    'desc:석유및정밀화학': 'Petroleum chemistry and the petrochemical products derived from it, with the related industrial organic chemistry.',
    'desc:대기오염방지공학': 'Sources and effects of air pollutants, their dispersion, and the methods used to reduce and treat them.',
    'desc:전기화학에너지공학': 'Electrochemistry fundamentals and the materials and performance evaluation of batteries, fuel cells, and water electrolysis.',
    'desc:종합설계2': 'Capstone design: designing and analyzing a real manufacturing or treatment process with the theory and practice of the major.',
    'desc:안전및방재공학': 'Process safety and loss prevention, and current safety management practice in Korea and abroad.',
    'desc:차세대전지공학': 'Post-lithium-ion battery materials, cell design, and safety issues.',
    'desc:나노소재공학': 'Synthesis, structural and property analysis, and device applications of nanomaterials.',
    'desc:이동현상': 'Momentum, energy, and mass transfer — the theoretical analysis of fluid flow and of steady and unsteady heat and mass transfer.',
    'desc:콜로이드계면공학': 'Interfacial energy and structure, molecular orientation, electrokinetic phenomena, supramolecular assemblies, and colloidal dispersions in industry.',

    /* ---------------------------------------------------------- 이수체계도 */
    '이수체계도': 'Course Roadmap',
    '학기별 전공 과목': 'Major courses by semester',
    '권장 이수 흐름': 'Recommended course sequence',
    '트랙별 권장 과목': 'Courses by track',
    '전체 트랙': 'All tracks',
    '트랙을 선택하면 해당 과목이 강조됩니다.': 'Select a track to highlight its courses.',
    '연계 교수진': 'Related faculty',
    '학년': 'Year',
    '권장 이수 흐름은 학과가 권장하는 순서이며, 공식 선수과목 지정과 다를 수 있습니다. 본인 학번의 교과과정·선수과목은 학과 사무실에서 확인하세요.':
      'The sequence shows the order the department recommends; it may differ from formally designated prerequisites. Check the curriculum and prerequisites for your cohort with the department office.',
    '물질·에너지 수지': 'Material and energy balances',
    '화공 계산의 뼈대': 'The backbone of process calculations',
    '유체·열·물질전달': 'Fluid, heat, and mass transfer',
    '전달현상으로 이어지는 흐름': 'Leading to transport phenomena',
    '반응·촉매·설계': 'Reactions, catalysis, and design',
    '반응기에서 공정 설계로': 'From reactors to plant design',
    '공정 설계·제어': 'Process design and control',
    '모사·제어에서 종합설계까지': 'From simulation and control to capstone design',
    '실험·분석': 'Laboratory and analysis',
    '기초실험에서 기기분석까지': 'From basic laboratories to instrumental analysis',
    '화학·물성 기초': 'Chemistry and properties',
    '유기화학과 물리화학': 'Organic and physical chemistry',
    '반도체·디스플레이': 'Semiconductor & Display',
    '이차전지·에너지': 'Batteries & Energy',
    '바이오·의약': 'Bio & Pharmaceuticals',
    '환경·에너지 공정': 'Environment & Process',
    '소자 원리에서 공정·소재까지. 반도체공학과 나노소재공학을 축으로 두고 물성 과목으로 소재 이해를 보강합니다.':
      'From device physics to processes and materials: Semiconductor Engineering and Nanomaterials Engineering form the axis, with materials-property courses strengthening the materials side.',
    '전기화학 소자와 에너지 변환·저장. 전기화학에너지공학, 차세대전지공학, 신재생에너지시스템공학에 촉매·반응공학을 더합니다.':
      'Electrochemical devices and energy conversion and storage: Electrochemical Energy Engineering, Next-Generation Battery Engineering, and Renewable Energy Systems Engineering, plus catalysis and reaction engineering.',
    '중합과 물성, 계면. 고분자화학에서 고분자공학·고분자물성으로 이어지고 콜로이드계면공학이 계면을 다룹니다.':
      'Polymerization, properties, and interfaces: from Polymer Chemistry to Polymer Engineering and Polymer Properties, with Colloid and Interface Engineering covering interfaces.',
    '생체분자와 바이오공정. 생물분자공학, 생물화학공학, AI인체모사비임상시험을 분석 과목과 함께 듣습니다.':
      'Biomolecules and bioprocesses: Biomolecular Engineering, Biochemical Engineering, and AI-Driven Human-Replica Preclinical Testing, together with analysis courses.',
    '환경 처리와 공정 설계. 환경에너지공학개론·수처리공학·대기오염방지공학에 공정·제어 과목을 결합합니다.':
      'Environmental treatment and process design: Introduction to Environmental and Energy Engineering, Water Treatment Engineering, and Air Pollution Control Engineering combined with process and control courses.'
  });

  /* 교과목 설명 조회 (app.js·roadmap.js 공용) */
})(window);
