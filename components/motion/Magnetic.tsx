"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

// Wraps any element (typically a primary CTA/button) and gives it a restrained
// magnetic pull toward the pointer (spec §11-13). Movement is strictly kept to
// 2–8px so it feels like a subtle physical attraction rather than dragging.
export default function Magnetic({
  children,
  strength = 0.15,
  maxOffset = 6,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  maxOffset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring.magnetic);
  const springY = useSpring(y, spring.magnetic);

  if (reduce) return <div className={className}>{children}</div>;

  const rectRef = useRef<DOMRect | null>(null);

  function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!rectRef.current) rectRef.current = e.currentTarget.getBoundingClientRect();
    const rect = rectRef.current;
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const rawX = (e.clientX - rect.left - rect.width / 2) * strength;
    const rawY = (e.clientY - rect.top - rect.height / 2) * strength;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, rawX)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, rawY)));
  }

  function handleLeave() {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.98 }}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
