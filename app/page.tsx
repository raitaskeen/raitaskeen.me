import Link from "next/link";
import { profile, experience, featuredProjects, focusAreas } from "@/lib/data";
import Reveal, { Stagger } from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import EngineeringStats from "@/components/EngineeringStats";
import QuietMark from "@/components/QuietMark";
import AmbientFloat from "@/components/AmbientFloat";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import PointerLight from "@/components/motion/PointerLight";
import LegacyExodusPipeline from "@/components/LegacyExodusPipeline";
import {
  Download,
  ArrowUpRight,
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  Calendar,
  Mail,
  CheckCircle2,
} from "lucide-react";

interface ProjectCaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

const CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  "LegacyExodus": {
    problem: "Monolithic legacy codebases are prone to regressions and expensive to modernize when relying on manual inspection or stochastic AI generation.",
    approach: "Engineered a 4-tier deterministic static analysis pipeline (Tree-sitter AST, CFG, DFG, and Intermediate Representation) paired with automated verification suites.",
    outcome: "Eliminates migration regressions by separating formal structural truth from bounded AI reasoning, producing fully auditable modernization artifacts.",
  },
  "AxiomExodus": {
    problem: "Balancing responsive local-first compute with high-integrity AI reasoning on edge systems without leaking state or depending on fragile cloud latencies.",
    approach: "Constructed Rust-native deterministic compute layers with strict process memory isolation, paired with local-first persistent data synchronization.",
    outcome: "Guaranteed deterministic execution and zero-leakage local storage, isolating generative reasoning loops from core state engines.",
  },
  "Cine Vault": {
    problem: "High-volume media discovery catalogs created client-side rendering bottlenecks and unindexed database latency during rapid multi-parameter searches.",
    approach: "Decoupled Express.js API contracts from the Vite client, implemented compound MongoDB indexing strategies, and optimized React query state caching.",
    outcome: "Sub-50ms query response times across multi-parameter filtering with instant client updates and zero layout thrashing.",
  },
};

export default async function Home() {
  const activeRoles = experience.slice(0, 2);
  const selectedProjects = featuredProjects.slice(0, 3);

  return (
    <div className="page-shell">
      {/* 1 — ENGINEERING HERO SECTION */}
      <section style={{ position: "relative", paddingTop: 36, paddingBottom: 24, isolation: "isolate" }}>
        <AmbientFloat size={240} top={-20} right={-40} color="hsla(45,100%,72%,0.08)" duration={18} travel={24} />
        <PointerLight size={420} color="hsla(45,100%,72%,0.07)" />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Engineering Metadata Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 8px",
                borderRadius: 4,
                background: "hsla(45, 100%, 72%, 0.1)",
                border: "1px solid hsla(45, 100%, 72%, 0.25)",
                color: "var(--orange-yellow-crayola)",
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange-yellow-crayola)" }} />
              STATUS // ONLINE
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--light-gray-70)" }}>
              00 // PRINCIPAL PROFILE · 5+ YRS PROD
            </span>
          </div>

          {/* Name */}
          <SplitText
            text={profile.name}
            as="h1"
            delay={0}
            style={{ fontSize: "clamp(34px, 6.5vw, 58px)", fontWeight: 600, color: "var(--white-2)", lineHeight: 1.1 }}
          />

          {/* Role / Typewriter */}
          <Reveal variant="fade-up" delay={0.12} immediate>
            <div
              style={{
                fontSize: "var(--fs-2)",
                color: "var(--orange-yellow-crayola)",
                marginTop: 10,
                minHeight: "1.4em",
                height: "1.4em",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                overflow: "hidden",
                contain: "layout style",
              }}
            >
              <Typewriter words={[
                "Software Engineer",
                "Full-Stack · Backend · AI Automation",
                "Developer Tooling · Static Analysis",
                "Building LegacyExodus",
              ]} />
            </div>
          </Reveal>

          {/* Bio Introduction */}
          <div style={{ maxWidth: "66ch", marginTop: 16 }}>
            <Stagger immediate gap={0.04} variant="fade-up" className="stagger-col">
              {profile.bio.map((p, i) => (
                <p key={i} style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-5)", lineHeight: 1.7, marginBottom: 12 }}>{p}</p>
              ))}
            </Stagger>
          </div>

          {/* Primary CTAs */}
          <Reveal variant="fade-up" delay={0.15} immediate>
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="shimmer-btn"
                  style={{
                    display: "inline-block",
                    background: "var(--orange-yellow-crayola)",
                    color: "var(--smoky-black)",
                    padding: "12px 24px",
                    borderRadius: 6,
                    fontSize: "var(--fs-6)",
                    fontWeight: 600,
                  }}
                >
                  Get in touch
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={profile.scheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    border: "1px solid hsla(0,0%,100%,0.15)",
                    color: "var(--white-2)",
                    padding: "12px 24px",
                    borderRadius: 6,
                    fontSize: "var(--fs-6)",
                    transition: "border-color var(--dur-hover) var(--ease-out-standard)",
                  }}
                >
                  Schedule a call
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={profile.resumeUrl}
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid hsla(45,100%,72%,0.35)",
                    color: "var(--orange-yellow-crayola)",
                    padding: "12px 24px",
                    borderRadius: 6,
                    fontSize: "var(--fs-6)",
                    transition: "border-color var(--dur-hover) var(--ease-out-standard)",
                  }}
                >
                  <Download size={16} /> Download résumé
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — DISTINCTIVE ASYMMETRIC DESKTOP LAYOUT */}
      <div className="homepage-asymmetric-grid">
        {/* ================================================================= */}
        {/* PRIMARY COLUMN (Left / Wide): Interactive Schematic + Case Studies */}
        {/* ================================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {/* SECTION 01 // INTERACTIVE SCHEMATIC */}
          <section>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Cpu size={15} color="var(--orange-yellow-crayola)" />
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "var(--orange-yellow-crayola)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    01 // FLAGSHIP ARCHITECTURE · INTERACTIVE ENGINE
                  </span>
                </div>
                <Link
                  href="/projects/legacy-exodus"
                  className="link-draw"
                  style={{
                    color: "var(--orange-yellow-crayola)",
                    fontSize: "var(--fs-7)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontWeight: 500,
                  }}
                >
                  Full architecture deep-dive <ArrowUpRight size={13} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <LegacyExodusPipeline />
            </Reveal>
          </section>

          {/* SECTION 02 // SELECTED SYSTEMS · STRUCTURED CASE STUDIES */}
          <section>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Code2 size={15} color="var(--orange-yellow-crayola)" />
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "var(--orange-yellow-crayola)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    02 // SELECTED WORK // CASE STUDIES
                  </span>
                </div>
                <Link
                  href="/projects"
                  className="link-draw"
                  style={{
                    color: "var(--light-gray-70)",
                    fontSize: "var(--fs-7)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Browse all projects <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {selectedProjects.map((p, idx) => {
                const story = CASE_STUDIES[p.title] ?? {
                  problem: "Balancing responsive client architecture with robust data validation and clear boundary isolation.",
                  approach: "Engineered with modular structure, automated validation rules, and scalable systems patterns.",
                  outcome: "Reliable production execution with deterministic state flow and maintainable service contracts.",
                };

                return (
                  <Reveal key={p.title} delay={idx * 0.05}>
                    <div
                      className="bracket-card gradient-border-hover"
                      style={{
                        position: "relative",
                        padding: 24,
                        borderRadius: 14,
                        background: "hsla(240, 5%, 8%, 0.88)",
                        border: "1px solid hsla(0, 0%, 100%, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        boxSizing: "border-box",
                        transition: "border-color var(--dur-hover) var(--ease-out-standard)",
                      }}
                    >
                      {/* Corner drafting brackets */}
                      <span className="corner-tick corner-tick-tl" aria-hidden="true" />
                      <span className="corner-tick corner-tick-tr" aria-hidden="true" />
                      <span className="corner-tick corner-tick-bl" aria-hidden="true" />
                      <span className="corner-tick corner-tick-br" aria-hidden="true" />

                      {/* Header */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--orange-yellow-crayola)", fontWeight: 700 }}>
                            {`${String(idx + 1).padStart(2, "0")} //`}
                          </span>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.05em", padding: "2px 7px", borderRadius: 4, background: "hsla(45, 100%, 72%, 0.1)", border: "1px solid hsla(45, 100%, 72%, 0.2)" }}>
                            {p.tag}
                          </span>
                        </div>

                        {p.title === "LegacyExodus" && (
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", background: "hsla(45, 100%, 72%, 0.14)", padding: "2px 7px", borderRadius: 4, fontWeight: 700 }}>
                            FLAGSHIP
                          </span>
                        )}
                        {p.status && (
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)", background: "hsla(0, 0%, 100%, 0.06)", padding: "2px 7px", borderRadius: 4 }}>
                            {p.status}
                          </span>
                        )}
                      </div>

                      <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, margin: 0 }}>
                        {p.title}
                      </h3>

                      <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, margin: 0 }}>
                        {p.text}
                      </p>

                      {/* Case Study Structured Breakdown: Problem, Approach, Outcome */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          padding: "12px 14px",
                          borderRadius: 8,
                          background: "hsla(0, 0%, 5%, 0.6)",
                          borderLeft: "2px solid var(--orange-yellow-crayola)",
                          margin: "4px 0",
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                            PROBLEM //
                          </span>
                          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", lineHeight: 1.5, margin: "2px 0 0" }}>
                            {story.problem}
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                            APPROACH //
                          </span>
                          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", lineHeight: 1.5, margin: "2px 0 0" }}>
                            {story.approach}
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                            OUTCOME //
                          </span>
                          <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-8)", lineHeight: 1.5, margin: "2px 0 0" }}>
                            {story.outcome}
                          </p>
                        </div>
                      </div>

                      {/* Stack Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {p.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontSize: 11,
                              fontFamily: "monospace",
                              color: "var(--light-gray-70)",
                              background: "hsla(0, 0%, 100%, 0.04)",
                              padding: "2px 7px",
                              borderRadius: 4,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 10, borderTop: "1px solid hsla(0, 0%, 100%, 0.06)", marginTop: 4 }}>
                        {p.links.map((link) =>
                          link.url.startsWith("/") ? (
                            <Link
                              key={link.label}
                              href={link.url}
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
                              {link.label} <ArrowUpRight size={13} />
                            </Link>
                          ) : (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-draw"
                              style={{
                                color: "var(--orange-yellow-crayola)",
                                fontSize: "var(--fs-7)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontWeight: 500,
                              }}
                            >
                              {link.label} <ArrowUpRight size={13} />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* SECONDARY COLUMN (Right / Narrow): Telemetry, Active Roles & Dispatch */}
        {/* ================================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* SECTION 03 // ENGINEERING TELEMETRY */}
          <section>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Layers size={15} color="var(--orange-yellow-crayola)" />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "var(--orange-yellow-crayola)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  03 // SYSTEM TELEMETRY
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="bracket-card" style={{ position: "relative" }}>
                <span className="corner-tick corner-tick-tl" aria-hidden="true" />
                <span className="corner-tick corner-tick-tr" aria-hidden="true" />
                <span className="corner-tick corner-tick-bl" aria-hidden="true" />
                <span className="corner-tick corner-tick-br" aria-hidden="true" />
                <EngineeringStats />
              </div>
            </Reveal>
          </section>

          {/* SECTION 04 // CURRENT WORK & ACTIVE ROLES */}
          <section>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Briefcase size={15} color="var(--orange-yellow-crayola)" />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "var(--orange-yellow-crayola)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  04 // ACTIVE ROLES
                </span>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {activeRoles.map((role, idx) => (
                <Reveal key={role.org + role.title} delay={idx * 0.06}>
                  <div
                    className="bracket-card gradient-border-hover"
                    style={{
                      position: "relative",
                      padding: 20,
                      borderRadius: 12,
                      background: "hsla(240, 5%, 8%, 0.85)",
                      border: "1px solid hsla(0, 0%, 100%, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      boxSizing: "border-box",
                      transition: "border-color var(--dur-hover) var(--ease-out-standard)",
                    }}
                  >
                    <span className="corner-tick corner-tick-tl" aria-hidden="true" />
                    <span className="corner-tick corner-tick-tr" aria-hidden="true" />
                    <span className="corner-tick corner-tick-bl" aria-hidden="true" />
                    <span className="corner-tick corner-tick-br" aria-hidden="true" />

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 600 }}>
                          {role.org}
                        </span>
                        <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: "2px 0 0" }}>
                          {role.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)", background: "hsla(0, 0%, 100%, 0.05)", padding: "2px 6px", borderRadius: 4 }}>
                        {role.period}
                      </span>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      {role.bullets.map((bullet, bIdx) => (
                        <p key={bIdx} style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", lineHeight: 1.55, margin: "0 0 6px" }}>
                          {bullet}
                        </p>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10, paddingTop: 10, borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}>
                      {role.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 10,
                            fontFamily: "monospace",
                            color: "var(--light-gray-70)",
                            background: "hsla(0, 0%, 100%, 0.04)",
                            padding: "1px 6px",
                            borderRadius: 3,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {role.org === "LegacyExodus" && (
                      <div style={{ marginTop: 10 }}>
                        <Link
                          href="/projects/legacy-exodus"
                          className="link-draw"
                          style={{
                            color: "var(--orange-yellow-crayola)",
                            fontSize: "var(--fs-8)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontWeight: 600,
                          }}
                        >
                          Explore architecture &amp; pipeline <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* SECTION 05 // CORE TECHNICAL DOMAINS */}
          <section>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "var(--orange-yellow-crayola)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  05 // TECHNICAL DOMAINS
                </span>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {focusAreas.map((area, idx) => (
                <Reveal key={area.title} delay={idx * 0.04}>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 8,
                      background: "hsla(0, 0%, 7%, 0.6)",
                      border: "1px solid hsla(0, 0%, 100%, 0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <CheckCircle2 size={13} color="var(--orange-yellow-crayola)" />
                      <h5 style={{ color: "var(--white-2)", fontSize: "var(--fs-7)", fontWeight: 600, margin: 0 }}>
                        {area.title}
                      </h5>
                    </div>
                    <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", lineHeight: 1.5, margin: 0 }}>
                      {area.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* SECTION 06 // DISPATCH ACTION BOX */}
          <Reveal delay={0.12}>
            <section
              className="bracket-card"
              style={{
                position: "relative",
                padding: 24,
                borderRadius: 14,
                background: "hsla(45, 100%, 72%, 0.04)",
                border: "1px solid hsla(45, 100%, 72%, 0.25)",
              }}
            >
              <span className="corner-tick corner-tick-tl" aria-hidden="true" />
              <span className="corner-tick corner-tick-tr" aria-hidden="true" />
              <span className="corner-tick corner-tick-bl" aria-hidden="true" />
              <span className="corner-tick corner-tick-br" aria-hidden="true" />

              <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                06 // DIRECT DISPATCH
              </span>

              <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: "6px 0 8px" }}>
                Ready to build or audit?
              </h4>

              <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, margin: "0 0 16px" }}>
                Available for full-stack engineering, backend systems, static analysis pipelines, and verifiable automation.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href="/contact"
                  className="shimmer-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 16px",
                    borderRadius: 6,
                    background: "var(--orange-yellow-crayola)",
                    color: "var(--smoky-black)",
                    fontSize: "var(--fs-7)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <Mail size={14} /> Send a message
                </Link>

                <a
                  href={profile.scheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "9px 16px",
                    borderRadius: 6,
                    border: "1px solid hsla(0, 0%, 100%, 0.15)",
                    color: "var(--white-2)",
                    fontSize: "var(--fs-7)",
                    textDecoration: "none",
                    transition: "border-color var(--dur-hover) var(--ease-out-standard)",
                  }}
                >
                  <Calendar size={14} /> Schedule 20-min intro
                </a>
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      {/* 3 — ENGINEERING THESIS & CALLOUT BANNER */}
      <Reveal variant="fade-up" delay={0.1}>
        <section
          className="bracket-card"
          style={{
            position: "relative",
            marginTop: 56,
            padding: "28px 30px",
            borderRadius: 14,
            background: "hsla(240, 5%, 8%, 0.85)",
            border: "1px solid hsla(0, 0%, 100%, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <span className="corner-tick corner-tick-tl" aria-hidden="true" />
          <span className="corner-tick corner-tick-tr" aria-hidden="true" />
          <span className="corner-tick corner-tick-bl" aria-hidden="true" />
          <span className="corner-tick corner-tick-br" aria-hidden="true" />

          <div style={{ maxWidth: "64ch" }}>
            <p style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontWeight: 600 }}>
              ENGINEERING PHILOSOPHY
            </p>
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              Modern software requires both product velocity and systems predictability. My work spans full-stack applications, backend services, AI automation, static analysis, and deterministic code intelligence — keeping correctness-critical behavior testable, verifiable, and fast.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/about"
              style={{
                color: "var(--white-2)",
                fontSize: "var(--fs-7)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 500,
                padding: "10px 18px",
                borderRadius: 6,
                border: "1px solid hsla(0, 0%, 100%, 0.15)",
                transition: "border-color var(--dur-hover) var(--ease-out-standard)",
              }}
            >
              Read background <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="shimmer-btn"
              style={{
                background: "var(--orange-yellow-crayola)",
                color: "var(--smoky-black)",
                fontSize: "var(--fs-7)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                borderRadius: 6,
              }}
            >
              Start a conversation <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 4 — QUIET RAITASKEEN MARK */}
      <QuietMark />
    </div>
  );
}
