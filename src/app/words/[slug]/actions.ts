"use server";

import { ILuluWord } from "@/lib/words/types";
import { getExplanation } from "@/lib/words";
import { ai_generateSpeech } from "@/lib/ai";

export const getExplanationAction = async (word: ILuluWord) => {
  return getExplanation(word);
};

export const generateSpeech = async (text: string) => {
  return ai_generateSpeech(text);
};
