"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring, ease } from "@/lib/motion";

export default function SectionHeading({
  index,
  title,
  style,
}: {
  index: string; // e.g. "01"
  title: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();

  return (
    <div style={{ marginBottom: 24, ...style }}>
      <motion.div
        initial={reduce ? undefined : { opacity: 0, x: -12 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={spring.gentle}
        style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
          fontFamily: "monospace", fontSize: "var(--fs-8)", color: "var(--orange-yellow-crayola)", letterSpacing: 1,
        }}
      >
        <span>{index} /</span>
      </motion.div>
      <motion.h2
        initial={reduce ? undefined : { opacity: 0, y: 14 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ ...spring.gentle, delay: 0.08 }}
        style={{ color: "var(--white-2)", fontSize: "var(--fs-2)" }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: ease.out }}
        style={{
          height: 2, width: 48, marginTop: 10, transformOrigin: "left",
          background: "linear-gradient(to right, var(--orange-yellow-crayola), transparent)",
        }}
      />
    </div>
  );
}
