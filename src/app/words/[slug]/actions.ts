"use server";

import { ILuluWord } from "@/lib/words/types";
import { getExplanation } from "@/lib/words";
import { ai_generateSpeech } from "@/lib/ai";

export const getExplanationAction = async (word: ILuluWord) => {
  return getExplanation(word);
};

export const generateSpeech = async (text: string) => {
  const arrayBuffer = await ai_generateSpeech(text);
  const b = Buffer.from(arrayBuffer);
  return b.toString("base64");
};
