import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";
import { all } from "@wooorm/starry-night";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          (options) => rehypeStarryNight({ ...options, grammars: all }),
        ]}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}
