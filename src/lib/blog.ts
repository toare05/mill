import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 블로그 포스트 디렉토리 경로
const postsDirectory = path.join(process.cwd(), 'src/data/blog');

// 블로그 포스트 타입 정의
export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

// 모든 블로그 포스트의 메타데이터 가져오기
export function getAllPosts(): Post[] {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // 파일 이름에서 .mdx 제거하여 slug 생성
      const slug = fileName.replace(/\.mdx$/, '');

      // MDX 파일을 문자열로 읽기
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // metadata 추출을 위한 간단한 정규식
      const metadataMatch = fileContents.match(/export const metadata = ({[\s\S]*?});/);
      if (!metadataMatch) {
        return null;
      }

      try {
        // 메타데이터 문자열을 객체로 변환
        const metadata = eval('(' + metadataMatch[1] + ')');
        
        return {
          slug,
          title: metadata.title || '',
          date: metadata.date || '',
          description: metadata.description || '',
        };
      } catch (error) {
        console.error(`Error parsing metadata for ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null);

  // 날짜별로 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 모든 블로그 포스트의 slug 가져오기
export function getAllPostSlugs() {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ''),
        },
      };
    });
}

// 특정 slug로 블로그 포스트 가져오기
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    // 파일이 존재하지 않으면 null 반환
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // metadata 추출을 위한 간단한 정규식
    const metadataMatch = fileContents.match(/export const metadata = ({[\s\S]*?});/);
    if (!metadataMatch) {
      return null;
    }

    try {
      // 메타데이터 문자열을 객체로 변환
      const metadata = eval('(' + metadataMatch[1] + ')');
      
      return {
        slug,
        title: metadata.title || '',
        date: metadata.date || '',
        description: metadata.description || '',
      };
    } catch (error) {
      console.error(`Error parsing metadata for ${slug}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Error getting post by slug '${slug}':`, error);
    return null;
  }
} 