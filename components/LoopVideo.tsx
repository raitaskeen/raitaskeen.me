"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
};

type NetInfo = { saveData?: boolean; effectiveType?: string };

/** Resolves once the page has loaded and the main thread is idle, so footage never competes with first paint. */
function afterIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 2500 }) : setTimeout(resolve, 600);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

/**
 * Footage of shipped work. Muted, looped, and only playing while it is on screen.
 * The poster stays with prefers-reduced-motion, Data Saver or a 2G/3G connection.
 */
export function LoopVideo({ src, poster, width, height, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (net?.saveData || /(^|-)2g|3g/.test(net?.effectiveType ?? "")) return;

    let visible = false;
    let ready = false;
    let alive = true;

    const sync = () => {
      if (!ready) return;
      if (visible && !reduce.matches) {
        if (video.preload !== "auto") video.preload = "auto";
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    afterIdle().then(() => {
      if (!alive) return;
      ready = true;
      sync();
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      alive = false;
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
    >
      <source src={`${src}-sm.webm`} type="video/webm" media="(max-width: 767px)" />
      <source src={`${src}-sm.mp4`} type="video/mp4" media="(max-width: 767px)" />
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
