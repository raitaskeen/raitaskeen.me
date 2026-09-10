"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Network, ToggleLeft, ToggleRight, ArrowRight } from "lucide-react";

export type NodeKey =
  | "source"
  | "ast"
  | "cfg"
  | "dfg"
  | "symbols"
  | "analysis"
  | "ir"
  | "transform"
  | "rust"
  | "target";

interface FlowNode {
  id: NodeKey;
  layer: string;
  advancedTitle: string;
  beginnerTitle: string;
  shortDesc: string;
  whyItMatters: string;
  roleInLegacyExodus: string;
  x: number;
  y: number;
  w: number;
  h: number;
  neighbors: NodeKey[];
}

const FLOW_NODES: Record<NodeKey, FlowNode> = {
  source: {
    id: "source",
    layer: "01 // SOURCE INPUT",
    advancedTitle: "Source Code",
    beginnerTitle: "Input Code (Monolith)",
    shortDesc: "Raw uncompiled source code from enterprise legacy systems (PHP, monolithic JS, C++).",
    whyItMatters: "Where the modernization journey begins — before any assumptions or refactors.",
    roleInLegacyExodus: "Ingested directly from client Git repositories or archives without requiring runtime execution.",
    x: 310,
    y: 20,
    w: 180,
    h: 38,
    neighbors: ["ast"],
  },
  ast: {
    id: "ast",
    layer: "02 // SYNTAX PARSE",
    advancedTitle: "Abstract Syntax Tree (AST)",
    beginnerTitle: "Syntax Tree (Structure)",
    shortDesc: "Hierarchical tree representation of code grammar without formatting or punctuation.",
    whyItMatters: "Tells us what the code looks like syntactically and how expressions nest.",
    roleInLegacyExodus: "Parsed via tree-sitter grammars into an in-memory syntax graph ready for traversal.",
    x: 310,
    y: 88,
    w: 180,
    h: 38,
    neighbors: ["source", "cfg", "dfg", "symbols"],
  },
  cfg: {
    id: "cfg",
    layer: "03 // BEHAVIOR GRAPH",
    advancedTitle: "Control Flow Graph (CFG)",
    beginnerTitle: "Execution Paths (Decisions)",
    shortDesc: "Directed graph of basic blocks, conditional branches, loops, and exits.",
    whyItMatters: "Tells us how execution can move across branching conditions and catch dead code.",
    roleInLegacyExodus: "Identifies unreachable branches and calculates cyclomatic complexity before rewriting.",
    x: 90,
    y: 160,
    w: 185,
    h: 38,
    neighbors: ["ast", "analysis"],
  },
  dfg: {
    id: "dfg",
    layer: "03 // STATE GRAPH",
    advancedTitle: "Data Flow Graph (DFG)",
    beginnerTitle: "Data Lifecycles (Variables)",
    shortDesc: "Graph mapping variable definitions, usage sites, and mutation lifecycles.",
    whyItMatters: "Tells us how data moves and prevents breaking implicit state mutations.",
    roleInLegacyExodus: "Guarantees that automated refactoring preserves exact variable lifespans and side effects.",
    x: 310,
    y: 160,
    w: 180,
    h: 38,
    neighbors: ["ast", "analysis"],
  },
  symbols: {
    id: "symbols",
    layer: "03 // SCOPE REGISTRY",
    advancedTitle: "Symbol & Scope Table",
    beginnerTitle: "Definitions Registry (Scope)",
    shortDesc: "Map of function identifiers, type bindings, imports, and lexical scopes.",
    whyItMatters: "Resolves naming conflicts, module dependencies, and variable accessibility boundaries.",
    roleInLegacyExodus: "Ensures cross-file imports and global variable scopes are tracked deterministically.",
    x: 525,
    y: 160,
    w: 185,
    h: 38,
    neighbors: ["ast", "analysis"],
  },
  analysis: {
    id: "analysis",
    layer: "04 // CODE INTELLIGENCE",
    advancedTitle: "Static Analysis Engine",
    beginnerTitle: "Automated Code Inspection",
    shortDesc: "Deterministic analysis engine synthesizing AST, CFG, and DFG into architectural models.",
    whyItMatters: "Produces mathematically verified insights without the risks of runtime execution.",
    roleInLegacyExodus: "The core intelligence hub producing dependency maps and migration readiness scores.",
    x: 275,
    y: 236,
    w: 250,
    h: 42,
    neighbors: ["cfg", "dfg", "symbols", "ir", "transform"],
  },
  ir: {
    id: "ir",
    layer: "05 // INTERMEDIATE SPEC",
    advancedTitle: "Intermediate Representation",
    beginnerTitle: "Universal Code Blueprint",
    shortDesc: "Language-agnostic canonical schema decoupling legacy dialects from target architectures.",
    whyItMatters: "Gives transformation a neutral intermediate layer so one engine can modernize any source.",
    roleInLegacyExodus: "Allows LegacyExodus to target modern TypeScript or Rust from a single shared schema.",
    x: 185,
    y: 314,
    w: 200,
    h: 38,
    neighbors: ["analysis", "transform"],
  },
  transform: {
    id: "transform",
    layer: "05 // CODE REWRITE",
    advancedTitle: "Transformation Engine",
    beginnerTitle: "Automated Refactoring Rules",
    shortDesc: "Rules-driven code rewriting engine converting legacy patterns into modern paradigms.",
    whyItMatters: "Converts high-level migration decisions into verifiable, idiomatic output code.",
    roleInLegacyExodus: "Executes deterministic code modernizations with validation harnesses at each step.",
    x: 415,
    y: 314,
    w: 200,
    h: 38,
    neighbors: ["analysis", "ir", "rust", "target"],
  },
  rust: {
    id: "rust",
    layer: "06 // SYSTEMS TARGET",
    advancedTitle: "Rust Systems Runtime",
    beginnerTitle: "Fast Memory-Safe Core",
    shortDesc: "High-performance target offering memory safety without garbage collector latency.",
    whyItMatters: "Represents a high-performance systems-oriented target for mission-critical services.",
    roleInLegacyExodus: "Chosen target for heavy parsing kernels and memory-constrained compute workloads.",
    x: 185,
    y: 388,
    w: 200,
    h: 38,
    neighbors: ["transform"],
  },
  target: {
    id: "target",
    layer: "06 // MODULAR TARGET",
    advancedTitle: "Modular Modern TypeScript",
    beginnerTitle: "Modern Modular Code",
    shortDesc: "Clean, strongly typed modular TypeScript microservices with CI/CD validation.",
    whyItMatters: "The standard modern enterprise target for maintainable web services and APIs.",
    roleInLegacyExodus: "The default modernization target for full-stack business applications.",
    x: 415,
    y: 388,
    w: 200,
    h: 38,
    neighbors: ["transform"],
  },
};

interface FlowEdge {
  from: NodeKey;
  to: NodeKey;
}

const FLOW_EDGES: FlowEdge[] = [
  { from: "source", to: "ast" },
  { from: "ast", to: "cfg" },
  { from: "ast", to: "dfg" },
  { from: "ast", to: "symbols" },
  { from: "cfg", to: "analysis" },
  { from: "dfg", to: "analysis" },
  { from: "symbols", to: "analysis" },
  { from: "analysis", to: "ir" },
  { from: "analysis", to: "transform" },
  { from: "ir", to: "transform" },
  { from: "transform", to: "rust" },
  { from: "transform", to: "target" },
];

export default function SystemsMap() {
  const [mode, setMode] = useState<"beginner" | "advanced">("advanced");
  const [selectedId, setSelectedId] = useState<NodeKey>("analysis");
  const [hoveredId, setHoveredId] = useState<NodeKey | null>(null);
  const reduce = useReducedMotion();

  const activeId = hoveredId ?? selectedId;
  const activeNode = FLOW_NODES[activeId];

  return (
    <section id="systems-map" aria-label="Systems Architecture & Compiler Map" style={{ marginTop: 48, scrollMarginTop: 80 }}>
      {/* Header & Mode Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Network size={20} color="var(--orange-yellow-crayola)" />
            <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600 }}>
              Systems Architecture & Compiler Flow
            </h3>
          </div>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 4 }}>
            From raw legacy source code to verified systems targets — 5 intentional layers of code intelligence.
          </p>
        </div>

        {/* Beginner / Advanced Mode Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: mode === "beginner" ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)" }}>
            Beginner
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={mode === "advanced"}
            aria-label="Toggle between Beginner and Advanced technical terminology"
            onClick={() => setMode((m) => (m === "beginner" ? "advanced" : "beginner"))}
            style={{
              background: "hsla(0, 0%, 15%, 0.8)",
              border: "1px solid hsla(45, 100%, 72%, 0.3)",
              borderRadius: 20,
              padding: "3px 6px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {mode === "advanced" ? (
              <ToggleRight size={22} color="var(--orange-yellow-crayola)" />
            ) : (
              <ToggleLeft size={22} color="var(--light-gray-70)" />
            )}
          </button>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: mode === "advanced" ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)" }}>
            Advanced
          </span>
        </div>
      </div>

      {/* Beginner Mode Educational Summary Banner (Spec §11) */}
      {mode === "beginner" && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "12px 16px",
            marginBottom: 14,
            borderRadius: 8,
            background: "hsla(45, 100%, 72%, 0.08)",
            border: "1px solid hsla(45, 100%, 72%, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>
            BEGINNER CONCEPT:
          </span>
          <span style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontFamily: "monospace" }}>
            Code enters → becomes a structured model → dependencies are mapped → the system is analyzed → the result is transformed.
          </span>
        </motion.div>
      )}

      {/* Open Flow Canvas (Unboxed for direct architectural view) */}
      <div style={{ position: "relative" }}>
        {/* Desktop Hierarchical SVG Flow (Hidden on narrow mobile screens) */}
        <div className="systems-flow-desktop" style={{ padding: "16px 0", background: "transparent" }}>
          <svg
            viewBox="0 0 800 445"
            style={{ width: "100%", height: "auto", display: "block" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="edge-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--orange-yellow-crayola)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(35, 100%, 68%)" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Hierarchical Flow Edges */}
            {FLOW_EDGES.map((edge) => {
              const src = FLOW_NODES[edge.from];
              const dst = FLOW_NODES[edge.to];

              const x1 = src.x + src.w / 2;
              const y1 = src.y + src.h;
              const x2 = dst.x + dst.w / 2;
              const y2 = dst.y;

              // Horizontal connector for IR -> Transformation
              let d: string;
              if (edge.from === "ir" && edge.to === "transform") {
                const ix = src.x + src.w;
                const iy = src.y + src.h / 2;
                const ox = dst.x;
                const oy = dst.y + dst.h / 2;
                d = `M ${ix} ${iy} L ${ox} ${oy}`;
              } else {
                const cy = (y1 + y2) / 2;
                d = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
              }

              const isEdgeActive =
                (edge.from === activeId && activeNode.neighbors.includes(edge.to)) ||
                (edge.to === activeId && activeNode.neighbors.includes(edge.from));

              return (
                <path
                  key={`${edge.from}->${edge.to}`}
                  d={d}
                  fill="none"
                  stroke={isEdgeActive ? "url(#edge-glow)" : "hsla(0,0%,100%,0.12)"}
                  strokeWidth={isEdgeActive ? 2.5 : 1.2}
                  strokeDasharray={isEdgeActive ? "6,6" : "3,3"}
                  className={isEdgeActive && !reduce ? "flow-edge-animated" : undefined}
                  style={{ transition: "stroke 0.2s ease, stroke-width 0.2s ease" }}
                />
              );
            })}

            {/* Flow Nodes */}
            {Object.values(FLOW_NODES).map((node) => {
              const isSelected = node.id === selectedId;
              const isHovered = node.id === hoveredId;
              const isNeighbor = activeNode.neighbors.includes(node.id);
              const isFocal = isSelected || isHovered;

              const title = mode === "advanced" ? node.advancedTitle : node.beginnerTitle;

              let fillColor = "hsl(240, 2%, 14%)";
              let strokeColor = "hsla(0,0%,100%,0.12)";
              let textColor = "var(--white-2)";

              if (isFocal) {
                fillColor = "hsla(45, 100%, 72%, 0.16)";
                strokeColor = "var(--orange-yellow-crayola)";
                textColor = "var(--orange-yellow-crayola)";
              } else if (isNeighbor) {
                fillColor = "hsla(45, 100%, 72%, 0.08)";
                strokeColor = "hsla(45, 100%, 72%, 0.4)";
                textColor = "var(--white-1)";
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedId(node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(node.id);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${title} (${node.layer})`}
                >
                  <rect
                    width={node.w}
                    height={node.h}
                    rx={8}
                    ry={8}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isFocal ? 2 : 1}
                    style={{ transition: "all 0.18s ease" }}
                  />

                  {/* Active node indicator */}
                  {isFocal && (
                    <circle cx={14} cy={node.h / 2} r={3} fill="var(--orange-yellow-crayola)" />
                  )}

                  <text
                    x={isFocal ? 26 : node.w / 2}
                    y={node.h / 2 + 4}
                    textAnchor={isFocal ? "start" : "middle"}
                    fill={textColor}
                    fontSize={11}
                    fontWeight={isFocal ? 600 : 500}
                    fontFamily="monospace"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile View: Vertical Stage Groups */}
        <div className="systems-flow-mobile" style={{ padding: "16px" }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", marginBottom: 10, textTransform: "uppercase" }}>
            Tap any node to inspect:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.values(FLOW_NODES).map((node) => {
              const isSelected = node.id === selectedId;
              const isNeighbor = activeNode.neighbors.includes(node.id);
              const title = mode === "advanced" ? node.advancedTitle : node.beginnerTitle;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: "monospace",
                    background: isSelected
                      ? "hsla(45, 100%, 72%, 0.18)"
                      : isNeighbor
                      ? "hsla(45, 100%, 72%, 0.08)"
                      : "hsla(0,0%,100%,0.05)",
                    border: isSelected
                      ? "1px solid var(--orange-yellow-crayola)"
                      : isNeighbor
                      ? "1px solid hsla(45, 100%, 72%, 0.4)"
                      : "1px solid hsla(0,0%,100%,0.1)",
                    color: isSelected ? "var(--orange-yellow-crayola)" : "var(--white-2)",
                    cursor: "pointer",
                  }}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Panel */}
        <div
          style={{
            marginTop: 14,
            padding: "20px 24px",
            borderRadius: 12,
            border: "1px solid hsla(0,0%,100%,0.08)",
            background: "hsla(0,0%,8%,0.75)",
            backdropFilter: "blur(14px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={reduce ? undefined : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "var(--orange-yellow-crayola)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {activeNode.layer}
                  </span>
                  <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600 }}>
                    {mode === "advanced" ? activeNode.advancedTitle : activeNode.beginnerTitle}
                  </h4>
                </div>

                {/* Connected neighbors */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
                    Connected to:
                  </span>
                  {activeNode.neighbors.map((n) => (
                    <button
                      key={n}
                      onClick={() => setSelectedId(n)}
                      style={{
                        background: "hsla(45, 100%, 72%, 0.08)",
                        border: "1px solid hsla(45, 100%, 72%, 0.25)",
                        borderRadius: 4,
                        color: "var(--orange-yellow-crayola)",
                        padding: "2px 7px",
                        fontSize: 10,
                        fontFamily: "monospace",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <span>{mode === "advanced" ? FLOW_NODES[n].advancedTitle : FLOW_NODES[n].beginnerTitle}</span>
                      <ArrowRight size={10} />
                    </button>
                  ))}
                </div>
              </div>

              <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.6, marginTop: 10 }}>
                {activeNode.shortDesc}
              </p>

              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "hsla(0,0%,4%,0.85)",
                  borderLeft: "3px solid var(--orange-yellow-crayola)",
                }}
              >
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--orange-yellow-crayola)", fontFamily: "monospace", fontSize: 11 }}>
                    WHY IT MATTERS:{" "}
                  </strong>
                  {activeNode.whyItMatters}
                </p>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", lineHeight: 1.5, marginTop: 4 }}>
                  <strong style={{ color: "var(--white-2)", fontFamily: "monospace" }}>Application: </strong>
                  {activeNode.roleInLegacyExodus}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Concise Axiomatic Explanation Required by Spec §33 */}
      <div
        style={{
          marginTop: 18,
          padding: "16px 20px",
          borderRadius: 12,
          background: "hsla(0, 0%, 12%, 0.4)",
          border: "1px solid hsla(0, 0%, 100%, 0.06)",
        }}
      >
        <p style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Architectural Principles // How It Connects
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          <li style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", fontFamily: "monospace", lineHeight: 1.5 }}>
            <span style={{ color: "var(--orange-yellow-crayola)" }}>AST</span> tells us what the code looks like.
          </li>
          <li style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", fontFamily: "monospace", lineHeight: 1.5 }}>
            <span style={{ color: "var(--orange-yellow-crayola)" }}>CFG</span> tells us how execution can move.
          </li>
          <li style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", fontFamily: "monospace", lineHeight: 1.5 }}>
            <span style={{ color: "var(--orange-yellow-crayola)" }}>DFG</span> tells us how data moves.
          </li>
          <li style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", fontFamily: "monospace", lineHeight: 1.5 }}>
            <span style={{ color: "var(--orange-yellow-crayola)" }}>IR</span> gives transformation a neutral intermediate layer.
          </li>
          <li style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", fontFamily: "monospace", lineHeight: 1.5 }}>
            <span style={{ color: "var(--orange-yellow-crayola)" }}>Rust</span> represents one possible systems-oriented target.
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .flow-edge-animated {
          animation: flowDash 1.2s linear infinite;
        }
        @media (max-width: 680px) {
          .systems-flow-desktop {
            display: none !important;
          }
          .systems-flow-mobile {
            display: block !important;
          }
        }
        @media (min-width: 681px) {
          .systems-flow-desktop {
            display: block !important;
          }
          .systems-flow-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
