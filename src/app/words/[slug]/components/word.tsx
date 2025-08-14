"use client";

import { useRef } from "react";

export const Word: React.FC<{ text: string }> = ({ text }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <h3 onClick={handlePlay}>{text}</h3>
      <audio ref={audioRef} src={`/api/speech/${text}`}>
        test
      </audio>
    </div>
  );
};
