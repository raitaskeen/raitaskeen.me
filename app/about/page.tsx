import {
  experience,
  education,
  educationNote,
  courses,
  spokenLanguages,
  focusAreas,
  skills,
  technicalSkills,
  githubAchievements,
  profile,
} from "@/lib/data";
import Reveal from "@/components/Reveal";
import SkillBar from "@/components/SkillBar";
import SectionHeading from "@/components/motion/SectionHeading";
import JourneyNarrative from "@/components/JourneyNarrative";
import QuietMark from "@/components/QuietMark";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page-shell">
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
            Systems, Compilers, &amp; Deterministic Architectures
          </h1>
          <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-5)", marginTop: 14, lineHeight: 1.7 }}>
            I am a full-stack and systems-oriented engineer based in Lahore, Pakistan. Over the past three years, my work has grown from building responsive frontend interfaces to engineering resilient backend systems, static code analysis engines (AST, CFG, DFG, IR), and agentic workflows.
          </p>
          <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-6)", marginTop: 10, lineHeight: 1.7 }}>
            My focus is engineering software that stays predictable under pressure. Rather than treating code as plain text or relying on stochastic AI outputs, I model codebases as deterministic mathematical graphs — enabling automated refactoring, verifiable AST transformations, and reproducible distributed backends.
          </p>
        </div>
      </Reveal>

      {/* 2 — JOURNEY (Chronological narrative spine 2022 -> 2026) */}
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
                    </div>
                    <p style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-6)", marginTop: 4, fontFamily: "monospace" }}>
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

                {educationNote && (
                  <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.6, marginTop: 12 }}>
                    {educationNote}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 — COURSES */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="03" title="Certifications &amp; Courses" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {courses.map((course, idx) => (
            <Reveal key={course.title} delay={idx * 0.04}>
              <div
                className="gradient-border-hover"
                style={{
                  padding: "18px 20px",
                  borderRadius: 12,
                  background: "hsla(0, 0%, 9%, 0.88)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid hsla(0, 0%, 100%, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <BookOpen size={16} color="var(--orange-yellow-crayola)" />
                  <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, margin: 0 }}>
                    {course.title}
                  </h4>
                </div>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", fontFamily: "monospace", margin: 0 }}>
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
            gap: 16,
          }}
        >
          {spokenLanguages.map((lang, idx) => (
            <Reveal key={lang.language} delay={idx * 0.05}>
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
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6, marginBottom: 10 }}>
                  {lang.proficiency}
                </p>
                {/* Visual scale */}
                <div style={{ width: "100%", height: 4, background: "hsla(0, 0%, 100%, 0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${lang.percentage}%`,
                      height: "100%",
                      background: "var(--orange-yellow-crayola)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7 — TECHNICAL FOCUS AREAS & SKILLS */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="05" title="Technical Focus Areas &amp; Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
          {focusAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.05}>
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
                  gap: 8,
                }}
              >
                <h4 style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-6)", fontWeight: 600, fontFamily: "monospace", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                  {area.title}
                </h4>
                <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-7)", lineHeight: 1.6, margin: 0 }}>
                  {area.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 8 & 9 — SKILL PROGRESSION & TECHNICAL TOOLING */}
        <div className="about-skills-grid" style={{ marginTop: 24 }}>
          {/* Skill Progression */}
          <div>
            <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, marginBottom: 14 }}>
              Skill Progression
            </h4>
            {skills.map((s) => (
              <SkillBar key={s.name} name={s.name} value={s.value} />
            ))}
          </div>

          {/* Technical Tooling */}
          <div>
            <h4 style={{ color: "var(--white-2)", fontSize: "var(--fs-5)", fontWeight: 600, marginBottom: 14 }}>
              Technical Tooling
            </h4>
            {Object.entries(technicalSkills).map(([category, items]) => (
              <div key={category} style={{ marginBottom: 18 }}>
                <p style={{ color: "var(--orange-yellow-crayola)", fontSize: "var(--fs-7)", fontFamily: "monospace", marginBottom: 6, fontWeight: 600 }}>
                  {category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((it) => (
                    <span className="chip" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — GITHUB STATS / OPEN SOURCE */}
      <section style={{ marginTop: 64 }}>
        <SectionHeading index="06" title="GitHub Signal &amp; Contributions" />

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
              OPEN SOURCE ARTIFACTS
            </span>
            <p style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 700, margin: "6px 0 0" }}>
              {profile.stats.publicRepos}+ Repositories
            </p>
          </div>
        </div>

        {/* Inverted Live Activity Graph */}
        <Reveal delay={0.05}>
          <div className="gradient-border-hover" style={{ padding: 20, marginBottom: 16, overflowX: "auto", borderRadius: 14 }}>
            <img
              src={`https://ghchart.rshah.org/E8934A/${profile.github}`}
              alt={`${profile.github} GitHub contribution graph`}
              style={{ width: "100%", minWidth: 640, filter: "invert(0.05)" }}
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
