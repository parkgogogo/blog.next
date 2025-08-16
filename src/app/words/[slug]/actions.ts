"use server";

import { ILuluWord } from "@/lib/words/types";
import { getExplanation } from "@/lib/words";
import { ai_generateSpeech } from "@/lib/ai";
import { redis } from "@/lib/redis";

/**
 * 配置 redis 缓存
 * @param word
 */
export const getExplanationAction = async (word: ILuluWord) => {
  const checkRedisResult = await redis.get(`EXP_${word}`);
  if (checkRedisResult) return checkRedisResult;
  const result = await getExplanation(word);
  redis.set(`EXP_${word}`, result);
  return getExplanation(word);
};

export const generateSpeech = async (text: string) => {
  const arrayBuffer = await ai_generateSpeech(text);
  const b = Buffer.from(arrayBuffer);
  return b.toString("base64");
};
