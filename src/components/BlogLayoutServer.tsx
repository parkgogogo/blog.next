import { ReactNode } from 'react';
import { getCategories } from '@/lib/posts';
import CategorySidebarServer from '@/components/CategorySidebarServer';

interface BlogLayoutProps {
  children: ReactNode;
  currentSlug?: string;
}

export default async function BlogLayout({ children, currentSlug }: BlogLayoutProps) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CategorySidebarServer categories={categories} currentSlug={currentSlug} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}