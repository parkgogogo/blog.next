"use client";

import { useState, ReactNode } from "react";
import CategorySidebarServer from "@/components/CategorySidebarServer";
import MobileCategorySidebar from "@/components/MobileCategorySidebar";
import TableOfContentsWrapper from "@/components/TableOfContentsWrapper";
import { Category } from "@/types/blog";

interface BlogPostLayoutProps {
  children: ReactNode;
  categories: Category;
  currentSlug: string;
  content: string;
}

export default function BlogPostLayout({
  children,
  categories,
  currentSlug,
  content,
}: BlogPostLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 fixed right-4 top-1"
        title="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-gray-600 opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative w-64 h-full bg-white">
              <MobileCategorySidebar
                categories={categories}
                currentSlug={currentSlug}
                onItemClick={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Mobile TOC Overlay */}
        {isTocOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-gray-600 opacity-50"
              onClick={() => setIsTocOpen(false)}
            ></div>
            <div className="relative w-64 h-full bg-white ml-auto">
              <TableOfContentsWrapper content={content} />
            </div>
          </div>
        )}

        {/* Desktop Left Sidebar */}
        {/* Desktop Left Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <CategorySidebarServer
            categories={categories}
            currentSlug={currentSlug}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-background">{children}</div>

        {/* Desktop Right Sidebar - Table of Contents */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContentsWrapper content={content} />
        </div>
      </div>
    </div>
  );
}
