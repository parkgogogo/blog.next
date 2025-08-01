export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  category: string;
  categoryPath: string;
  readingTime?: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  category: string;
  categoryPath: string;
  readingTime?: number;
}

export interface Category {
  name: string;
  path: string;
  posts: BlogPostMeta[];
  subcategories?: Category[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
