"use client";

import React, { useRef, useState } from "react";
import { ILuluWord } from "@/lib/words/types";
import { Loader } from "lucide-react";
import { getExplanationAction } from "@/app/words/[slug]/actions";
import Markdown from "react-markdown";
import { useIntersectionObserver } from "@reactuses/core";

export const ContextLine: React.FC<{ word: ILuluWord }> = ({ word }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exp, setExp] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(observerRef, (entry) => {
    if (entry[0].intersectionRatio === 0) {
      setExpand(false);
    }
  });

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
      <div onClick={handleGetExplanation}>
        <div
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: word.context.line }}
        />
      </div>
      {loading && (
        <Loader className="animate-spin mt-2 text-blue-500" size={16}></Loader>
      )}
      <div ref={observerRef}>
        {!loading && exp && expand && (
          <div className="mt-5 text-gray-500">
            <Markdown>{exp}</Markdown>
          </div>
        )}
      </div>
    </>
  );
};
