/**
 * Utility functions for handling attachment URLs
 */

/**
 * Generate a URL for an attachment file
 * @param path - The path to the attachment file (e.g., "images/example.png")
 * @returns The full URL to access the attachment via the API
 */
export function getAttachmentUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Return the API URL
  return `/api/attachment/${cleanPath}`;
}

/**
 * Check if a URL is an attachment URL
 * @param url - The URL to check
 * @returns True if the URL is an attachment URL
 */
export function isAttachmentUrl(url: string): boolean {
  return url.includes("attachment/");
}

/**
 * Convert attachment URLs in markdown content to API URLs
 * @param content - The markdown content
 * @returns The content with converted attachment URLs
 */
export function convertAttachmentUrls(content: string): string {
  // Replace attachment URLs in markdown image syntax
  // This regex matches any path that contains "attachment/" regardless of preceding directory levels
  return content.replace(
    /!\[([^\]]*)\]\(([^)]*attachment\/[^)]+)\)/g,
    (match, alt, fullPath) => {
      // Extract just the attachment part (attachment/xxx)
      const attachmentMatch = fullPath.match(/attachment\/(.+)$/);
      if (attachmentMatch) {
        const attachmentPath = attachmentMatch[1];
        return `![${alt}](${getAttachmentUrl(attachmentPath)})`;
      }
      return match; // Return original if no match found
    }
  );
}
