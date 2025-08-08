"use client";

import { useState, useEffect } from "react";
import { TypewriterTextProps } from "@/types/components";

export default function TypewriterText({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000,
  className = "",
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // 正在输入
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.slice(0, currentText.length + 1));
          } else {
            // 输入完成，等待一段时间后开始删除
            setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          }
        } else {
          // 正在删除
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // 删除完成，切换到下一个文本
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    delayBetweenTexts,
  ]);

  // 光标闪烁效果
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`inline-block w-0.5 h-[1em] bg-blue-500 ml-1 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
      />
    </span>
  );
}
