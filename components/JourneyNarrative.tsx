"use client";

import { useState } from "react";
import { GitBranch, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface JourneyYear {
  year: string;
  stage: string;
  roleContext: string;
  organization: string;
  details: string;
  keyInsight: string;
  link?: { label: string; href: string };
}

const JOURNEY_MILESTONES: JourneyYear[] = [
  {
    year: "2022",
    stage: "BUILDING",
    roleContext: "Frontend Engineer (Apprentice)",
    organization: "Iridium Soft · Lahore",
    details:
      "Began engineering interfaces with React, JavaScript, and modern CSS. Studied browser rendering lifecycles, DOM reconciliation, and how reactive state machines propagate updates across component hierarchies.",
    keyInsight: "UIs are reactive state machines. Reliable frontend engineering starts with understanding the underlying state graph.",
  },
  {
    year: "2023",
    stage: "DEEPENING",
    roleContext: "Frontend Specialist & Open Source Contributor",
    organization: "Independent Practice · Lahore",
    details:
      "Deepened architectural practices: component modularity, client performance, and API data hydration. Contributed to freeCodeCamp (PR #69385) and MDN Web Docs, hardening cross-browser frontend foundations.",
    keyInsight: "Clean abstractions prevent UI drift. Systematic code reviews and documentation protect interface longevity.",
  },
  {
    year: "2024",
    stage: "SYSTEMS",
    roleContext: "Full-Stack Web Developer & BS Software Engineering",
    organization: "Tech Vertex & UMT Lahore",
    details:
      "Stepped into end-to-end production backends: architecting Node.js, Express, MongoDB, and PostgreSQL services with hardened JWT security and third-party APIs. Enrolled in BS Software Engineering at UMT Lahore.",
    keyInsight: "Systems fail at network boundaries. Data serialization, authentication lifecycles, and database pools demand strict contractual guarantees.",
  },
  {
    year: "2025",
    stage: "ENGINEERING",
    roleContext: "Technical Support Specialist (L3 Escalations)",
    organization: "Ibex Global · On-site",
    details:
      "Handled mission-critical escalations for a Fortune 100 enterprise client. Diagnosed failure cascades across distributed smart home hardware, IoT device fleets, authentication tokens, and network synchronization bottlenecks.",
    keyInsight: "In production, abstractions leak. High-reliability engineering requires understanding memory limits, timeouts, and distributed failure states.",
  },
  {
    year: "2026",
    stage: "AI / ORCHESTRATION",
    roleContext: "Founder & Lead Developer",
    organization: "LegacyExodus · Systems & AI Practice",
    details:
      "Focused on static analysis, parsing codebases with Tree-sitter into ASTs, Control Flow Graphs (CFG), and Data Flow Graphs (DFG). LegacyExodus became a natural extension of this interest in static analysis, dependency modeling, and deterministic transformation.",
    keyInsight: "System Understanding (Graph) + Deterministic Task Decomposition (AI) = Predictable, Scalable Software Modernization.",
    link: { label: "View LegacyExodus architecture", href: "/projects/legacy-exodus" },
  },
];

export default function JourneyNarrative() {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(4);
  const active = JOURNEY_MILESTONES[selectedYearIndex];

  return (
    <section aria-label="Engineering Journey" style={{ marginTop: 56 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GitBranch size={20} color="var(--orange-yellow-crayola)" />
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600 }}>
            The Engineering Journey
          </h2>
        </div>
        <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6, maxWidth: "66ch" }}>
          A chronological narrative spine from foundational UI components to backend distributed architectures, systems diagnostics, and deterministic compiler engineering.
        </p>
      </div>

      {/* Visual Timeline Spine (Mermaid/SVG style overview) */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 12,
          background: "hsla(0, 0%, 9%, 0.88)",
          backdropFilter: "blur(14px)",
          border: "1px solid hsla(45, 100%, 72%, 0.2)",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 10,
            alignItems: "stretch",
          }}
        >
          {JOURNEY_MILESTONES.map((item, idx) => {
            const isCurrent = selectedYearIndex === idx;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setSelectedYearIndex(idx)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: isCurrent
                    ? "1px solid var(--orange-yellow-crayola)"
                    : "1px solid hsla(0, 0%, 100%, 0.08)",
                  background: isCurrent
                    ? "hsla(45, 100%, 72%, 0.12)"
                    : "hsla(0, 0%, 7%, 0.6)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isCurrent ? "var(--orange-yellow-crayola)" : "var(--white-2)",
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isCurrent ? "var(--orange-yellow-crayola)" : "hsla(0, 0%, 100%, 0.2)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isCurrent ? "var(--orange-yellow-crayola)" : "var(--light-gray-70)",
                    fontWeight: 600,
                  }}
                >
                  {item.stage}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Year Narrative Card */}
      <div
        className="gradient-border-hover"
        style={{
          padding: "26px 28px",
          borderRadius: 14,
          background: "hsla(0, 0%, 9%, 0.88)",
          backdropFilter: "blur(14px)",
          border: "1px solid hsla(45, 100%, 72%, 0.28)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--smoky-black)",
                background: "var(--orange-yellow-crayola)",
                padding: "2px 10px",
                borderRadius: 6,
              }}
            >
              {active.year}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--orange-yellow-crayola)",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              // {active.stage}
            </span>
          </div>

          <span style={{ fontSize: "var(--fs-7)", color: "var(--light-gray-70)", fontFamily: "monospace" }}>
            {active.organization}
          </span>
        </div>

        <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, marginTop: 14 }}>
          {active.roleContext}
        </h3>

        <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, marginTop: 10, maxWidth: "72ch" }}>
          {active.details}
        </p>

        <div
          style={{
            marginTop: 18,
            padding: "12px 16px",
            borderRadius: 8,
            background: "hsla(0, 0%, 6%, 0.8)",
            borderLeft: "3px solid var(--orange-yellow-crayola)",
          }}
        >
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "var(--orange-yellow-crayola)", fontFamily: "monospace", fontSize: 11 }}>
              CORE PRINCIPLE:{" "}
            </strong>
            {active.keyInsight}
          </p>
        </div>

        {active.link && (
          <div style={{ marginTop: 16 }}>
            <Link
              href={active.link.href}
              className="link-draw"
              style={{
                color: "var(--orange-yellow-crayola)",
                fontSize: "var(--fs-7)",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {active.link.label} <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
