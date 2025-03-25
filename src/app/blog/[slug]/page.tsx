import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

type BlogParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<BlogParams> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const Post = await import(`@/data/blog/${slug}.mdx`);
    const metadata = Post.metadata;

    return {
      title: `${metadata.title} - calculate secret blog`,
      description: metadata.description,
    };
  } catch (error) {
    return {
      title: 'Post not found - calculate secret',
      description: 'The requested blog post could not be found.',
    };
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPost({ params }: { params: Promise<BlogParams> }) {
  const { slug } = await params;
  try {
    const Post = await import(`@/data/blog/${slug}.mdx`);
    const Content = Post.default;
    const metadata = Post.metadata;

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" passHref>
              <Button variant="outline" className="mb-6">
                ← Back to blog list
              </Button>
            </Link>
            
            <Content />
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold mb-4">calculate secret services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/scorecalculator" className="text-blue-600 hover:underline block p-3 bg-blue-50 rounded-lg">
                Use the Air Force Support Score Calculator
              </Link>
              <Link href="/moneycalculator" className="text-green-600 hover:underline block p-3 bg-green-50 rounded-lg">
                Use the Soldiers' Tomorrow Preparation Fund Calculator
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}