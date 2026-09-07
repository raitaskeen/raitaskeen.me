"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

const LETTERS = [
  { char: "r", scrollShift: [8, -8] as [number, number], delay: 0 },
  { char: "a", scrollShift: [-7, 7] as [number, number], delay: 0.03 },
  { char: "i", scrollShift: [9, -7] as [number, number], delay: 0.06 },
  { char: "t", scrollShift: [-8, 8] as [number, number], delay: 0.09 },
  { char: "a", scrollShift: [7, -7] as [number, number], delay: 0.12 },
  { char: "s", scrollShift: [-9, 9] as [number, number], delay: 0.15 },
  { char: "k", scrollShift: [8, -8] as [number, number], delay: 0.18 },
  { char: "e", scrollShift: [-7, 7] as [number, number], delay: 0.21 },
  { char: "e", scrollShift: [8, -6] as [number, number], delay: 0.24 },
  { char: "n", scrollShift: [-8, 8] as [number, number], delay: 0.27 },
];

function KineticChar({
  char,
  scrollShift,
  progress,
  reduce,
  index,
  isLast,
}: {
  char: string;
  scrollShift: [number, number];
  progress: MotionValue<number>;
  reduce: boolean | null;
  index: number;
  isLast: boolean;
}) {
  const scrollY = useTransform(progress, [0, 1], scrollShift);
  const pointerY = useMotionValue(0);
  const smoothPointerY = useSpring(pointerY, { stiffness: 320, damping: 22 });
  const [hovered, setHovered] = useState(false);

  // Combine scroll transform + pointer proximity offset
  const combinedY = useTransform([scrollY, smoothPointerY], ([sy, py]) => {
    if (reduce) return 0;
    return (Number(sy) || 0) + (Number(py) || 0);
  });

  return (
    <motion.span
      style={{
        display: "inline-block",
        y: reduce ? 0 : combinedY,
        willChange: "transform, color",
        position: "relative",
        zIndex: hovered ? 10 : 2,
        // Remove trailing letter-spacing expansion on last character so 'n' never pushes past boundaries
        marginRight: isLast ? 0 : undefined,
        overflow: "visible",
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      onPointerEnter={() => {
        if (!reduce) {
          pointerY.set(-8);
          setHovered(true);
        }
      }}
      onPointerLeave={() => {
        if (!reduce) {
          pointerY.set(0);
          setHovered(false);
        }
      }}
      // Explicit rest state guarantees opacity is ALWAYS 1 and never reverts to 0 on hover exit
      animate={{
        opacity: 1,
        scale: hovered && !reduce ? 1.08 : 1,
        color: hovered && !reduce ? "var(--orange-yellow-crayola)" : "inherit",
      }}
    >
      {char}
    </motion.span>
  );
}

export default function ContactSignature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Track container scroll progress for vertical wave displacement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section
      ref={containerRef}
      aria-label="raitaskeen Signature Identity"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginTop: 80,
        paddingTop: 56,
        paddingBottom: 40,
        textAlign: "center",
        position: "relative",
        overflow: "visible",
        userSelect: "none",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Editorial Watermark Header */}
      <div style={{ marginBottom: 16 }}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: isHovered ? "var(--orange-yellow-crayola)" : "hsla(0, 0%, 100%, 0.28)",
            transition: "color 0.3s ease",
          }}
        >
          AUTONOMOUS SYSTEMS // MONOMARK
        </span>
      </div>

      {/* Dominant kinetic wordmark — automotive / robotics precision typography */}
      <div
        style={{
          fontSize: "clamp(38px, 11vw, 125px)",
          fontWeight: 700,
          fontFamily: "system-ui, -apple-system, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
          letterSpacing: isHovered ? "clamp(0.14em, 2vw, 0.24em)" : "clamp(0.12em, 1.6vw, 0.18em)",
          lineHeight: 0.95,
          color: isHovered ? "hsla(45, 100%, 72%, 0.35)" : "hsla(0, 0%, 100%, 0.12)",
          transition: "color 0.35s ease, letter-spacing 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          cursor: "default",
          textTransform: "lowercase",
          maxWidth: "100%",
          overflow: "visible",
          padding: "0 8px",
        }}
      >
        {LETTERS.map((item, idx) => (
          <KineticChar
            key={idx}
            char={item.char}
            scrollShift={item.scrollShift}
            progress={scrollYProgress}
            reduce={reduce}
            index={idx}
            isLast={idx === LETTERS.length - 1}
          />
        ))}

        {/* Subtle gold precision micro-dot */}
        <span
          style={{
            width: "clamp(5px, 1vw, 10px)",
            height: "clamp(5px, 1vw, 10px)",
            borderRadius: "50%",
            background: "var(--orange-yellow-crayola)",
            marginLeft: "clamp(6px, 1.2vw, 14px)",
            marginBottom: "clamp(3px, 0.8vw, 8px)",
            opacity: isHovered ? 0.95 : 0.5,
            transition: "opacity 0.3s ease",
            display: "inline-block",
            flexShrink: 0,
            zIndex: 2,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
