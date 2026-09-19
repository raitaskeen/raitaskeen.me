"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, ArrowRight, ShieldCheck, Cpu, GitBranch, CheckCircle2, ChevronRight } from "lucide-react";

type StageKey = "understand" | "transform" | "verify";

interface StageInfo {
  key: StageKey;
  step: string;
  title: string;
  tagline: string;
  summary: string;
  subsystems: string[];
  metrics: string;
}

const STAGES: StageInfo[] = [
  {
    key: "understand",
    step: "01",
    title: "Understand",
    tagline: "Grammar, Scope & Flow Analysis",
    summary:
      "Tree-sitter parses legacy source code into typed Concrete Syntax Trees. Lexical scope registries resolve cross-file symbol bindings, while Control Flow Graphs (CFG) and Data Flow Graphs (DFG) construct execution branches and variable state lifecycles.",
    subsystems: [
      "Tree-sitter AST Parser",
      "Scope & Symbol Registry",
      "CFG Execution Branches",
      "DFG Variable Lifecycles",
    ],
    metrics: "Deterministic Parse",
  },
  {
    key: "transform",
    step: "02",
    title: "Transform",
    tagline: "Tarjan SCC & Canonical IR",
    summary:
      "Directed dependency graphs resolve import cycles using Tarjan's Strongly Connected Components algorithm. Code semantics normalize into a canonical Intermediate Representation (IR), enabling bounded LLM agents to synthesize target Rust/TypeScript under strict token contracts.",
    subsystems: [
      "Tarjan SCC De-Cycler",
      "Topological Dependency DAG",
      "Canonical Intermediate Rep (IR)",
      "Bounded Model Synthesis",
    ],
    metrics: "Token-Constrained",
  },
  {
    key: "verify",
    step: "03",
    title: "Verify",
    tagline: "Type Checking & Invariant Proofs",
    summary:
      "Synthesized code undergoes multi-gate automated verification: strict compile-time type checking (tsc, rustc), AST structural equivalence audits against the legacy codebase, and invariant regression suites to guarantee semantic parity.",
    subsystems: [
      "Compile-Time Typecheck",
      "AST Equivalence Proofs",
      "Semantic Parity Audit",
      "Automated Regression Suites",
    ],
    metrics: "Zero Hallucination",
  },
];

export default function LegacyExodusPipeline() {
  const [activeStage, setActiveStage] = useState<StageKey>("understand");
  const reduce = useReducedMotion();

  const current = STAGES.find((s) => s.key === activeStage) ?? STAGES[0];

  return (
    <div
      className="bracket-card"
      style={{
        marginTop: 20,
        marginBottom: 28,
        background: "hsla(240, 5%, 8%, 0.95)",
        border: "1px solid hsla(0, 0%, 100%, 0.1)",
        borderRadius: 14,
        padding: "24px 22px",
        boxSizing: "border-box",
      }}
    >
      {/* Corner Drafting Notches */}
      <span className="corner-tick corner-tick-tl" />
      <span className="corner-tick corner-tick-tr" />
      <span className="corner-tick corner-tick-bl" />
      <span className="corner-tick corner-tick-br" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10.5,
                color: "var(--orange-yellow-crayola)",
                background: "hsla(45, 100%, 72%, 0.12)",
                padding: "2px 8px",
                borderRadius: 4,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              PIPELINE SCHEMATIC
            </span>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
              Interactive Architecture
            </span>
          </div>
          <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, margin: "6px 0 0" }}>
            LegacyExodus Migration Engine
          </h4>
        </div>

        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--light-gray-70)" }}>
          Click or focus a stage to inspect
        </span>
      </div>

      {/* Stage Selector Bar */}
      <div
        role="tablist"
        aria-label="LegacyExodus Architecture Stages"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          position: "relative",
          marginBottom: 20,
        }}
      >
        {STAGES.map((s) => {
          const isSelected = s.key === activeStage;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              onClick={() => setActiveStage(s.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveStage(s.key);
                }
              }}
              style={{
                position: "relative",
                background: isSelected
                  ? "hsla(45, 100%, 72%, 0.08)"
                  : "hsla(0, 0%, 100%, 0.03)",
                border: isSelected
                  ? "1px solid var(--orange-yellow-crayola)"
                  : "1px solid hsla(0, 0%, 100%, 0.08)",
                borderRadius: 10,
                padding: "12px 14px",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 150ms ease, background 150ms ease",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                outline: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10.5,
                    color: isSelected ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
                    fontWeight: 600,
                  }}
                >
                  STAGE {s.step}
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isSelected ? "var(--orange-yellow-crayola)" : "transparent",
                    border: "1px solid hsla(45, 100%, 72%, 0.4)",
                  }}
                />
              </div>

              <span
                style={{
                  color: isSelected ? "var(--white-2)" : "var(--light-gray)",
                  fontSize: "var(--fs-4)",
                  fontWeight: 600,
                }}
              >
                {s.title}
              </span>

              <span
                style={{
                  color: "var(--light-gray-70)",
                  fontSize: 11,
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {s.tagline}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Inspector Panel */}
      <div
        style={{
          padding: "18px 20px",
          borderRadius: 10,
          background: "hsla(0, 0%, 6%, 0.6)",
          border: "1px solid hsla(0, 0%, 100%, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: "var(--orange-yellow-crayola)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              STAGE {current.step} INSPECTION // {current.title.toUpperCase()}
            </span>
          </div>

          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--light-gray-70)",
              background: "hsla(0, 0%, 100%, 0.05)",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            GUARANTEE: {current.metrics}
          </span>
        </div>

        <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.65, margin: "0 0 14px" }}>
          {current.summary}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 12, borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}>
          {current.subsystems.map((sub) => (
            <div
              key={sub}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 9px",
                borderRadius: 6,
                background: "hsla(45, 100%, 72%, 0.06)",
                border: "1px solid hsla(45, 100%, 72%, 0.2)",
                fontSize: 11.5,
                fontFamily: "monospace",
                color: "var(--white-2)",
              }}
            >
              <CheckCircle2 size={11} color="var(--orange-yellow-crayola)" />
              <span>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
