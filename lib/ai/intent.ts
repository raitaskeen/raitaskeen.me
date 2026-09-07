import { taskeenKnowledge } from "./knowledge";

export type CompanionIntent =
  | "greeting"
  | "legacyexodus"
  | "projects"
  | "skills"
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

  const { identity, education, flagship } = taskeenKnowledge;

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

    case "legacyexodus":
      return `**${flagship.name}** is Taskeen's flagship engineering initiative — an automated migration-intelligence engine for legacy enterprise codebases.\n\nCore architectural pillars:\n- **AST & CFG Parsing**: Syntax decomposition using Tree-sitter parsers into structural and control flow graphs.\n- **Data Flow Graphs (DFG)**: Variable lifecycle tracking across scopes to preserve runtime correctness.\n- **Intermediate Representation (IR)**: Normalizes heterogeneous languages into a unified semantic representation.\n- **Target Systems**: Deterministic synthesis into modern TypeScript or safe **Rust** services.\n\n[[ACTION:Explore LegacyExodus|/projects/legacy-exodus]] [[ACTION:Explore Systems Map|/about]] [[ACTION:Open GitHub|https://github.com/raitaskeen]]`;

    case "projects":
      return `Taskeen has architected and delivered several production web and backend systems:\n\n- **Cine Vault**: Cinematic movie discovery platform with React, Node.js REST API, and MongoDB.\n- **Subscription API**: Hardened microservice featuring JWT authentication, automated renewal workflows, and error logging.\n- **YAQAZAH Course Platform**: Scalable student portal and enrollment management.\n- **Lingdojo**: Interactive web app for dynamic language drills.\n- **Open Source**: Merged contributions to **freeCodeCamp** (PR #69385) and MDN Web Docs.\n\n[[ACTION:View Projects|/projects]] [[ACTION:Open GitHub|https://github.com/raitaskeen]]`;

    case "skills":
      return `Taskeen's technical stack bridges full-stack application development and systems engineering:\n\n- **Frontend**: React, Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion\n- **Backend & APIs**: Node.js, Express, Bun, REST APIs, JWT Auth, Microservices\n- **Databases**: MongoDB, MySQL, PostgreSQL\n- **Systems & Compilers**: Rust, Static Analysis (AST, CFG, DFG, IR)\n- **DevOps & Automation**: Docker, Git, Linux, GitHub Actions, n8n\n\n[[ACTION:Explore Journey|/about]] [[ACTION:View Projects|/projects]]`;

    case "education":
      return `**Education & Academic Foundation**:\n- **Degree**: ${education.degree}\n- **Institution**: ${education.institution}\n- **Period**: ${education.period}\n- **Engagement**: ${education.note}\n\nTaskeen regularly engages with technical workshops, university seminars, and open-source communities to deepen both practical and theoretical software foundations.\n\n[[ACTION:See Journey|/about]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`;

    case "experience":
      return `Taskeen's career timeline demonstrates over 3 years of hands-on production engineering:\n\n- **Founder & Lead Developer, LegacyExodus** (Aug 2026 – Present): Automated code migration & static analysis pipelines.\n- **L3 Technical Escalation Specialist, Ibex Global** (Nov 2025 – Jul 2026 · On-site): Resolved critical IoT & account escalations for a Fortune 100 client.\n- **Full-Stack Developer, Tech Vertex** (Nov 2024 – Oct 2025): Full-time production development with React, Node.js, and MongoDB.\n- **Frontend Apprentice, Iridium Soft** (Nov 2022 – Oct 2024): UI components & interactive applications.\n\n[[ACTION:See Journey|/about]] [[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]]`;

    case "contact":
      return `Here is how you can connect with Taskeen:\n\n- **Email**: ${identity.email}\n- **Phone**: ${identity.phone}\n- **Location**: ${identity.location}\n- **Direct Booking**: ${identity.calendarUrl} (instant calendar meeting)\n- **GitHub / LinkedIn / X**: @raitaskeen\n\n[[ACTION:Contact Taskeen|/contact]] [[ACTION:Schedule a Call|https://cal.com/raitaskeen]]`;

    case "resume":
      return `You can download Taskeen's verified résumé, detailing his work at Tech Vertex, Ibex Global, and LegacyExodus, as well as his technical credentials.\n\n[[ACTION:Download Résumé|/assets/Taskeen_Haider_Resume.pdf]] [[ACTION:Contact Taskeen|/contact]]`;

    case "resources":
      return `Taskeen maintains a curated knowledge hub on this portfolio, featuring:\n\n- **Roadmaps**: AI Engineering, Backend, Rust Systems, and DevOps\n- **Foundational Papers**: *Attention Is All You Need*, *ReAct* (agent workflows), and *Tree-sitter*\n- **Systems Books**: *The Rust Book*, *Crafting Interpreters*, and *Designing Data-Intensive Applications*\n\n[[ACTION:Curated Resources|/resources]] [[ACTION:View Projects|/projects]]`;

    default:
      return `Taskeen Haider is a Full-Stack Engineer and Systems builder based in Lahore, Pakistan, focused on systems architecture, compiler theory, and building **LegacyExodus**.\n\nFeel free to explore his projects, review his experience timeline, or get in touch!\n\n[[ACTION:View Projects|/projects]] [[ACTION:See Journey|/about]] [[ACTION:Contact Taskeen|/contact]]`;
  }
}
