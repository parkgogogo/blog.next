import Link from "next/link";
import { Category } from "@/types/blog";
import CategoryItemClient from "./CategoryItemClient";

interface CategorySidebarProps {
  categories: Category;
  currentSlug?: string;
}

export default function CategorySidebar({
  categories,
  currentSlug,
}: CategorySidebarProps) {
  return (
    <div className="w-64 bg-background h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        <div className="mb-8">
          <Link
            href="/"
            className="text-xl font-display font-medium text-foreground hover:text-accent-warm transition-colors"
          >
            Documentation
          </Link>
        </div>

        <nav className="space-y-1">
          <CategoryItemClient category={categories} currentSlug={currentSlug} />
        </nav>
      </div>
    </div>
  );
}
