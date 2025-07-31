import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost, Category } from "@/types/blog";

export const revalidate = 1800; // 30分钟重新验证

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

      const processedContent = await remark().use(html).process(markdown);

      const slug = file.name.replace(".md", "");
      const category = categoryPath.split("/").pop() || "uncategorized";

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || new Date().toISOString(),
        content: processedContent.toString(),
        excerpt: frontmatter.excerpt || markdown.slice(0, 200) + "...",
        tags: frontmatter.tags || [],
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
      // Process subcategory
      const subcategory = await processCategory(item.path);
      category.subcategories!.push(subcategory);
    } else if (item.type === "file" && item.name.endsWith(".md")) {
      // Process markdown file
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
        });
      }
    }
  }

  // Sort posts by date (newest first)
  category.posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return category;
}

export async function GET() {
  try {
    const rootCategory = await processCategory(POSTS_PATH);
    return Response.json(rootCategory);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
