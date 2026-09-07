"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function Typewriter({
  words,
  typingSpeed = 48,
  deletingSpeed = 22,
  pause = 1800,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [deleting, setDeleting] = useState(false);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    function onVisChange() {
      isHiddenRef.current = document.hidden;
    }
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, []);

  useEffect(() => {
    if (reduce) return;

    const currentWord = words[wordIndex % words.length];

    if (!deleting && text === currentWord) {
      const timer = setTimeout(() => {
        if (!isHiddenRef.current) setDeleting(true);
      }, pause);
      return () => clearTimeout(timer);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Natural human typing rhythm (slight variance)
    const jitter = deleting ? 0 : Math.floor(Math.random() * 20 - 10);
    const delay = Math.max(15, (deleting ? deletingSpeed : typingSpeed) + jitter);

    const timer = setTimeout(() => {
      if (isHiddenRef.current) return;
      const nextText = deleting
        ? currentWord.slice(0, text.length - 1)
        : currentWord.slice(0, text.length + 1);
      setText(nextText);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause, reduce]);

  return (
    <span aria-live="polite" style={{ display: "inline-flex", alignItems: "baseline", minHeight: "1.3em" }}>
      <span>{text}</span>
      {!reduce && (
        <span
          aria-hidden
          className="typewriter-cursor"
          style={{
            display: "inline-block",
            width: 2,
            height: "1.1em",
            marginLeft: 3,
            background: "var(--orange-yellow-crayola)",
            borderRadius: 1,
            verticalAlign: "-2px",
            animation: "cursor-blink 1.05s step-start infinite",
          }}
        />
      )}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
