import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import { Button } from '@/components/ui/button';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다 - 계산기밀',
      description: '요청하신 블로그 게시글을 찾을 수 없습니다.',
    };
  }

  return {
    title: `${post.title} - 계산기밀 블로그`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    params: { slug },
  }));
}

export default async function BlogPost({ params }: Params) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" passHref>
            <Button variant="outline" className="mb-6">
              ← 블로그 목록으로 돌아가기
            </Button>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
          <p className="text-gray-500 mb-6">{new Date(post.date).toLocaleDateString('ko-KR')}</p>
          
          <div className="prose prose-blue max-w-none bg-white rounded-xl p-6 md:p-8 shadow-md">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold mb-4">계산기밀 서비스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/scorecalculator" className="text-blue-600 hover:underline block p-3 bg-blue-50 rounded-lg">
              공군 지원 점수 계산기 사용해보기
            </Link>
            <Link href="/moneycalculator" className="text-green-600 hover:underline block p-3 bg-green-50 rounded-lg">
              장병내일준비적금 계산기 사용해보기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 