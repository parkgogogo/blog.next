'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/types/blog';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const items: TableOfContentsItem[] = [];
    
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      const title = heading.textContent || '';
      const id = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Add id to heading if it doesn't exist
      if (!heading.id) {
        heading.id = id;
      }
      
      items.push({
        id: heading.id || id,
        title,
        level,
      });
    });
    
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Set up intersection observer to track active heading
    const observers: IntersectionObserver[] = [];
    
    if (tocItems.length > 0) {
      const headingElements = tocItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);
      
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
      
      headingElements.forEach(element => {
        if (element) observer.observe(element);
      });
      
      observers.push(observer);
    }
    
    return () => {
      observers.forEach(observer => observer.disconnect());
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
    return null;
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