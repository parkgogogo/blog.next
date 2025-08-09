import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function TestPage() {
  const testContent = `
地点在长沙渔人码头 #美食

![松露土豆团](../../attachment/IMG_1941.webp)
土豆团微焦，焦香味搭配松露的味道非常的不错，口感也很好 🌟🌟🌟🌟

![黑松露菌菇意面](../../attachment/IMG_1942.webp)
松露味道跟松露土豆团是一个系列，综合来说土豆团更好 🌟🌟🌟

![脆脆金沙翅](../../attachment/IMG_1945.webp)
入口跟话梅鸡翅很像，甜口，鸡翅是完整的大鸡翅，味道在炸鸡翅中算不错的👍 🌟🌟🌟🌟

![川派麻婆豆腐披萨](../../attachment/IMG_1946.jpeg)
特点就是很麻很麻，吃个猎奇
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
