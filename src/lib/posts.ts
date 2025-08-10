import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { readFile } from "fs/promises";
import path from "path";
import { BlogPost, Category } from "@/types/blog";

interface GitHubContentItem {
  type: "file" | "dir" | "submodule" | "symlink";
  name: string;
  path: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const GITHUB_OWNER = process.env.GITHUB_OWNER || "your-username";
const GITHUB_REPO = process.env.GITHUB_REPO || "your-blog-repo";
const POSTS_PATH = process.env.POSTS_PATH || "posts";

/**
 * 计算阅读时间
 * @param content
 * @returns
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // 假设每分钟阅读200个字
  const text = content.replace(/[#*`~\[\]()]/g, ""); // 移除markdown标记
  const wordCount = text.length; // 中文字符数
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime || 1; // 最少1分钟
}

/**
 * 获取文件在 GitHub 上最早的提交日期，作为文件创建时间的近似
 * 如果获取失败或没有提交记录，返回当前时间的 ISO 字符串
 */
async function getFileCreationDate(filePath: string): Promise<string> {
  try {
    // 获取该文件的所有提交（按时间从新到旧）
    const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: filePath,
      per_page: 100,
    });

    if (!Array.isArray(commits) || commits.length === 0) {
      return new Date().toISOString();
    }

    // 最旧的提交是数组最后一项
    const oldest = commits[commits.length - 1];
    const date =
      oldest && (oldest.commit?.author?.date || oldest.commit?.committer?.date);

    return date || new Date().toISOString();
  } catch (error) {
    console.error(`Error fetching commits for ${filePath}:`, error);
    return new Date().toISOString();
  }
}

async function getDirectoryContents(
  path: string
): Promise<GitHubContentItem[]> {
  try {
    const { data: contents } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: path,
    });

    if (!Array.isArray(contents)) {
      return [];
    }

    return contents;
  } catch (error) {
    console.error(`Error fetching directory contents for ${path}:`, error);
    return [];
  }
}

async function processMarkdownFile(
  file: GitHubContentItem,
  categoryPath: string
): Promise<BlogPost | null> {
  try {
    const { data: fileContent } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: file.path,
    });

    if ("content" in fileContent) {
      const content = Buffer.from(fileContent.content, "base64").toString(
        "utf-8"
      );
      const { data: frontmatter, content: markdown } = matter(content);

      const slug = file.name.replace(".md", "");
      const category = categoryPath.split("/").pop() || "uncategorized";

      return {
        slug,
        title: frontmatter.title || slug,
        date: await getFileCreationDate(file.path),
        content: markdown,
        excerpt: frontmatter.excerpt || markdown.slice(0, 200) + "...",
        tags: frontmatter.tags || [],
        readingTime: calculateReadingTime(markdown),
        category,
        categoryPath,
      };
    }
  } catch (error) {
    console.error(`Error processing file ${file.name}:`, error);
  }

  return null;
}

async function processCategory(categoryPath: string): Promise<Category> {
  const categoryName = categoryPath.split("/").pop() || "root";
  const contents = await getDirectoryContents(categoryPath);

  const category: Category = {
    name: categoryName,
    path: categoryPath,
    posts: [],
    subcategories: [],
  };

  for (const item of contents) {
    if (item.type === "dir") {
      const subcategory = await processCategory(item.path);
      category.subcategories!.push(subcategory);
    } else if (item.type === "file" && item.name.endsWith(".md")) {
      const post = await processMarkdownFile(item, categoryPath);
      if (post) {
        category.posts.push({
          slug: post.slug,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags,
          category: post.category,
          categoryPath: post.categoryPath,
          readingTime: post.readingTime,
        });
      }
    }
  }

  category.posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return category;
}

async function findMarkdownFile(
  slug: string,
  basePath: string = POSTS_PATH
): Promise<{ file: GitHubContentItem; categoryPath: string } | null> {
  try {
    const { data: contents } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: basePath,
    });

    if (!Array.isArray(contents)) {
      return null;
    }

    // First, check for markdown files in current directory
    for (const item of contents) {
      if (item.type === "file" && item.name === `${slug}.md`) {
        return { file: item as GitHubContentItem, categoryPath: basePath };
      }
    }

    // Then, recursively check subdirectories
    for (const item of contents) {
      if (item.type === "dir") {
        const result = await findMarkdownFile(slug, item.path);
        if (result) {
          return result;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error searching for file ${slug}:`, error);
    return null;
  }
}

/**
 * 获取测试页面的 markdown 内容
 * @returns Promise<string> - test.md 文件的内容
 */
export async function fetchTestContent(): Promise<string> {
  try {
    // 构建文件路径，指向 public/test.md
    const filePath = path.join(process.cwd(), "public", "test.md");

    // 直接从文件系统读取文件内容
    const content = await readFile(filePath, "utf-8");

    return content;
  } catch (error) {
    console.error("Error fetching test content:", error);
    throw error;
  }
}

export const getAllSlugs = async (): Promise<string[]> => {
  const category = await processCategory(POSTS_PATH);
  const slugs: string[] = [];

  function extractSlugsFromCategory(cat: Category) {
    for (const post of cat.posts) {
      slugs.push(post.slug);
    }
    if (cat.subcategories) {
      for (const subcategory of cat.subcategories) {
        extractSlugsFromCategory(subcategory);
      }
    }
  }

  extractSlugsFromCategory(category);
  return slugs;
};

export const getCategories = async () => {
  return await processCategory(POSTS_PATH);
};

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const result = await findMarkdownFile(slug);

    if (!result) {
      return null;
    }

    const { file, categoryPath } = result;

    const { data: fileContent } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: file.path,
    });

    if ("content" in fileContent) {
      const content = Buffer.from(fileContent.content, "base64").toString(
        "utf-8"
      );
      const { data: frontmatter, content: markdown } = matter(content);

      const category = categoryPath.split("/").pop() || "uncategorized";

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || (await getFileCreationDate(file.path)),
        content: markdown,
        excerpt: frontmatter.excerpt || markdown.slice(0, 200) + "...",
        tags: frontmatter.tags || [],
        readingTime: calculateReadingTime(markdown),
        category,
        categoryPath,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}
