import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import ResourcesHub from "@/components/ResourcesHub";
import SectionHeading from "@/components/motion/SectionHeading";
import LiveSignals, { LiveSignalsSkeleton } from "@/components/LiveSignals";
import QuietMark from "@/components/QuietMark";

export const revalidate = 300; // 5-minute page revalidation

export default function ResourcesPage() {
  return (
    <div className="page-shell">
      <Reveal>
        <h1 style={{ color: "var(--white-2)", fontSize: "var(--fs-1)" }}>Engineering Resources</h1>
        <p style={{ color: "var(--light-gray-70)", marginTop: 8, maxWidth: "65ch" }}>
          Curated systems roadmaps, foundational compiler &amp; AI papers, and real-time engineering intelligence.
        </p>
      </Reveal>

      {/* 01 — ENGINEERING LIBRARY */}
      <section style={{ marginTop: 40 }} aria-label="01 Engineering Library">
        <SectionHeading index="01" title="Engineering Library" />
        <p
          style={{
            color: "var(--light-gray-70)",
            fontSize: "var(--fs-7)",
            marginTop: -14,
            marginBottom: 20,
            maxWidth: "65ch",
          }}
        >
          Curated archive of foundational compiler &amp; AI papers, systems roadmaps, and developer tooling.
        </p>
        <ResourcesHub />
      </section>

      {/* 02 — LIVE ENGINEERING & AI SIGNALS + 03 — MARKET SIGNAL */}
      <Suspense fallback={<LiveSignalsSkeleton />}>
        <LiveSignals />
      </Suspense>

      <QuietMark />
    </div>
  );
}
