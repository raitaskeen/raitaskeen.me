"use client";

import { useEffect, useRef } from "react";

// The LegacyExodus moment, built in code so it is sharp at any size.
// Left: the Ghost 6.73 figures. Right: the same run, typed out. Only measured numbers appear.

const LINES: { text: string; kind?: "cmd" | "ok" | "dim" }[] = [
  { text: "$ legacy-exodus analyze ./ghost", kind: "cmd" },
  { text: "discovering 7,172 files" },
  { text: "connecting 415,492 calls" },
  { text: "sealing 13 artifacts → .discovery/" },
  { text: "done in 183 s", kind: "dim" },
  { text: "$ legacy-exodus analyze ./ghost   # rerun", kind: "cmd" },
  { text: "13/13 artifacts byte-identical on rerun", kind: "ok" },
];

const CHAR_MS = 22;
const GAP_MS = 260;
const timeline = (() => {
  let t = 500;
  return LINES.map((l) => {
    const dur = Math.max(240, l.text.length * CHAR_MS);
    const start = t;
    t += dur + (l.kind === "cmd" ? GAP_MS * 2 : l.kind === "dim" ? GAP_MS * 3 : GAP_MS);
    return { start, dur };
  });
})();
const TOTAL = timeline[timeline.length - 1].start + timeline[timeline.length - 1].dur;
const HOLD = 4200;

const STATS = [
  { value: "7,172", label: "files" },
  { value: "183 s", label: "one run" },
  { value: "13/13", label: "byte-identical" },
];

const fmt = new Intl.NumberFormat("en-US");

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    const count = countRef.current;
    if (!root || !count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = 415492;
    let raf = 0;
    let loop = 0;
    let visible = false;

    const countUp = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const D = 1800;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / D);
        const e = 1 - Math.pow(1 - p, 4);
        count.textContent = fmt.format(Math.round(target * e));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const run = () => {
      root.classList.remove("is-run");
      void root.offsetWidth; // restart the CSS timeline
      root.classList.add("is-run");
      countUp();
      window.clearTimeout(loop);
      loop = window.setTimeout(() => visible && run(), TOTAL + HOLD);
    };

    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([e]) => {
        const was = visible;
        visible = e.isIntersecting;
        if (visible && !was) run();
        if (!visible) window.clearTimeout(loop);
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(loop);
    };
  }, []);

  return (
    <div ref={ref} className="lx" role="img" aria-label="LegacyExodus mapped 415,492 calls across 7,172 files of Ghost 6.73 in one 183-second run; a rerun reproduced 13 of 13 artifacts byte for byte. Beside it, a terminal replays that run and its rerun.">
      <span className="lx-light" aria-hidden />
      <div className="lx-stats" aria-hidden>
        <p className="lx-kicker mono">
          <span className="lx-pip" />
          Ghost 6.73 · measured run
        </p>
        <p className="lx-big">
          <span ref={countRef}>415,492</span>
        </p>
        <p className="lx-cap">calls mapped, each one with evidence</p>
        <ul className="lx-grid">
          {STATS.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lx-term" aria-hidden>
        <div className="lx-term-bar">
          <span className="lights">
            <i />
            <i />
            <i />
          </span>
          <span className="mono">ghost 6.73 — legacy-exodus</span>
        </div>
        <ol className="lx-lines mono">
          {LINES.map((l, i) => (
            <li
              key={l.text}
              className={l.kind ? `lx-${l.kind}` : undefined}
              style={{
                ["--start" as string]: `${timeline[i].start}ms`,
                ["--dur" as string]: `${timeline[i].dur}ms`,
                ["--steps" as string]: l.text.length,
              }}
            >
              <span className="lx-text">{l.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
