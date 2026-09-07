export const profile = {
  name: "Taskeen Haider",
  title: "Full-Stack Engineer",
  tagline: "Full-Stack & Systems Architecture",
  typewriterWords: [
    "Full-Stack & Systems Architecture",
    "Building LegacyExodus",
    "Agentic AI & Workflow Automation",
    "Static Analysis · AST · CFG · IR",
  ],
  email: "raitaskeenhaider786@gmail.com",
  phone: "+92 328 1842351",
  location: "Lahore, Pakistan",
  domain: "taskeen.space",
  scheduleUrl: "https://cal.com/raitaskeen",
  github: "raitaskeen",
  resumeUrl: "/assets/Taskeen_Haider_Resume.pdf",
  socials: {
    twitter: "https://x.com/raitaskeen497",
    linkedin: "https://www.linkedin.com/in/raitaskeen",
    github: "https://github.com/raitaskeen",
    reddit: "https://www.reddit.com/user/taskeenhaider/",
    bluesky: "https://bsky.app/profile/raitaskeen",
  },
  bio: [
    "Software engineer passionate about building high-performance applications, exploring systems programming, and engineering deterministic code analysis and modernization tools.",
    "Day to day, that means shipping full-stack products end to end — and increasingly, going a layer deeper: static analysis (AST/CFG/DFG, IR), automated refactoring, and AI agents that reason about code rather than just generate it. Currently building LegacyExodus, a migration-intelligence platform for modernizing legacy enterprise codebases.",
  ],
  nowExploring: [
    "Agentic AI orchestration",
    "Workflow automation",
    "CI/CD pipelines",
    "Rust systems programming",
  ],
  stats: {
    yearsCoding: 3,
    githubFollowers: 70,
    publicRepos: 10,
  },
};

export const focusAreas = [
  { title: "Full-Stack & Backend", icon: "icon-dev.svg", text: "TypeScript, JavaScript, React, Node.js, Express, Next.js, Bun, MongoDB." },
  { title: "Systems & Performance", icon: "icon-app.svg", text: "Rust, asynchronous programming, backend architecture, memory safety." },
  { title: "Static Analysis & Compilers", icon: "icon-design.svg", text: "AST, CFG, DFG, dependency graphing, and Intermediate Representation (IR) — the engine behind LegacyExodus." },
  { title: "AI Engineering", icon: "icon-photo.svg", text: "LLM integrations, agentic AI orchestration, and developer tooling." },
];

// NOTE (Claude): dates below are reconstructed backward from what you told me —
// Ibex Nov 2025 → Jul 2026 (9 months, resigned), Tech Vertex "a year" before that,
// Iridium Soft "2 years" before that. Please confirm/correct the exact months.
export const experience = [
  {
    title: "Founder & Lead Developer",
    org: "LegacyExodus",
    period: "Aug 2026 — Present",
    location: "Remote",
    bullets: [
      "Building a migration-intelligence platform that analyzes legacy enterprise codebases (AST/CFG/DFG, IR) to plan and automate modernization.",
      "Designing the static-analysis pipeline and the agentic AI layer that reasons about code structure before suggesting refactors.",
      "Running this as a self-directed build-in-public project — architecture, roadmap, and shipping cadence all owned end to end.",
    ],
  },
  {
    title: "Technical Support Specialist (L3 Escalations)",
    org: "Ibex Global",
    period: "Nov 2025 — Jul 2026 · 9 months",
    location: "On-site",
    bullets: [
      "Delivered premium technical support for a major Fortune 100 technology client, specializing in digital accounts, media subscriptions, and smart home hardware.",
      "Advanced from Level 1 to Level 3 (Advanced Escalations) within the Digital & Device support department based on top-tier performance metrics.",
      "Resolved complex, escalated tickets involving IoT devices, network connectivity, and digital synchronization issues.",
      "Consistently exceeded KPIs for First Contact Resolution (FCR), Average Handle Time (AHT), and Customer Satisfaction (CSAT).",
    ],
  },
  {
    title: "Full-Stack Web Developer",
    org: "Tech Vertex",
    period: "Nov 2024 — Oct 2025 · 1 year",
    location: "Lahore",
    bullets: [
      "Worked as a full-time full-stack developer (not an internship) — architected, built, and deployed modern web applications end to end within a cross-functional team.",
      "Built with frontend frameworks (React, TypeScript, Tailwind) and backend architectures (Node.js, Express, PostgreSQL, MongoDB).",
      "Engineered secure, scalable APIs with JWT authentication and third-party integrations (Stripe, Appwrite).",
    ],
  },
  {
    title: "Frontend Engineer (Apprentice)",
    org: "Iridium Soft",
    period: "Nov 2022 — Oct 2024 · 2 years",
    location: "Lahore",
    bullets: [
      "Developed responsive UI components with React, built for cross-browser compatibility.",
      "Authored technical documentation for frontend features and design systems.",
      "Participated in code reviews and client consultations to deliver interactive web apps.",
    ],
  },
];

export const education = [
  { title: "BS Software Engineering", period: "2022 — 2026", place: "University of Management and Technology (UMT), Lahore" },
];

export const educationNote = "Alongside formal degree coursework, I have actively participated in university bootcamps, technical seminars, and practical workshops to continuously sharpen my systems and full-stack engineering skills.";

export const courses = [
  { title: "German — A2", place: "Annemarie Schimmel Haus, Lahore" },
  { title: "Spoken English", place: "Government College University (GCU), Lahore" },
];

export const spokenLanguages = [
  { language: "English", proficiency: "Professional / Fluent", level: "C1/C2", percentage: 95 },
  { language: "Urdu", proficiency: "Native", level: "Native", percentage: 100 },
  { language: "German", proficiency: "Elementary", level: "A2", percentage: 45 },
];

// NOTE (Claude): I don't have the exact course titles/completion dates for these —
// placeholders below, tell me the real names and I'll swap them in.
export const certifications = [
  { title: "Web / AI course (add exact title)", issuer: "Udemy" },
  { title: "Cloud skill badge (add exact title)", issuer: "Google Cloud Skills Boost" },
  { title: "Bootcamp / program (add exact title)", issuer: "GitHub" },
  { title: "Course (add exact title)", issuer: "LinkedIn Learning" },
];

export const githubAchievements = [
  { title: "Pair Extraordinaire", emoji: "🫛", count: 2 },
  { title: "Starstruck", emoji: "😻" },
  { title: "Galaxy Brain", emoji: "🧠" },
  { title: "Pull Shark", emoji: "🦈", count: 2 },
  { title: "Quickdraw", emoji: "🤠" },
  { title: "YOLO", emoji: "🎲" },
];

export const skills = [
  { name: "Frontend (React, Next.js, TypeScript, Tailwind)", value: 90 },
  { name: "Backend (Node.js, Express, MongoDB, SQL)", value: 85 },
  { name: "Tooling (Git, Docker, Postman, Linux)", value: 80 },
  { name: "Agentic AI & Static Analysis", value: 65 },
  { name: "n8n / Workflow Automation", value: 70 },
  { name: "Rust (Systems Programming)", value: 40 },
];

export const technicalSkills = {
  "Programming Languages": ["Node.js", "TypeScript", "React", "Rust (learning)"],
  "Databases": ["MongoDB", "MySQL", "PostgreSQL"],
  "Web & Tools": ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Docker", "Postman", "npm"],
  "Operating Systems": ["Linux", "Windows"],
};

export const featuredProjects = [
  {
    title: "Cine Vault",
    tag: "Full Stack",
    text: "A full-stack movie database and discovery platform: a Node.js/Express/MongoDB RESTful backend paired with a modern React, Vite, and Tailwind CSS frontend.",
    links: [
      { label: "Frontend repo", url: "https://github.com/raitaskeen/cine-vault-web" },
      { label: "API repo", url: "https://github.com/raitaskeen/cine-vault-api" },
    ],
    img: "project-2.png",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    title: "YAQAZAH Course App",
    tag: "Full Stack",
    text: "A comprehensive e-learning platform delivering structured course content and managing user enrollments efficiently.",
    links: [{ label: "Live app", url: "https://taskeen.space" }],
    img: "project-7.png",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Travel Agency Booking App",
    tag: "Full Stack",
    text: "A full-stack travel booking application with a dynamic, responsive UI and interactive charts via Syncfusion.",
    links: [],
    img: "project-8.jpg",
    stack: ["React", "Syncfusion", "Node.js"],
  },
  {
    title: "Lingdojo",
    tag: "Full Stack",
    text: "A dynamic full-stack web application tailored for engaging user experiences and interactive content delivery.",
    links: [{ label: "GitHub", url: "https://github.com/raitaskeen/lingdojo" }],
    img: "project-9.png",
    stack: ["React", "Node.js"],
  },
  {
    title: "Subscription API",
    tag: "Backend",
    text: "Node.js and MongoDB backend with JWT auth, scheduled workflows, and API security hardening.",
    links: [{ label: "GitHub", url: "https://github.com/raitaskeen/subscription-management-system" }],
    img: "project-4.png",
    stack: ["Node.js", "MongoDB", "JWT"],
  },
];

export const openSource = [
  {
    title: "freeCodeCamp",
    text: "Contributor to the core curriculum — merged pull request #69385 refining and fixing curriculum content.",
    url: "https://github.com/freeCodeCamp/freeCodeCamp",
  },
  {
    title: "MDN Web Docs",
    text: "Open-source contributor helping maintain and improve the standard documentation for web technologies.",
    url: "https://github.com/mdn",
  },
  {
    title: "Lingdojo",
    text: "Full-stack contributions to an open, dynamic web app focused on interactive content delivery.",
    url: "https://github.com/raitaskeen/lingdojo",
  },
];

// Ideas for real problems worth solving — proposed by Claude, pending your pick.
// See the chat for the "which ones should we actually build" question.
export const upcomingProjects = [
  {
    title: "StudyForge",
    problem: "Studying from raw notes/PDFs is inefficient without structured review.",
    idea: "Upload a PDF or notes, get AI-generated spaced-repetition flashcards automatically.",
    priority: true,
  },
  {
    title: "QueueLess",
    problem: "Small walk-in businesses (barbers, clinics) have no booking system and no budget for one.",
    idea: "A WhatsApp-bot-based queue and appointment manager — zero app download required for customers.",
    priority: true,
  },
  {
    title: "LingoLoop",
    problem: "Language apps drill vocabulary but skip real conversation practice.",
    idea: "Spaced-repetition vocabulary paired with structured conversation prompts — grew out of learning German myself.",
    priority: true,
  },
  {
    title: "DevPulse",
    problem: "Proof of work as a developer is scattered across GitHub, LeetCode, blogs, and job boards.",
    idea: "A single shareable dashboard that aggregates GitHub activity, contest stats, and writing into one live profile.",
    priority: true,
  },
  {
    title: "HabitStack",
    problem: "Generic habit trackers ignore behavior-science fundamentals like habit stacking.",
    idea: "A tracker built explicitly around stacking new habits onto existing routines, with streak visualization.",
    priority: true,
  },
  {
    title: "ReceiptWise",
    problem: "Freelancers and small shop owners track expenses manually or not at all.",
    idea: "OCR-based receipt scanner that auto-categorizes spending and exports tax-ready reports.",
  },
  {
    title: "LocalGig",
    problem: "Student gig-hunting still runs on scattered WhatsApp groups.",
    idea: "A hyperlocal, verified marketplace connecting students with nearby part-time gigs.",
  },
  {
    title: "CodeReviewBot",
    problem: "Small teams get slow, inconsistent code review.",
    idea: "A GitHub Action that posts AI-assisted PR comments focused on security and performance regressions.",
  },
  {
    title: "RentSplit",
    problem: "Shared-apartment expenses and chores cause recurring roommate disputes.",
    idea: "Automatic bill-splitting, chore rotation, and one-tap settle-up between roommates.",
  },
  {
    title: "PowerCutTracker",
    problem: "Load-shedding schedules in Pakistan are unpredictable and poorly communicated.",
    idea: "Crowd-sourced, real-time outage reporting and area-level schedule predictions.",
  },
  {
    title: "ResumeATS",
    problem: "Good resumes get auto-rejected by applicant tracking systems before a human sees them.",
    idea: "Scores a resume against a job description like an ATS would, and suggests concrete keyword fixes.",
  },
  {
    title: "DevDocsAI",
    problem: "Internal documentation goes stale the moment code changes.",
    idea: "Static-analysis tool that turns a codebase into always-current, searchable internal docs — a spin-off of LegacyExodus's analysis engine.",
  },
];

// Resources hub — curated engineering knowledge hub
export interface ResourceItem {
  id: string;
  title: string;
  category: "Roadmaps" | "Foundational Papers" | "Systems Books" | "Developer Tools";
  tag: string;
  summary: string;
  whyItMatters: string;
  url: string;
}

export const curatedResources: ResourceItem[] = [
  // Roadmaps
  {
    id: "rm-ai",
    title: "AI Engineer Roadmap",
    category: "Roadmaps",
    tag: "AI / LLMs",
    summary: "LLMs, RAG, agentic workflows, and evaluation basics — the path this portfolio leans into.",
    whyItMatters: "Structured progression through prompt engineering, embeddings, RAG, tool-augmented agent loops, and evaluation frameworks.",
    url: "https://roadmap.sh/ai-engineer",
  },
  {
    id: "rm-backend",
    title: "Backend Roadmap",
    category: "Roadmaps",
    tag: "Architecture",
    summary: "APIs, databases, auth, and system design fundamentals.",
    whyItMatters: "Essential ground truth for distributed backends, ACID transactions, database indexing, and robust REST/gRPC interfaces.",
    url: "https://roadmap.sh/backend",
  },
  {
    id: "rm-rust",
    title: "Rust Systems Roadmap",
    category: "Roadmaps",
    tag: "Systems",
    summary: "Systems programming path for memory-safe, high-performance backends.",
    whyItMatters: "The modern path for mastering memory safety, zero-cost abstractions, compiler internals, and concurrent systems programming.",
    url: "https://roadmap.sh/rust",
  },
  {
    id: "rm-devops",
    title: "DevOps & CI/CD Roadmap",
    category: "Roadmaps",
    tag: "Infrastructure",
    summary: "CI/CD pipelines, containers, and infrastructure automation.",
    whyItMatters: "Deterministic deployment infrastructure, container lifecycle management, and reproducible continuous integration pipelines.",
    url: "https://roadmap.sh/devops",
  },
  // Foundational Papers
  {
    id: "paper-transformer",
    title: "Attention Is All You Need",
    category: "Foundational Papers",
    tag: "Deep Learning",
    summary: "The landmark transformer paper that changed modern natural language processing and generative AI.",
    whyItMatters: "Introduced the multi-head self-attention transformer architecture powering all modern foundation models and code generation.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    id: "paper-react",
    title: "ReAct: Synergizing Reasoning and Acting in LLMs",
    category: "Foundational Papers",
    tag: "Agentic AI",
    summary: "Interleaving reasoning traces with task-specific actions to dramatically boost LLM problem solving.",
    whyItMatters: "Crucial for building autonomous agents that formulate thought-action-observation traces to verify deterministic tools instead of hallucinating.",
    url: "https://arxiv.org/abs/2210.03629",
  },
  {
    id: "paper-treesitter",
    title: "Tree-sitter: An Incremental Parsing System",
    category: "Foundational Papers",
    tag: "Compilers / AST",
    summary: "How modern syntax trees are generated incrementally with high fault tolerance for syntax errors.",
    whyItMatters: "The core standard for robust, real-time error-tolerant concrete and abstract syntax tree generation in developer tooling.",
    url: "https://tree-sitter.github.io/tree-sitter/",
  },
  // Systems Books
  {
    id: "book-rust",
    title: "The Rust Programming Language (The Book)",
    category: "Systems Books",
    tag: "Memory Safety",
    summary: "The official guide to Rust — the cornerstone of modern systems programming.",
    whyItMatters: "Required reading for mastering ownership, affine type semantics, borrow checking, and fearless concurrency without garbage collection.",
    url: "https://doc.rust-lang.org/book/",
  },
  {
    id: "book-crafting-interpreters",
    title: "Crafting Interpreters (Bob Nystrom)",
    category: "Systems Books",
    tag: "Compilers & VMs",
    summary: "A masterclass on building a tree-walk interpreter and a bytecode virtual machine from scratch.",
    whyItMatters: "Walks through bytecode VMs, lexing, Pratt parsing, AST traversal, and garbage collection from absolute scratch.",
    url: "https://craftinginterpreters.com/",
  },
  {
    id: "book-ddia",
    title: "Designing Data-Intensive Applications (Kleppmann)",
    category: "Systems Books",
    tag: "Distributed Systems",
    summary: "The definitive guide to data models, distributed consensus, transactions, and storage engines.",
    whyItMatters: "The engineering gold standard for replication logs, partition tolerance, distributed transactions, and data storage durability.",
    url: "https://dataintensive.net/",
  },
  // Developer Tools
  {
    id: "tool-docker",
    title: "Docker Containerization Engine",
    category: "Developer Tools",
    tag: "Containers",
    summary: "Multi-stage builds, container lifecycle management, and reproducible system isolation.",
    whyItMatters: "Standard isolation layer for deterministic microservices and consistent local dev environments.",
    url: "https://docs.docker.com/",
  },
  {
    id: "tool-postman",
    title: "Postman API Engineering Platform",
    category: "Developer Tools",
    tag: "API Testing",
    summary: "API contract testing, automated verification suites, and mock environment runners.",
    whyItMatters: "Industry standard for verifying REST and GraphQL API contracts across teams.",
    url: "https://www.postman.com/",
  },
  {
    id: "tool-linux",
    title: "Linux Command Line & POSIX Environment",
    category: "Developer Tools",
    tag: "Operating Systems",
    summary: "Shell scripting, process management, memory telemetry, and system diagnostics.",
    whyItMatters: "The bedrock of backend server infrastructure and production systems administration.",
    url: "https://linuxjourney.com/",
  },
];

export const roadmaps = curatedResources
  .filter((r) => r.category === "Roadmaps")
  .map((r) => ({ title: r.title, text: r.summary, url: r.url }));

export const papers = curatedResources
  .filter((r) => r.category === "Foundational Papers")
  .map((r) => ({ title: r.title, text: r.summary, url: r.url }));

export const devQuotes = [
  "It works on my machine.",
  "There are 2 hard problems in computer science: cache invalidation, naming things, and off-by-one errors.",
  "A user reported a bug. Weeks later, so did I, in the same line of code.",
  "99 little bugs in the code, 99 little bugs. Take one down, patch it around — 127 little bugs in the code.",
  "I don't always test my code, but when I do, I do it in production.",
  "The best code is no code at all — until product asks for a feature.",
  "AI wrote half of this joke and I'm not telling you which half.",
];
