import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import TableOfContentsWrapper from '@/components/TableOfContentsWrapper';
import { getPost, getCategories } from '@/lib/posts';
import CategorySidebarServer from '@/components/CategorySidebarServer';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  
  const post = await getPost(slug);
  const categories = await getCategories();
  
  if (!post) {
    notFound();
  }
  
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <CategorySidebarServer categories={categories} currentSlug={slug} />
      
      {/* Main Content */}
      <div className="flex-1 max-w-none">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <article className="bg-transparent">
            <div className="px-0 py-0">
              {/* Post Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-block bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1 rounded-full border border-orange-200">
                    {post.category}
                  </span>
                  <time className="text-sm text-muted">{formattedDate}</time>
                </div>
                
                <h1 className="text-5xl font-display font-light text-foreground mb-6 leading-tight tracking-tight">
                  {post.title}
                </h1>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1 rounded-md border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Post Content */}
              <div 
                className="prose prose-lg max-w-none mt-8"
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