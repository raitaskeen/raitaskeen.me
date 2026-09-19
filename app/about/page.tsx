import Image from "next/image";
import {
  experience,
  education,
  courses,
  spokenLanguages,
  githubAchievements,
  profile,
} from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import JourneyNarrative from "@/components/JourneyNarrative";
import QuietMark from "@/components/QuietMark";
import { stagger } from "@/lib/motion";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const engineeringDisciplines = [
  {
    title: "Full-Stack & Backend",
    label: "Core Development",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Bun",
      "REST APIs",
      "JWT Authentication",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    title: "Systems & Infrastructure",
    label: "Systems",
    skills: [
      "Rust",
      "Docker",
      "Linux",
      "GitHub Actions",
      "Cloudflare",
      "CI/CD",
    ],
  },
  {
    title: "Static Analysis & Developer Tooling",
    label: "Compilers & Tools",
    skills: [
      "Tree-sitter",
      "AST",
      "CFG",
      "DFG",
      "Intermediate Representation",
      "Dependency Analysis",
      "Git",
      "Postman",
    ],
  },
  {
    title: "AI & Automation",
    label: "AI Engineering",
    skills: [
      "Claude Code",
      "LLM Integrations",
      "Tool-Using Agents",
      "Structured Outputs",
      "n8n",
      "Workflow Automation",
      "Verification Workflows",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      {/* GitHub contribution chart preconnect & DNS-prefetch */}
      <link rel="preconnect" href="https://ghchart.rshah.org" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://ghchart.rshah.org" />

      {/* 1 — ABOUT / IDENTITY */}
      <Reveal>
        <div style={{ maxWidth: "68ch" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--orange-yellow-crayola)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ENGINEERING IDENTITY // BACKGROUND
          </span>
          <h1 style={{ color: "var(--white-2)", fontSize: "clamp(32px, 5.5vw, 48px)", fontWeight: 600, marginTop: 10, lineHeight: 1.15 }}>
            Full-Stack Systems, Static Analysis &amp; AI Automation
          </h1>
          <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-5)", marginTop: 14, lineHeight: 1.7 }}>
            I am a full-stack and systems-oriented Software Engineer based in Lahore, Pakistan, with 5+ years of experience across frontend, full-stack development, backend engineering, AI automation, developer tooling, and technical systems.
          </p>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", marginTop: 10, lineHeight: 1.7 }}>
            My core engineering stack includes TypeScript, React, Node.js, Express.js, PostgreSQL, MongoDB, REST APIs, Docker, Git, and CI/CD.
          </p>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", marginTop: 10, lineHeight: 1.7 }}>
            My work has progressively moved deeper into deterministic code intelligence — modeling software using ASTs, Control Flow Graphs, Data Flow Graphs, dependency analysis, and Intermediate Representation — with bounded AI automation layered on top of structured system outputs.
          </p>
        </div>
      </Reveal>

      {/* 2 — JOURNEY (Chronological narrative spine 2021 -> 2026) */}
      <JourneyNarrative />

      {/* 3 — EXPERIENCE (Dedicated distinct section) */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="01" title="Work Experience" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {experience.map((exp, idx) => (
            <Reveal key={exp.title + exp.org} delay={idx * 0.05}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "24px 26px",
                  borderRadius: 14,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <Briefcase size={16} color="var(--orange-yellow-crayola)" />
                      <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600 }}>
                        {exp.title}
                      </h3>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "monospace",
                          color: "var(--orange-yellow-crayola)",
                          background: "hsla(45, 100%, 72%, 0.12)",
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontWeight: 600,
                        }}
                      >
                        {exp.org}
                      </span>
                      {"badge" in exp && exp.badge && (
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            color: "var(--orange-yellow-crayola)",
                            background: "hsla(45, 100%, 72%, 0.18)",
                            border: "1px solid hsla(45, 100%, 72%, 0.35)",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 4, fontFamily: "monospace" }}>
                      {exp.location}
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "var(--light-gray-70)",
                      background: "hsla(0, 0%, 100%, 0.05)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul style={{ marginTop: 14, paddingLeft: 18, color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.6 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      {b}
                    </li>
                  ))}
                </ul>

                {"tech" in exp && Array.isArray(exp.tech) && exp.tech.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                    {exp.tech.map((t: string) => (
                      <span key={t} className="chip" style={{ fontSize: "var(--fs-8)", padding: "2px 8px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 — EDUCATION (Dedicated distinct section) */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="02" title="Education" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {education.map((edu, idx) => (
            <Reveal key={edu.title + edu.place} delay={idx * 0.05}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "24px 26px",
                  borderRadius: 14,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <GraduationCap size={18} color="var(--orange-yellow-crayola)" />
                      <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-3)", fontWeight: 600 }}>
                        {edu.title}
                      </h3>
                      {"grade" in edu && edu.grade && (
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            color: "var(--orange-yellow-crayola)",
                            background: "hsla(45, 100%, 72%, 0.12)",
                            border: "1px solid hsla(45, 100%, 72%, 0.25)",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                          }}
                        >
                          Grade: {edu.grade}
                        </span>
                      )}
                      {"expected" in edu && edu.expected && (
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            color: "var(--orange-yellow-crayola)",
                            background: "hsla(45, 100%, 72%, 0.18)",
                            border: "1px solid hsla(45, 100%, 72%, 0.35)",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                          }}
                        >
                          {edu.expected}
                        </span>
                      )}
                    </div>
                    <p style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-6)", marginTop: 6, fontFamily: "monospace" }}>
                      {edu.place}
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "var(--light-gray-70)",
                      background: "hsla(0, 0%, 100%, 0.05)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {edu.period}
                  </span>
                </div>

                {"coursework" in edu && Array.isArray(edu.coursework) && edu.coursework.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <p style={{ color: "var(--light-gray-70)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                      Relevant Coursework
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {edu.coursework.map((c: string) => (
                        <span key={c} className="chip" style={{ fontSize: "var(--fs-8)", padding: "3px 10px" }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 — COURSES & CERTIFICATIONS */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="03" title="Certifications &amp; Courses" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "stretch",
            gap: 16,
          }}
        >
          {courses.filter((c) => c.isTechnical).map((course, idx) => {
            const hasVerify = "url" in course && course.url;
            return (
              <Reveal key={course.title} delay={idx * stagger.tight}>
                <div
                  className="gradient-border-hover"
                  style={{
                    padding: "22px 24px",
                    borderRadius: 12,
                    background: "hsla(0, 0%, 9%, 0.88)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid hsla(0, 0%, 100%, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 14,
                    height: "100%",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <BookOpen size={16} color="var(--orange-yellow-crayola)" />
                        <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                          {course.title}
                        </h4>
                      </div>
                      {"period" in course && course.period && (
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: "monospace",
                            color: "var(--light-gray-70)",
                            background: "hsla(0, 0%, 100%, 0.05)",
                            padding: "2px 8px",
                            borderRadius: 4,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {course.period}
                        </span>
                      )}
                    </div>

                    <p style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-7)", fontFamily: "monospace", margin: "6px 0 0" }}>
                      {course.place}
                    </p>

                    {"skills" in course && course.skills && (
                      <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", margin: "8px 0 0", lineHeight: 1.5 }}>
                        {course.skills}
                      </p>
                    )}

                    {"credentialId" in course && course.credentialId && (
                      <p style={{ color: "var(--light-gray-70)", fontSize: 11, fontFamily: "monospace", margin: "6px 0 0" }}>
                        ID: {course.credentialId}
                      </p>
                    )}
                  </div>

                  {hasVerify && (
                    <div style={{ marginTop: "auto", paddingTop: 8 }}>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw"
                        style={{
                          color: "var(--orange-yellow-crayola)",
                          fontSize: "var(--fs-8)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "monospace",
                        }}
                      >
                        Verify credential <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Supplementary Language Courses */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {courses.filter((c) => !c.isTechnical).map((course, idx) => (
            <Reveal key={course.title} delay={(idx + 3) * stagger.tight}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "18px 22px",
                  borderRadius: 12,
                  background: "hsla(0, 0%, 9%, 0.7)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                  {course.title}
                </h4>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", fontFamily: "monospace", margin: "4px 0 0" }}>
                  {course.place}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6 — LANGUAGES */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="04" title="Languages" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            alignItems: "stretch",
            gap: 16,
          }}
        >
          {spokenLanguages.map((lang, idx) => (
            <Reveal key={lang.language} delay={idx * 0.05}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "20px 22px",
                  borderRadius: 12,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Globe size={16} color="var(--orange-yellow-crayola)" />
                    <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>
                      {lang.language}
                    </h4>
                  </div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "var(--orange-yellow-crayola)",
                      background: "hsla(45, 100%, 72%, 0.12)",
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontWeight: 600,
                    }}
                  >
                    {lang.level}
                  </span>
                </div>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: "8px 0 0" }}>
                  {lang.proficiency}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7 — ENGINEERING DISCIPLINES & TECHNICAL STACK (Single consolidated section 05) */}
      <section style={{ marginTop: 64 }} aria-label="05 Engineering Disciplines & Technical Stack">
        <SectionHeading index="05" title="Engineering Disciplines &amp; Technical Stack" />
        <div style={{ marginTop: -14, marginBottom: 24 }}>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: 0 }}>
            Core engineering domains, tooling, and systems I work with.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {engineeringDisciplines.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "22px 24px",
                  borderRadius: 14,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>
                    {item.title}
                  </h4>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "var(--orange-yellow-crayola)",
                      background: "hsla(45, 100%, 72%, 0.12)",
                      border: "1px solid hsla(45, 100%, 72%, 0.25)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {item.skills.map((skill) => (
                    <span key={skill} className="chip" style={{ fontSize: "var(--fs-8)", padding: "3px 9px" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — GITHUB STATS / OPEN SOURCE */}
      <section style={{ marginTop: 64 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <SectionHeading index="06" title="GitHub Signal &amp; Contributions" style={{ marginBottom: 0 }} />
          <a
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw"
            style={{
              color: "var(--orange-yellow-crayola)",
              fontSize: "var(--fs-7)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "monospace",
            }}
          >
            github.com/{profile.github} <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Stats Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            className="gradient-border-hover"
            style={{
              padding: "18px 20px",
              borderRadius: 12,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              COMMUNITY SIGNAL
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 700, margin: "6px 0 0" }}>
              {profile.stats.githubFollowers}+ Followers
            </p>
          </div>

          <div
            className="gradient-border-hover"
            style={{
              padding: "18px 20px",
              borderRadius: 12,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              GITHUB CONTRIBUTIONS
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 700, margin: "6px 0 0" }}>
              {profile.stats.totalContributions} Contributions
            </p>
          </div>

          <div
            className="gradient-border-hover"
            style={{
              padding: "18px 20px",
              borderRadius: 12,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              PUBLIC REPOSITORIES
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 700, margin: "6px 0 0" }}>
              {profile.stats.publicRepos}+ Repositories
            </p>
          </div>

          <div
            className="gradient-border-hover"
            style={{
              padding: "18px 20px",
              borderRadius: 12,
              background: "hsla(0, 0%, 9%, 0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid hsla(0, 0%, 100%, 0.08)",
            }}
          >
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--orange-yellow-crayola)", textTransform: "uppercase" }}>
              STREAK MOMENTUM
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 700, margin: "6px 0 0" }}>
              {profile.stats.longestStreak} Peak
            </p>
            <span style={{ fontSize: 11, color: "var(--light-gray-70)", fontFamily: "monospace" }}>
              {profile.stats.currentStreak} Current
            </span>
          </div>
        </div>

        {/* Inverted Live Activity Graph */}
        <Reveal delay={0.05}>
          <div className="gradient-border-hover" style={{ padding: 20, marginBottom: 20, overflowX: "auto", borderRadius: 14 }}>
            <Image
              src={`https://ghchart.rshah.org/E8934A/${profile.github}`}
              alt={`${profile.github} GitHub contribution graph`}
              width={663}
              height={104}
              style={{ width: "100%", minWidth: 640, height: "auto", filter: "invert(0.05)" }}
            />
          </div>
        </Reveal>

        {/* Horizontal Achievements Ribbon */}
        <div
          className="achievements-ribbon"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 8,
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {githubAchievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.03}>
              <div
                className="gradient-border-hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontSize: "var(--fs-7)",
                  background: "hsla(0, 0%, 9%, 0.85)",
                }}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{a.emoji}</span>
                <span style={{ color: "var(--white-2)", fontWeight: 500 }}>{a.title}</span>
                {a.count && <span className="achievement-count-badge" style={{ marginLeft: 2 }}>×{a.count}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 14 — QUIET RAITASKEEN MARK */}
      <QuietMark />
    </div>
  );
}
