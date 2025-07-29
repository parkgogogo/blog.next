'use client';

import { useState, useEffect, ReactNode } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import { Category } from '@/types/blog';

interface BlogShellProps {
  children: ReactNode;
  currentSlug?: string;
}

export default function BlogShell({ children, currentSlug }: BlogShellProps) {
  const [categories, setCategories] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="w-64 bg-white border-r border-gray-200 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {categories && (
        <CategorySidebar categories={categories} currentSlug={currentSlug} />
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}