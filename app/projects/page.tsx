import Link from "next/link";
import { featuredProjects, openSource } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ProjectShowcase from "@/components/ProjectShowcase";
import DeveloperQuotes from "@/components/DeveloperQuotes";
import QuietMark from "@/components/QuietMark";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <Reveal>
        <h1 style={{ color: "var(--white-2)", fontSize: "var(--fs-1)" }}>Projects</h1>
        <p style={{ color: "var(--light-gray-70)", marginTop: 8, maxWidth: "60ch" }}>
          Selected systems and applications I&apos;d walk you through in an interview — what each solves,
          how it works, and what I&apos;d improve next.
        </p>
      </Reveal>

      {/* Flagship Spotlight Link to LegacyExodus */}
      <Reveal>
        <div
          className="gradient-border-hover"
          style={{
            padding: "20px 24px",
            marginTop: 28,
            marginBottom: 36,
            borderRadius: 14,
            background: "hsla(0, 0%, 9%, 0.88)",
            border: "1px solid hsla(45, 100%, 72%, 0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "var(--orange-yellow-crayola)",
                  background: "hsla(45, 100%, 72%, 0.12)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                FLAGSHIP PROJECT
              </span>
              <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600, margin: 0 }}>
                LegacyExodus
              </h3>
            </div>
            <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", margin: 0, maxWidth: "60ch" }}>
              Deterministic static analysis and software modernization using AST, CFG, DFG, and IR-based code intelligence.
            </p>
          </div>
          <Link
            href="/projects/legacy-exodus"
            className="shimmer-btn"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: "var(--orange-yellow-crayola)",
              color: "var(--smoky-black)",
              fontSize: "var(--fs-7)",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Explore architecture &amp; pipeline <ArrowUpRight size={14} />
          </Link>
        </div>
      </Reveal>

      {/* Immediate Project Catalog Rendering */}
      <ProjectShowcase projects={featuredProjects} />

      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", marginBottom: 20 }}>
            Open source contributions
          </h2>
        </Reveal>
        <div className="opensource-grid">
          {openSource.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05} style={{ height: "100%" }}>
              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border-hover opensource-card"
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)", fontWeight: 600 }}>{o.title}</h3>
                  <ArrowUpRight size={14} color="var(--orange-yellow-crayola)" />
                </div>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
                  {o.text}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Developer Wisdom // Runtime Humor */}
      <DeveloperQuotes />

      <QuietMark />
    </div>
  );
}
