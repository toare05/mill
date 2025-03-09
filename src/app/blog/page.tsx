import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '계산기밀 블로그 - 군 관련 정보',
  description: '대한민국 군 관련 다양한 정보, 팁, 그리고 가이드를 제공합니다.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">계산기밀 블로그</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            군 생활과 관련된 유용한 정보, 팁, 가이드를 제공합니다.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">아직 게시된 블로그 글이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Card key={post.slug} className="bg-white rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-blue-700">{post.title}</CardTitle>
                  <CardDescription>{new Date(post.date).toLocaleDateString('ko-KR')}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} passHref className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      읽어보기
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 