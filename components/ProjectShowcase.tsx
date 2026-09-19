"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, Star, ChevronDown, Layers, Globe, Shield, ArrowUpRight, RotateCcw, SearchX } from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { spring, ease, duration } from "@/lib/motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export type ShowcaseProject = {
  title: string;
  tag: string;
  category?: string;
  text: string;
  expandedText?: string;
  status?: string;
  links: { label: string; url: string }[];
  img: string;
  stack: string[];
  stars?: number;
};

const CATEGORIES = ["All", "Developer Tooling", "Systems", "Full Stack", "Backend"] as const;
type Category = (typeof CATEGORIES)[number];

const TECH_ROLES: Record<string, string> = {
  "TypeScript": "Strongly-Typed Program Graphs",
  "Tree-sitter": "Incremental AST Parser",
  "AST": "Abstract Syntax Tree Grammar",
  "CFG": "Control Flow Graph Branches",
  "DFG": "Data Flow Lifecycle Analysis",
  "Intermediate Representation": "Canonical Cross-Language IR",
  "IR": "Intermediate Representation",
  "Dependency Analysis": "Topological Dependency Sorting",
  "Graph Analysis": "Topological Dependency Sorting",
  "Automated Testing": "Regression & Verification Suites",
  "Verification Workflows": "Compile-Time Type & AST Audits",
  "Verification": "Invariant Proofs & Assertions",
  "Developer Tooling": "Deterministic Developer Workflows",
  "Bounded AI Automation": "Constrained Model Orchestration",
  "Bounded LLM Reasoning": "Constrained Synthesis Over Structured Data",
  "Rust": "Memory-Safe Systems Infrastructure",
  "Local-First Systems": "Client-Side Persistent State",
  "Local-First Infrastructure": "Client-Side Persistent State",
  "Deterministic Compute": "Reproducible Execution Engine",
  "Data Infrastructure": "Structured Query & Storage Engines",
  "Data Systems": "Structured Query & Storage Engines",
  "React": "UI State & Component Graph",
  "Vite": "Fast ESM Bundler Runtime",
  "Node.js": "Async I/O Runtime",
  "Express": "REST Routing & Middleware",
  "Express.js": "REST Routing & Middleware",
  "MongoDB": "NoSQL Document Schema",
  "Tailwind": "Utility Design System",
  "Tailwind CSS": "Utility Design System",
  "REST APIs": "HTTP Service Contracts",
  "JWT": "Stateless Auth & Claims",
  "Syncfusion": "Interactive Visualizations",
};

interface ProjectStory {
  problem: string;
  approach: string;
  outcome: string;
  architecture: string;
}

const PROJECT_STORIES: Record<string, ProjectStory> = {
  "LegacyExodus": {
    problem: "Monolithic legacy codebases are prone to regressions and expensive to modernize when relying on manual inspection or non-deterministic AI generation.",
    approach: "Engineered a 4-tier deterministic static analysis pipeline (Tree-sitter AST, CFG, DFG, and Intermediate Representation) paired with automated verification suites.",
    outcome: "Eliminates migration regressions by separating formal structural truth from bounded AI reasoning, producing fully auditable modernization artifacts.",
    architecture: "Deterministic compiler-based transformation engine separating formal structural truth from bounded AI orchestration.",
  },
  "AxiomExodus": {
    problem: "Balancing responsive local-first compute with high-integrity AI reasoning on edge systems without leaking state or depending on fragile cloud latencies.",
    approach: "Constructed Rust-native deterministic compute layers with strict process memory isolation, paired with local-first persistent data synchronization.",
    outcome: "Guaranteed deterministic execution and zero-leakage local storage, isolating generative reasoning loops from core state engines.",
    architecture: "Local-first data systems architecture with strict boundary isolation and bounded LLM interfaces.",
  },
  "Cine Vault": {
    problem: "High-volume media discovery catalogs created client-side rendering bottlenecks and unindexed database latency during rapid multi-parameter searches.",
    approach: "Decoupled Express.js API contracts from the Vite client, implemented compound MongoDB indexing strategies, and optimized React query state caching.",
    outcome: "Sub-50ms query response times across multi-parameter filtering with instant client updates and zero layout thrashing.",
    architecture: "Multi-tier client/server architecture with RESTful API contracts and clean separation of concerns.",
  },
  "YAQAZAH Course App": {
    problem: "Complex multi-module educational platforms struggle with asynchronous session state sync, fragmented enrollment tracking, and user drop-off.",
    approach: "Engineered normalized MongoDB enrollment schemas, secure session persistence, and focused modular UI pathways for distraction-free completion.",
    outcome: "Unified learner progress tracking with robust multi-session resumption and secure learner credential lifecycle.",
    architecture: "Monolithic full-stack web application with server-rendered routing and persistent learner profiles.",
  },
  "Travel Agency Booking App": {
    problem: "Real-time travel reservations require reactive analytics and interactive multi-axis booking trends across both mobile and desktop viewports.",
    approach: "Integrated performant Syncfusion analytical charting into responsive React views powered by Node.js REST endpoints with structured payload validation.",
    outcome: "Interactive booking visualization dashboard with seamless viewport adaptation and real-time reservation metrics.",
    architecture: "Component-driven analytical dashboard with reactive event listeners and optimized chart rendering.",
  },
  "Lingdojo": {
    problem: "Interactive language learning applications suffer from latency in exercise state verification, disrupting immersive learning momentum.",
    approach: "Designed lightweight client-side state engines with instantaneous validation, audio playback orchestration, and local streak persistence.",
    outcome: "Sub-16ms drill interaction feedback and reliable persistent offline progress across learning sessions.",
    architecture: "Client-side interactive web application with modular activity components and persistent local progress.",
  },
  "Subscription API": {
    problem: "Recurring billing microservices face race conditions, unhandled token tampering, and unpredictable failure cascades in payment workflows.",
    approach: "Constructed hardened Node.js/Express service with strict JWT claim validation, automated cron reconciliation, and resilient error interceptor middleware.",
    outcome: "Deterministic billing lifecycle execution with comprehensive audit logging, rate limiting, and zero credential leakage.",
    architecture: "Headless RESTful microservice with tiered middleware pipelines, centralized error interception, and database indexing.",
  },
};

export default function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.tag.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  function toggleExpand(title: string) {
    setExpandedId((prev) => (prev === title ? null : title));
  }

  return (
    <TooltipProvider delayDuration={120}>
      <div className="project-index-container" style={{ marginTop: 32 }}>
        {/* Category Filter Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
          role="tablist"
          aria-label="Project category filter"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.tag.toLowerCase() === cat.toLowerCase()).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={active}
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: active ? "1px solid var(--orange-yellow-crayola)" : "1px solid hsla(0, 0%, 100%, 0.1)",
                  background: active ? "hsla(45, 100%, 72%, 0.12)" : "hsla(240, 2%, 13%, 0.6)",
                  color: active ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
                  fontSize: "var(--fs-7)",
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 38,
                  transition: "border-color var(--dur-hover) var(--ease-out-standard), color var(--dur-hover) var(--ease-out-standard), background var(--dur-hover) var(--ease-out-standard)",
                }}
              >
                {active && !reduce && (
                  <motion.span
                    layoutId="project-category-pill"
                    className="project-category-pill"
                    initial={false}
                    transition={{ duration: 0.18, ease: ease.out }}
                  />
                )}
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    opacity: 0.8,
                    padding: "1px 6px",
                    borderRadius: 999,
                    background: active ? "hsla(45, 100%, 72%, 0.2)" : "hsla(0, 0%, 100%, 0.08)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[var(--light-gray-70)] hover:text-[var(--white-2)] bg-[hsla(0,0%,100%,0.04)] border border-[hsla(0,0%,100%,0.08)] transition-colors ml-auto"
              aria-label="Reset category filter"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Empty State when category filter returns 0 projects */}
        {filteredProjects.length === 0 ? (
          <div
            className="bracket-card flex flex-col items-center justify-center p-12 text-center my-8"
            style={{
              background: "hsla(0,0%,9%,0.8)",
              border: "1px solid hsla(0,0%,100%,0.08)",
              borderRadius: 14,
            }}
          >
            <span className="corner-tick corner-tick-tl" aria-hidden="true" />
            <span className="corner-tick corner-tick-tr" aria-hidden="true" />
            <span className="corner-tick corner-tick-bl" aria-hidden="true" />
            <span className="corner-tick corner-tick-br" aria-hidden="true" />

            <SearchX size={32} className="text-[var(--orange-yellow-crayola)] mb-3" />
            <h4 className="text-base font-semibold text-[var(--white-2)]">No matching projects found</h4>
            <p className="text-xs text-[var(--light-gray-70)] max-w-sm mt-1 mb-4">
              There are currently no featured case studies categorized under &ldquo;{selectedCategory}&rdquo;.
            </p>
            <Button
              onClick={() => setSelectedCategory("All")}
              variant="outline"
              size="sm"
              className="gap-2 font-mono text-xs"
            >
              <RotateCcw size={12} />
              <span>Show all projects</span>
            </Button>
          </div>
        ) : (
          /* Projects Interactive Grid — Responsive minmax */
          <motion.div
            layout
            transition={{ duration: duration.fast, ease: "easeOut" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 20,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, index) => {
                const originalIndex = projects.findIndex((orig) => orig.title === p.title);
                const isExpanded = expandedId === p.title;

                return (
                  <ProjectCard
                    key={p.title}
                    project={p}
                    index={originalIndex >= 0 ? originalIndex : index}
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpand(p.title)}
                    reduce={!!reduce}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
  reduce,
}: {
  project: ShowcaseProject;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const internalLink = project.links.find((l) => l.url.startsWith("/"));

  const story: ProjectStory = PROJECT_STORIES[project.title] ?? {
    problem: "Balancing responsive client architecture with robust data validation and clear boundary isolation.",
    approach: "Engineered with modular structure, automated validation rules, and scalable systems patterns.",
    outcome: "Reliable production execution with deterministic state flow, zero data regressions, and maintainable contracts.",
    architecture: "Layered full-stack design with clean API separation and deterministic data flow.",
  };

  return (
    <motion.div
      layout
      initial={false}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: duration.fast }}
      whileHover={reduce ? undefined : { y: -3 }}
      tabIndex={0}
      role="region"
      aria-label={`${project.title} case study`}
      style={{
        outline: "none",
        height: "100%",
      }}
    >
      <div
        className="bracket-card gradient-border-hover"
        style={{
          position: "relative",
          padding: 22,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 14,
          background: "hsla(240, 5%, 8%, 0.88)",
          border: isExpanded
            ? "1px solid hsla(45, 100%, 72%, 0.45)"
            : "1px solid hsla(0, 0%, 100%, 0.08)",
          boxShadow: isExpanded ? "0 12px 32px hsla(0,0%,0%,0.4)" : "none",
          transition: "border-color var(--dur-hover) var(--ease-out-standard), box-shadow var(--dur-hover) var(--ease-out-standard)",
        }}
      >
        {/* Corner drafting brackets */}
        <span className="corner-tick corner-tick-tl" aria-hidden="true" />
        <span className="corner-tick corner-tick-tr" aria-hidden="true" />
        <span className="corner-tick corner-tick-bl" aria-hidden="true" />
        <span className="corner-tick corner-tick-br" aria-hidden="true" />

        {/* Card Header: Section Numbering + Category + Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "var(--fs-7)",
                color: "var(--orange-yellow-crayola)",
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {`${String(index + 1).padStart(2, "0")} //`}
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 4,
                background: "hsla(45, 100%, 72%, 0.1)",
                color: "var(--orange-yellow-crayola)",
                border: "1px solid hsla(45, 100%, 72%, 0.25)",
                letterSpacing: 0.5,
              }}
            >
              {project.tag}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {project.title === "LegacyExodus" && (
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  background: "hsla(45, 100%, 72%, 0.14)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontWeight: 700,
                }}
              >
                FLAGSHIP
              </span>
            )}
            {project.status && (
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "var(--light-gray-70)",
                  background: "hsla(0, 0%, 100%, 0.05)",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                {project.status}
              </span>
            )}
            {typeof project.stars === "number" && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--vegas-gold)",
                  fontSize: "var(--fs-8)",
                  background: "hsla(0, 0%, 100%, 0.05)",
                  padding: "2px 7px",
                  borderRadius: 4,
                }}
              >
                <Star size={11} fill="currentColor" /> {project.stars}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "var(--fs-3)",
            fontWeight: 600,
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {internalLink ? (
            <Link
              href={internalLink.url}
              style={{
                color: "var(--white-2)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color var(--dur-hover) var(--ease-out-standard)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-yellow-crayola)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-2)")}
            >
              <span>{project.title}</span>
              <ArrowUpRight size={16} color="var(--orange-yellow-crayola)" />
            </Link>
          ) : (
            <span style={{ color: "var(--white-2)" }}>{project.title}</span>
          )}
        </h3>

        {/* Short description */}
        <p
          style={{
            color: "var(--light-gray-70)",
            fontSize: "var(--fs-7)",
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          {project.text}
        </p>

        {/* Structured Case Study: Problem, Approach, Outcome */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 8,
            background: "hsla(0, 0%, 5%, 0.6)",
            borderLeft: "2px solid var(--orange-yellow-crayola)",
            borderTop: "1px solid hsla(0, 0%, 100%, 0.04)",
            borderRight: "1px solid hsla(0, 0%, 100%, 0.04)",
            borderBottom: "1px solid hsla(0, 0%, 100%, 0.04)",
            marginBottom: 16,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--orange-yellow-crayola)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              PROBLEM //
            </span>
            <p
              style={{
                color: "var(--light-gray-70)",
                fontSize: "var(--fs-8)",
                lineHeight: 1.5,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {story.problem}
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--orange-yellow-crayola)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              APPROACH //
            </span>
            <p
              style={{
                color: "var(--light-gray-70)",
                fontSize: "var(--fs-8)",
                lineHeight: 1.5,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {story.approach}
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--orange-yellow-crayola)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              OUTCOME //
            </span>
            <p
              style={{
                color: "var(--light-gray)",
                fontSize: "var(--fs-8)",
                lineHeight: 1.5,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              {story.outcome}
            </p>
          </div>
        </div>

        {/* Tech Stack Chips with Accessible Tooltip Explanations */}
        <div style={{ marginTop: "auto", marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--light-gray-70)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              STACK //
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            {project.stack.map((s) => {
              const role = TECH_ROLES[s];
              if (!role) {
                return (
                  <span
                    key={s}
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "hsla(0, 0%, 100%, 0.04)",
                      borderColor: "hsla(0, 0%, 100%, 0.1)",
                      borderWidth: 1,
                      borderStyle: "solid",
                      color: "var(--light-gray)",
                    }}
                  >
                    {s}
                  </span>
                );
              }

              return (
                <Tooltip key={s}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: "hsla(0, 0%, 100%, 0.04)",
                        borderColor: "hsla(0, 0%, 100%, 0.1)",
                        borderWidth: 1,
                        borderStyle: "solid",
                        color: "var(--light-gray)",
                        cursor: "pointer",
                        transition: "all var(--dur-hover) var(--ease-out-standard)",
                      }}
                      className="hover:border-[var(--orange-yellow-crayola)] hover:text-[var(--orange-yellow-crayola)] focus:outline-none focus:ring-1 focus:ring-[var(--orange-yellow-crayola)]"
                    >
                      {s}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{role}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Card Footer: System Specs Toggle + Direct Action Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
          }}
        >
          <button
            onClick={onToggle}
            aria-expanded={isExpanded}
            style={{
              background: "none",
              border: "none",
              color: isExpanded ? "var(--orange-yellow-crayola)" : "var(--light-gray)",
              fontSize: "var(--fs-7)",
              fontWeight: 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 0",
              transition: "color var(--dur-hover) var(--ease-out-standard)",
            }}
          >
            <span>{isExpanded ? "Hide Specs" : "System Specs"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.18, ease: ease.out }}
              style={{ display: "inline-flex" }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>

          {/* Direct Link Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {project.links.map((l) => {
              if (l.url.startsWith("/")) {
                return (
                  <Link
                    key={l.url}
                    href={l.url}
                    className="link-draw"
                    style={{
                      color: "var(--orange-yellow-crayola)",
                      fontSize: "var(--fs-7)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontWeight: 600,
                    }}
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                );
              }

              return (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  title={l.label}
                  aria-label={l.label}
                  style={{
                    color: "var(--light-gray-70)",
                    padding: "6px",
                    borderRadius: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "hsla(0, 0%, 100%, 0.04)",
                    border: "1px solid hsla(0, 0%, 100%, 0.08)",
                    transition: "color var(--dur-hover) var(--ease-out-standard), border-color var(--dur-hover) var(--ease-out-standard), background var(--dur-hover) var(--ease-out-standard)",
                  }}
                >
                  {l.url.includes("github.com") ? <Github size={14} /> : <ExternalLink size={14} />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Deep Inspection Specs Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reduce ? undefined : { opacity: 0, height: 0 }}
              animate={reduce ? undefined : { opacity: 1, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: ease.out }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 14,
                  padding: "16px",
                  borderRadius: 8,
                  background: "hsla(0, 0%, 5%, 0.9)",
                  border: "1px solid hsla(45, 100%, 72%, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* 1. Architecture */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Layers size={15} color="var(--orange-yellow-crayola)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600, margin: 0 }}>
                      System Architecture
                    </h4>
                    <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.5, margin: 0 }}>
                      {story.architecture}
                    </p>
                  </div>
                </div>

                {/* 2. Direct Verified Repos & Live Demos */}
                {project.links.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 2,
                      paddingTop: 10,
                      borderTop: "1px solid hsla(0, 0%, 100%, 0.08)",
                    }}
                  >
                    {project.links.map((l) =>
                      l.url.startsWith("/") ? (
                        <Link
                          key={l.url}
                          href={l.url}
                          className="shimmer-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 14px",
                            borderRadius: 6,
                            fontSize: "var(--fs-8)",
                            color: "var(--smoky-black)",
                            background: "var(--orange-yellow-crayola)",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          <Layers size={12} />
                          <span>{l.label}</span>
                        </Link>
                      ) : (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shimmer-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 14px",
                            borderRadius: 6,
                            fontSize: "var(--fs-8)",
                            color: "var(--smoky-black)",
                            background: "var(--orange-yellow-crayola)",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {l.url.includes("github.com") ? <Github size={12} /> : <Globe size={12} />}
                          <span>{l.label}</span>
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
