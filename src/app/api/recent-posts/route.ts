import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  try {
    // 모든 블로그 포스트 가져오기 (이미 날짜별로 정렬됨)
    const allPosts = getAllPosts();
    
    // 최근 3개의 포스트만 반환
    const recentPosts = allPosts.slice(0, 3);
    
    return NextResponse.json(recentPosts);
  } catch (error) {
    console.error('최신 블로그 포스트를 가져오는 중 오류 발생:', error);
    return NextResponse.json(
      { error: '블로그 포스트를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 