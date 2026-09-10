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
        scale: hovered && !reduce ? 1.05 : 1,
        WebkitTextStroke: hovered && !reduce ? "1.6px hsla(45, 100%, 72%, 1)" : undefined,
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

      {/* Luminous ambient gold bloom — pure radial falloff with zero rectangular edges */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "140%",
          background: isHovered
            ? "radial-gradient(ellipse 65% 45% at 50% 30%, hsla(45, 100%, 72%, 0.16) 0%, hsla(32, 100%, 55%, 0.05) 50%, transparent 75%)"
            : "radial-gradient(ellipse 65% 45% at 50% 30%, hsla(32, 100%, 55%, 0.10) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.4s ease",
        }}
        aria-hidden="true"
      />

      {/* Dominant kinetic wordmark — automotive / robotics precision typography */}
      <div
        style={{
          fontSize: "clamp(52px, 15vw, 175px)",
          fontWeight: 700,
          fontFamily: "var(--font-poppins), 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
          letterSpacing: isHovered ? "clamp(0.01em, 0.35vw, 0.03em)" : "clamp(-0.01em, 0.15vw, 0.01em)",
          lineHeight: 0.95,
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: isHovered ? "1.8px hsla(45, 100%, 74%, 0.98)" : "1.4px hsla(32, 100%, 55%, 0.92)",
          maskImage: "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 28%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 85%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.75) 28%, rgba(0, 0, 0, 0.15) 60%, rgba(0, 0, 0, 0) 85%)",
          transition: "letter-spacing 0.35s cubic-bezier(0.16, 1, 0.3, 1), -webkit-text-stroke 0.35s ease",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          cursor: "default",
          textTransform: "lowercase",
          maxWidth: "100%",
          overflow: "visible",
          padding: "0 8px",
          position: "relative",
          zIndex: 1,
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
      </div>
    </section>
  );
}
