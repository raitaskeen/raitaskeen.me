import { describe, expect, it } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { education, experience, openSource, person, work } from "@/lib/content";

// Guards the facts in handoff/HANDOFF.md. Dates must never change, reorder or stretch.
describe("verified content", () => {
  it("keeps the job history exactly as recorded, newest first", () => {
    expect(experience.map((e) => [e.org, e.when])).toEqual([
      ["LegacyExodus", "Aug 2026 to now"],
      ["Freelance and self-directed", "Feb 2024 to Jul 2026"],
      ["Tech Vertex, remote", "Feb 2023 to Jan 2024"],
      ["Iridium Soft, Lahore", "Jun 2021 to Jan 2023"],
    ]);
  });

  it("states the LegacyExodus figures as measured, each with a source", () => {
    const le = work.find((w) => w.slug === "legacyexodus")!;
    const text = le.proofs.map((p) => p.text).join(" ");
    for (const n of ["7,172 files", "415,492 calls", "183-second", "13 artifacts", "2,355 tests"]) {
      expect(text).toContain(n);
    }
    for (const p of le.proofs) expect(p.source.href).toStartWith("https://");
  });

  it("states the analysis sample's 86 passing tests", () => {
    const s = work.find((w) => w.slug === "analysis-sample")!;
    expect(s.proofs[0].text).toContain("86 tests");
    expect(s.proofs[0].source.href).toBe("https://github.com/LegacyExodus/legacyexodus-analysis-sample");
  });

  it("links the right X account and the PR numbers", () => {
    expect(person.links.find((l) => l.label === "X")!.href).toBe("https://x.com/raitaskeen786");
    expect(openSource.map((o) => o.href.split("/").pop())).toEqual(["69385", "281", "27003"]);
  });

  it("keeps education dates", () => {
    expect(education.when).toStartWith("2022 to 2026");
  });

  it("ships every file the page links to", () => {
    const pub = join(import.meta.dir, "..", "public");
    expect(existsSync(join(pub, person.resume))).toBe(true);
    for (const w of work) {
      if (w.media.kind !== "video") continue;
      for (const ext of [".mp4", ".webm", "-sm.mp4", "-sm.webm"]) expect(existsSync(join(pub, w.media.src + ext))).toBe(true);
      expect(existsSync(join(pub, w.media.poster))).toBe(true);
    }
  });
});
