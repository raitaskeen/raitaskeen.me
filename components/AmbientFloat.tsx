"use client";

import { motion, useReducedMotion } from "framer-motion";
import { blurToken } from "@/lib/motion";

// Ambient background light field. Each instance drifts on its own
// asynchronous loop (different duration/offset) so multiple blobs never
// move in lockstep — that's what reads as "atmosphere" rather than
// "one thing bouncing".
export default function AmbientFloat({
  size = 320,
  top,
  left,
  right,
  bottom,
  color = "hsla(45,100%,72%,0.12)",
  duration = 14,
  travel = 24,
}: {
  size?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color?: string;
  duration?: number;
  travel?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        top, left, right, bottom,
        width: size, height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`,
        filter: blurToken.deep,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
      animate={
        reduce
          ? undefined
          : {
              x: [0, travel, -travel * 0.6, 0],
              y: [0, -travel, travel * 0.4, 0],
            }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
