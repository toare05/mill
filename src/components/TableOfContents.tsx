"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  className?: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-') // 한글도 허용하되 특수문자는 -로 변경
    .replace(/-+/g, '-') // 여러 개의 -를 하나로
    .replace(/^-|-$/g, ''); // 시작과 끝의 - 제거
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // heading 요소들을 찾고 필요한 경우 id 생성
    const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'));
    
    // id가 없는 heading 요소들에 id 추가
    headingElements.forEach(heading => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent || '');
      }
    });

    // heading 정보 수집
    const headingItems = headingElements
      .map(heading => ({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }))
      .filter(heading => heading.id !== ''); // 빈 id 필터링
    
    setHeadings(headingItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    headingItems.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn("space-y-1 text-sm", className)}>
      <p className="font-medium mb-4">목차</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "block text-gray-500 hover:text-gray-900 transition-colors",
            {
              "pl-4": heading.level === 3,
              "pl-8": heading.level === 4,
              "text-blue-600 font-medium": activeId === heading.id,
            }
          )}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
} 