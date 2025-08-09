import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = params;

    // Get environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const attachmentPath = process.env.ATTACHMENT_PATH || "attachment";

    // Validate required environment variables
    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json(
        { error: "Missing required GitHub configuration" },
        { status: 500 }
      );
    }

    // Construct the file path
    const filePath = path.join("/");
    const fullPath = `${attachmentPath}/${filePath}`;

    // Fetch file from GitHub API
    const githubUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${fullPath}`;

    const response = await fetch(githubUrl, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "NextJS-Blog-App",
      },
      // Add cache control
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

      return NextResponse.json(
        { error: "Failed to fetch file from GitHub" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // GitHub API returns base64 encoded content for files
    if (data.type !== "file") {
      return NextResponse.json(
        { error: "Path does not point to a file" },
        { status: 400 }
      );
    }

    // Decode base64 content
    const fileContent = Buffer.from(data.content, "base64");

    // Determine content type based on file extension
    const getContentType = (filename: string): string => {
      const ext = filename.toLowerCase().split(".").pop();
      const mimeTypes: { [key: string]: string } = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        pdf: "application/pdf",
        txt: "text/plain",
        md: "text/markdown",
        json: "application/json",
        css: "text/css",
        js: "application/javascript",
        html: "text/html",
      };

      return mimeTypes[ext || ""] || "application/octet-stream";
    };

    const contentType = getContentType(data.name);

    // Return the file with appropriate headers
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Content-Disposition": `inline; filename="${data.name}"`,
        "Content-Length": fileContent.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error serving attachment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
