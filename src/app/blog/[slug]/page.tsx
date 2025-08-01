import { notFound } from "next/navigation";
import { format } from "date-fns";
import BlogPostLayout from "@/components/BlogPostLayout";
import { getCategoriesCache, getPostCache } from "@/lib/cache";

export const revalidate = 7200; // 2小时重新验证

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [post, categories] = await Promise.all([
    (async () => await getPostCache(slug))(),
    getCategoriesCache(),
  ]);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");

  return (
    <BlogPostLayout
      categories={categories}
      currentSlug={slug}
      content={post.content}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <article className="bg-transparent">
          <div className="px-0 py-0">
            {/* Post Header */}
            <header className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-light text-foreground mb-4 md:mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-row items-center gap-4">
                <time className="text-sm text-muted">{formattedDate}</time>
              </div>

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
              className="prose prose-lg max-w-none mt-6 md:mt-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </BlogPostLayout>
  );
}
