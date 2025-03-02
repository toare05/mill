/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.allformillitary.site',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      // 메인 사이트맵은 자동으로 포함되므로 추가 사이트맵만 나열
      'https://www.allformillitary.site/api/server-sitemap.xml',
    ],
  },
  exclude: ['/api/*'],
  // 우선순위 설정
  transform: async (config, path) => {
    // 커스텀 우선순위 설정
    let priority = 0.7;
    let changefreq = 'daily';

    if (path === '/') {
      // 홈페이지 우선순위
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.includes('/scorecalculator') || path.includes('/moneycalculator')) {
      // 주요 기능 페이지 우선순위
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.includes('/privacy-policy')) {
      // 정책 페이지 우선순위
      priority = 0.5;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // 빌드 후 사이트맵 생성
  outDir: './public',
} 