"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// A soft radial light that trails the cursor inside its parent, as if the
// pointer is influencing a physical environment rather than being attached
// to it directly. Mount this once inside a `position: relative` container.
//
// Upgraded per spec §11-12 to read as two coupled layers instead of one flat
// glow: a tighter "near" layer that tracks quickly, and a looser "far" layer
// that lags behind it — different spring stiffness reading as different
// perceived depth, the same way a close light and a bounced light behave
// differently in a real room. Both layers gain a touch of extra bloom when
// the pointer is moving fast, and fade out together when it leaves.
export default function PointerLight({ size = 420, color = "hsla(45,100%,72%,0.10)" }: { size?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);

  // Layer 1 — near light, tracks cursor responsively.
  const nearX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const nearY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });
  // Layer 2 — far light, softer depth trail.
  const farX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 });
  const farY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });

  const velocity = useVelocity(nearX);
  const bloom = useTransform(velocity, (v) => Math.min(1, Math.abs(v) / 900));
  const nearScale = useTransform(bloom, (b) => 1 + b * 0.18);

  const farSize = size * 1.4;
  const farTransX = useTransform(farX, (v) => v - farSize / 2);
  const farTransY = useTransform(farY, (v) => v - farSize / 2);
  const nearTransX = useTransform(nearX, (v) => v - size / 2);
  const nearTransY = useTransform(nearY, (v) => v - size / 2);

  const rectRef = useRef<DOMRect | null>(null);

  if (reduce) return null;

  return (
    <div
      onPointerEnter={(e) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(e) => {
        if (!rectRef.current) rectRef.current = e.currentTarget.getBoundingClientRect();
        const rect = rectRef.current;
        if (!rect) return;
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
        opacity.set(1);
      }}
      onPointerLeave={() => {
        rectRef.current = null;
        opacity.set(0);
      }}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "auto" }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          width: farSize,
          height: farSize,
          top: 0,
          left: 0,
          x: farTransX,
          y: farTransY,
          opacity,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 72%)`,
          filter: "blur(18px)",
          pointerEvents: "none",
          transition: "opacity 0.4s ease",
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        ref={ref}
        aria-hidden
        style={{
          position: "absolute",
          width: size,
          height: size,
          top: 0,
          left: 0,
          x: nearTransX,
          y: nearTransY,
          scale: nearScale,
          opacity,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(6px)",
          pointerEvents: "none",
          transition: "opacity 0.4s ease",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
