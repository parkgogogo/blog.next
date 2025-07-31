import { ReactNode } from 'react';
import CategorySidebarServer from '@/components/CategorySidebarServer';

interface BlogLayoutProps {
  children: ReactNode;
  currentSlug?: string;
}

export default async function BlogLayout({ children, currentSlug }: BlogLayoutProps) {
  // 在构建时动态获取数据，利用 Next.js 缓存
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 1800 }, // 30分钟缓存
    cache: 'force-cache', // 强制使用缓存
  });
  const categories = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CategorySidebarServer categories={categories} currentSlug={currentSlug} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}