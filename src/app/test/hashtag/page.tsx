import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function HashtagTestPage() {
  const testContent = `
# Hashtag Test Page

This is a test page to demonstrate hashtag rendering.

Here are some hashtags: #react #nextjs #typescript #前端开发 #测试

You can also have hashtags in sentences like this: I love #programming and #webdevelopment.

Multiple hashtags together: #tag1 #tag2 #tag3

Mixed content with #hashtags and regular text.

## Code Example

\`\`\`javascript
// This #hashtag should not be rendered as a tag in code blocks
const example = "#notATag";
\`\`\`

Regular text with #finalTag at the end.
`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hashtag Rendering Test</h1>
      <div className="prose max-w-none">
        <MarkdownRenderer content={testContent} />
      </div>
    </div>
  );
}
