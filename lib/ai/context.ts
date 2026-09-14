import {
  profile,
  experience,
  featuredProjects,
  openSource,
  technicalSkills,
  courses,
  education,
  educationNote,
  spokenLanguages,
} from "@/lib/data";

/**
 * Single source of truth context derived directly from canonical portfolio data.
 * Used for grounding AI chatbot responses and recruiter QA.
 */
export const CANONICAL_CONTEXT = {
  identity: {
    name: profile.name,
    handle: profile.github,
    title: profile.title,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    domain: profile.domain,
    scheduleUrl: profile.scheduleUrl,
    resumeUrl: profile.resumeUrl,
    githubUrl: `https://github.com/${profile.github}`,
    linkedinUrl: profile.socials.linkedin,
    stats: profile.stats,
  },
  flagship: {
    name: "LegacyExodus",
    tagline: "Software-modernization & deterministic code-intelligence platform",
    status: "Active Development (Aug 2026 — Present)",
    pillars: [
      "AST generation with Tree-sitter parsers",
      "Control Flow Graph (CFG) construction",
      "Data Flow Graph (DFG) tracking variable lifetimes and state mutations",
      "Language-neutral Intermediate Representation (IR)",
      "Verifiable deterministic synthesis into TypeScript or Rust",
      "Bounded LLM reasoning for non-deterministic semantic understanding",
    ],
  },
  roles: experience.map((e) => ({
    title: e.title,
    company: e.org,
    period: e.period,
    location: e.location,
    badge: "badge" in e ? (e as { badge?: string }).badge : undefined,
    bullets: e.bullets,
    tech: e.tech,
  })),
  certifications: courses
    .filter((c) => c.isTechnical)
    .map((c) => ({
      title: c.title,
      issuer: c.issuer ?? c.place,
      period: c.period,
      credentialId: "credentialId" in c ? (c as { credentialId?: string }).credentialId : undefined,
      url: "url" in c ? (c as { url?: string }).url : undefined,
      skills: "skills" in c ? (c as { skills?: string }).skills : undefined,
    })),
  openSource: openSource.map((os) => ({
    title: os.title,
    text: os.text,
    url: os.url,
  })),
  education: {
    degree: education[0]?.title ?? "Bachelor of Science in Software Engineering",
    institution: education[0]?.place ?? "University of Management and Technology (UMT), Lahore",
    period: education[0]?.period ?? "Sep 2022 — Nov 2026",
    expected: education[0]?.expected ?? "Expected Nov 2026",
    grade: education[0]?.grade ?? "A",
    coursework: education[0]?.coursework ?? [],
    note: educationNote,
  },
  skills: technicalSkills,
  languages: spokenLanguages,
};

/**
 * Strict grounding policy guidelines for recruiter and visitor inquiries.
 */
export const GROUNDING_POLICY = `
STRICT GROUNDING & RECRUITER POLICY:
1. Canonical Data Only: Never fabricate degrees, employers, credentials, or technologies not listed in Taskeen's canonical portfolio.
2. Unlisted Technologies: If asked whether Taskeen has professional experience with a technology NOT in his stack (e.g. FastAPI, Django, Ruby on Rails, Kubernetes):
   - State clearly and honestly: "Taskeen's portfolio does not list [Tech] as core professional experience."
   - Immediately pivot to his verified backend strengths: TypeScript, Node.js, Express.js, Bun, PostgreSQL, MongoDB, MySQL, and systems exploration in Rust.
3. Concise Recruiter Answers: Keep answers to direct recruiter questions between 2 and 5 sentences. High signal-to-noise ratio.
4. Five Canonical Roles:
   - Founder & Lead Developer at LegacyExodus (Aug 2026 — Present)
   - Full-Stack & AI Automation Engineer at ibex (Nov 2024 — Jul 2026) [Internal Promotion]
   - Technical Support Specialist - Advanced Escalations at ibex (Mar 2024 — Oct 2024)
   - Full-Stack Web Developer at Tech Vertex (Feb 2023 — Jan 2024)
   - Frontend Engineer - Apprentice at Iridium Soft (Jun 2021 — Jan 2023)
5. Certifications:
   - HackerRank Software Engineer (Credential bc1ec407b4fa)
   - Claude Academy: Claude Code in Action by Anthropic (Credential dc3c77e83392422d07013798a6602884)
   - Introduction to IoT by Cisco
6. Open Source Highlights:
   - freeCodeCamp (PR #69385)
   - MDN Web Docs (PR #281)
   - Kana Dojo (PR #27003)
`;
