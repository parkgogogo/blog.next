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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {category.name}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm text-gray-500">
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </time>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              
              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore articles organized by categories and topics
        </p>
      </div>
      
      {/* Categories */}
      <div>
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
        <div className="text-center py-16">
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