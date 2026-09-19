"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Architectural Contact Signature Wordmark
 * - 3-stage sequence (~1.3s total, plays once when scrolled into view):
 *   1. Restrained architectural framing brackets appear (0–250ms)
 *   2. Letter borders draw smoothly across "raitaskeen" (200–900ms)
 *   3. Complete wordmark settles permanently into crisp gold contour and subtle fill (900–1300ms)
 * - Viewport intersection trigger: only plays when scrolled into view, never offscreen
 * - Zero bottom-clipping, fully responsive on 320px+ mobile, and instantaneous with prefers-reduced-motion
 */
export default function ContactSignature() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    if (reduce) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      aria-label="raitaskeen Signature Wordmark"
      style={{
        marginTop: 52,
        paddingTop: 28,
        paddingBottom: 28,
        textAlign: "center",
        position: "relative",
        userSelect: "none",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
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
          maxWidth: 920,
          height: "auto",
          display: "block",
          overflow: "visible",
        }}
      >
        <style>{`
          /* Stage 1: Framing Brackets */
          .sig-frame-bracket {
            stroke: hsla(45, 100%, 72%, 0.45);
            stroke-width: 1.5px;
            stroke-linecap: square;
            ${
              reduce || hasEnteredView
                ? "opacity: 0.8;"
                : "opacity: 0;"
            }
            ${
              !reduce && hasEnteredView
                ? "animation: sig-frame-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;"
                : ""
            }
          }

          @keyframes sig-frame-in {
            0% {
              opacity: 0;
              transform: scale(0.97);
              transform-origin: center;
            }
            100% {
              opacity: 0.8;
              transform: scale(1);
              transform-origin: center;
            }
          }

          /* Stage 2 & 3: Wordmark Stroke Drawing & Fill Settlement */
          .signature-text-outline {
            font-family: var(--font-poppins), 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
            font-size: 154px;
            font-weight: 700;
            letter-spacing: -0.015em;
            text-transform: lowercase;
            stroke: hsla(45, 100%, 72%, 0.85);
            stroke-width: 1.8px;
            stroke-dasharray: 1400;
            stroke-dashoffset: ${reduce || hasEnteredView ? "0" : "1400"};
            fill: hsla(45, 100%, 72%, 0.18);
            fill-opacity: ${reduce ? 0.28 : hasEnteredView ? 0.28 : 0};
            ${
              !reduce && hasEnteredView
                ? "animation: signature-draw 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;"
                : ""
            }
          }

          @keyframes signature-draw {
            0% {
              stroke-dashoffset: 1400;
              fill-opacity: 0;
            }
            65% {
              stroke-dashoffset: 0;
              fill-opacity: 0.12;
            }
            100% {
              stroke-dashoffset: 0;
              fill-opacity: 0.28;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .sig-frame-bracket {
              animation: none !important;
              opacity: 0.8 !important;
            }
            .signature-text-outline {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              fill-opacity: 0.28 !important;
            }
          }
        `}</style>

        {/* Stage 1: Architectural Drafting Corner Brackets */}
        <g className="sig-frame-bracket">
          {/* Top-Left Bracket */}
          <path d="M 28 32 L 28 14 L 46 14" />
          {/* Top-Right Bracket */}
          <path d="M 972 32 L 972 14 L 954 14" />
          {/* Bottom-Left Bracket */}
          <path d="M 28 148 L 28 166 L 46 166" />
          {/* Bottom-Right Bracket */}
          <path d="M 972 148 L 972 166 L 954 166" />
        </g>

        {/* Stage 2 & 3: Wordmark Text Outline Drawing into Crisp Gold Permanent State */}
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
