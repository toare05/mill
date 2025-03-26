"use client";

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';

interface BlogPostProps {
  title: string;
  date: string;
  description?: string;
  author: string;
  keywords: string[];
  category: string;
  thumbnail: string;
  modifiedDate: string;
  tags: string[];
  readingTime: string;
  children: React.ReactNode;
}

export default function BlogPost({ 
  title, 
  date, 
  description, 
  author, 
  category,
  thumbnail,
  modifiedDate,
  tags,
  readingTime,
  children 
}: BlogPostProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": thumbnail,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "계산기밀",
      "logo": {
        "@type": "ImageObject",
        "url": "https://allformilitary.site/android-chrome-512x512.png"
      }
    },
    "datePublished": date,
    "dateModified": modifiedDate,
    "keywords": tags.join(", "),
    "articleSection": category
  };

  return (
    <>
      <Script id="blog-post-schema" type="application/ld+json">
        {JSON.stringify(schemaData)}
      </Script>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <article className="w-full">
          <header className="mb-8">
            {thumbnail && (
              <div className="relative w-full h-[400px] mb-6">
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            )}
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{category}</Badge>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{readingTime} 읽기</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {description && (
              <p className="text-xl text-gray-600 mb-4">{description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>작성자: {author}</span>
              </div>
              <time dateTime={date}>
                작성일: {format(new Date(date), 'PPP', { locale: ko })}
              </time>
              {modifiedDate !== date && (
                <time dateTime={modifiedDate}>
                  수정일: {format(new Date(modifiedDate), 'PPP', { locale: ko })}
                </time>
              )}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <Link key={tag} href={`/blog/tag/${tag}`}>
                    <Badge variant="outline">#{tag}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </article>
      </div>
    </>
  );
} 