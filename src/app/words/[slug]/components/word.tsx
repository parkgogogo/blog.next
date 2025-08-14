"use client";

import { useRef } from "react";
import { generateSpeech } from "@/app/words/[slug]/actions";

export const Word: React.FC<{ text: string }> = ({ text }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // const handlePlay = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

  const handlePlay = async () => {
    const base64Str = await generateSpeech(text);
    const byteCharacters = atob(base64Str);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    const audio = new Audio();
    audio.src = url;
    await audio.play();

    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
  };

  return (
    <div>
      <h3 onClick={handlePlay}>{text}</h3>
    </div>
  );
};
