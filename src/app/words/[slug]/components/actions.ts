"use server";

import { ILuluWord } from "@/lib/words/types";
import { getExplanation } from "@/lib/words";

export const getExplanationAction = async (word: ILuluWord) => {
  return getExplanation(word);
};
