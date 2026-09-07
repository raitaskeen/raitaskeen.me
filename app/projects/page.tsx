import Link from "next/link";
import { featuredProjects, openSource, upcomingProjects, profile } from "@/lib/data";
import { getGithubStats } from "@/lib/github";
import Reveal from "@/components/Reveal";
import ProjectShowcase from "@/components/ProjectShowcase";
import LabIncubator from "@/components/LabIncubator";
import QuietMark from "@/components/QuietMark";
import { ArrowUpRight } from "lucide-react";

export default async function ProjectsPage() {
  const gh = await getGithubStats(profile.github);

  const showcaseProjects = featuredProjects.map((p) => {
    const repoSlug = p.links.find((l) => l.url.includes("github.com"))?.url.split("/").slice(-1)[0];
    const stars = repoSlug ? gh?.starsByRepo[repoSlug] : undefined;
    return { ...p, stars };
  });

  return (
    <div className="page-shell">
      <Reveal>
        <h1 style={{ color: "var(--white-2)", fontSize: "var(--fs-1)" }}>Projects</h1>
        <p style={{ color: "var(--light-gray-70)", marginTop: 8, maxWidth: "60ch" }}>
          The five I&apos;d actually walk you through in an interview — what problem each one solves,
          and what I&apos;d change if I rebuilt it today.
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
              Automated legacy codebase modernization engine using AST parsing, control flow DAGs, and unified Intermediate Representation.
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

      <ProjectShowcase projects={showcaseProjects} />

      <section style={{ marginTop: 56 }}>
        <Reveal>
          <h2 style={{ color: "var(--white-2)", fontSize: "var(--fs-2)", marginBottom: 20 }}>
            Open source contributions
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {openSource.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <a
                href={o.url}
                target="_blank"
                rel="noreferrer"
                className="gradient-border-hover"
                style={{ display: "block", padding: 20 }}
              >
                <h3 style={{ color: "var(--white-2)", fontSize: "var(--fs-4)" }}>{o.title}</h3>
                <p style={{ color: "var(--light-gray-70)", fontSize: "var(--fs-7)", marginTop: 6, lineHeight: 1.6 }}>
                  {o.text}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* In The Lab (Building Toward) */}
      <LabIncubator projects={upcomingProjects} />

      <QuietMark />
    </div>
  );
}
