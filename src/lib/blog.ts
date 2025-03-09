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
  content: string;
}

// 모든 블로그 포스트의 메타데이터 가져오기
export function getAllPosts(): Omit<Post, 'content'>[] {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 파일 이름에서 .md 제거하여 slug 생성
      const slug = fileName.replace(/\.md$/, '');

      // 마크다운 파일을 문자열로 읽기
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter로 메타데이터 섹션 파싱
      const matterResult = matter(fileContents);

      // 데이터와 slug 결합
      return {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        description: matterResult.data.description || '',
      };
    });

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
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// 특정 slug로 블로그 포스트 가져오기
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // 파일이 존재하지 않으면 null 반환
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matter로 메타데이터 섹션 파싱
    const matterResult = matter(fileContents);
    
    // remark로 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // 데이터와 contentHtml 결합
    return {
      slug,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      description: matterResult.data.description || '',
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error getting post by slug '${slug}':`, error);
    return null;
  }
} 