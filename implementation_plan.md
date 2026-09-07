# Implementation Plan: Visual & Product Refinement Phase

Transform the Taskeen Haider (`raitaskeen`) portfolio into a 2030-level, editorial, highly interactive, fast, and accessible digital workspace.

## Proposed Architecture & Component Refinements

### 1. Remove Footers & Standardize the Quiet Creator Mark
- **Remove `<Footer />` everywhere**:
  - Delete `components/Footer.tsx`.
  - Remove `<Footer />` from `app/layout.tsx`.
- **Quiet Creator Mark Component (`components/QuietMark.tsx`)**:
  - A subtle, typographic mark: `raitaskeen` in monospace/geometric typography with subtle opacity (e.g. `opacity: 0.4`, hover `0.85`), spaced elegantly at the bottom of pages (Home, About, Projects, Resources).
  - No metadata, no socials, no copyright, no extra links.
- **Contact Page**:
  - Retain only the large kinetic `ContactSignature` on `app/contact/page.tsx`.

### 2. Clean Glass Grid Background (`components/Background.tsx`)
- Replace the smoky/blurred background with an architectural drawing / drafting ink aesthetic:
  - Clearly visible layered CSS grid:
    - Micro grid: `16px x 16px` with subtle gold-tinted hairline lines (`hsla(45, 100%, 72%, 0.04)`).
    - Medium grid: `64px x 64px` (`hsla(45, 100%, 72%, 0.07)`).
    - Large structural grid: `256px x 256px` with architectural registration markers (`+`) at intersections.
  - Dark drafting paper color (`#0c0d0e` to `#101214`), zero blur, zero smoky fog, 100% sharp and visible.
  - Sections can use clear glass backdrops (`background: hsla(0, 0%, 10%, 0.65); backdrop-filter: blur(12px); border: 1px solid hsla(45, 100%, 72%, 0.12)`).

### 3. Black + Gold Contextual Custom Cursor (`components/motion/CustomCursor.tsx`)
- Redesign cursor completely:
  - Small black core with a crisp 1px gold contour (`border: 1px solid var(--orange-yellow-crayola); background: #0c0d0e`).
  - Outer trailing soft spring ring with dynamic modes:
    - `default`: 24px soft gold ring.
    - `interactive` (`a`, `button`): expands to 38px with subtle corner notches.
    - `inspect` (data graphs, diagrams, interactive systems): reticle / inspection crosshair mode with 4 tiny axis ticks.
    - `text`: collapses into a precision vertical beam.
  - Disabled on mobile / touch (`pointer: coarse`) and `reduced-motion`. Transform-only, zero RAF, zero latency.

### 4. Stats Presentation (`components/HeroStats.tsx` / `app/page.tsx`)
- Format numbers with the plus sign explicitly integrated into the large numerical typography:
  - `03+` | `YEARS BUILDING`
  - `70+` | `GITHUB FOLLOWERS`
  - `10+` | `REPOSITORIES & ARTIFACTS`
- Add subtle miniature SVG signal indicator / sparkline next to each metric (lightweight static SVG with micro pulse, no faked live numbers).

### 5. Hero Arrival Moment (`components/HeroArrivalNotice.tsx`)
- A refined, non-blocking conversational welcome that appears once per session (`sessionStorage.getItem("hasSeenArrivalNotice")`):
  - Appears after page settles (1.5s delay).
  - Floating subtly near the hero with companion branding:
    "Hey — I'm Taskeen's engineering companion. There's a lot happening underneath this interface — want me to show you around?"
  - Quick action tags: "Inspect systems" (scrolls to systems / about), "Browse builds", or dismiss "×".
  - Fades out cleanly, non-intrusive, responsive on mobile.

### 6. Computational Entity Companion (`components/motion/PortfolioBot.tsx`)
- Completely replace the robot/hexagonal avatar with a custom asymmetric computational entity:
  - Silhouette: Asymmetric faceted layered chassis with high-density tech drafting aesthetics (matte black chassis `#0f1012`, warm gold optical aperture `#FFCF59`).
  - Central intelligent optical core with reactive aperture:
    - `IDLE`: Calm breathing optical slit.
    - `CURIOUS`: Optical core expands with concentric targeting brackets.
    - `THINKING` / `COGITATING`: Orbital pulse and telemetry scan-line shimmer.
    - `FOCUSED`: Precision dual-pinpoint aperture.
    - `READY`: Steady golden lens illumination.
  - Multi-state human status vocabulary:
    `"Thinking..."`, `"Tracing..."`, `"Inspecting..."`, `"Connecting..."`, `"Assembling..."`, `"Mapping the idea..."`, `"Following the dependency..."`, `"Cogitating..."`, `"Sleuthing..."`
  - Grounded context and follow-up memory across conversation turns.

### 7. Interactive Systems Architecture & Compiler Flow (`components/SystemsMap.tsx`)
- Elevate into a living compiler architecture graph:
  - Sequence: `SOURCE → REPRESENTATION → ANALYSIS → TRANSFORMATION → TARGET`.
  - Mode toggle: `BEGINNER` ("Code enters → becomes a structured model → dependencies are mapped → transformed") vs `ADVANCED` (`Source → AST → Symbol Graph → CFG → DFG → IR → Rewrite → Rust / Axum / SQLx`).
  - Interactive directional pulse paths and node inspection card with input/output/purpose.

### 8. Interactive Graph Engineering & Dependency Section (`components/GraphEngineeringSection.tsx`)
- Teach graph engineering visually:
  - Dependency graph: `auth.ts → user.ts → database.ts → postgres.ts`.
  - Visual distinction between Nodes (`File`, `Service`, `Database`) and Edges (`imports`, `calls`, `depends-on`).
  - Interactive neighborhood hover: hovering highlights inbound/outbound dependencies and opens a micro-inspector.
- Visual AI Orchestration:
  - `BIG TASK → RESEARCH → ANALYSIS → IMPLEMENTATION → VALIDATION → OUTPUT` with interactive input → action → output steps.
  - Multi-tool synergy visual: `Codex` (implementation), `Claude` (architecture), `Cursor` (local editing), `Grok` (research), `Antigravity` (workflow) $\to$ Human review $\to$ Validated code.
  - Token discipline visual: BAD (whole repo dump $\to$ conflicts) vs GOOD (index $\to$ summarize $\to$ target $\to$ validate).
  - Synthesis narrative: `SYSTEM UNDERSTANDING (Graph) + TASK DECOMPOSITION (AI) = BETTER ENGINEERING`.

### 9. Journey & Experience Creative Rebuild (`components/JourneyNarrative.tsx`)
- Completely rebuild Journey from generic cards into an editorial visual storyline:
  - Chronological continuous narrative path with thin golden drafting line:
    1. `BUILDING FOR THE WEB` (Iridium Soft apprentice · UI components & reactivity)
    2. `BACKEND & SCALE` (Tech Vertex full-stack · Node.js, Express, MongoDB, JWT)
    3. `PERFORMANCE & SYSTEMS` (Ibex Global L3 escalation · IoT, critical systems)
    4. `STATIC ANALYSIS` (AST, CFG, DFG, Tree-sitter parsers)
    5. `LEGACYEXODUS` (Compiler modernization engine · Refactoring to Rust)
    6. `AI ENGINEERING & ORCHESTRATION` (Agentic coordination, deterministic tools)
  - Seamlessly integrates the 4 Focus Areas as disciplines (`BUILD → UNDERSTAND → OPTIMIZE → MODEL → ORCHESTRATE`) using `icon-dev.svg`, `icon-app.svg`, `icon-design.svg`, `icon-photo.svg` as visual milestone anchors.

### 10. Varied Engineering Resources (`components/ResourcesHub.tsx`)
- Introduce controlled visual variation across 5 archetype cards:
  - Type A: Large editorial resource (e.g. *Designing Data-Intensive Applications*)
  - Type B: Compact technical reference (e.g. *Rust Systems Roadmap*)
  - Type C: Diagram-style resource (e.g. *Tree-sitter Architecture*)
  - Type D: Foundational paper artifact (e.g. *Attention Is All You Need*, *ReAct*)
  - Type E: Systems handbook (e.g. *Crafting Interpreters*)
- Instant local tab filtering with zero network lag.

### 11. Homepage Flow & Editorial Transitions
- Homepage composition:
  `Hero (with subtle arrival notice) → Stats (03+, 70+, 10+) → Selected Work → Systems & Graph Story → Journey Narrative → Curated Resources → Quiet raitaskeen Mark`.

## Verification Plan
1. `bun x tsc --noEmit` (0 errors)
2. `bun run build` (Exit code 0, 10/10 static pages)
3. Full verification of responsive layout, custom cursor desktop/mobile check, companion avatar expressions, arrival banner once-per-session behavior, and zero RAF loops.
