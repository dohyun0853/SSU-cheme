# 숭실대학교 화학공학과 홈페이지 리뉴얼 프로토타입

`index.html`을 브라우저에서 열면 바로 동작합니다. 빌드·설치·서버 프로그램이 필요 없습니다.

## 구성

```
index.html                 메인 페이지 (시맨틱 HTML5 + 접근성 마크업)
admin.html                 ★ 관리자 포털 (공지·교수진 편집 · data.js 백업 · GitHub 커밋)
data.js                    학과 데이터 (교수진 14명 · 연구실 · 교과목 48개 · 공지 221건 · 연혁)
assets/css/style.css       디자인 시스템 (색·타이포그래피·레이아웃·반응형·인쇄)
assets/css/admin.css       관리자 UI (모드 바 · 로그인 모달 · 포털 레이아웃)
assets/js/app.js           렌더링과 인터랙션 (검색 · 필터 · 탭 · 정렬 · 드로어)
assets/js/admin-core.js    관리자 공통 (로그인 · 저장소 · data.js 생성 · GitHub API)
assets/js/admin.js         메인 페이지 관리자 모드 (로그인 · 상단 바 · 퀵 버튼)
assets/js/admin-portal.js  관리자 포털 네 개 탭
assets/faculty/*.jpg       전임교원 사진 14장 (학과 공식 홈페이지 제공 이미지)
assets/ssu-logo.png        숭실대학교 로고
AI_유지보수_가이드.md      교수님·조교 인계용 유지보수 매뉴얼
검증_보고서.md             기능·접근성·디자인 검증 결과 (axe-core 측정 포함)
robots.txt / sitemap.xml   검색엔진 수집 설정
.lighthouserc.json         Lighthouse CI 예산(성능·접근성·SEO) 설정
```

## 주요 기능

- **연구 분야 필터** — 반도체 / 배터리 / 바이오 / 고분자 / 환경 칩으로 교수진·연구실 필터링
- **교수진 카드** — 카드 클릭 시 연구실 공식 홈페이지 새 탭, `프로필 보기`에서 학력·연구·경력
- **공지사항** — 학부 / 대학원 / 취업·인턴십 탭, 최신순·중요공지순 정렬, 실시간 퍼지 검색, 더 보기
- **교과과정** — 1~4학년 탭, 학기별 과목, 과목 클릭 시 강의 내용 펼침, 졸업요건 요약
- **통합 검색** — `Ctrl+K`(또는 `/`)로 교수·공지·과목을 한 번에 검색
- **반응형** — 1440 / 1024 / 760 / 390px 대응, 모바일 메뉴·가로 스크롤 탭
- **접근성** — 건너뛰기 링크, 포커스 링, `prefers-reduced-motion`, 시맨틱 랜드마크, 대체 텍스트

## 라이브러리

Pretendard(웹폰트) · Lucide(아이콘) · Fuse.js(검색) — 모두 CDN으로 불러오며, 로드에 실패해도
핵심 디자인과 데이터는 그대로 표시됩니다. 관리자 포털만 Tailwind CSS를 보조 유틸리티로 함께 씁니다.

## 품질 기준

- 입력 살균 **DOMPurify**, GitHub 커밋 **Octokit**(실패 시 REST 폴백)
- 접근성 **axe-core** — `?a11y=1` 로 WCAG 2.1 A/AA 자체 점검 (측정 결과 위반 0건)
- **Lighthouse CI** 예산 설정, JSON-LD·canonical·sitemap 등 SEO 마크업
- 모바일 공지 탭은 좌우 스와이프로 전환(네이티브 터치 제스처, passive 리스너)

## 관리자 포털

`admin.html` — 공지 221건과 교수진 14명을 브라우저에서 직접 고치고, `data.js`로 내려받거나
GitHub 저장소(`dohyun0853/SSU-cheme`)에 바로 커밋해 홈페이지를 갱신하는 관리자 화면입니다.

- 최초 계정: `admin` / `ssu1967!` (보안 탭에서 변경)
- 수정 내용은 먼저 브라우저 localStorage에 저장 → `data.js` 내려받기 → GitHub 커밋 순서로 영구 반영
- 홈페이지 푸터의 「관리자 로그인」으로도 들어갈 수 있고, 로그인하면 목록에 [수정] [삭제] 퀵 버튼이 나타납니다
- 자세한 사용법·토큰 발급 절차는 `AI_유지보수_가이드.md` 1장

## 배포

`ssu-cheme-web` 폴더 내용을 학과 웹서버에 그대로 업로드하면 됩니다.
정적 HTML이므로 Apache/Nginx 어디서든 동작하며, PHP·DB 연동은 없습니다.
