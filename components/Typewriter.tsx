"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 48,
  deletingSpeed = 24,
  pause = 2000,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const safeWords = useMemo(
    () => (words && words.length > 0 ? words : ["Software Engineer"]),
    [words]
  );

  // SSR & initial client render start deterministically with the first word
  const [text, setText] = useState<string>(words?.[0] || "Software Engineer");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) return;

    const currentWord = safeWords[wordIndex % safeWords.length];

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleTick = () => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % safeWords.length);
          setIsPaused(false);
        }
      } else {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    };

    let delay = typingSpeed;
    if (isPaused) {
      delay = pause;
    } else if (isDeleting) {
      delay = text.length === 0 ? 120 : deletingSpeed;
    } else {
      const jitter = Math.floor(Math.random() * 16 - 8);
      delay = Math.max(20, typingSpeed + jitter);
    }

    clearTimer();
    timerRef.current = setTimeout(handleTick, delay);

    return clearTimer;
  }, [text, isDeleting, isPaused, wordIndex, safeWords, typingSpeed, deletingSpeed, pause, reduce]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const currentWord = safeWords[wordIndex % safeWords.length];

  return (
    <span
      role="status"
      aria-label={currentWord}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "1.3em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
      }}
    >
      <span aria-hidden="true">{reduce ? safeWords[0] : (text || "\u00A0")}</span>
      {!reduce && (
        <span
          aria-hidden="true"
          className="typewriter-cursor"
          style={{
            display: "inline-block",
            width: 2,
            height: "1.1em",
            marginLeft: 3,
            background: "var(--orange-yellow-crayola)",
            borderRadius: 1,
            animation: "cursor-blink 1.05s step-start infinite",
          }}
        />
      )}
    </span>
  );
}
