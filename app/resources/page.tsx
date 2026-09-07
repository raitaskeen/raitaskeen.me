import Reveal from "@/components/Reveal";
import ResourcesHub from "@/components/ResourcesHub";
import LiveSignals from "@/components/LiveSignals";
import QuietMark from "@/components/QuietMark";

export default function ResourcesPage() {
  return (
    <div className="page-shell">
      <Reveal>
        <h1 style={{ color: "var(--white-2)", fontSize: "var(--fs-1)" }}>Engineering Resources</h1>
        <p style={{ color: "var(--light-gray-70)", marginTop: 8, maxWidth: "62ch" }}>
          Curated systems roadmaps, foundational compiler &amp; AI papers, and real-time engineering intelligence.
        </p>
      </Reveal>

      {/* 1 — ENGINEERING REFERENCES (Curated Knowledge Shelf with Instant Synchronous Filtering) */}
      <Reveal delay={0.05}>
        <ResourcesHub />
      </Reveal>

      {/* 2 to 5 — WHAT'S HAPPENING NOW · HACKER NEWS · TECH COMPANY SIGNALS · CRYPTO / MARKET SIGNAL */}
      <Reveal delay={0.1}>
        <LiveSignals />
      </Reveal>

      <QuietMark />
    </div>
  );
}
