import { Feed } from 'feed';
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const baseUrl = 'https://www.allformillitary.site';
  
  // Feed 객체 생성
  const feed = new Feed({
    title: "계산기밀 | 대한민국 군 계산기 모음",
    description: "대한민국 군 관련 다양한 계산기를 제공합니다. 공군 지원 점수 계산과 군적금(장병내일준비적금) 수령액 계산을 한 곳에서 이용해보세요.",
    id: baseUrl,
    link: baseUrl,
    language: "ko",
    image: `${baseUrl}/android-chrome-512x512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()} 계산기밀`,
    updated: new Date(),
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${baseUrl}/api/rss.xml`,
      json: `${baseUrl}/api/feed.json`,
      atom: `${baseUrl}/api/atom.xml`,
    },
    author: {
      name: "계산기밀",
      email: "toarete05@gmail.com",
      link: baseUrl,
    },
  });

  // 피드 항목 추가
  const pages = [
    {
      title: "계산기밀 - 메인페이지",
      description: "대한민국 군 관련 다양한 계산기를 제공합니다. 공군 지원 점수 계산과 군적금(장병내일준비적금) 수령액 계산을 한 곳에서 이용해보세요.",
      url: baseUrl,
      date: new Date(),
      image: `${baseUrl}/android-chrome-512x512.png`,
    },
    {
      title: "공군 지원 점수 계산기",
      description: "공군 지원 1차 점수를 계산해주는 도구입니다. 병과, 전공, 자격증, 출결, 가산점 등을 입력하여 예상 점수를 시뮬레이션해보세요.",
      url: `${baseUrl}/scorecalculator`,
      date: new Date(),
      image: `${baseUrl}/android-chrome-512x512.png`,
    },
    {
      title: "장병내일준비적금 계산기",
      description: "군적금(장병내일준비적금) 만기 수령액을 계산해주는 도구입니다. 월 납입액과 복무 기간을 입력하여 예상 수령액을 계산해보세요.",
      url: `${baseUrl}/moneycalculator`,
      date: new Date(),
      image: `${baseUrl}/android-chrome-512x512.png`,
    },
  ];

  // 피드에 기본 항목 추가
  pages.forEach((page) => {
    feed.addItem({
      title: page.title,
      id: page.url,
      link: page.url,
      description: page.description,
      date: page.date,
      image: page.image,
      author: [{
        name: "계산기밀",
        email: "toarete05@gmail.com",
        link: baseUrl,
      }],
    });
  });
  
  // 블로그 게시물 가져오기
  const posts = getAllPosts();
  
  // 블로그 게시물을 피드에 추가
  posts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.description,
      date: new Date(post.date),
      image: post.thumbnail ? `${baseUrl}${post.thumbnail}` : `${baseUrl}/android-chrome-512x512.png`,
      author: [{
        name: "계산기밀",
        email: "toarete05@gmail.com",
        link: baseUrl,
      }],
    });
  });

  // RSS 2.0 형식으로 생성
  const rss = feed.rss2();
  
  // XML 헤더와 함께 반환
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
} 