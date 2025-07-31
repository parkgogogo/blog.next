import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "@/types/blog";

export const revalidate = 7200; // 2小时重新验证

interface GitHubContentItem {
  type: "file" | "dir";
  name: string;
  path: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const GITHUB_OWNER = process.env.GITHUB_OWNER || "your-username";
const GITHUB_REPO = process.env.GITHUB_REPO || "your-blog-repo";
const POSTS_PATH = process.env.POSTS_PATH || "posts";

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await findMarkdownFile(slug);

    if (!result) {
      return Response.json({ error: "Post not found" }, { status: 404 });
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

      const processedContent = await remark().use(html).process(markdown);

      const category = categoryPath.split("/").pop() || "uncategorized";

      const post: BlogPost = {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || new Date().toISOString(),
        content: processedContent.toString(),
        excerpt: frontmatter.excerpt || markdown.slice(0, 200) + "...",
        tags: frontmatter.tags || [],
        category,
        categoryPath,
      };

      return Response.json(post);
    }

    return Response.json({ error: "Post not found" }, { status: 404 });
  } catch (error) {
    console.error(`Error fetching post`, error);
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
}
