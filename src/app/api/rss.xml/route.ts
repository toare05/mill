import { Feed } from 'feed';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.allformillitary.site';
  
  // Feed 객체 생성
  const feed = new Feed({
    title: "공군 지원 1차 점수 계산기",
    description: "공군 지원자들이 자신의 1차 점수를 계산할 수 있는 웹 애플리케이션입니다.",
    id: baseUrl,
    link: baseUrl,
    language: "ko",
    image: `${baseUrl}/android-chrome-512x512.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    generator: "Next.js Feed Generator",
    feedLinks: {
      rss2: `${baseUrl}/api/rss.xml`,
      json: `${baseUrl}/api/feed.json`,
      atom: `${baseUrl}/api/atom.xml`,
    },
    author: {
      name: "사이트 운영자",
      email: "your.email@example.com",
      link: baseUrl,
    },
  });

  // 피드 항목 추가
  const pages = [
    {
      title: "공군 지원 1차 점수 계산기",
      description: "공군 지원자들이 자신의 1차 점수를 계산할 수 있는 웹 애플리케이션입니다.",
      url: baseUrl,
      date: new Date(),
    },
    {
      title: "점수 계산기",
      description: "공군 지원 1차 점수를 계산해주는 도구입니다.",
      url: `${baseUrl}/scorecalculator`,
      date: new Date(),
    },
    {
      title: "돈 계산기",
      description: "돈 계산을 도와주는 도구입니다.",
      url: `${baseUrl}/moneycalculator`,
      date: new Date(),
    },
    {
      title: "개인정보 처리방침",
      description: "웹사이트의 개인정보 처리방침입니다.",
      url: `${baseUrl}/privacy-policy`,
      date: new Date(),
    },
  ];

  // 피드에 항목 추가
  pages.forEach((page) => {
    feed.addItem({
      title: page.title,
      id: page.url,
      link: page.url,
      description: page.description,
      date: page.date,
    });
  });

  // RSS 2.0 형식으로 생성
  const rss = feed.rss2();
  
  // XML 헤더와 함께 반환
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 