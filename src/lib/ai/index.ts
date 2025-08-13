import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const ai_generateText = async (options: {
  system: string;
  prompt: string;
}) => {
  const BASE_URL = process.env.AI_BASE_URL;
  const TOKEN = process.env.AI_TOKEN;

  if (!BASE_URL || !TOKEN) {
    throw new Error("please configure AI_BASE_URL and AI_TOKEN");
  }

  const { text } = await generateText({
    model: createOpenAICompatible({
      baseURL: BASE_URL,
      name: "default",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).chatModel("google/gemini-2.0-flash-001"),
    system: options.system,
    prompt: options.prompt,
  });

  return text;
};
