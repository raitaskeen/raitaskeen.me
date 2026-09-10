import Link from "next/link";
import Reveal from "@/components/Reveal";
import QuietMark from "@/components/QuietMark";
import SystemsMap from "@/components/SystemsMap";
import { GraphDependencySection, AiOrchestrationSection } from "@/components/GraphEngineeringSection";
import {
  ArrowLeft,
  AlertTriangle,
  Network,
  Layers,
  ShieldCheck,
  CheckCircle2,
  FileCode2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "LegacyExodus — Architecture & Migration Engine",
  description:
    "An automated migration-intelligence engine that parses legacy codebases into AST, CFG, DFG, and Intermediate Representation (IR) for deterministic modernization.",
};

const STATIC_ANALYSIS_STEPS = [
  { step: "01", name: "Source Code", desc: "Monolithic legacy files (PHP 7, procedural JS, un-typed C++)" },
  { step: "02", name: "Lexing / Parsing", desc: "Fault-tolerant Tree-sitter parser emits Concrete Syntax Trees" },
  { step: "03", name: "AST", desc: "Abstract Syntax Trees normalize grammar, expressions & scope trees" },
  { step: "04", name: "Symbols", desc: "Lexical scope registry resolves cross-file exports & global bindings" },
  { step: "05", name: "Dependency Graph", desc: "Directed graph resolves imports, call chains & Tarjan cycles" },
  { step: "06", name: "CFG / DFG", desc: "Branching execution DAGs & variable state lifecycle tracing" },
  { step: "07", name: "IR", desc: "Language-agnostic canonical Intermediate Representation" },
  { step: "08", name: "Transformation", desc: "Deterministic rewrite into memory-safe Rust & modern TypeScript" },
];

const ARCHITECTURAL_PRINCIPLES = [
  {
    title: "Deterministic Core",
    desc: "Mathematical compilers and static analysis rules form the immutable backbone of every migration — never subjective guesswork.",
  },
  {
    title: "Structured Representation",
    desc: "Code is mapped into formal AST nodes, CFG branches, and DFG lifecycles rather than treated as unformatted plain text.",
  },
  {
    title: "Graph-Based Understanding",
    desc: "Topological sorting and Tarjan's Strongly Connected Components break monolithic circular dependencies into solvable DAGs.",
  },
  {
    title: "Targeted AI Assistance",
    desc: "Generative models receive isolated, strongly-typed IR contracts for discrete tasks, enforcing strict token economy.",
  },
  {
    title: "Automated Verification",
    desc: "Every synthesized module must pass compile-time type checks (`tsc`, `rustc`), AST equivalence audits, and regression tests.",
  },
];

export default function LegacyExodusPage() {
  return (
    <div className="page-shell">
      {/* Back Link */}
      <Reveal>
        <Link
          href="/projects"
          className="link-draw"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--light-gray-70)",
            fontSize: "var(--fs-7)",
            marginBottom: 28,
            fontFamily: "monospace",
          }}
        >
          <ArrowLeft size={14} /> Back to all projects
        </Link>
      </Reveal>

      {/* 1 — PROJECT INTRODUCTION */}
      <Reveal>
        <section style={{ maxWidth: "78ch" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "var(--smoky-black)",
                background: "var(--orange-yellow-crayola)",
                padding: "2px 8px",
                borderRadius: 4,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              FLAGSHIP INITIATIVE
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--light-gray-70)" }}>
              Aug 2026 — Present · Self-Directed Engineering
            </span>
          </div>

          <h1
            style={{
              color: "var(--white-2)",
              fontSize: "clamp(34px, 6vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            LegacyExodus
          </h1>

          <p
            style={{
              color: "var(--orange-yellow-crayola)",
              fontSize: "var(--fs-3)",
              fontWeight: 500,
              marginTop: 12,
              lineHeight: 1.4,
            }}
          >
            Automated migration-intelligence engine for legacy enterprise codebases.
          </p>

          <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-5)", marginTop: 16, lineHeight: 1.7 }}>
            LegacyExodus is an engineering system designed to analyze monolithic, high-debt enterprise codebases (such as legacy PHP, procedural JavaScript, and un-typed backends) and automate their modernization into memory-safe Rust services and clean TypeScript architectures through deterministic static compiler analysis.
          </p>
        </section>
      </Reveal>

      {/* 2 — WHY LEGACY MIGRATION IS HARD */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600 }}>
            Why Legacy Migration Is Hard
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div
              className="gradient-border-hover"
              style={{
                padding: 22,
                borderRadius: 12,
                background: "hsla(0, 0%, 9%, 0.88)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
              }}
            >
              <h3 style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                Implicit Data Contracts
              </h3>
              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, marginTop: 8 }}>
                Dynamic variables change types across runtime scopes. Undocumented database side-effects and global state mutations are invisibly coupled across distant files.
              </p>
            </div>

            <div
              className="gradient-border-hover"
              style={{
                padding: 22,
                borderRadius: 12,
                background: "hsla(0, 0%, 9%, 0.88)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
              }}
            >
              <h3 style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                Circular Dependencies
              </h3>
              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, marginTop: 8 }}>
                Legacy modules frequently import or require each other cyclically. Without graph cycle resolution (Tarjan’s strongly connected components), clean layered decomposition is impossible.
              </p>
            </div>

            <div
              className="gradient-border-hover"
              style={{
                padding: 22,
                borderRadius: 12,
                background: "hsla(0, 0%, 9%, 0.88)",
                border: "1px solid hsla(0, 0%, 100%, 0.08)",
              }}
            >
              <h3 style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                Stochastic LLM Hallucinations
              </h3>
              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, marginTop: 8 }}>
                Feeding thousands of lines of legacy code directly to generative models results in invented APIs, dropped edge cases, and runtime syntax drift. LLMs lack global semantic guarantees.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3 — THE PROBLEM */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle size={20} color="var(--orange-yellow-crayola)" />
            The Problem: Monolithic Enterprise Inertia
          </h2>
          <div
            style={{
              marginTop: 16,
              padding: "24px 28px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              Global businesses run on millions of lines of unmaintained legacy code. Rewriting these systems from scratch almost universally fails due to budget overruns, undocumented business logic, and lost domain knowledge. Meanwhile, manual line-by-line migration is prohibitively slow and introduces severe regression cascades.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 4 — THE SYSTEM MODEL */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            <Network size={20} color="var(--orange-yellow-crayola)" />
            The System Model: Code as a Mathematical Graph
          </h2>
          <div
            style={{
              marginTop: 16,
              padding: "24px 28px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(45, 100%, 72%, 0.22)",
            }}
          >
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              The foundational thesis of LegacyExodus is that <strong>a codebase is not text — it is a directed graph</strong>. Once code is mapped into formal mathematical structures (AST nodes, execution control flow edges, and variable lifecycle data flow vectors), refactoring transitions from subjective guesswork into a deterministic compiler pipeline.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 5 — STATIC ANALYSIS ENGINE (Visual Flow) */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              COMPILER PIPELINE // DECOMPILATION
            </span>
            <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, marginTop: 4 }}>
              Static Analysis Engine Flow
            </h2>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6, maxWidth: "68ch" }}>
              From heterogeneous source text into a normalized intermediate representation ready for deterministic target synthesis.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {STATIC_ANALYSIS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="gradient-border-hover"
                style={{
                  padding: "16px 18px",
                  borderRadius: 10,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", fontWeight: 700 }}>
                    {step.step} {"// PHASE"}
                  </span>
                  <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, margin: "6px 0 0" }}>
                    {step.name}
                  </h3>
                  <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", lineHeight: 1.5, marginTop: 6 }}>
                    {step.desc}
                  </p>
                </div>
                {idx < STATIC_ANALYSIS_STEPS.length - 1 && (
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4, color: "hsla(45, 100%, 72%, 0.4)", fontSize: 10, fontFamily: "monospace" }}>
                    <span>NEXT</span>
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 6 — SYSTEMS ARCHITECTURE & COMPILER FLOW (Interactive SystemsMap) */}
      <section id="compiler-flow" style={{ marginTop: 56, scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              INTERACTIVE COMPILER ARCHITECTURE
            </span>
            <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, marginTop: 4 }}>
              Systems Architecture &amp; Compiler Flow
            </h2>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6 }}>
              Inspect the end-to-end transformation DAG: Source (JS/PHP) → Representation (AST) → Analysis (CFG/DFG) → Transformation (IR) → Target (Rust/Axum). Toggle between Beginner and Advanced views.
            </p>
          </div>
        </Reveal>
        <SystemsMap />
      </section>

      {/* 17 (Centerpiece) — CORE ENGINEERING THESIS */}
      <Reveal>
        <div
          style={{
            margin: "80px 0 64px",
            textAlign: "center",
            padding: "40px 20px",
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--orange-yellow-crayola)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            FOUNDATIONAL ARCHITECTURAL THESIS
          </p>
          <div
            style={{
              fontSize: "clamp(26px, 4.8vw, 48px)",
              fontWeight: 800,
              color: "var(--white-2)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              marginTop: 16,
            }}
          >
            SYSTEM UNDERSTANDING
            <span style={{ color: "var(--orange-yellow-crayola)", margin: "0 12px" }}>+</span>
            TASK DECOMPOSITION
            <div
              style={{
                color: "var(--orange-yellow-crayola)",
                fontSize: "clamp(22px, 3.8vw, 40px)",
                marginTop: 10,
                fontWeight: 700,
              }}
            >
              = BETTER SOFTWARE
            </div>
          </div>
          <p
            style={{
              color: "var(--light-gray)",
              fontSize: "var(--fs-6)",
              maxWidth: "62ch",
              margin: "18px auto 0",
              lineHeight: 1.65,
            }}
          >
            Graph engineering delivers structural ground truth. Deterministic orchestration decomposes complexity into verifiable compiler passes. Together, they replace guesswork with verified software engineering.
          </p>
        </div>
      </Reveal>

      {/* 7 — DEPENDENCY / GRAPH ENGINEERING (Interactive Graph) */}
      <section id="dependency-graph" style={{ marginTop: 24, scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              STRUCTURAL GROUND TRUTH
            </span>
            <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, marginTop: 4 }}>
              Dependency &amp; Graph Engineering
            </h2>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6 }}>
              Interactive dependency modeling: nodes represent files, services, or databases; edges define import, call, and depends-on relationships.
            </p>
          </div>
        </Reveal>
        <GraphDependencySection hideThesisBanner />
      </section>

      {/* 8, 9, 10, 11 — DETERMINISTIC WORKFLOW, AI ORCHESTRATION, AI TOOL ORCHESTRATION, & TOKEN DISCIPLINE */}
      <section id="ai-orchestration" style={{ marginTop: 48, scrollMarginTop: 80 }}>
        <Reveal>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              DISCIPLINED EXECUTION
            </span>
            <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, marginTop: 4 }}>
              Deterministic Workflow &amp; AI Tool Orchestration
            </h2>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6 }}>
              Decompose big tasks into research, analysis, synthesis, and validation passes. Enforce token discipline by scoping context to strict AST slices.
            </p>
          </div>
        </Reveal>
        <AiOrchestrationSection />
      </section>

      {/* 12 — ARCHITECTURAL PRINCIPLES */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={20} color="var(--orange-yellow-crayola)" />
            Architectural Principles
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              marginTop: 18,
            }}
          >
            {ARCHITECTURAL_PRINCIPLES.map((p, idx) => (
              <div
                key={p.title}
                className="gradient-border-hover"
                style={{
                  padding: 22,
                  borderRadius: 12,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)", fontWeight: 600 }}>
                  0{idx + 1} {"// PRINCIPLE"}
                </span>
                <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, marginTop: 6 }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, marginTop: 8 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 13 — TARGET ARCHITECTURE */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            <Layers size={20} color="var(--orange-yellow-crayola)" />
            Target Architecture: Modern TypeScript &amp; Memory-Safe Rust
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div className="gradient-border-hover" style={{ padding: 24, borderRadius: 12, background: "hsla(0, 0%, 9%, 0.88)" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)" }}>TARGET A</span>
              <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, marginTop: 6 }}>
                TypeScript Microservices
              </h3>
              <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.6, marginTop: 8 }}>
                Synthesizes strict, type-safe Next.js or Node.js modules. Implements explicit interface contracts, Zod schema validation, and async/await primitives to replace callback hierarchies.
              </p>
            </div>

            <div className="gradient-border-hover" style={{ padding: 24, borderRadius: 12, background: "hsla(0, 0%, 9%, 0.88)" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--orange-yellow-crayola)" }}>TARGET B</span>
              <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, marginTop: 6 }}>
                Rust / Axum Services
              </h3>
              <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.6, marginTop: 8 }}>
                Synthesizes high-throughput Rust backend services. Converts legacy database calls into compile-time checked SQLx queries, using Rust&apos;s affine type system to guarantee zero memory leaks and thread safety without garbage collection pauses.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 14 & 15 — CURRENT STATUS & WHAT IS BEING BUILT */}
      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
            <FileCode2 size={20} color="var(--orange-yellow-crayola)" />
            Current Status &amp; Active Build Roadmap
          </h2>
          <div
            style={{
              marginTop: 18,
              padding: "24px 28px",
              borderRadius: 14,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--orange-yellow-crayola)" }} />
              <span style={{ color: "var(--white-2)", fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}>
                PHASE: ACTIVE R&amp;D &amp; CORE PARSER BENCHMARKS
              </span>
            </div>

            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              LegacyExodus is being engineered as a public-facing developer tool. The current implementation is focused on:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle2 size={16} color="var(--orange-yellow-crayola)" style={{ marginTop: 3, flexShrink: 0 }} />
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", margin: 0 }}>
                  <strong>Tree-sitter Grammar Integration:</strong> Hardening syntax extraction across varied PHP and ECMAScript versions.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle2 size={16} color="var(--orange-yellow-crayola)" style={{ marginTop: 3, flexShrink: 0 }} />
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", margin: 0 }}>
                  <strong>IR Specification &amp; Schema:</strong> Establishing a strongly-typed JSON intermediate format for control flow DAGs.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle2 size={16} color="var(--orange-yellow-crayola)" style={{ marginTop: 3, flexShrink: 0 }} />
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", margin: 0 }}>
                  <strong>Rust Codegen Prototyping:</strong> Benchmarking generated Axum REST handlers against original legacy execution speeds.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid hsla(0, 0%, 100%, 0.08)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/contact"
                className="link-draw"
                style={{
                  color: "var(--orange-yellow-crayola)",
                  fontSize: "var(--fs-7)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                Discuss enterprise codebase migrations →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 16 — QUIET RAITASKEEN MARK */}
      <QuietMark />
    </div>
  );
}
