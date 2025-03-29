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
  keywords: string[];
  thumbnail: string;
  modifiedDate: string;
  children: React.ReactNode;
}

export default function BlogPost({ 
  title, 
  date, 
  thumbnail,
  modifiedDate,
  children 
}: BlogPostProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": thumbnail,
    "publisher": {
      "@type": "Organization",
      "name": "계산기밀",
      "logo": {
        "@type": "ImageObject",
        "url": "https://allformilitary.site/android-chrome-512x512.png"
      }
    },
    "datePublished": date,
    "dateModified": modifiedDate
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
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={date}>
                작성일: {format(new Date(date), 'PPP', { locale: ko })}
              </time>
              {modifiedDate !== date && (
                <time dateTime={modifiedDate}>
                  수정일: {format(new Date(modifiedDate), 'PPP', { locale: ko })}
                </time>
              )}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </article>
      </div>
    </>
  );
} 