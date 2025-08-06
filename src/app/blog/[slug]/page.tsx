import { notFound } from "next/navigation";
import { format } from "date-fns";
import BlogPostLayout from "@/components/BlogPostLayout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getAllSlugs, getCategories, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug: slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [post, categories] = await Promise.all([
    (async () => await getPost(slug))(),
    getCategories(),
  ]);

  if (!post) {
    notFound();
  }

  console.log(post.content);

  return (
    <BlogPostLayout
      categories={categories}
      currentSlug={slug}
      content={post.content}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-6">
        <article className="bg-transparent">
          <div className="px-0 py-0">
            {/* Post Header */}
            <header className="mb-8 md:mb-12">
              <h1 className="text-3xl font-medium font-display text-foreground mb-4 leading-tight tracking-tight mt-0">
                {post.title}
              </h1>

              <div className="flex flex-row items-center gap-2 text-gray-500 dark:text-gray-400">
                <time>{format(new Date(post.date), "d MMM, yyyy")}</time>
                {post.readingTime !== undefined && post.readingTime > 0 && (
                  <>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
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
            <div className="mt-6 md:mt-8">
              <MarkdownRenderer content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </BlogPostLayout>
  );
}
