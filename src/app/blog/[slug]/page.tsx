import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import TableOfContentsWrapper from '@/components/TableOfContentsWrapper';
import { getPost } from '@/lib/posts';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 max-w-none">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <article className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-8 py-8">
              {/* Post Header */}
              <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <time className="text-sm text-gray-500">{formattedDate}</time>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Post Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </div>
      </div>

      {/* Right Sidebar - Table of Contents */}
      <TableOfContentsWrapper content={post.content} />
    </div>
  );
}