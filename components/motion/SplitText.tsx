"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

// Splits text into words, masks each in overflow:hidden, and reveals them
// with a slight stagger. Used for the hero name/title — not for body copy.
export default function SplitText({
  text,
  delay = 0,
  gap = 0.06,
  as: Tag = "span",
  style,
}: {
  text: string;
  delay?: number;
  gap?: number;
  as?: "span" | "h1" | "h2";
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag style={style}>{text}</Tag>;
  }

  return (
    <Tag style={{ ...style, display: "inline-block" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", marginRight: "0.28em" }}>
          <motion.span
            initial={{ y: "110%", filter: "blur(6px)" }}
            animate={{ y: "0%", filter: "blur(0px)" }}
            transition={{ ...spring.gentle, delay: delay + i * gap }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
