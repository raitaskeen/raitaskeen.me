# Taskeen Haider — Engineering Portfolio & Systems Architecture

<div align="center">

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun Runtime](https://img.shields.io/badge/Bun-1.4.2-FBF0DF?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GitHub Actions CI](https://img.shields.io/badge/CI_Pipeline-Passing-2EA44F?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/raitaskeen/portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

<br />

**[Explore Live Deployment ?](https://raitaskeen.me)** • **[Read Audit & Remediation Report ?](docs/AUDIT_AND_REMEDIATION.md)** • **[LegacyExodus Compiler Case Study ?](https://raitaskeen.me/projects/legacy-exodus)**

</div>

---

## Executive Overview

This repository contains the production source code for the personal engineering platform of **Taskeen Haider** (`@raitaskeen`). Built on Next.js 15 App Router, React 19, Bun, and Framer Motion, the platform serves as an interactive technical workspace designed around **systems programming**, **static analysis (AST / CFG / DFG)**, **compiler modernization**, and **deterministic AI workflows**.

Rather than presenting static brochureware, the platform functions as an executable showcase of computer science principles:
- **LegacyExodus Compiler Engine**: Interactive pipeline visualizing monolithic AST decomposition into memory-safe Rust services.
- **Interactive Graph Engineering & Dependency Modeling**: Real-time dependency graph topology (`auth.ts` ? `user.ts` ? `database.ts` ? `postgres.ts`) with interactive neighborhood micro-inspection.
- **Asymmetric Computational Companion**: On-page conversational intelligence with dual-mode execution (Groq Llama 3.3 70B streaming + zero-dependency offline deterministic engine), fortified with packet-loss stream buffering and FIFO-bounded rate limiting.
- **Progressive Web App (PWA)**: Autonomous offline precache system with service worker versioning (`raitaskeen-v2`).

---

## Platform Architecture

```mermaid
graph TD
    Client["Client Browser (Desktop / Mobile PWA)"] --> EdgeCDN["Vercel Edge Network / Global CDN"]
    EdgeCDN --> NextApp["Next.js 15 App Router"]
    
    subgraph "Next.js Core Architecture"
        NextApp --> StaticPages["SSG Routes (/about, /projects, /resources, /contact)"]
        NextApp --> ISRRoutes["ISR Pages (Hourly GitHub Live Telemetry)"]
        NextApp --> EdgeAPI["Edge API Routes"]
        
        EdgeAPI --> ChatAPI["/api/chat (POST)"]
        EdgeAPI --> SignalsAPI["/api/resources/signals (GET)"]
    end
    
    subgraph "Telemetry & Inference Backends"
        ChatAPI --> ProxyCheck["Proxy-Chain IP Parser & Sliding Window Rate Limiter"]
        ProxyCheck --> Groq["Groq API (Llama 3.3 70B Versatile)"]
        ProxyCheck --> OfflineFallback["Deterministic AI Engine (Rule-Based Fallback)"]
        SignalsAPI --> HN["Hacker News Firebase API"]
        ISRRoutes --> GitHub["GitHub REST API v3"]
    end
    
    subgraph "Client Runtime & Reactive Systems"
        Client --> ServiceWorker["Service Worker (public/sw.js) - PWA Offline Cache"]
        Client --> Bot["PortfolioBot (Asymmetric Computational Companion)"]
        Bot --> SSEBuffer["Chunk Boundary Line Buffer"]
        SSEBuffer --> ActionParser["Action Tag Extractor [[ACTION:...]]"]
        ActionParser --> ReactiveUI["Reactive Message Stream & Dynamic CTAs"]
    end
```

---

## Key Systems Breakdown

### 1. LegacyExodus: Monolith-to-Rust Modernization Pipeline

The flagship case study featured in `/projects/legacy-exodus` models the automated compiler modernization of legacy monolithic web applications:

```mermaid
graph LR
    subgraph "Input Layer"
        Source["Legacy Codebase (TypeScript / Node.js)"]
    end
    
    subgraph "Static Analysis Engine"
        Source --> AST["AST Parsing (Tree-sitter / Babel)"]
        AST --> SymGraph["Symbol & Dependency Graph"]
        SymGraph --> CFG["Control Flow & Data Flow Analysis (CFG / DFG)"]
    end
    
    subgraph "Transformation & Synthesis"
        CFG --> Rewrite["Rule-Based AST Rewriter"]
        Rewrite --> TypeInference["Type Inference & Ownership Alignment"]
        TypeInference --> Codegen["Target Code Generation"]
    end
    
    subgraph "Target Layer"
        Codegen --> Rust["Modernized Rust Microservice (Axum + SQLx)"]
    end
```

---

### 2. Fault-Tolerant AI Companion & Packet-Boundary Buffer

The conversational companion streams LLM tokens over Server-Sent Events (`text/event-stream`). To guard against TCP packet fragmentation across high-latency or packet-throttled mobile networks, the client runtime buffers incoming stream chunks across network reads:

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Bot as PortfolioBot.tsx
    participant Buffer as LineBuffer
    participant API as /api/chat
    participant Groq as Groq (Llama 3.3)

    User->>Bot: Submits inquiry
    Bot->>API: POST /api/chat (JSON history + client route)
    API->>Groq: Stream chat completion
    Groq-->>API: SSE Chunks (data: {"choices":[...]})
    API-->>Bot: Fragmented TCP Packets
    Note over Bot,Buffer: Packet split across JSON boundary!
    Bot->>Buffer: Accumulate into persistent line buffer
    Buffer->>Buffer: Split on newline (\n), retain dangling segment
    Buffer-->>Bot: Emit complete SSE lines
    Bot->>Bot: Parse delta & extract [[ACTION: label | /route]]
    Bot-->>User: Smooth streamed text & interactive action pills
```

---

### 3. Edge Rate Limiter with FIFO Capacity Bounding

The `/api/chat` route implements an in-memory rate limiter protecting against distributed Denial of Service (DoS) and quota exhaustion while remaining immune to memory leaks under sustained burst loads:

```mermaid
flowchart TD
    Req["Incoming Request (/api/chat)"] --> ParseHeader["Parse x-forwarded-for Header"]
    ParseHeader --> ExtractIP["Extract First (Client) IP from Comma-Separated Chain"]
    
    ExtractIP --> SweepCheck{"Sweep Trigger?<br>(Counter >= 50 OR Map > 500)"}
    SweepCheck -- Yes --> TimeSweep["Purge Expired Timestamps (>60s)"]
    TimeSweep --> CapCheck{"Map Size Still > 500?"}
    CapCheck -- Yes --> FIFO["Strict FIFO Eviction of Oldest Entries"]
    CapCheck -- No --> WindowCheck
    SweepCheck -- No --> WindowCheck
    FIFO --> WindowCheck
    
    WindowCheck{"IP Request Count in 60s Window < 30?"}
    WindowCheck -- Yes --> Allow["Record Timestamp & Allow Request (HTTP 200 Stream)"]
    WindowCheck -- No --> Deny["Reject Request (HTTP 429 Too Many Requests)"]
```

---

## Architectural Performance & Quality Matrix

| Feature | Design Specification | Verification / Empirical Proof |
|---|---|---|
| **PWA Caching** | Service Worker precaching `/`, `/about`, `/projects`, `/projects/legacy-exodus`, `/resources`, `/contact` | Verified offline navigation via `public/sw.js` (Cache: `raitaskeen-v2`) |
| **SSE Stream Resilience** | Zero dropped tokens under throttled packet boundaries | Verified under 1-byte chunk fragmentation test (0 dropped tokens) |
| **DDoS Defense** | Leftmost IP extraction + 30 req/min quota | Verified with spoofed proxy chains & 10,000 burst IP simulation |
| **Mobile WebKit Downloads** | Reliable resume download across iOS Safari | Synthetic click dispatched while connected to `document.body` |
| **Dead Code Elimination** | 0 unused imports, 0 orphaned binary assets | Removed 889 KB avatar image & 265 lines of dead CSS |
| **Motion Physics** | Coherent spring physics + `prefers-reduced-motion` | Motion values and SVG animations degrade gracefully to static states |
| **Type Integrity** | Strict mode TypeScript 5.6 across all files | `bun x tsc --noEmit` exits with code 0 (0 errors) |
| **Linting Compliance** | ESLint 9 flat configuration (`eslint.config.mjs`) | `bun run lint` exits non-interactively with code 0 |

---

## Technical Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Core Framework** | [Next.js 15.0.3](https://nextjs.org/) (App Router) | High-efficiency server/client component boundaries, SSG, ISR |
| **UI Library** | [React 19.0.0](https://react.dev/) | Modern concurrent features, transitions, and component primitives |
| **Language** | [TypeScript 5.6.3](https://www.typescriptlang.org/) | Strict static typing across models, AI protocols, and layout props |
| **Runtime & Tooling** | [Bun 1.4.2](https://bun.sh/) | Sub-second package installations, frozen lockfile management, testing |
| **Motion Engine** | [Framer Motion 11.11](https://www.framer.com/motion/) | GPU-accelerated spring physics, gesture tracking, layout transitions |
| **Iconography** | [Lucide React 0.454](https://lucide.dev/) | Minimalist, tree-shaken SVG vector icons |
| **Styles & Grid** | Modern Architectural CSS | Bespoke drafting grid, onyx/jet dark mode theme, amber-gold accents |
| **Edge AI Inference** | [Groq API](https://groq.com/) (Llama 3.3 70B) | Real-time streaming conversational engineering companion |
| **Telemetry** | [GitHub REST API v3](https://docs.github.com/rest) & HN Firebase | Live project stars, follower counts, and real-time tech news |
| **CI / CD** | [GitHub Actions](https://github.com/features/actions) | Automated linting, typechecking, production build, and artifact audit |

---

## Directory Structure

```
work/
+-- .github/
¦   +-- workflows/
¦   ¦   +-- ci.yml                 # Automated CI quality gate (Typecheck, Lint, Build, PWA)
¦   +-- PULL_REQUEST_TEMPLATE.md   # Standardized engineering contribution template
+-- app/
¦   +-- layout.tsx                 # Root layout, ambient grid, quiet creator mark & PWA bootstrap
¦   +-- page.tsx                   # Main systems overview, stats, and graph narrative
¦   +-- not-found.tsx              # Escaped 404 error page shell
¦   +-- globals.css                # Polished design system stylesheet (pruned of dead rules)
¦   +-- effects.css                # Architectural grid and specialized animation effects
¦   +-- about/page.tsx             # Interactive journey timeline & GitHub contribution graph
¦   +-- projects/                  # Featured systems, compilers, and applications
¦   ¦   +-- legacy-exodus/         # Deep compiler modernization case study & interactive pipeline
¦   +-- resources/page.tsx         # Curated systems papers, roadmaps & live tech signals
¦   +-- contact/page.tsx           # Kinetic signature pad & direct communication channel
¦   +-- api/
¦       +-- chat/route.ts          # Edge chat API with proxy-chain rate limiting & Groq stream
¦       +-- resources/signals/     # Live Hacker News & tech telemetry feed
+-- components/
¦   +-- GraphEngineeringSection.tsx# Dependency graphs, symbol trees & AI orchestration flows
¦   +-- SystemsMap.tsx             # Interactive 5-stage compiler pipeline (Beginner/Advanced)
¦   +-- JourneyNarrative.tsx       # Career trajectory storyline with focus discipline badges
¦   +-- ProjectShowcase.tsx        # Hardware-accelerated cards with 3D tilt & live repo stats
¦   +-- ResourcesHub.tsx           # Categorized engineering literature & roadmap inspector
¦   +-- motion/
¦       +-- PortfolioBot.tsx       # Computational companion entity with SVG aperture & SSE parser
¦       +-- Magnetic.tsx           # Pointer-attracted CTAs with hook-safe lifecycle
¦       +-- CustomCursor.tsx       # Black & gold contextual cursor with multi-state inspection
+-- docs/
¦   +-- AUDIT_AND_REMEDIATION.md   # Exhaustive 15-point audit, verification, and benchmark log
+-- lib/
¦   +-- ai/                        # Companion knowledge base, prompt synthesis & rate limiter
¦   +-- data.ts                    # Single source of truth for resume, projects, and education
¦   +-- github.ts                  # Resilient GitHub REST API fetcher with ISR caching
¦   +-- motion.ts                  # Coherent spring physics and motion language specification
+-- public/
¦   +-- sw.js                      # PWA Service Worker with offline precaching (raitaskeen-v2)
¦   +-- manifest.webmanifest       # Web app manifest for mobile installability
+-- .gitattributes                 # Enforces LF line endings across platforms
+-- eslint.config.mjs              # Non-interactive ESLint 9 flat configuration
+-- implementation_plan.md         # Historical implementation design plan & completed status
+-- LICENSE                        # MIT License
+-- package.json                   # Project scripts and dependencies
```

---

## Local Development & Setup

### Prerequisites
- **[Bun](https://bun.sh/)** v1.1 or higher (recommended) or **Node.js** v20+

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raitaskeen/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   bun install --frozen-lockfile
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Note: `GROQ_API_KEY` is optional. If omitted, the companion bot automatically falls back to its deterministic offline reasoning engine.*

4. **Start the development server:**
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

| Command | Action |
|---|---|
| `bun dev` | Starts Next.js development server with hot-module replacement |
| `bun run build` | Compiles optimized production bundle across all 11 routes |
| `bun run start` | Serves compiled production build locally |
| `bun run lint` | Executes non-interactive ESLint 9 flat config quality gate |
| `bun x tsc --noEmit` | Executes strict TypeScript compiler typecheck |

---

## CI / CD & Deployment Pipeline

Every push and pull request to `master`, `main`, and `post-production` triggers the automated GitHub Actions pipeline (`.github/workflows/ci.yml`):

1. **Dependency Integrity**: Fast Bun setup and `bun install --frozen-lockfile`.
2. **Typecheck Gate**: Validates entire workspace against TypeScript compiler (`tsc --noEmit`).
3. **Linting Gate**: Runs ESLint with zero tolerated errors.
4. **Production Build**: Compiles all static and edge routes into production artifacts in `< 3s`.
5. **PWA Validation**: Asserts existence and integrity of `public/sw.js` and `manifest.webmanifest`.

### Vercel Deployment
1. Connect the repository to [Vercel](https://vercel.com).
2. Set Build Command to `bun run build`.
3. Set Install Command to `bun install`.
4. Point DNS for `raitaskeen.me` to Vercel edge nodes.

---

## Author & Engineering Lead

<div align="left">

**Taskeen Haider**  
*Systems & Full-Stack Software Engineer*  

- **Portfolio & Systems Hub:** [raitaskeen.me](https://raitaskeen.me)
- **GitHub:** [@raitaskeen](https://github.com/raitaskeen)
- **Email:** [raitaskeenhaider786@gmail.com](mailto:raitaskeenhaider786@gmail.com)
- **Primary Focus:** Static Analysis (AST/CFG/DFG), Compiler Modernization, Distributed Systems, High-Performance Web Architectures.

</div>

---

## License

This project is open source and available under the [MIT License](LICENSE).
