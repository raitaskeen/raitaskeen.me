import Link from "next/link";
import { profile, experience } from "@/lib/data";
import { getGithubStats } from "@/lib/github";
import Reveal, { Stagger } from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import EngineeringStats from "@/components/EngineeringStats";
import QuietMark from "@/components/QuietMark";
import AmbientFloat from "@/components/AmbientFloat";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import PointerLight from "@/components/motion/PointerLight";
import { Download, ArrowUpRight, ArrowRight } from "lucide-react";

export default async function Home() {
  const gh = await getGithubStats(profile.github);
  const latest = experience[0];

  return (
    <div className="page-shell">
      {/* 1 — HERO SECTION */}
      <section style={{ position: "relative", paddingTop: 48, paddingBottom: 24, isolation: "isolate" }}>
        <AmbientFloat size={240} top={-20} right={-40} color="hsla(45,100%,72%,0.08)" duration={18} travel={24} />
        <PointerLight size={420} color="hsla(45,100%,72%,0.07)" />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Name */}
          <SplitText
            text={profile.name}
            as="h1"
            delay={0.1}
            style={{ fontSize: "clamp(34px, 6.5vw, 60px)", fontWeight: 600, color: "var(--white-2)", lineHeight: 1.1 }}
          />

          {/* Role / Typewriter */}
          <Reveal variant="fade-blur" delay={0.25} immediate>
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
                "Full-Stack Engineer",
                "Systems Architecture Builder",
                "Building LegacyExodus",
                "Agentic AI Orchestrator",
              ]} />
            </div>
          </Reveal>

          {/* Short Introduction */}
          <div style={{ maxWidth: "62ch", marginTop: 18 }}>
            <Stagger gap={0.08} variant="fade-up" className="stagger-col">
              {profile.bio.map((p, i) => (
                <p key={i} style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-5)", lineHeight: 1.7, marginBottom: 12 }}>{p}</p>
              ))}
            </Stagger>
          </div>

          {/* Primary CTAs */}
          <Reveal variant="fade-up" delay={0.15} immediate>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
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
                  rel="noreferrer"
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

      {/* 2 — ENGINEERING STATS */}
      <Reveal variant="fade-up" delay={0.1}>
        <EngineeringStats gh={gh} />
      </Reveal>

      {/* 3 — SELECTED WORK */}
      <Reveal variant="fade-up" delay={0.15}>
        <section className="gradient-border-hover" style={{ padding: 26, marginTop: 40, borderRadius: 14, background: "hsla(0, 0%, 9%, 0.75)", backdropFilter: "blur(12px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              SELECTED WORK // ACTIVE
            </span>
            <span style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-8)", fontFamily: "monospace" }}>
              {latest.period}
            </span>
          </div>

          <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", fontWeight: 600, marginTop: 10 }}>
            {latest.title} · {latest.org}
          </h3>

          <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", marginTop: 10, lineHeight: 1.7, maxWidth: "68ch" }}>
            {latest.bullets[0]}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
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
              Explore LegacyExodus project <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/projects"
              style={{
                color: "var(--light-gray-70)",
                fontSize: "var(--fs-7)",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                transition: "color 0.2s ease",
              }}
            >
              Browse all projects
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 4 — SHORT PERSONAL / ENGINEERING CLOSING */}
      <Reveal variant="fade-up" delay={0.18}>
        <section
          style={{
            marginTop: 48,
            padding: "24px 28px",
            borderRadius: 14,
            background: "hsla(0, 0%, 9%, 0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid hsla(0, 0%, 100%, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ maxWidth: "64ch" }}>
            <p style={{ color: "var(--orange-yellow-crayola)", fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              ENGINEERING THESIS
            </p>
            <p style={{ color: "var(--light-gray)", fontSize: "var(--fs-6)", lineHeight: 1.7, margin: 0 }}>
              Building modern software requires bridging user experience with deep systems predictability. From reactive frontends and hardened backend APIs to static AST analysis and agentic orchestration, every system is designed to stay deterministic under load.
            </p>
          </div>

          <Link
            href="/about"
            className="link-draw"
            style={{
              color: "var(--white-2)",
              fontSize: "var(--fs-7)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Read background & journey <ArrowRight size={15} />
          </Link>
        </section>
      </Reveal>

      {/* 5 — QUIET RAITASKEEN MARK */}
      <QuietMark />
    </div>
  );
}
