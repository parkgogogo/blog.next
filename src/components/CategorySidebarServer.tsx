import Link from 'next/link';
import { Category } from '@/types/blog';
import CategoryItemClient from './CategoryItemClient';

interface CategorySidebarProps {
  categories: Category;
  currentSlug?: string;
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
          <CategoryItemClient category={categories} currentSlug={currentSlug} />
        </nav>
      </div>
    </div>
  );
}