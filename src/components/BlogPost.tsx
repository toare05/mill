import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface BlogPostProps {
  title: string;
  date: string;
  description?: string;
  children: React.ReactNode;
}

export default function BlogPost({ title, date, description, children }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-xl text-gray-600 mb-4">{description}</p>
        )}
        <time className="text-gray-500" dateTime={date}>
          {format(new Date(date), 'PPP', { locale: ko })}
        </time>
      </header>
      
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  );
} 