import { readFile } from "fs/promises";
import path from "path";

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
