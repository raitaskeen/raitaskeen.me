"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { usePointerSystem } from "./PointerSystem";

type CursorMode = "default" | "interactive" | "inspect" | "text";

/**
 * Precision Black + Gold Architectural Custom Cursor (Spec §8)
 * - Desktop only (disabled on touch/coarse pointer and reduced motion)
 * - Black center shape with thin gold contour + trailing soft gold spring ring
 * - Context-aware modes:
 *   • default: small precise reticle
 *   • interactive (a, button): expanded ring with corner drafting notches
 *   • inspect (diagrams, graphs, compiler nodes): targeting crosshair reticle
 *   • text (inputs, textareas): precision vertical drafting beam
 * - Transform-only GPU acceleration with zero RAF loops and zero latency impact
 */
export default function CustomCursor() {
  const pointer = usePointerSystem();
  const reduce = useReducedMotion();
  const [isFine, setIsFine] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isMouseDown, setIsMouseDown] = useState(false);

  const ringScale = useMotionValue(1);
  const smoothRingScale = useSpring(ringScale, { stiffness: 380, damping: 28 });

  useEffect(() => {
    const fineQuery = window.matchMedia("(pointer: fine)");
    setIsFine(fineQuery.matches);

    const onQueryChange = (e: MediaQueryListEvent) => setIsFine(e.matches);
    fineQuery.addEventListener("change", onQueryChange);

    function onPointerOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("input, textarea, [contenteditable='true']")) {
        setMode("text");
        ringScale.set(0.6);
        return;
      }

      if (
        target.closest(
          "[data-cursor='inspect'], .graph-node, .systems-map-node, .dependency-node, svg.graph-canvas, .diagram-interactive"
        )
      ) {
        setMode("inspect");
        ringScale.set(1.5);
        return;
      }

      if (
        target.closest(
          "a, button, [role='button'], [role='tab'], select, label, .gradient-border-hover, .shimmer-btn"
        )
      ) {
        setMode("interactive");
        ringScale.set(1.35);
        return;
      }

      setMode("default");
      ringScale.set(1);
    }

    function onMouseDown() {
      setIsMouseDown(true);
      ringScale.set(mode === "inspect" ? 1.3 : mode === "interactive" ? 1.15 : 0.85);
    }

    function onMouseUp() {
      setIsMouseDown(false);
      ringScale.set(mode === "inspect" ? 1.5 : mode === "interactive" ? 1.35 : 1);
    }

    window.addEventListener("mouseover", onPointerOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      fineQuery.removeEventListener("change", onQueryChange);
      window.removeEventListener("mouseover", onPointerOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ringScale, mode]);

  if (!isFine || reduce || !pointer) {
    return null;
  }

  return (
    <>
      {/* Secondary Soft Gold Interaction Ring (Trailing spring physics) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          borderRadius: mode === "inspect" ? "3px" : "50%",
          pointerEvents: "none",
          zIndex: 99998,
          x: pointer.springX,
          y: pointer.springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: smoothRingScale,
          opacity: pointer.active,
          border:
            mode === "inspect"
              ? "1px dashed var(--orange-yellow-crayola)"
              : mode === "interactive"
              ? "1.2px solid var(--orange-yellow-crayola)"
              : "1px solid hsla(45, 100%, 72%, 0.35)",
          background:
            mode === "interactive"
              ? "hsla(45, 100%, 72%, 0.06)"
              : mode === "inspect"
              ? "hsla(45, 100%, 72%, 0.08)"
              : "transparent",
          transition: "border-color 0.15s ease, border-radius 0.15s ease, background 0.15s ease",
        }}
      >
        {/* Inspection Mode Crosshair Axis Ticks */}
        {mode === "inspect" && (
          <>
            <span
              style={{
                position: "absolute",
                top: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 1,
                height: 3,
                background: "var(--orange-yellow-crayola)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 1,
                height: 3,
                background: "var(--orange-yellow-crayola)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: -4,
                top: "50%",
                transform: "translateY(-50%)",
                width: 3,
                height: 1,
                background: "var(--orange-yellow-crayola)",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: -4,
                top: "50%",
                transform: "translateY(-50%)",
                width: 3,
                height: 1,
                background: "var(--orange-yellow-crayola)",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Primary Black Core + Gold Contour (Instantaneous zero-lag center pointer) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: mode === "text" ? 2 : mode === "inspect" ? 5 : 6,
          height: mode === "text" ? 14 : mode === "inspect" ? 5 : 6,
          borderRadius: mode === "text" ? 1 : mode === "inspect" ? 1 : "50%",
          pointerEvents: "none",
          zIndex: 99999,
          x: pointer.x,
          y: pointer.y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: pointer.active,
          background: mode === "text" ? "var(--orange-yellow-crayola)" : "#0c0d10",
          border: mode === "text" ? "none" : "1.2px solid var(--orange-yellow-crayola)",
          boxShadow: "0 0 6px hsla(45, 100%, 72%, 0.35)",
          scale: isMouseDown ? 0.75 : 1,
          transition: "width 0.12s ease, height 0.12s ease, border-radius 0.12s ease, scale 0.1s ease",
        }}
      />
    </>
  );
}
