"use client";

import { motion, useReducedMotion } from "framer-motion";

const SEGMENTS = 20;

export default function SkillBar({ name, value }: { name: string; value: number }) {
  const reduce = useReducedMotion();
  const filled = Math.round((value / 100) * SEGMENTS);

  return (
    <div className="skill-bar-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span className="skill-bar-name" style={{ fontSize: "var(--fs-6)" }}>
          {name}
        </span>
        <span style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-7)", fontFamily: "monospace" }}>{value}%</span>
      </div>
      <div className="skill-bar-track" style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <motion.div
            key={i}
            initial={reduce ? undefined : { opacity: 0, scaleY: 0.3 }}
            whileInView={reduce ? undefined : { opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.015, ease: "easeOut" }}
            style={{
              height: 14,
              flex: 1,
              borderRadius: 2,
              background: i < filled ? "var(--orange-yellow-crayola)" : "var(--jet)",
              opacity: i < filled ? 1 - (filled - i) * 0.015 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
