"use client";

import Link from "next/link";
import { Category, BlogPostMeta } from "@/types/blog";

interface CategoryItemClientProps {
  category: Category;
  currentSlug?: string;
  level?: number;
}

export default function CategoryItemClient({
  category,
  currentSlug,
  level = 0,
}: CategoryItemClientProps) {
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;
  const hasPosts = category.posts && category.posts.length > 0;

  const indentClass = level > 0 ? `pl-${level * 3}` : "";

  return (
    <div>
      {/* Category Header */}
      {category.name !== "docs" && (
        <div className={`py-2 ${indentClass}`}>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            {category.name}
          </h3>
        </div>
      )}

      {/* Posts in this category */}
      {hasPosts && (
        <div className="space-y-1">
          {category.posts.map((post: BlogPostMeta) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                currentSlug === post.slug
                  ? "bg-gray-100 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}

      {/* Subcategories */}
      {hasSubcategories && (
        <div className="mt-2">
          {category.subcategories!.map((subcategory: Category) => (
            <CategoryItemClient
              key={subcategory.path}
              category={subcategory}
              currentSlug={currentSlug}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
