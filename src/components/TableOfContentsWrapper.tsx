'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/types/blog';

interface TableOfContentsWrapperProps {
  content: string;
}

export default function TableOfContentsWrapper({ content }: TableOfContentsWrapperProps) {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Wait for the content to be rendered in the DOM
    const timer = setTimeout(() => {
      try {
        // Find headings in the actual DOM
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        const items: TableOfContentsItem[] = [];
        
        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          const title = heading.textContent?.trim() || '';
          
          if (title && heading.closest('.prose')) {
            const id = `heading-${index}`;
            
            // Set ID on the heading element
            heading.id = id;
            
            items.push({
              id: id,
              title,
              level,
            });
          }
        });
        
        setTocItems(items);
      } catch (error) {
        console.error('Error generating TOC:', error);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;
    
    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20px 0px -80% 0px',
      }
    );
    
    // Observe all headings with IDs
    tocItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (tocItems.length === 0) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 h-screen overflow-y-auto sticky top-0">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            On This Page
          </h3>
          <div className="text-sm text-gray-500">No headings found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          On This Page
        </h3>
        
        <nav className="space-y-1">
          {tocItems.map((item) => {
            const isActive = activeId === item.id;
            const indentClass = item.level > 1 ? `ml-${(item.level - 1) * 3}` : '';
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`
                  block w-full text-left px-2 py-1 text-xs rounded transition-colors
                  ${indentClass}
                  ${isActive 
                    ? 'text-blue-700 bg-blue-50 border-r-2 border-blue-500' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.title}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}