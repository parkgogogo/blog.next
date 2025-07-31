import Link from 'next/link';
import { format } from 'date-fns';
import { Category, BlogPostMeta } from '@/types/blog';

export const revalidate = 1800; // 30分钟重新验证
export const dynamic = 'force-dynamic'; // 强制动态渲染，避免构建时获取数据

function CategorySection({ category }: { category: Category }) {
  const getAllPosts = (cat: Category): BlogPostMeta[] => {
    let posts = [...cat.posts];
    if (cat.subcategories) {
      cat.subcategories.forEach(subcat => {
        posts = [...posts, ...getAllPosts(subcat)];
      });
    }
    return posts;
  };

  const allPosts = getAllPosts(category);
  
  if (allPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {allPosts.map((post) => (
        <article key={post.slug} className="group">
          <Link href={`/blog/${post.slug}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-normal text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                  {post.title}
                </h3>
                <time className="text-sm text-gray-500">
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </time>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default async function BlogPage() {
  // 使用 fetch 调用 API，利用 Next.js 缓存
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 1800 }, // 30分钟缓存
  });
  const categories = await response.json();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
          Blog
        </h1>
        <p className="text-gray-600 text-lg">
          Thoughts and notes on programming, design, and everything in between.
        </p>
      </header>
      
      {/* Content */}
      <div className="space-y-12">
        {/* Root category posts */}
        {categories.posts.length > 0 && (
          <CategorySection category={categories} />
        )}
        
        {/* Subcategories */}
        {categories.subcategories && categories.subcategories.map((category: Category) => (
          <CategorySection key={category.path} category={category} />
        ))}
      </div>

      {/* No content state */}
      {categories.posts.length === 0 && 
       (!categories.subcategories || categories.subcategories.length === 0) && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first markdown file in your repository.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}