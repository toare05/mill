# 공군 지원 1차 점수 계산기

공군 지원자들이 자신의 1차 점수를 계산할 수 있는 웹 애플리케이션입니다. 자격/면허, 전공, 출결, 가산점 등의 정보를 입력하면 실시간으로 점수가 계산되어 표시됩니다.

## 주요 기능

- 일반기술병과 전문기술병에 따른 다른 점수 체계 적용
- 자격/면허, 전공, 출결, 가산점을 포함한 1차 점수 계산
- 실시간 점수 계산 및 시각화
- 모바일 및 데스크톱 환경에서 모두 사용 가능한 반응형 디자인

## 기술 스택

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui 컴포넌트 라이브러리

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/yourusername/military-score-calculator.git
cd military-score-calculator

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 사용 방법

1. 군인 유형을 선택합니다 (일반기술병 또는 전문기술병).
2. 자격/면허, 전공(전문기술병만 해당), 출결 상황을 선택합니다.
3. 해당하는 가산점 항목을 체크합니다.
4. 오른쪽에 실시간으로 계산된 점수를 확인합니다.

## 참고 사항

- 본 계산기는 공군 지원 1차 점수만 계산하며, 면접 점수는 포함되지 않습니다.
- 정확한 점수는 병무청 공식 홈페이지를 참고하시기 바랍니다.

## 라이센스

MIT

## RSS 피드 및 사이트맵

이 프로젝트는 다음과 같은 RSS 피드 및 사이트맵을 제공합니다:

- 사이트맵: `/sitemap.xml`
- 서버 사이트맵: `/api/server-sitemap.xml`
- RSS 피드: `/api/rss.xml`

### 사용 방법

1. 사이트맵 생성
   ```bash
   npm run build
   ```
   빌드 후 자동으로 `postbuild` 스크립트가 실행되어 사이트맵이 생성됩니다.

2. 사이트맵 제출
   생성된 사이트맵을 다음 검색 엔진에 제출할 수 있습니다:
   - Google Search Console: https://search.google.com/search-console
   - Bing Webmaster Tools: https://www.bing.com/webmasters
   - Naver Search Advisor: https://searchadvisor.naver.com

3. RSS 피드 사용법
   RSS 리더에서 `/api/rss.xml` 엔드포인트를 구독할 수 있습니다.

### 설정 변경

- 사이트맵 설정 변경: `next-sitemap.config.js` 파일 수정
- RSS 피드 설정 변경: `src/app/api/rss.xml/route.ts` 파일 수정
- 환경 변수 설정: `.env.local` 파일에서 `SITE_URL` 값 수정
