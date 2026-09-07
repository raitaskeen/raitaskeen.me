"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Network, Bot, Cpu, CheckCircle2, ArrowRight, Layers, FileCode, Database, Zap, AlertTriangle, ShieldCheck } from "lucide-react";

interface GraphNodeData {
  id: string;
  name: string;
  type: "File" | "Service" | "Controller" | "Database";
  edgeType: "imports" | "calls" | "depends-on";
  relationships: string[];
  purpose: string;
  x: number;
  y: number;
}

const DEPENDENCY_NODES: Record<string, GraphNodeData> = {
  "auth.ts": {
    id: "auth.ts",
    name: "auth.ts",
    type: "File",
    edgeType: "imports",
    relationships: ["imports user.ts", "verifies JWT signatures", "guards API entry"],
    purpose: "Authenticates incoming bearer tokens and delegates user resolution to user.ts.",
    x: 80,
    y: 80,
  },
  "user.ts": {
    id: "user.ts",
    name: "UserService",
    type: "Service",
    edgeType: "calls",
    relationships: ["called by auth.ts", "calls database.ts", "manages user accounts"],
    purpose: "Connects API authorization requests with underlying persistence logic.",
    x: 270,
    y: 80,
  },
  "database.ts": {
    id: "database.ts",
    name: "database.ts",
    type: "Controller",
    edgeType: "depends-on",
    relationships: ["called by user.ts", "depends-on postgres.ts", "connection pooling"],
    purpose: "Manages query transactions, schema serialization, and connection lifecycle.",
    x: 460,
    y: 80,
  },
  "postgres.ts": {
    id: "postgres.ts",
    name: "Postgres Driver",
    type: "Database",
    edgeType: "depends-on",
    relationships: ["depended on by database.ts", "socket I/O", "state persistence"],
    purpose: "Executes raw SQL queries against PostgreSQL instances with connection pooling.",
    x: 650,
    y: 80,
  },
};

const ORCHESTRATION_STAGES = [
  {
    id: "research",
    label: "01 // RESEARCH",
    title: "Research & Discovery",
    input: "User requirement & repo context",
    action: "Indexes AST files & identifies boundary scopes",
    output: "Targeted problem specification",
  },
  {
    id: "analysis",
    label: "02 // ANALYSIS",
    title: "Dependency Analysis",
    input: "Problem specification",
    action: "Traces call graphs & isolates impacted functions",
    output: "Minimal modification manifest",
  },
  {
    id: "implementation",
    label: "03 // IMPLEMENTATION",
    title: "Targeted Code Synthesis",
    input: "Minimal modification manifest",
    action: "Generates typed changes with zero hallucinated files",
    output: "Concrete diff patches",
  },
  {
    id: "validation",
    label: "04 // VALIDATION",
    title: "Deterministic Verification",
    input: "Generated diff patches",
    action: "Runs typechecker, AST linter, and unit tests",
    output: "Validated code ready for human review",
  },
  {
    id: "output",
    label: "05 // OUTPUT",
    title: "Validated Implementation",
    input: "Test results & verified diffs",
    action: "Produces mergeable pull request artifact",
    output: "Production-ready feature or refactor",
  },
];

const AI_TOOLS_MAP = [
  { name: "Codex", role: "Implementation", desc: "Code completion & routine syntax generation" },
  { name: "Claude", role: "Architecture", desc: "Deep reasoning, systems planning & AST decomposition" },
  { name: "Cursor", role: "Local Navigation", desc: "File-level editing & fast inline diffs" },
  { name: "Grok", role: "Research", desc: "Alternative perspectives & real-time external querying" },
  { name: "Antigravity", role: "Orchestration", desc: "Multi-step autonomous agent workflow execution" },
];

export function GraphDependencySection({ hideThesisBanner = false }: { hideThesisBanner?: boolean } = {}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("user.ts");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const activeNode = DEPENDENCY_NODES[hoveredNodeId ?? selectedNodeId];

  return (
    <section id="graph-engineering" aria-label="Graph Engineering and Dependency Modeling" style={{ marginTop: 48, scrollMarginTop: 80 }}>
      {/* 1. Core Synthesis Banner: Graph Engineering + AI Orchestration (Spec §16) */}
      {!hideThesisBanner && (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 14,
            background: "hsla(0, 0%, 9%, 0.85)",
            backdropFilter: "blur(14px)",
            border: "1px solid hsla(45, 100%, 72%, 0.28)",
            marginBottom: 28,
          }}
        >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Network size={18} color="var(--orange-yellow-crayola)" />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--orange-yellow-crayola)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Core Engineering Thesis
          </span>
        </div>
        <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, lineHeight: 1.4 }}>
          SYSTEM UNDERSTANDING + TASK DECOMPOSITION = BETTER SOFTWARE
        </h3>
        <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", marginTop: 8, lineHeight: 1.6, maxWidth: "72ch" }}>
          Graph engineering provides structural ground truth: nodes represent things, and edges define relationships.
          AI orchestration coordinates the work: transforming large ambiguous goals into smaller deterministic passes.
          Together, they replace guesswork with verified software engineering.
        </p>
      </div>
      )}

      {/* 2. Interactive Dependency Graph (Unboxed Open Visualization) */}
      <div data-cursor="inspect" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <div>
            <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600 }}>
              Interactive Dependency Graph
            </h4>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 2 }}>
              # NODE: a thing (file, service, table) · # EDGE: a relationship (imports, calls, depends-on)
            </p>
          </div>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)" }}>
            Hover or tap any node to inspect
          </span>
        </div>

        {/* SVG Dependency Canvas */}
        <div style={{ overflowX: "auto", paddingBottom: 10 }}>
          <svg viewBox="0 0 780 160" style={{ width: "100%", minWidth: 640, height: "auto", display: "block" }}>
            <defs>
              <linearGradient id="edgeTraverse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--orange-yellow-crayola)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--orange-yellow-crayola)" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {/* auth.ts -> user.ts (imports) */}
            <line x1="160" y1="80" x2="270" y2="80" stroke="url(#edgeTraverse)" strokeWidth="2" strokeDasharray="4,4" className="flow-edge-animated" />
            <text x="215" y="70" fill="var(--orange-yellow-crayola)" fontSize="9" fontFamily="monospace" textAnchor="middle">imports</text>

            {/* user.ts -> database.ts (calls) */}
            <line x1="390" y1="80" x2="460" y2="80" stroke="url(#edgeTraverse)" strokeWidth="2" strokeDasharray="4,4" className="flow-edge-animated" />
            <text x="425" y="70" fill="var(--orange-yellow-crayola)" fontSize="9" fontFamily="monospace" textAnchor="middle">calls</text>

            {/* database.ts -> postgres.ts (depends-on) */}
            <line x1="580" y1="80" x2="650" y2="80" stroke="url(#edgeTraverse)" strokeWidth="2" strokeDasharray="4,4" className="flow-edge-animated" />
            <text x="615" y="70" fill="var(--orange-yellow-crayola)" fontSize="9" fontFamily="monospace" textAnchor="middle">depends-on</text>

            {/* Nodes */}
            {Object.values(DEPENDENCY_NODES).map((n) => {
              const isSelected = n.id === activeNode.id;
              return (
                <g
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  onMouseEnter={() => setHoveredNodeId(n.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={n.x}
                    y={n.y - 22}
                    width={110}
                    height={44}
                    rx={6}
                    fill={isSelected ? "hsla(45, 100%, 72%, 0.16)" : "#0c0d10"}
                    stroke={isSelected ? "var(--orange-yellow-crayola)" : "hsla(45, 100%, 72%, 0.3)"}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <text
                    x={n.x + 55}
                    y={n.y - 4}
                    textAnchor="middle"
                    fill={isSelected ? "var(--orange-yellow-crayola)" : "var(--white-2)"}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isSelected ? 600 : 500}
                  >
                    {n.name}
                  </text>
                  <text
                    x={n.x + 55}
                    y={n.y + 12}
                    textAnchor="middle"
                    fill="var(--light-gray-70)"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    [{n.type}]
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Real-time Neighborhood Micro-Inspector */}
        <div
          style={{
            marginTop: 14,
            padding: "16px 20px",
            borderRadius: 10,
            background: "hsla(0, 0%, 8%, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(0,0%,100%,0.08)",
            borderLeft: "3px solid var(--orange-yellow-crayola)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 14,
          }}
        >
          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              NODE
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-6)", fontWeight: 600, margin: "2px 0 0" }}>
              {activeNode.name} <span style={{ fontSize: 11, color: "var(--light-gray-70)" }}>({activeNode.type})</span>
            </p>
          </div>

          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              RELATIONSHIPS
            </span>
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-8)", fontFamily: "monospace", margin: "2px 0 0" }}>
              {activeNode.relationships.join(" · ")}
            </p>
          </div>

          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              PURPOSE
            </span>
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-8)", margin: "2px 0 0", lineHeight: 1.4 }}>
              {activeNode.purpose}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AiOrchestrationSection() {
  const [activeStageId, setActiveStageId] = useState<string>("analysis");
  const reduce = useReducedMotion();
  const activeStage = ORCHESTRATION_STAGES.find((s) => s.id === activeStageId) ?? ORCHESTRATION_STAGES[1];

  return (
    <section id="ai-orchestration" aria-label="AI Orchestration and Deterministic Workflows" style={{ marginTop: 48, scrollMarginTop: 80 }}>
      {/* 3. AI Orchestration & Deterministic Workflows (Unboxed Connected Node Workflow) */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>
            Deterministic AI Orchestration
          </h4>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 4, marginBottom: 0 }}>
            Core principle: <em>One large complex task becomes several specialized, verifiable passes.</em>
          </p>
        </div>

        {/* Connected Node Workflow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            gap: 10,
            padding: "8px 0 16px",
            scrollbarWidth: "none",
          }}
        >
          {ORCHESTRATION_STAGES.map((stage, idx) => {
            const isSelected = stage.id === activeStage.id;
            return (
              <div key={stage.id} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <button
                  onClick={() => setActiveStageId(stage.id)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    background: isSelected ? "hsla(45, 100%, 72%, 0.16)" : "hsla(0, 0%, 10%, 0.6)",
                    border: isSelected ? "1px solid var(--orange-yellow-crayola)" : "1px solid hsla(0, 0%, 100%, 0.1)",
                    textAlign: "left",
                    cursor: "pointer",
                    minWidth: 145,
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", display: "block" }}>
                    {stage.label}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: isSelected ? "var(--orange-yellow-crayola)" : "var(--white-2)", marginTop: 4, display: "block" }}>
                    {stage.title}
                  </span>
                </button>
                {idx < ORCHESTRATION_STAGES.length - 1 && (
                  <ArrowRight size={14} color="var(--orange-yellow-crayola)" style={{ opacity: 0.6, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Stage Inspector: Input -> Action -> Output */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 10,
            background: "hsla(0, 0%, 8%, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(0, 0%, 100%, 0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)", textTransform: "uppercase" }}>
              [ INPUT ]
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", marginTop: 4, fontFamily: "monospace", margin: "4px 0 0" }}>
              {activeStage.input}
            </p>
          </div>

          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              [ ACTION ]
            </span>
            <p style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-7)", marginTop: 4, margin: "4px 0 0" }}>
              {activeStage.action}
            </p>
          </div>

          <div>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#68d391", textTransform: "uppercase" }}>
              [ OUTPUT ]
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", marginTop: 4, fontFamily: "monospace", margin: "4px 0 0" }}>
              {activeStage.output}
            </p>
          </div>
        </div>
      </div>

      {/* 4. AI Tool Orchestration Visual (Spec §14) & Token Discipline (Spec §15) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        {/* Tool Orchestration Workflow */}
        <div
          className="gradient-border-hover"
          style={{
            padding: 22,
            borderRadius: 14,
            background: "hsla(0, 0%, 9%, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(0,0%,100%,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Cpu size={16} color="var(--orange-yellow-crayola)" />
            <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600 }}>
              AI Tool Orchestration
            </h4>
          </div>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginBottom: 14 }}>
            Conceptual synergy: How modern tools contribute specialized roles without conflicting.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {AI_TOOLS_MAP.map((tool) => (
              <div
                key={tool.name}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "hsla(0, 0%, 13%, 0.6)",
                  border: "1px solid hsla(0, 0%, 100%, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div>
                  <span style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>
                    {tool.name}
                  </span>
                  <span style={{ color: "var(--light-gray-70)", fontSize: 10, marginLeft: 8 }}>
                    // {tool.role}
                  </span>
                </div>
                <span style={{ color: "var(--light-gray)", fontSize: 10, textAlign: "right" }}>
                  {tool.desc}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              padding: "8px 12px",
              borderRadius: 6,
              background: "hsla(45, 100%, 72%, 0.08)",
              border: "1px solid hsla(45, 100%, 72%, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--white-2)",
            }}
          >
            <CheckCircle2 size={14} color="var(--orange-yellow-crayola)" />
            <span>RESULTS → Human review → Validated production code</span>
          </div>
        </div>

        {/* Token Discipline Layer (Spec §15) */}
        <div
          className="gradient-border-hover"
          style={{
            padding: 22,
            borderRadius: 14,
            background: "hsla(0, 0%, 9%, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(0,0%,100%,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <ShieldCheck size={16} color="var(--orange-yellow-crayola)" />
              <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600 }}>
                Token Discipline
              </h4>
            </div>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginBottom: 14 }}>
              Engineering efficiency: High reasoning fidelity without wasteful context pollution.
            </p>

            {/* Parallel Linear Visual Flows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* ANTI-PATTERN FLOW */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "hsla(0, 50%, 12%, 0.25)",
                  border: "1px solid hsla(0, 70%, 50%, 0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fc8181", fontSize: 10, fontFamily: "monospace", fontWeight: 700, marginBottom: 8 }}>
                  <AlertTriangle size={12} />
                  <span>ANTI-PATTERN // UNSTRUCTURED MONOLITH DUMP</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(0, 70%, 50%, 0.2)", fontSize: 10, fontFamily: "monospace", color: "var(--light-gray)" }}>
                    Raw Repo Dump
                  </span>
                  <ArrowRight size={11} color="#fc8181" style={{ opacity: 0.7 }} />
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(0, 70%, 50%, 0.2)", fontSize: 10, fontFamily: "monospace", color: "var(--light-gray)" }}>
                    Context Saturation
                  </span>
                  <ArrowRight size={11} color="#fc8181" style={{ opacity: 0.7 }} />
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(0, 70%, 50%, 0.2)", fontSize: 10, fontFamily: "monospace", color: "#fc8181" }}>
                    Rate Limit &amp; Drift
                  </span>
                </div>
              </div>

              {/* DISCIPLINED PIPELINE FLOW */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "hsla(120, 40%, 10%, 0.25)",
                  border: "1px solid hsla(120, 60%, 40%, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#68d391", fontSize: 10, fontFamily: "monospace", fontWeight: 700, marginBottom: 8 }}>
                  <CheckCircle2 size={12} />
                  <span>DISCIPLINED FLOW // HIGH-FIDELITY AST PIPELINE</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(120, 60%, 40%, 0.25)", fontSize: 10, fontFamily: "monospace", color: "var(--light-gray)" }}>
                    AST Index Once
                  </span>
                  <ArrowRight size={11} color="#68d391" style={{ opacity: 0.7 }} />
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(120, 60%, 40%, 0.25)", fontSize: 10, fontFamily: "monospace", color: "var(--light-gray)" }}>
                    Scoped Sub-Graph
                  </span>
                  <ArrowRight size={11} color="#68d391" style={{ opacity: 0.7 }} />
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(120, 60%, 40%, 0.25)", fontSize: 10, fontFamily: "monospace", color: "var(--light-gray)" }}>
                    Target Synthesis
                  </span>
                  <ArrowRight size={11} color="#68d391" style={{ opacity: 0.7 }} />
                  <span style={{ padding: "3px 7px", borderRadius: 4, background: "hsla(0, 0%, 0%, 0.45)", border: "1px solid hsla(120, 60%, 40%, 0.25)", fontSize: 10, fontFamily: "monospace", color: "#68d391" }}>
                    Automated Verify
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p style={{ color: "var(--light-gray-70)", fontSize: 10, fontFamily: "monospace", marginTop: 14, fontStyle: "italic" }}>
            * Optimize token budgets by using free tiers where available and caching static AST indexes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function GraphEngineeringSection() {
  return (
    <>
      <GraphDependencySection />
      <AiOrchestrationSection />
    </>
  );
}
