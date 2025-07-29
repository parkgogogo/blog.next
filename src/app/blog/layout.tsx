import { ReactNode } from 'react';
import { getCategories } from '@/lib/posts';
import CategorySidebarServer from '@/components/CategorySidebarServer';

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CategorySidebarServer categories={categories} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}