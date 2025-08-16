"use client";

import { useRef } from "react";
import { Loader } from "lucide-react";
import styles from "./index.module.css";

export const Word: React.FC<{ text: string; phon: string }> = ({
  text,
  phon,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = async () => {
    audioRef.current?.play();
  };

  return (
    <div className="mb-4">
      <h3 className="mb-2" onClick={handlePlay}>
        <span>{text}</span>
        {loading && (
          <span className="ml-1">
            <Loader
              className="text-blue-500 inline-block leading-6 pb-0.5 animate-spin"
              size={16}
            />
          </span>
        )}
      </h3>
      <div
        className={`flex gap-2 text-sm ${styles.phon}`}
        dangerouslySetInnerHTML={{ __html: phon }}
      ></div>
      <audio ref={audioRef} src={`/api/speech/${text}`} />
    </div>
  );
};
