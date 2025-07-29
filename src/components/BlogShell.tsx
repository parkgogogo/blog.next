"use client";

import { useState, useEffect, ReactNode } from "react";
import CategorySidebar from "@/components/CategorySidebar";
import { Category } from "@/types/blog";

interface BlogShellProps {
  children: ReactNode;
  currentSlug?: string;
}

export default function BlogShell({ children, currentSlug }: BlogShellProps) {
  const [categories, setCategories] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/posts");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Documentation</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
      </div>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-gray-600 opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="relative w-64 h-full bg-white">
              {categories && (
                <CategorySidebar
                  categories={categories}
                  currentSlug={currentSlug}
                  onItemClick={() => setIsSidebarOpen(false)}
                />
              )}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {categories && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <CategorySidebar
              categories={categories}
              currentSlug={currentSlug}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-background">{children}</div>
      </div>
    </div>
  );
}
