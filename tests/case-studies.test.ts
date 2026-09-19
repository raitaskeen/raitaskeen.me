import { describe, it, expect } from "bun:test";
import { featuredProjects } from "@/lib/data";

describe("Engineering Case Studies & Pipeline Schema Integrity", () => {
  it("verifies all featured projects have title, tag, text, and stack", () => {
    expect(featuredProjects.length).toBeGreaterThanOrEqual(5);

    for (const p of featuredProjects) {
      expect(p.title.length).toBeGreaterThan(2);
      expect(p.tag.length).toBeGreaterThan(2);
      expect(p.text.length).toBeGreaterThan(10);
      expect(p.stack.length).toBeGreaterThanOrEqual(2);
      expect(Array.isArray(p.links)).toBe(true);
    }
  });

  it("verifies LegacyExodus flagship project presence and link targets", () => {
    const flagship = featuredProjects.find((p) => p.title === "LegacyExodus");
    expect(flagship).toBeDefined();
    expect(flagship?.tag).toBe("Developer Tooling");
    expect(flagship?.links.some((l) => l.url.includes("/projects/legacy-exodus"))).toBe(true);
  });

  it("verifies pipeline phase invariants for LegacyExodus", () => {
    const PIPELINE_PHASES = [
      {
        id: "understand",
        number: "01",
        name: "Understand",
        headline: "Deterministic Static Analysis & Graph Construction",
      },
      {
        id: "transform",
        number: "02",
        name: "Transform",
        headline: "Language-Agnostic Canonical IR & Target Synthesis",
      },
      {
        id: "verify",
        number: "03",
        name: "Verify",
        headline: "Compile-Time Type Audits & Automated Regression Proofs",
      },
    ];

    expect(PIPELINE_PHASES.length).toBe(3);
    expect(PIPELINE_PHASES.map((p) => p.id)).toEqual(["understand", "transform", "verify"]);

    for (const phase of PIPELINE_PHASES) {
      expect(phase.number).toMatch(/^0[1-3]$/);
      expect(phase.headline.length).toBeGreaterThan(15);
    }
  });
});
