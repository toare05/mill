# SEO 개선 TODO 리스트

## 1. Google Search Console 설정
- [x] Google Search Console 도메인 등록 (allformillitary.site)
- [ ] Search Console에서 다음 항목 확인:
  - [x] 색인 생성 현황 점검 (2개 색인됨, 11개 미색인)
    - [x] 색인된 페이지 확인
      - [x] 메인 페이지 (/) - 3월 13일 크롤링
      - [x] 계산기 페이지 (/moneycalculator) - 3월 22일 크롤링
    - [ ] 미색인 페이지 원인 분석 및 해결
      - [x] 크롤링됨 but 미색인 페이지 처리
        - [x] /scorecalculator (메타데이터 개선)
        - [x] /privacy-policy (메타데이터 개선)
      - [ ] 블로그 페이지 색인 처리
        - [x] /blog (메타데이터 개선)
        - [ ] /blog/airforce-score-guide
        - [ ] /blog/army-vs-airforce
        - [ ] /blog/change-airforce-2026
        - [ ] /blog/military-savings-guide
      - [x] robots.txt 설정 확인
      - [x] meta robots 태그 확인
      - [ ] 내부 링크 구조 개선 (메인 페이지에서 블로그로의 링크 확인)
    - [x] 리다이렉트 에러 해결
      - [x] 도메인 리다이렉트 설정 (3월 2일 발견)
        - [x] http → https 리다이렉트 설정
        - [x] non-www → www 리다이렉트 설정
        - [x] 표준 URL 설정 (https://www.allformillitary.site/)
      - [x] /scorecalculator 페이지 리다이렉트 문제 (3월 8일 발견)
        - [x] 현재 페이지 접근 가능 여부 확인
        - [x] 올바른 URL로 리다이렉트 설정
        - [x] 수정 후 Google에 재색인 요청
  - [ ] 모바일 사용성 문제 확인
  - [ ] Core Web Vitals 보고서 검토
  - [x] 사이트맵 제출 상태 확인 (/sitemap.xml)
  - [ ] 보안 문제 및 수동 조치 확인
- [ ] Search Console API 연동 검토 (선택사항)




## 4. 사이트맵 개선
- [x] 동적 사이트맵 구현 (`/api/server-sitemap.xml`)
  - [x] 블로그 포스트 포함
  - [ ] 이미지 정보 포함
- [ ] 우선순위 및 업데이트 주기 최적화
- [ ] 블로그 카테고리/태그 페이지 포함
- [x] 현재 미색인된 페이지들이 사이트맵에 포함되어 있는지 확인
  - [x] /scorecalculator
  - [x] /privacy-policy
  - [x] /blog 및 블로그 글들

## 5. 메타데이터 표준화
- [x] 각 페이지별 메타데이터 점검
  - [x] 색인된 페이지 (/)
  - [x] 색인된 페이지 (/moneycalculator)
  - [x] 미색인 페이지들의 메타데이터 보완
- [ ] Open Graph 이미지 최적화
- [ ] Twitter 카드 메타데이터 추가

## 6. 성능 최적화
- [ ] Core Web Vitals 점검
- [ ] 이미지 최적화
  - [ ] 블로그 이미지
  - [ ] Open Graph 이미지
- [ ] 레이아웃 이동 최소화
- [ ] 초기 페이지 로딩 최적화

## 7. 콘텐츠 SEO
- [x] URL 구조 최적화
  - [x] 현재 리다이렉트 발생하는 URL 구조 개선
  - [x] 블로그 URL 구조 표준화
- [ ] 내부 링크 구조 개선
  - [ ] 메인 페이지에서 모든 주요 페이지로의 링크
  - [ ] 블로그 글 간의 관련 글 링크
  - [ ] 사이트 헤더/푸터 네비게이션 최적화
- [ ] 콘텐츠 품질 향상
  - [ ] 미색인 블로그 글들의 콘텐츠 보완
  - [ ] 주요 키워드 최적화
  - [ ] 메타 디스크립션 개선

## 8. 기술적 SEO
- [x] robots.txt 최적화
- [x] 정식 URL (canonical URL) 설정
  - [x] www vs non-www 표준화
  - [x] http → https 리다이렉트
- [ ] 구조화된 데이터 검증
  - [ ] 블로그 글 구조화 데이터
  - [ ] 계산기 도구 구조화 데이터
- [ ] 404 페이지 최적화
- [ ] 페이지 로딩 속도 개선

## 9. 모니터링 및 분석
- [ ] Search Console 정기 모니터링 설정
- [ ] 색인 현황 주기적 확인
- [ ] 검색 성능 지표 모니터링
- [ ] 오류 페이지 모니터링

## 우선순위
1. ~~Google Search Console 설정 (높음)~~ - 기본 설정 완료
2. Google Analytics 확인 (높음)
3. 사이트맵 개선 (중간)
4. RSS 피드 개선 (중간)
5. ~~메타데이터 표준화 (중간)~~ - 기본 설정 완료
6. 성능 최적화 (낮음)
7. 콘텐츠 SEO (낮음)

## 참고사항
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Schema.org 검증: https://validator.schema.org
- Core Web Vitals: https://pagespeed.web.dev 