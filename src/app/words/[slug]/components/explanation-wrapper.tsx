"use client";

import React, { PropsWithChildren, useState } from "react";
import { ILuluWord } from "@/lib/words/types";
import { Loader } from "lucide-react";
import { getExplanationAction } from "@/app/words/[slug]/components/actions";
import Markdown from "react-markdown";

export const ExplanationWrapper: React.FC<
  PropsWithChildren<{ word: ILuluWord }>
> = ({ word, children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exp, setExp] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);

  const handleGetExplanation = async () => {
    if (exp) {
      setExpand(!expand);
      return;
    }
    setLoading(true);
    try {
      const text = await getExplanationAction(word);
      setExp(text);
      setExpand(true);
    } catch {
      setExp(`请求失败`);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div onClick={handleGetExplanation}>{children}</div>
      {loading && (
        <Loader className="animate-spin mt-2 text-blue-500" size={16}></Loader>
      )}
      {!loading && exp && expand && (
        <div className="mt-5 text-gray-500">
          <Markdown>{exp}</Markdown>
        </div>
      )}
    </>
  );
};
