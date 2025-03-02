import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export async function GET() {
  const baseUrl = 'https://www.allformillitary.site';
  
  // 정적 페이지 목록
  const fields: ISitemapField[] = [
    {
      loc: `${baseUrl}/scorecalculator`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/moneycalculator`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    },
  ];

  // 여기에 데이터베이스에서 동적으로 생성된 페이지 URL들을 추가할 수 있습니다
  // 예: 블로그 포스트, 제품 목록 등
  
  return getServerSideSitemap(fields);
} 