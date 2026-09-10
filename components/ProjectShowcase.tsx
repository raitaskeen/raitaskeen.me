"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Github, ExternalLink, Star, ChevronDown, Layers, Globe, Shield, ArrowUpRight } from "lucide-react";
import { spring } from "@/lib/motion";

export type ShowcaseProject = {
  title: string;
  tag: string;
  text: string;
  links: { label: string; url: string }[];
  img: string;
  stack: string[];
  stars?: number;
};

const CATEGORIES = ["All", "Full Stack", "Backend"] as const;
type Category = (typeof CATEGORIES)[number];

const TECH_ROLES: Record<string, string> = {
  "React": "UI State & Component Graph",
  "Node.js": "Async I/O Runtime",
  "Express": "REST Routing & Middleware",
  "MongoDB": "NoSQL Document Schema",
  "Tailwind": "Utility Design System",
  "JWT": "Stateless Auth & Claims",
  "Syncfusion": "Interactive Visualizations",
};

const PROJECT_STORIES: Record<string, { challenge: string; approach: string; architecture: string }> = {
  "Cine Vault": {
    challenge: "Managing extensive movie dataset queries with responsive client-side filtering without bottlenecking the database.",
    approach: "Decoupled the Express API from the Vite client, implemented MongoDB index strategies, and layered modular React state.",
    architecture: "Multi-tier client/server architecture with RESTful API contracts and clean separation of concerns.",
  },
  "YAQAZAH Course App": {
    challenge: "Handling structured multi-chapter course progress and enrollment verification across concurrent student sessions.",
    approach: "Designed normalized MongoDB enrollment collections paired with an intuitive, distraction-free learning UI.",
    architecture: "Monolithic full-stack web application with server-rendered routing and persistent learner profiles.",
  },
  "Travel Agency Booking App": {
    challenge: "Visualizing complex booking trends and destination analytics interactively across mobile and desktop viewports.",
    approach: "Integrated Syncfusion chart components into a lightweight React frontend powered by Node.js service endpoints.",
    architecture: "Component-driven analytical dashboard with reactive event listeners and optimized chart rendering.",
  },
  "Lingdojo": {
    challenge: "Delivering engaging, low-latency language exercises with responsive feedback and clean state tracking.",
    approach: "Engineered responsive component workflows focused on interactive language drills and instant feedback.",
    architecture: "Client-side interactive web application with modular activity components and persistent local progress.",
  },
  "Subscription API": {
    challenge: "Enforcing strict authorization boundaries, mitigating credential tampering, and automating recurring billing workflows.",
    approach: "Implemented hardened JWT validation middleware, scheduled background cron tasks, and rate-limiting security layers.",
    architecture: "Headless RESTful microservice with tiered middleware pipelines, centralized error interception, and database indexing.",
  },
};

export default function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.tag.toLowerCase() === selectedCategory.toLowerCase();
  });

  function toggleExpand(title: string) {
    setExpandedId((prev) => (prev === title ? null : title));
  }

  return (
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
                padding: "8px 18px",
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
                transition: "border-color 0.15s ease, color 0.15s ease, background 0.15s ease",
              }}
            >
              {active && !reduce && (
                <motion.span
                  layoutId="project-category-pill"
                  transition={spring.snap}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    border: "1px solid var(--orange-yellow-crayola)",
                    pointerEvents: "none",
                  }}
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
      </div>

      {/* Projects Interactive Grid */}
      <motion.div
        layout
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
    </div>
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
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const liveLink = project.links.find((l) =>
    l.label.toLowerCase().includes("live") || l.label.toLowerCase().includes("app") || l.label.toLowerCase().includes("demo")
  );
  const singleRepo = !liveLink && project.links.length === 1 ? project.links[0] : null;

  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;

    if (liveLink) {
      window.open(liveLink.url, "_blank", "noreferrer");
    } else if (singleRepo) {
      window.open(singleRepo.url, "_blank", "noreferrer");
    } else {
      onToggle();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (liveLink) {
        window.open(liveLink.url, "_blank", "noreferrer");
      } else if (singleRepo) {
        window.open(singleRepo.url, "_blank", "noreferrer");
      } else {
        onToggle();
      }
    }
  }

  const story = PROJECT_STORIES[project.title] ?? {
    challenge: "Balancing responsive client architecture with robust data validation and clear boundary isolation.",
    approach: "Engineered with modular structure, automated validation rules, and scalable patterns.",
    architecture: "Layered full-stack design with clean API separation and deterministic data flow.",
  };

  return (
    <motion.div
      layout
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      whileHover={reduce ? undefined : { y: -3 }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${project.title} - ${liveLink ? "click to open live app" : singleRepo ? "click to view repository" : "click to inspect architecture"}`}
      style={{
        cursor: "pointer",
        outline: "none",
        height: "100%",
      }}
    >
      <div
        className="gradient-border-hover"
        style={{
          padding: 24,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 16,
          background: "var(--bg-gradient-jet)",
          border: isExpanded
            ? "1px solid hsla(45, 100%, 72%, 0.45)"
            : "1px solid hsla(0, 0%, 100%, 0.08)",
          boxShadow: isExpanded ? "0 12px 32px hsla(0,0%,0%,0.4)" : "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Card Header: Sequence + Category + Stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "var(--fs-7)",
                color: "var(--orange-yellow-crayola)",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: 999,
                background: "hsla(45, 100%, 72%, 0.1)",
                color: "var(--orange-yellow-crayola)",
                border: "1px solid hsla(45, 100%, 72%, 0.25)",
                letterSpacing: 0.5,
              }}
            >
              {project.tag}
            </span>
          </div>

          {typeof project.stars === "number" && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "var(--vegas-gold)",
                fontSize: "var(--fs-8)",
                background: "hsla(0, 0%, 100%, 0.05)",
                padding: "3px 8px",
                borderRadius: 999,
              }}
            >
              <Star size={11} fill="currentColor" /> {project.stars}
            </span>
          )}
        </div>

        {/* Title — Semantic Link or Inspection Button */}
        <h3
          style={{
            fontSize: "var(--fs-3)",
            fontWeight: 600,
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {liveLink ? (
            <a
              href={liveLink.url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--white-2)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-yellow-crayola)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-2)")}
            >
              <span>{project.title}</span>
              <ArrowUpRight size={16} color="var(--orange-yellow-crayola)" />
            </a>
          ) : singleRepo ? (
            <a
              href={singleRepo.url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--white-2)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-yellow-crayola)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-2)")}
            >
              <span>{project.title}</span>
              <ArrowUpRight size={16} color="var(--orange-yellow-crayola)" />
            </a>
          ) : (
            <button
              onClick={onToggle}
              style={{
                background: "none",
                border: "none",
                color: "var(--white-2)",
                font: "inherit",
                fontSize: "var(--fs-3)",
                fontWeight: 600,
                padding: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textAlign: "left",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-yellow-crayola)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-2)")}
            >
              <span>{project.title}</span>
              <ChevronDown size={16} color="var(--orange-yellow-crayola)" />
            </button>
          )}
        </h3>

        {/* Short description */}
        <p
          style={{
            color: "var(--light-gray-70)",
            fontSize: "var(--fs-7)",
            lineHeight: 1.6,
            marginBottom: 16,
            flexGrow: 1,
          }}
        >
          {project.text}
        </p>

        {/* Tech Stack Chips with Interactive Architectural Role Inspection */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {project.stack.map((s) => (
              <button
                key={s}
                type="button"
                onMouseEnter={() => setHoveredTech(s)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  fontSize: 11,
                  padding: "3px 9px",
                  borderRadius: 999,
                  background: hoveredTech === s ? "hsla(45, 100%, 72%, 0.15)" : "hsla(0, 0%, 100%, 0.04)",
                  borderColor: hoveredTech === s ? "var(--orange-yellow-crayola)" : "hsla(0, 0%, 100%, 0.12)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  color: hoveredTech === s ? "var(--orange-yellow-crayola)" : "var(--light-gray)",
                  cursor: "default",
                  transition: "all 0.15s ease",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Contextual Stack Connection Callout */}
          <div style={{ minHeight: 20, marginTop: 6 }}>
            {hoveredTech && TECH_ROLES[hoveredTech] && (
              <motion.p
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                }}
              >
                ↳ {hoveredTech}: {TECH_ROLES[hoveredTech]}
              </motion.p>
            )}
          </div>
        </div>

        {/* Card Footer: Expand toggle + Quick links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 14,
            borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
            marginTop: "auto",
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
              transition: "color 0.15s ease",
            }}
          >
            <span>{isExpanded ? "Close Inspection" : "Inspect Architecture"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: "inline-flex" }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>

          {/* Direct Link Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="project-link"
                title={l.label}
                aria-label={l.label}
                style={{
                  color: "var(--light-gray-70)",
                  padding: "6px",
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "hsla(0, 0%, 100%, 0.04)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  transition: "color 0.12s ease, border-color 0.12s ease, background 0.12s ease",
                }}
              >
                {l.url.includes("github.com") ? <Github size={14} /> : <ExternalLink size={14} />}
              </a>
            ))}
          </div>
        </div>

        {/* Deep Inspection Mode Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reduce ? undefined : { opacity: 0, height: 0 }}
              animate={reduce ? undefined : { opacity: 1, height: "auto" }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 16,
                  padding: "16px",
                  borderRadius: 12,
                  background: "hsla(0, 0%, 5%, 0.8)",
                  border: "1px solid hsla(45, 100%, 72%, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {/* 1. Architecture */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Layers size={15} color="var(--orange-yellow-crayola)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600 }}>
                      System Architecture
                    </h4>
                    <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.5 }}>
                      {story.architecture}
                    </p>
                  </div>
                </div>

                {/* 2. Key Challenge & Approach */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Shield size={15} color="var(--orange-yellow-crayola)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600 }}>
                      Core Challenge & Engineering Approach
                    </h4>
                    <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--orange-yellow-crayola)" }}>Challenge: </strong>{story.challenge}
                    </p>
                    <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-8)", marginTop: 4, lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--orange-yellow-crayola)" }}>Approach: </strong>{story.approach}
                    </p>
                  </div>
                </div>

                {/* 3. Direct Verified Repos & Live Demos */}
                {project.links.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginTop: 4,
                      paddingTop: 12,
                      borderTop: "1px solid hsla(0, 0%, 100%, 0.08)",
                    }}
                  >
                    {project.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shimmer-btn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 14px",
                          borderRadius: 8,
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
                    ))}
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
