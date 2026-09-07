"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import {
  MotionValue,
  useMotionValue,
  useSpring,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

// One shared pointer environment for the whole site (spec §10). Every effect
// that wants to react to the cursor — the pointer light, the dot field,
// project image parallax, card lighting — reads from these same motion
// values instead of registering its own `mousemove` listener. That keeps
// the "world" feeling like one physical space instead of a dozen elements
// independently guessing where the cursor is.
//
// Values are in viewport coordinates (clientX/clientY) so any component,
// anywhere in the tree, can compare against its own bounding rect.

type PointerSystemValue = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  velocityX: MotionValue<number>;
  velocityY: MotionValue<number>;
  speed: MotionValue<number>; // smoothed scalar magnitude, for "how fast is the cursor moving"
  active: MotionValue<number>; // 0 → 1, fades out when the pointer leaves the viewport
  isFinePointer: boolean;
};

const PointerSystemContext = createContext<PointerSystemValue | null>(null);

export function usePointerSystem() {
  return useContext(PointerSystemContext);
}

export default function PointerSystem({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.35 });
  const rawVelocityX = useVelocity(springX);
  const rawVelocityY = useVelocity(springY);
  const speed = useMotionValue(0);
  const active = useMotionValue(0);
  const isFinePointer = useRef(true);

  useEffect(() => {
    isFinePointer.current = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !isFinePointer.current) return;

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      active.set(1);
    }
    function onLeave() {
      active.set(0);
    }
    function onVisibilityChange() {
      if (document.hidden) active.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduce, x, y, active]);

  useEffect(() => {
    if (reduce) return;
    const unsubX = rawVelocityX.on("change", (vx) => {
      const vy = rawVelocityY.get();
      speed.set(Math.min(1, Math.hypot(vx, vy) / 1400));
    });
    return () => unsubX();
  }, [rawVelocityX, rawVelocityY, speed, reduce]);

  const value: PointerSystemValue = {
    x,
    y,
    springX,
    springY,
    velocityX: rawVelocityX,
    velocityY: rawVelocityY,
    speed,
    active,
    isFinePointer: isFinePointer.current,
  };

  return <PointerSystemContext.Provider value={value}>{children}</PointerSystemContext.Provider>;
}
