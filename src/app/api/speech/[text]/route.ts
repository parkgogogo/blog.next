import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ text: string }> },
) {
  const { text } = await params;
  return text;

  // 安全性问题无法解决，但使用 API 实现性能会好很多，朗读延迟很低
  // const arrayBuffer = await ai_generateSpeech(text);
  //
  // return new NextResponse(new Uint8Array(arrayBuffer), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "audio/wav",
  //     "Cache-Control": "public, max-age=3600, s-maxage=31536000",
  //     "Content-Disposition": `inline; filename="${text}.wav"`,
  //     "Content-Length": arrayBuffer.byteLength.toString(),
  //   },
  // });
}
