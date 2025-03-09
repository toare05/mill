import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getAllPosts } from '@/lib/blog';

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
    // 블로그 메인 페이지 추가
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    },
  ];

  // 블로그 게시물 추가
  const posts = getAllPosts();
  
  const blogPostFields = posts.map(post => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }));
  
  // 모든 URL을 결합
  const allFields = [...fields, ...blogPostFields];
  
  return getServerSideSitemap(allFields);
} 