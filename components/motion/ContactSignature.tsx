"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Rebuilt Contact Signature Wordmark
 * - Lightweight responsive SVG/CSS letter outline drawing animation
 * - Plays once per page entry; transitions into a permanently visible, crisp wordmark
 * - Never cut off (zero clipping masks) and responsive on all viewports
 * - Honors prefers-reduced-motion with instantaneous completion
 */
export default function ContactSignature() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="raitaskeen Signature Wordmark"
      style={{
        marginTop: 56,
        paddingTop: 24,
        paddingBottom: 24,
        textAlign: "center",
        position: "relative",
        userSelect: "none",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 1000 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="raitaskeen"
        style={{
          width: "100%",
          maxWidth: 960,
          height: "auto",
          display: "block",
          overflow: "visible",
        }}
      >
        <style>{`
          .signature-text-outline {
            font-family: var(--font-poppins), 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
            font-size: 154px;
            font-weight: 700;
            letter-spacing: -0.015em;
            text-transform: lowercase;
            stroke: hsla(45, 100%, 72%, 0.85);
            stroke-width: 1.8px;
            stroke-dasharray: 1400;
            stroke-dashoffset: ${reduce ? 0 : "1400"};
            fill: hsla(45, 100%, 72%, 0.18);
            fill-opacity: ${reduce ? 1 : 0};
            ${
              reduce
                ? ""
                : `animation: signature-draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;`
            }
          }

          @keyframes signature-draw {
            0% {
              stroke-dashoffset: 1400;
              fill-opacity: 0;
            }
            60% {
              stroke-dashoffset: 0;
              fill-opacity: 0.15;
            }
            100% {
              stroke-dashoffset: 0;
              fill-opacity: 0.28;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .signature-text-outline {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              fill-opacity: 0.28 !important;
            }
          }
        `}</style>
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="signature-text-outline"
        >
          raitaskeen
        </text>
      </svg>
    </section>
  );
}
