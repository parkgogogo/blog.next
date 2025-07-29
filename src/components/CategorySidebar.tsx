'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category, BlogPostMeta } from '@/types/blog';

interface CategorySidebarProps {
  categories: Category;
  currentSlug?: string;
}

interface CategoryItemProps {
  category: Category;
  currentSlug?: string;
  level?: number;
}

function CategoryItem({ category, currentSlug, level = 0 }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const hasPosts = category.posts && category.posts.length > 0;

  const indentClass = level > 0 ? `ml-${level * 4}` : '';

  return (
    <div className={`${indentClass}`}>
      {/* Category Header */}
      {category.name !== 'docs' && (
        <div className="flex items-center justify-between py-2">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            {category.name}
          </h3>
          {(hasSubcategories || hasPosts) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {isExpanded && (
        <div className="space-y-1">
          {/* Posts in this category */}
          {hasPosts && category.posts.map((post: BlogPostMeta) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                currentSlug === post.slug
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {post.title}
            </Link>
          ))}

          {/* Subcategories */}
          {hasSubcategories && category.subcategories!.map((subcategory: Category) => (
            <CategoryItem
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

export default function CategorySidebar({ categories, currentSlug }: CategorySidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-4">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Documentation
          </Link>
        </div>

        <nav className="space-y-2">
          <CategoryItem category={categories} currentSlug={currentSlug} />
        </nav>
      </div>
    </div>
  );
}