"use client";

import { useEffect, useRef } from "react";

// A real-shaped control-flow graph for a small config loader: the kind of
// function the analysis sample builds a CFG for. The dynamic call is the one
// edge it cannot prove, and it says so. Two layouts: wide for desktop, tall
// for phones so no label drops below a readable size.

type Pt = { x: number; y: number };
type Layout = {
  viewBox: string;
  title: Pt;
  dir: "h" | "v";
  nodes: Record<string, Pt>;
  labels: Record<string, Pt>;
};

const H = 40;
const W: Record<string, number> = { entry: 104, read: 160, if: 136, cache: 152, parse: 160, plugin: 176, exit: 88 };
const TEXT: Record<string, string> = {
  entry: "entry",
  read: "readFile(path)",
  if: "if (cached)",
  cache: "return cache",
  parse: "JSON.parse(src)",
  plugin: "plugins[name]()",
  exit: "exit",
};

const EDGES = [
  { from: "entry", to: "read" },
  { from: "read", to: "if" },
  { from: "if", to: "cache", label: "true" },
  { from: "if", to: "parse", label: "false" },
  { from: "parse", to: "plugin", label: "unproven call", unproven: true },
  { from: "cache", to: "exit" },
  { from: "plugin", to: "exit" },
];

const ORDER = ["entry", "entry-read", "read", "read-if", "if", "if-cache", "if-parse", "cache", "parse", "parse-plugin", "plugin", "cache-exit", "plugin-exit", "exit"];
const delay = (key: string) => `${ORDER.indexOf(key) * 110}ms`;

const WIDE: Layout = {
  viewBox: "0 0 960 440",
  title: { x: 32, y: 40 },
  dir: "h",
  nodes: {
    entry: { x: 88, y: 220 },
    read: { x: 256, y: 220 },
    if: { x: 444, y: 220 },
    cache: { x: 668, y: 96 },
    parse: { x: 668, y: 220 },
    plugin: { x: 668, y: 348 },
    exit: { x: 872, y: 220 },
  },
  labels: { true: { x: 552, y: 84 }, false: { x: 524, y: 240 }, "unproven call": { x: 680, y: 288 } },
};

const TALL: Layout = {
  viewBox: "0 0 480 640",
  title: { x: 24, y: 32 },
  dir: "v",
  nodes: {
    entry: { x: 240, y: 80 },
    read: { x: 240, y: 168 },
    if: { x: 240, y: 256 },
    cache: { x: 120, y: 368 },
    parse: { x: 360, y: 368 },
    plugin: { x: 360, y: 480 },
    exit: { x: 240, y: 592 },
  },
  labels: { true: { x: 112, y: 318 }, false: { x: 336, y: 318 }, "unproven call": { x: 372, y: 428 } },
};

function edgePath(l: Layout, a: string, b: string) {
  const s = l.nodes[a];
  const t = l.nodes[b];
  if (l.dir === "h") {
    if (s.x === t.x) return `M ${s.x} ${s.y + H / 2} L ${t.x} ${t.y - H / 2}`;
    const x1 = s.x + W[a] / 2;
    const x2 = t.x - W[b] / 2;
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${s.y} C ${mx} ${s.y}, ${mx} ${t.y}, ${x2} ${t.y}`;
  }
  const y1 = s.y + H / 2;
  const y2 = t.y - H / 2;
  if (s.x === t.x) return `M ${s.x} ${y1} L ${t.x} ${y2}`;
  const my = (y1 + y2) / 2;
  return `M ${s.x} ${y1} C ${s.x} ${my}, ${t.x} ${my}, ${t.x} ${y2}`;
}

function Graph({ layout, className }: { layout: Layout; className: string }) {
  return (
    <svg className={`flow ${className}`} viewBox={layout.viewBox} aria-hidden preserveAspectRatio="xMidYMid meet">
      <text x={layout.title.x} y={layout.title.y} className="label">
        loadConfig(path) · control-flow graph
      </text>
      {EDGES.map((e) => {
        const key = `${e.from}-${e.to}`;
        const lp = e.label ? layout.labels[e.label] : null;
        return (
          <g key={key}>
            <path
              d={edgePath(layout, e.from, e.to)}
              className={`edge draw${e.unproven ? " edge-hot edge-unproven" : ""}`}
              style={{ ["--d" as string]: delay(key) }}
            />
            {lp && (
              <text
                className="label node"
                style={{ ["--d" as string]: delay(key) }}
                x={lp.x}
                y={lp.y}
                textAnchor={layout.dir === "v" && e.label === "true" ? "end" : "start"}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}
      {Object.entries(layout.nodes).map(([id, p]) => {
        const hot = id === "plugin";
        return (
          <g key={id} className={`node${hot ? " node-hot" : ""}`} style={{ ["--d" as string]: delay(id) }}>
            <rect x={p.x - W[id] / 2} y={p.y - H / 2} width={W[id]} height={H} rx="8" strokeDasharray={hot ? "4 5" : undefined} />
            <text x={p.x} y={p.y + 4.5} textAnchor="middle">
              {TEXT[id]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function FlowGraph({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Static by default (no JS, reduced motion). Otherwise hide, then draw once on view.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svgs = root.querySelectorAll<SVGSVGElement>("svg");
    root.querySelectorAll<SVGPathElement>("path.draw").forEach((p) => {
      p.style.setProperty("--len", `${Math.ceil(p.getTotalLength() || 600)}`);
    });
    svgs.forEach((s) => s.classList.add("is-waiting"));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svgs.forEach((s) => s.classList.replace("is-waiting", "is-drawing"));
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flow-wrap" role="img" aria-label={label}>
      <Graph layout={WIDE} className="flow-wide" />
      <Graph layout={TALL} className="flow-tall" />
    </div>
  );
}
