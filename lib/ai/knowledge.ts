import {
  profile,
  experience,
  focusAreas,
  featuredProjects,
  openSource,
  skills,
  technicalSkills,
  upcomingProjects,
  curatedResources,
  education,
  educationNote,
  githubAchievements,
} from "@/lib/data";

export interface KnowledgeBase {
  identity: {
    name: string;
    handle: string;
    role: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    domain: string;
    calendarUrl: string;
    resumePath: string;
    githubUrl: string;
    linkedinUrl: string;
  };
  education: {
    degree: string;
    institution: string;
    period: string;
    note: string;
  };
  flagship: {
    name: string;
    role: string;
    period: string;
    tagline: string;
    description: string;
    architecture: {
      astParsing: string;
      controlFlow: string;
      dataFlow: string;
      ir: string;
      targets: string;
    };
  };
  experience: typeof experience;
  projects: typeof featuredProjects;
  upcomingProjects: typeof upcomingProjects;
  openSource: typeof openSource;
  skills: typeof skills;
  technicalSkills: typeof technicalSkills;
  githubAchievements: typeof githubAchievements;
  curatedResources: typeof curatedResources;
}

export const taskeenKnowledge: KnowledgeBase = {
  identity: {
    name: profile.name,
    handle: `@${profile.github}`,
    role: profile.title,
    bio: profile.bio.join(" "),
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    domain: profile.domain,
    calendarUrl: profile.scheduleUrl,
    resumePath: profile.resumeUrl,
    githubUrl: `https://github.com/${profile.github}`,
    linkedinUrl: profile.socials.linkedin,
  },
  education: {
    degree: education[0]?.title ?? "BS Software Engineering",
    institution: education[0]?.place ?? "University of Management and Technology (UMT), Lahore",
    period: education[0]?.period ?? "",
    note: educationNote ?? "",
  },
  flagship: {
    name: "LegacyExodus",
    role: "Founder & Lead Developer",
    period: "Aug 2026 — Present",
    tagline: "Automated legacy codebase modernization engine",
    description:
      "LegacyExodus uses static analysis (AST, Control Flow Graphs, Data Flow Graphs) and an Intermediate Representation (IR) to analyze legacy architectures and plan deterministic refactors into modern ecosystems like TypeScript and Rust.",
    architecture: {
      astParsing: "Deconstructs source code into concrete syntax trees using Tree-sitter parsers.",
      controlFlow: "Builds Directed Acyclic Graphs (DAG) of code execution branches to preserve logic flow.",
      dataFlow: "Traces variable lifecycles, state mutations, and scope boundaries.",
      ir: "Normalizes language-specific syntax into a unified AST/IR before transformation.",
      targets: "Synthesizes modern TypeScript modules or safe, high-throughput Rust services.",
    },
  },
  experience,
  projects: featuredProjects,
  upcomingProjects,
  openSource,
  skills,
  technicalSkills,
  githubAchievements,
  curatedResources,
};
