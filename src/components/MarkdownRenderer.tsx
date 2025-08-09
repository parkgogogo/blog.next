import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";
import { all } from "@wooorm/starry-night";
import { convertAttachmentUrls } from "@/lib/attachment";
import type { ReactNode } from "react";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
}

// Process text nodes to render hashtags as styled components
function processHashtagsInText(child: ReactNode): ReactNode {
  if (typeof child === "string") {
    const hashtagRegex = /#([a-zA-Z0-9_\u4e00-\u9fff]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = hashtagRegex.exec(child)) !== null) {
      // Add text before hashtag
      if (match.index > lastIndex) {
        parts.push(child.slice(lastIndex, match.index));
      }

      // Add hashtag component
      parts.push(
        <span
          key={`hashtag-${match.index}`}
          className="hashtag"
          data-hashtag={match[1]}
        >
          🏷 {match[0]}
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < child.length) {
      parts.push(child.slice(lastIndex));
    }

    return parts.length > 0 ? parts : child;
  }
  return child;
}

// Process children array to handle hashtags
function processChildren(children: ReactNode): ReactNode {
  return Array.isArray(children)
    ? children.map(processHashtagsInText).flat()
    : processHashtagsInText(children);
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Convert attachment URLs to API URLs
  const processedContent = convertAttachmentUrls(content);

  return (
    <div className="markdown-body">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          (options) => rehypeStarryNight({ ...options, grammars: all }),
        ]}
        components={{
          p: ({ children }) => <p>{processChildren(children)}</p>,
          li: ({ children }) => <li>{processChildren(children)}</li>,
          img: ({ src, alt }) => (
            <Image
              loading="lazy"
              src={src as string}
              alt={alt || "blog's image"}
              width={650}
              height={350}
              quality={80}
            />
          ),
        }}
      >
        {processedContent}
      </MarkdownAsync>
    </div>
  );
}
