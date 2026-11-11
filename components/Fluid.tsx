"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Page-wide behaviour, attached once:
 * - light that follows the pointer across [data-glow] glass,
 * - [data-reveal] blocks rise in as they enter the viewport,
 * - the compact top bar appears once the identity panel scrolls away (phones, tablets).
 * Everything degrades to a static page without JS or with reduced motion.
 */
export function Fluid() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let raf = 0;
    let last: PointerEvent | null = null;

    const paint = () => {
      raf = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest<HTMLElement>("[data-glow]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      last = e;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));

    const panel = document.getElementById("panel");
    const bar = document.getElementById("topbar");
    let barIo: IntersectionObserver | undefined;
    if (panel && bar) {
      barIo = new IntersectionObserver(([e]) => bar.classList.toggle("is-on", !e.isIntersecting), { threshold: 0 });
      barIo.observe(panel);
    }
    return () => {
      io.disconnect();
      barIo?.disconnect();
    };
  }, [pathname]);

  return null;
}
