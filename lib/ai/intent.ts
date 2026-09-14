import { taskeenKnowledge } from "./knowledge";

export type CompanionIntent =
  | "greeting"
  | "legacyexodus"
  | "projects"
  | "skills"
  | "unlisted_tech"
  | "certifications"
  | "opensource"
  | "experience"
  | "education"
  | "contact"
  | "resume"
  | "resources"
  | "unknown";

export interface IntentMatch {
  intent: CompanionIntent;
  statusText: string;
}

export const HUMAN_STATUS_POOL = [
  "Thinking...",
  "Tracing...",
  "Inspecting...",
  "Connecting...",
  "Assembling...",
  "Looking through that...",
  "Mapping the idea...",
  "Following the dependency...",
  "Working that out...",
  "Cogitating...",
  "Picturing...",
  "Tinkering...",
  "Sleuthing...",
];

export const INTENT_STATUS_MAP: Record<CompanionIntent, string[]> = {
  greeting: ["Connecting...", "Looking through that...", "Thinking..."],
  legacyexodus: ["Tracing compiler pipeline...", "Following the dependency...", "Inspecting AST & IR...", "Mapping the idea..."],
  projects: ["Assembling verified builds...", "Inspecting architecture...", "Looking through that..."],
  skills: ["Mapping the idea...", "Tinkering with the stack...", "Inspecting dependencies..."],
  unlisted_tech: ["Inspecting verified stack...", "Checking competencies...", "Grounded verification..."],
  certifications: ["Inspecting verified credentials...", "Checking certificates...", "Sleuthing credentials..."],
  opensource: ["Inspecting GitHub PRs...", "Checking contributions...", "Tracing open source..."],
  experience: ["Tracing engineering timeline...", "Following the journey...", "Thinking..."],
  education: ["Inspecting academic records...", "Looking through that..."],
  contact: ["Assembling contact channels...", "Connecting..."],
  resume: ["Sleuthing official résumé...", "Looking through that..."],
  resources: ["Indexing curated papers...", "Mapping the idea...", "Cogitating..."],
  unknown: ["Thinking...", "Working that out...", "Connecting...", "Tracing..."],
};

export function getRandomStatus(intent: CompanionIntent = "unknown"): string {
  const pool = INTENT_STATUS_MAP[intent] || HUMAN_STATUS_POOL;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function classifyIntent(query: string): IntentMatch {
  const q = query.toLowerCase().trim();

  let intent: CompanionIntent = "unknown";

  if (
    /^(hi|hello|hey|hey there|greetings|yo|sup|good morning|good afternoon|good evening)[!.]*$/i.test(q) ||
    q === "hi" ||
    q === "hello" ||
    q === "hey"
  ) {
    intent = "greeting";
  } else if (
    q.includes("fastapi") ||
    q.includes("django") ||
    q.includes("flask") ||
    q.includes("kubernetes") ||
    q.includes("angular") ||
    q.includes("ruby")
  ) {
    intent = "unlisted_tech";
  } else if (
    q.includes("certif") ||
    q.includes("credential") ||
    q.includes("hackerrank") ||
    q.includes("claude code in action") ||
    q.includes("cisco")
  ) {
    intent = "certifications";
  } else if (
    q.includes("open source") ||
    q.includes("opensource") ||
    q.includes("freecodecamp") ||
    q.includes("mdn") ||
    q.includes("kana dojo") ||
    q.includes("pull request") ||
    q.includes("pr #")
  ) {
    intent = "opensource";
  } else if (
    q.includes("legacy") ||
    q.includes("ast") ||
    q.includes("cfg") ||
    q.includes("dfg") ||
    q.includes("ir") ||
    q.includes("compiler") ||
    q.includes("static analysis") ||
    q.includes("graph")
  ) {
    intent = "legacyexodus";
  } else if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("cine") ||
    q.includes("subscription") ||
    q.includes("yaqazah") ||
    q.includes("lingdojo") ||
    q.includes("axiom") ||
    q.includes("app") ||
    q.includes("work")
  ) {
    intent = "projects";
  } else if (
    q.includes("stack") ||
    q.includes("skill") ||
    q.includes("technolog") ||
    q.includes("rust") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("bun") ||
    q.includes("tools")
  ) {
    intent = "skills";
  } else if (
    q.includes("education") ||
    q.includes("university") ||
    q.includes("umt") ||
    q.includes("degree") ||
    q.includes("study") ||
    q.includes("college")
  ) {
    intent = "education";
  } else if (
    q.includes("experience") ||
    q.includes("career") ||
    q.includes("job") ||
    q.includes("history") ||
    q.includes("role") ||
    q.includes("ibex") ||
    q.includes("tech vertex") ||
    q.includes("iridium")
  ) {
    intent = "experience";
  } else if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("call") ||
    q.includes("phone") ||
    q.includes("schedule") ||
    q.includes("reach")
  ) {
    intent = "contact";
  } else if (q.includes("resume") || q.includes("cv")) {
    intent = "resume";
  } else if (
    q.includes("resource") ||
    q.includes("paper") ||
    q.includes("book") ||
    q.includes("reading") ||
    q.includes("roadmap")
  ) {
    intent = "resources";
  }

  return { intent, statusText: getRandomStatus(intent) };
}

export function generateDeterministicResponse(messages: { role: string; content: string }[]): string {
  const userMessages = messages.filter((m) => m.role === "user");
  const turnCount = userMessages.length;
  const latestMessage = userMessages[userMessages.length - 1];
  const query = (latestMessage?.content || "").trim();

  const { intent } = classifyIntent(query);
  const { identity, flagship } = taskeenKnowledge;

  switch (intent) {
    case "greeting": {
      if (turnCount <= 1) {
        return `Hey! I'm Taskeen's digital companion. I can guide you through his work on **${flagship.name}**, his full-stack builds, or his systems journey.\n\nWhat would you like to inspect first?\n\n[[ACTION:Explore LegacyExodus|/projects/legacy-exodus]] [[ACTION:View Projects|/projects]] [[ACTION:Contact Taskeen|/contact]]`;
      }
      const variations = [
        `Hey again! What would you like to explore next — technical architecture, verified projects, or contact channels?\n\n[[ACTION:View Projects|/projects]] [[ACTION:See Journey|/about]] [[ACTION:Contact Taskeen|/contact]]`,
        `Still here! Want to check out his compiler research or schedule a 1-on-1 call?\n\n[[ACTION:Explore LegacyExodus|/projects/legacy-exodus]] [[ACTION:Schedule a Call|https://cal.com/raitaskeen]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`,
        `Hello again! Ready to inspect more of Taskeen's workspace?\n\n[[ACTION:See Journey|/about]] [[ACTION:Curated Resources|/resources]] [[ACTION:View Projects|/projects]]`,
      ];
      return variations[turnCount % variations.length];
    }

    case "unlisted_tech":
      return `Taskeen's portfolio does not list this technology as core professional production experience. His backend competencies center on **TypeScript**, **Node.js**, **Express.js**, **Bun**, **PostgreSQL**, **MongoDB**, **MySQL**, and **REST APIs**, alongside systems programming and infrastructure in **Rust** and **Docker**.\n\n[[ACTION:See Journey & Experience|/about]] [[ACTION:View Projects|/projects]]`;

    case "certifications":
      return `Taskeen holds three verified industry certifications:\n- **Software Engineer Certification** by HackerRank (Credential: bc1ec407b4fa)\n- **Claude Academy: Claude Code in Action** by Anthropic (Credential: dc3c77e83392422d07013798a6602884)\n- **Introduction to IoT** by Cisco\n\n[[ACTION:See Journey|/about]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`;

    case "opensource":
      return `Taskeen actively contributes to open-source software with merged contributions across developer and educational platforms:\n- **freeCodeCamp**: Open-source coding curriculum (PR #69385)\n- **MDN Web Docs**: Web platform documentation (PR #281)\n- **Kana Dojo**: Japanese language learning platform (PR #27003)\n\n[[ACTION:Open GitHub|https://github.com/raitaskeen]] [[ACTION:View Projects|/projects]]`;

    case "legacyexodus":
      return `**${flagship.name}** is Taskeen's flagship engineering initiative — an automated migration-intelligence engine for legacy enterprise codebases.\n\nCore architectural pillars:\n- **AST & CFG Parsing**: Syntax decomposition using Tree-sitter parsers into structural and control flow graphs.\n- **Data Flow Graphs (DFG)**: Variable lifecycle tracking across scopes to preserve runtime correctness.\n- **Intermediate Representation (IR)**: Normalizes heterogeneous languages into a unified semantic representation.\n- **Target Systems**: Deterministic synthesis into modern TypeScript or safe **Rust** services.\n\n[[ACTION:Explore LegacyExodus|/projects/legacy-exodus]] [[ACTION:Explore Systems Map|/about]] [[ACTION:Open GitHub|https://github.com/raitaskeen]]`;

    case "projects":
      return `Taskeen has architected and delivered several systems and full-stack platforms:\n\n- **LegacyExodus**: Flagship deterministic static-analysis and software-modernization platform (AST, CFG, DFG, IR, bounded AI).\n- **AxiomExodus**: Rust-native, local-first data and AI infrastructure separating deterministic compute from bounded LLM reasoning (In Development).\n- **Cine Vault**: Full-stack media discovery application built with React, Node.js, Express.js, MongoDB, and REST APIs.\n- **Secondary Projects**: Subscription API, YAQAZAH Course App, Lingdojo, and Travel Agency Booking App.\n- **Open Source**: Contributions to **freeCodeCamp** (PR #69385), **MDN Web Docs** (PR #281), and **Kana Dojo** (PR #27003).\n\n[[ACTION:View Projects|/projects]] [[ACTION:Explore LegacyExodus|/projects/legacy-exodus]] [[ACTION:Open GitHub|https://github.com/raitaskeen]]`;

    case "skills":
      return `Taskeen's technical stack spans full-stack engineering, backend systems, and developer tooling:\n\n- **Full-Stack & Backend**: TypeScript, JavaScript, React, Next.js, Node.js, Express.js, Bun, REST APIs, JWT Authentication, PostgreSQL, MongoDB, MySQL\n- **Systems & Infrastructure**: Rust, Docker, Linux, GitHub Actions, Cloudflare, CI/CD\n- **Static Analysis & Tooling**: Tree-sitter, AST, CFG, DFG, Intermediate Representation, Dependency Analysis, Git, Postman\n- **AI & Automation**: Claude Code, LLM Integrations, Tool-Using Agents, Structured Outputs, n8n, Workflow Automation, Verification Workflows\n\n[[ACTION:Explore Journey|/about]] [[ACTION:View Projects|/projects]]`;

    case "education":
      return `**Education & Academic Foundation**:\n- **Degree**: Bachelor of Science (BS) in Software Engineering\n- **Institution**: University of Management and Technology (UMT), Lahore\n- **Period**: Sep 2022 — Nov 2026 (Expected Nov 2026)\n- **Grade**: Current Grade A\n- **Relevant Coursework**: Data Structures & Algorithms, Database Systems, Object-Oriented Programming, Software Architecture, Web Application Development\n\n[[ACTION:See Journey|/about]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`;

    case "experience":
      return `Taskeen has 5+ years of software engineering experience across five canonical roles:\n\n- **Founder & Lead Developer, LegacyExodus** (Aug 2026 — Present · Remote): Deterministic static-analysis and software-modernization platform using AST, CFG, DFG, IR, and bounded AI.\n- **Full-Stack & AI Automation Engineer, ibex** (Nov 2024 — Jul 2026 · Internal Promotion): Built React/TypeScript dashboards, Node.js/PostgreSQL tools, REST APIs, and bounded LLM automation workflows.\n- **Technical Support Specialist - Advanced Escalations, ibex** (Mar 2024 — Oct 2024): Resolved 500+ escalated technical cases for a Fortune 100 client across connected devices, accounts, subscriptions, and digital services; Level 1 to Level 3 within 6 months.\n- **Full-Stack Web Developer, Tech Vertex** (Feb 2023 — Jan 2024 · Remote): Optimized React/TypeScript and Node.js applications (latency down up to 50%, 99.9% uptime), JWT REST APIs, Stripe & Appwrite.\n- **Frontend Engineer - Apprentice, Iridium Soft** (Jun 2021 — Jan 2023 · Lahore): Developed reusable React and JavaScript components, code reviews, and Agile delivery.\n\n[[ACTION:See Journey|/about]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`;

    case "contact":
      return `Here is how you can connect with Taskeen:\n\n- **Email**: ${identity.email}\n- **Phone**: ${identity.phone}\n- **Location**: ${identity.location}\n- **Direct Booking**: ${identity.calendarUrl} (instant calendar meeting)\n- **GitHub**: @raitaskeen | **LinkedIn**: /in/raitaskeen | **X**: @raitaskeen786\n- **Hugging Face**: huggingface.co/raitaskeen | **HackerRank**: hackerrank.com/profile/raitaskeen\n\n[[ACTION:Contact Taskeen|/contact]] [[ACTION:Schedule a Call|https://cal.com/raitaskeen]]`;

    case "resume":
      return `You can download Taskeen's verified résumé, detailing his work at Tech Vertex, ibex, and LegacyExodus, as well as his technical credentials.\n\n[[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]] [[ACTION:Contact Taskeen|/contact]]`;

    case "resources":
      return `Taskeen maintains a curated knowledge hub on this portfolio, featuring:\n\n- **Roadmaps**: AI Engineering, Backend, Rust Systems, and DevOps\n- **Foundational Papers**: *Attention Is All You Need*, *ReAct* (agent workflows), and *Tree-sitter*\n- **Systems Books**: *The Rust Book*, *Crafting Interpreters*, and *Designing Data-Intensive Applications*\n\n[[ACTION:Curated Resources|/resources]] [[ACTION:View Projects|/projects]]`;

    default:
      return `Taskeen Haider is a Software Engineer based in Lahore, Pakistan, with 5+ years of experience across full-stack development, backend engineering, AI automation, developer tooling, and building **LegacyExodus**.\n\nFeel free to explore his projects, review his experience timeline, or get in touch!\n\n[[ACTION:View Projects|/projects]] [[ACTION:See Journey|/about]] [[ACTION:Contact Taskeen|/contact]]`;
  }
}
