// Single source of truth for the site. Keep in step with the résumé and LinkedIn.
// Facts come from handoff/HANDOFF.md. Do not change, reorder or stretch dates.

export type Link = { label: string; href: string };

export const person = {
  name: "Taskeen Haider",
  role: "Founder and lead architect of LegacyExodus",
  location: "Lahore, Pakistan",
  timeZone: "Asia/Karachi",
  email: "raitaskeen.dev@gmail.com",
  call: "https://cal.com/raitaskeen",
  resume: "/assets/Taskeen_Haider_Resume.pdf",
  headline: "I build software that reads legacy code, and ship the web products around it",
  links: [
    { label: "GitHub", href: "https://github.com/raitaskeen" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/raitaskeen" },
    { label: "X", href: "https://x.com/raitaskeen786" },
    { label: "Hugging Face", href: "https://huggingface.co/raitaskeen" },
  ] satisfies Link[],
};

export const intro =
  "Founder of LegacyExodus, an engine that maps legacy JavaScript and TypeScript with evidence. 3+ years of professional experience building full-stack products with Next.js, React, Node.js and PostgreSQL.";

export const introLong = [
  "I'm the founder and lead architect of LegacyExodus, a modernization engine that maps legacy JavaScript and TypeScript codebases with evidence instead of guesses. It runs on the customer's machine, with no AI and no code upload.",
  "I have 3+ years of professional experience: full-stack products with Next.js, React, Node.js and PostgreSQL on Cloudflare, and systems work in Rust and TypeScript, including static analysis. I take on websites, web apps and JS/TS codebase audits for teams anywhere.",
];

/** A hard claim with a quiet link to where it can be checked. */
export type Proof = { text: string; source: Link };

export type Media =
  | { kind: "video"; src: string; poster: string; width: number; height: number }
  | { kind: "graph" }
  | { kind: "showcase" };

export type Work = {
  slug: string;
  name: string;
  when: string;
  domain: string;
  what: string;
  body: string;
  role: string;
  proofs: Proof[];
  stack: string[];
  links: Link[];
  media: Media;
  /** The one figure that matters on the tile. */
  figure?: { value: string; label: string };
};

const legacySite: Link = { label: "legacyexodus.tech", href: "https://legacyexodus.tech" };
const sampleRepo: Link = {
  label: "GitHub",
  href: "https://github.com/LegacyExodus/legacyexodus-analysis-sample",
};

export const work: Work[] = [
  {
    slug: "legacyexodus",
    name: "LegacyExodus",
    when: "2026 to now",
    domain: "legacyexodus.tech",
    what: "A modernization engine for legacy JavaScript and TypeScript",
    body:
      "Teams inheriting an old Node codebase can't see what calls what, so every change is a guess. LegacyExodus reads the code into syntax trees, control-flow and data-flow graphs, records the evidence for every link, and says plainly which calls it cannot prove. It runs on the customer's machine, with no AI and no code upload.",
    role: "Founder and lead architect. I designed the pipeline and lead its architecture.",
    proofs: [
      {
        text: "On Ghost 6.73 it mapped 7,172 files and 415,492 calls in one 183-second run",
        source: legacySite,
      },
      { text: "A rerun reproduced all 13 artifacts byte for byte", source: legacySite },
      { text: "2,355 tests passing, 0 failing", source: legacySite },
    ],
    stack: ["TypeScript", "Tree-sitter", "SQLite", "Rust"],
    links: [{ label: "Visit legacyexodus.tech", href: "https://legacyexodus.tech" }],
    media: { kind: "showcase" },
    figure: { value: "415,492", label: "calls mapped in 183 s" },
  },
  {
    slug: "raavi-volt",
    name: "Raavi Volt",
    when: "2026",
    domain: "amirstore.tech",
    what: "Online store for an electric shop in Lahore",
    body:
      "A full store with catalogue, cart and an admin panel, taking payment by bank transfer and Raast QR, the way customers in Pakistan actually pay. It runs entirely on Cloudflare's edge, so there's no server to look after.",
    role: "Designed and built end to end.",
    proofs: [],
    stack: ["Next.js 16", "Bun", "Cloudflare Workers", "D1", "R2"],
    links: [
      { label: "Visit the store", href: "https://amirstore.tech" },
      { label: "Source", href: "https://github.com/raitaskeen/raavi-volt" },
    ],
    media: {
      kind: "video",
      src: "/media/raavi-volt",
      poster: "/media/raavi-volt.jpg",
      width: 960,
      height: 600,
    },
  },
  {
    slug: "annemarie-schimmel-haus",
    name: "Annemarie-Schimmel-Haus",
    when: "2026",
    domain: "annemarie-schimmel.raitaskeen.workers.dev",
    what: "Bilingual website and staff admin for Lahore's German cultural centre",
    body:
      "Public pages in English and German, event registration where people can bring named guests, a chat guide for visitors, and an admin that staff use to run courses and events.",
    role: "Designed and built end to end.",
    proofs: [],
    stack: ["Next.js 16", "PostgreSQL 17", "Cloudflare Workers"],
    links: [
      { label: "Visit the site", href: "https://annemarie-schimmel.raitaskeen.workers.dev/en" },
      { label: "Source", href: "https://github.com/raitaskeen/annemarie-schimmel-haus" },
    ],
    media: {
      kind: "video",
      src: "/media/annemarie-schimmel-haus",
      poster: "/media/annemarie-schimmel-haus.jpg",
      width: 960,
      height: 600,
    },
  },
  {
    slug: "analysis-sample",
    name: "LegacyExodus analysis sample",
    when: "2026",
    domain: "github.com/LegacyExodus",
    what: "An open, auditable slice of the engine",
    body:
      "Control-flow construction, reachability and invariant checks for JavaScript and TypeScript, published so anyone can read how the analysis works and where it stops.",
    role: "Author.",
    proofs: [{ text: "86 tests, all passing", source: sampleRepo }],
    stack: ["TypeScript", "Bun"],
    links: [{ label: "Source", href: sampleRepo.href }],
    media: { kind: "graph" },
    figure: { value: "86", label: "tests passing" },
  },
];

export const experience = [
  {
    role: "Founder and lead architect",
    org: "LegacyExodus",
    when: "Aug 2026 to now",
    note: "Designing the analysis pipeline and the first product, a Migration Readiness Assessment.",
  },
  {
    role: "Independent software engineer",
    org: "Freelance and self-directed",
    when: "Feb 2024 to Jul 2026",
    note: "Freelance web projects for clients, Rust and systems engineering projects, hackathons.",
  },
  {
    role: "Full-stack web developer",
    org: "Tech Vertex, remote",
    when: "Feb 2023 to Jan 2024",
    note: "Cut latency by up to 50% on React and Node services at 99.9% uptime; built JWT-secured APIs with Stripe and Appwrite.",
  },
  {
    role: "Frontend engineer, apprenticeship",
    org: "Iridium Soft, Lahore",
    when: "Jun 2021 to Jan 2023",
    note: "Reusable React components, code review and Agile delivery.",
  },
];

export const research = [
  "Generating characterization tests for legacy code, so a migration can prove it changed nothing it shouldn't.",
  "Quantum-safe encryption, and how a codebase can find where it still relies on algorithms that won't survive it.",
];

export const next = {
  name: "AxiomExodus",
  what: "Data verification in Rust. Next on the bench.",
};

export const openSource = [
  { name: "freeCodeCamp", detail: "Merged pull request #69385", href: "https://github.com/freeCodeCamp/freeCodeCamp/pull/69385" },
  { name: "MDN Web Docs", detail: "German translation, pull request #281", href: "https://github.com/mdn/translated-content-de/pull/281" },
  { name: "Kana Dojo", detail: "Pull request #27003", href: "https://github.com/lingdojo/kana-dojo/pull/27003" },
];

export const education = {
  degree: "BS Software Engineering",
  school: "University of Management and Technology, Lahore",
  when: "2022 to 2026, expected Nov 2026",
  languages: "English, Urdu, and German at A1, studying for A2",
};
