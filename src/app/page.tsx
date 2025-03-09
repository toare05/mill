"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// 블로그 포스트 타입 정의
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function Home() {
  // 클라이언트 사이드에서 최신 블로그 포스트 3개를 가져오기 위한 상태
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  
  // 컴포넌트 마운트 시 최신 블로그 포스트 가져오기
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch('/api/recent-posts');
        if (response.ok) {
          const posts = await response.json();
          setRecentPosts(posts);
        }
      } catch (error) {
        console.error('블로그 포스트를 가져오는 중 오류 발생:', error);
      }
    };
    
    fetchRecentPosts();
  }, []);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">계산기밀</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            대한민국 군 관련 다양한 계산기를 제공합니다. 
            공군 지원 점수와 장병내일준비적금 수령액 계산을 도와드립니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 공군 점수 계산기 카드 */}
          <Card className="bg-white rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-blue-700">공군 지원 점수 계산기</CardTitle>
              <CardDescription>공군 지원을 위한 1차 점수를 계산해보세요</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600">
                자격/면허, 전공, 출결, 가산점 등을 입력하여 공군 지원 1차 점수를 실시간으로 계산하고, 
                선발 점수와 비교해볼 수 있습니다.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/scorecalculator" passHref className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  점수 계산하기
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* 장병내일준비적금 계산기 카드 */}
          <Card className="bg-white rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-700">군적금(장병내일준비적금) 계산기</CardTitle>
              <CardDescription>군 적금 만기시 예상 수령액을 확인해보세요</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600">
                매월 적립액, 이자율, 복무기간 등을 입력하여 군적금(장병내일준비적금) 만기시 
                받게 될 최종 수령액을 계산할 수 있습니다.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/moneycalculator" passHref className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  수령액 계산하기
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        {/* 최신 블로그 포스트 섹션 */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">최신 블로그 포스트</h2>
            <p className="text-gray-600">군 생활과 관련된 유용한 정보를 확인하세요</p>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.slug} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-blue-700 line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>{new Date(post.date).toLocaleDateString('ko-KR')}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-gray-600 line-clamp-3">{post.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`} passHref className="w-full">
                      <Button variant="outline" className="w-full">
                        자세히 보기
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">아직 게시된 블로그 글이 없습니다.</p>
              <Link href="/blog" passHref>
                <Button>블로그 방문하기</Button>
              </Link>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/blog" passHref>
              <Button variant="outline" className="px-6">
                모든 블로그 글 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
