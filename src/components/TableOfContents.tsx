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

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map(heading => ({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }));
    
    setHeadings(headingElements);

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

    headingElements.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

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