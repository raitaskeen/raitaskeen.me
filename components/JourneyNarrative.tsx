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
    year: "2021",
    stage: "FRONTEND ENGINEERING",
    roleContext: "Frontend Engineer - Apprentice",
    organization: "Iridium Soft · Lahore",
    details:
      "Developed reusable React and JavaScript components for responsive, maintainable, cross-browser web applications. Contributed to code reviews, Agile delivery, technical documentation, and collaborative frontend development.",
    keyInsight: "UIs are reactive state machines. Reliable frontend engineering starts with understanding the underlying state graph.",
  },
  {
    year: "2023",
    stage: "FULL-STACK ENGINEERING",
    roleContext: "Full-Stack Web Developer",
    organization: "Tech Vertex · Remote",
    details:
      "Optimized React/TypeScript and Node.js/Express applications, reducing latency by up to 50% while maintaining 99.9% uptime. Designed JWT-secured REST APIs and integrated Stripe and Appwrite services across delivery workflows.",
    keyInsight: "Systems fail at network boundaries. Data serialization, authentication lifecycles, and database pools demand strict contractual guarantees.",
  },
  {
    year: "2024",
    stage: "ADVANCED TECHNICAL SYSTEMS",
    roleContext: "Technical Support Specialist - Advanced Escalations",
    organization: "ibex · Lahore",
    details:
      "Resolved 500+ escalated technical cases for a Fortune 100 technology client across connected devices, accounts, subscriptions, and digital services. Progressed from Level 1 to Level 3 within 6 months while handling increasingly complex technical and systems escalations.",
    keyInsight: "In production, abstractions leak. High-reliability engineering requires understanding memory limits, timeouts, and distributed failure states.",
  },
  {
    year: "2024–2026",
    stage: "FULL-STACK & AI AUTOMATION",
    roleContext: "Full-Stack & AI Automation Engineer",
    organization: "ibex · Internal Promotion",
    details:
      "Promoted internally to build React/TypeScript dashboards, Node.js/PostgreSQL tools, REST APIs, and bounded LLM automation workflows supporting technical operations, diagnostics, and structured triage.",
    keyInsight: "Operational tools and runbooks compound across teams. Bounded automation over structured telemetry eliminates manual diagnostic toil.",
  },
  {
    year: "2026",
    stage: "STATIC ANALYSIS / SOFTWARE MODERNIZATION",
    roleContext: "Founder & Lead Developer",
    organization: "LegacyExodus · Remote",
    details:
      "Designed a four-layer code-intelligence pipeline across AST, CFG, DFG, and Intermediate Representation for deterministic software analysis, accompanied by bounded AI-assisted reasoning for verifiable modernization workflows.",
    keyInsight: "Deterministic systems establish structural truth; AI handles bounded reasoning, orchestration, and synthesis.",
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
              {"//"} {active.stage}
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
