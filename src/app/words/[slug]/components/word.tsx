"use client";

import { generateSpeech } from "@/app/words/[slug]/actions";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";

export const Word: React.FC<{ text: string }> = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const audioUrlRef = useRef<string | null>(null);

  const handlePlay = async () => {
    try {
      if (!audioUrlRef.current) {
        setLoading(true);
        const base64Str = await generateSpeech(text);
        const byteCharacters = atob(base64Str);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: "audio/wav" });
        audioUrlRef.current = URL.createObjectURL(blob);
      }

      const audio = new Audio();
      audio.src = audioUrlRef.current;
      await audio.play();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 onClick={handlePlay}>
        <span>{text}</span>
        {loading && (
          <span className="ml-1">
            <Loader
              className="text-blue-500 inline-block leading-6 pb-0.5"
              size={16}
            />
          </span>
        )}
      </h3>
    </div>
  );
};
