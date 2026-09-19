import Link from "next/link";
import { profile, experience, featuredProjects } from "@/lib/data";
import Reveal, { Stagger } from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import EngineeringStats from "@/components/EngineeringStats";
import QuietMark from "@/components/QuietMark";
import AmbientFloat from "@/components/AmbientFloat";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import PointerLight from "@/components/motion/PointerLight";
import { Download, ArrowUpRight, ArrowRight, Briefcase, Code2, ExternalLink } from "lucide-react";

export default async function Home() {
  const activeRoles = experience.slice(0, 2);
  const selectedProjects = featuredProjects.slice(0, 3);

  return (
    <div className="page-shell">
      {/* 1 — HERO SECTION */}
      <section style={{ position: "relative", paddingTop: 40, paddingBottom: 28, isolation: "isolate" }}>
        <AmbientFloat size={240} top={-20} right={-40} color="hsla(45,100%,72%,0.08)" duration={18} travel={24} />
        <PointerLight size={420} color="hsla(45,100%,72%,0.07)" />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Name */}
          <SplitText
            text={profile.name}
            as="h1"
            delay={0}
            style={{ fontSize: "clamp(34px, 6.5vw, 60px)", fontWeight: 600, color: "var(--white-2)", lineHeight: 1.1 }}
          />

          {/* Role / Typewriter */}
          <Reveal variant="fade-up" delay={0.12} immediate>
            <div
              style={{
                fontSize: "var(--fs-2)",
                color: "var(--orange-yellow-crayola)",
                marginTop: 12,
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
          <div style={{ maxWidth: "64ch", marginTop: 18 }}>
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
                    borderRadius: 8,
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
                    borderRadius: 8,
                    fontSize: "var(--fs-6)",
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
                    borderRadius: 8,
                    fontSize: "var(--fs-6)",
                  }}
                >
                  <Download size={16} /> Download résumé
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — CURRENT WORK / ACTIVE ROLES */}
      <section style={{ marginTop: 44 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <Briefcase size={16} color="var(--orange-yellow-crayola)" />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "var(--orange-yellow-crayola)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              CURRENT WORK // ACTIVE ROLES
            </span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
          {activeRoles.map((role, idx) => (
            <Reveal key={role.org + role.title} delay={idx * 0.06}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: 24,
                  borderRadius: 14,
                  background: "hsla(240, 5%, 8%, 0.85)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", fontWeight: 600 }}>
                      {role.org}
                    </span>
                    <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, margin: "4px 0 0" }}>
                      {role.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--light-gray-70)", background: "hsla(0, 0%, 100%, 0.05)", padding: "3px 8px", borderRadius: 4 }}>
                    {role.period}
                  </span>
                </div>

                <div style={{ marginTop: 14, flexGrow: 1 }}>
                  {role.bullets.map((bullet, bIdx) => (
                    <p key={bIdx} style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.65, margin: "0 0 8px" }}>
                      {bullet}
                    </p>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, paddingTop: 14, borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}>
                  {role.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: "var(--light-gray-70)",
                        background: "hsla(0, 0%, 100%, 0.04)",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {role.org === "LegacyExodus" && (
                  <div style={{ marginTop: 14 }}>
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
                      Explore architectural case study <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3 — SELECTED SYSTEMS / PROJECTS */}
      <section style={{ marginTop: 52 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Code2 size={16} color="var(--orange-yellow-crayola)" />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "var(--orange-yellow-crayola)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                SELECTED WORK // SYSTEMS &amp; PLATFORMS
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {selectedProjects.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.06}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: 24,
                  borderRadius: 14,
                  background: "hsla(240, 5%, 8%, 0.85)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {p.tag}
                  </span>
                  {p.title === "LegacyExodus" && (
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", background: "hsla(45, 100%, 72%, 0.12)", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                      FLAGSHIP
                    </span>
                  )}
                  {p.status && (
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--light-gray-70)", background: "hsla(0, 0%, 100%, 0.06)", padding: "2px 6px", borderRadius: 4 }}>
                      {p.status}
                    </span>
                  )}
                </div>

                <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600, margin: "0 0 10px" }}>
                  {p.title}
                </h3>

                <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.65, margin: "0 0 14px", flexGrow: 1 }}>
                  {p.text}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.stack.slice(0, 4).map((tech) => (
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

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto", paddingTop: 12, borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}>
                  {p.links.map((link) => (
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
                        fontWeight: 500,
                      }}
                    >
                      {link.label} <ArrowUpRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 — ENGINEERING STATS */}
      <section style={{ marginTop: 52 }}>
        <Reveal variant="fade-up" immediate delay={0}>
          <EngineeringStats />
        </Reveal>
      </section>

      {/* 5 — ENGINEERING THESIS & CALLOUT */}
      <Reveal variant="fade-up" delay={0.12}>
        <section
          style={{
            marginTop: 48,
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
          <div style={{ maxWidth: "64ch" }}>
            <p style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
              ENGINEERING APPROACH
            </p>
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              Modern software requires both product velocity and systems predictability. My work spans full-stack applications, backend services, AI automation, static analysis, and deterministic code intelligence — with correctness-critical behavior kept testable and verifiable.
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
                borderRadius: 8,
                border: "1px solid hsla(0, 0%, 100%, 0.15)",
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
                borderRadius: 8,
              }}
            >
              Start a project <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 6 — QUIET RAITASKEEN MARK */}
      <QuietMark />
    </div>
  );
}
