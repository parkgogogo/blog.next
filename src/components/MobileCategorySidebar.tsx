'use client';

import Link from "next/link";
import { Category } from "@/types/blog";
import CategoryItemClient from "./CategoryItemClient";

interface MobileCategorySidebarProps {
  categories: Category;
  currentSlug?: string;
  onItemClick?: () => void;
}

export default function MobileCategorySidebar({
  categories,
  currentSlug,
  onItemClick,
}: MobileCategorySidebarProps) {
  return (
    <div className="w-full h-full bg-background overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <Link
            href="/"
            onClick={onItemClick}
            className="text-xl font-display font-medium text-foreground hover:text-accent-warm transition-colors"
          >
            Documentation
          </Link>
        </div>

        <nav className="space-y-1">
          <CategoryItemClient 
            category={categories} 
            currentSlug={currentSlug} 
            onItemClick={onItemClick}
          />
        </nav>
      </div>
    </div>
  );
}