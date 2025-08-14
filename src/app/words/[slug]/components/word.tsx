"use client";

import { generateSpeech } from "@/app/words/[slug]/actions";
import { useState } from "react";
import { Loader } from "lucide-react";

export const Word: React.FC<{ text: string }> = ({ text }) => {
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    setLoading(true);
    try {
      const base64Str = await generateSpeech(text);
      const byteCharacters = atob(base64Str);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      const audio = new Audio();
      audio.src = url;
      await audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(url);
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 onClick={handlePlay} className="inline-block">
        {text}
      </h3>
      {loading && (
        <div className="ml-2 inline-block">
          <Loader className="animate-spin text-blue-500" size={16} />
        </div>
      )}
    </div>
  );
};
