import RSS from "rss";
import { LULU_ENDPOINT } from "@/app/rss/words.xml/constants";

export const dynamic = "auto";

interface ILuluWord {
  id: string;
  uuid: string;
  word: string;
  exp: string;
  addTime: string;
  context: { line: string };
}

interface IResponse {
  data: ILuluWord[];
}

/**
 * 获取单词列表，前 25 个
 */
const getLuLuWords = async () => {
  try {
    const result = await fetch(LULU_ENDPOINT, {
      headers: {
        ["Cookie"]: process.env.LULU_COOKIE || "",
        ["Content-Type"]: "application/json",
      },
      next: { revalidate: 60 * 5 },
    });

    const parsedResult: IResponse = await result.json();

    if (Array.isArray(parsedResult.data)) {
      return parsedResult.data;
    }
    return [];
  } catch {
    return [];
  }
};

const parseToHTML = (data: ILuluWord) => {
  return `<p><strong>${data.uuid}</strong><br/>
${data.context?.line || ""}</p>`;
};

/**
 * GET /rss/blog
 * Builds an RSS feed from markdown posts fetched via src/lib/posts.ts
 */
export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const feed = new RSS({
    title: "Park's words.xml",
    description: "lulu words.xml",
    feed_url: `${siteUrl}/rss/word`,
    site_url: siteUrl,
    image_url: `${siteUrl}/park_logo.svg`,
  });

  try {
    const words = await getLuLuWords();
    // Fetch each post and add it to the feed
    feed.item({
      title: "words.xml",
      description: "lulu words.xml",
      url: "",
      date: new Date(),
      custom_elements: [
        {
          "content:encoded": {
            _cdata: words.map((item) => parseToHTML(item)).join(""),
          },
        },
      ],
    });

    const xml = feed.xml({ indent: true });
    return new Response(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    });
  } catch (err) {
    console.error("Failed to build RSS feed", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
