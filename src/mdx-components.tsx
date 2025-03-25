import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// MDX 컴포넌트를 커스터마이징합니다
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 기본 컴포넌트를 오버라이드합니다
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </Link>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-4"
      />
    ),
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="text-gray-700">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-2 py-1 text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    // 기존 컴포넌트들을 유지합니다
    ...components,
  };
} 