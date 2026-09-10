# Taskeen Haider — Engineering Portfolio & Systems Architecture

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bun Runtime](https://img.shields.io/badge/Runtime-Bun-f472b6?style=flat-square&logo=bun)](https://bun.sh/)
[![CI Quality Gate](https://github.com/raitaskeen/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/raitaskeen/portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> A high-performance, accessible, and mathematically grounded portfolio platform engineered with Next.js 15 App Router, React 19, Bun, and Framer Motion. Highlights compiler modernization, graph engineering, deterministic workflows, and an intelligent computational companion.

**Live Application:** [raitaskeen.me](https://raitaskeen.me)

---

## Technical Overview

This repository houses the personal engineering platform of **Taskeen Haider** (`raitaskeen`), designed around systems engineering, static analysis (AST / CFG / DFG / IR), compiler modernization, and verified full-stack applications.

Unlike traditional static portfolios, this site functions as an interactive technical workspace:
- **Interactive Compiler Modernization Deep Dive (`/projects/legacy-exodus`)**: Case study on migrating monolithic legacy codebases to memory-safe Rust/Axum services via AST parsing, symbol graphs, and rule-based rewrites.
- **Interactive Graph Engineering & Dependency Section**: Live dependency graphs (`auth.ts` ? `user.ts` ? `database.ts` ? `postgres.ts`) with interactive neighborhood inspection and reduced-motion fallback.
- **Asymmetric Computational Entity (AI Companion)**: An on-page engineering companion powered by Groq (Llama 3.3 70B) streaming SSE with automatic packet buffering, client IP rate-limiting, and an offline deterministic reasoning engine.
- **Hardened Architecture**: Full Progressive Web App (PWA) precache, ISR GitHub live telemetry caching, sub-2s Next.js static builds, and zero dead code.

---

## Architectural Highlights

```
work/
+-- .github/
¦   +-- workflows/
¦       +-- ci.yml                 # Automated CI quality gate (Typecheck, Lint, Build, PWA)
+-- app/
¦   +-- layout.tsx                 # Root layout, ambient grid, quiet creator mark & PWA bootstrap
¦   +-- page.tsx                   # Main systems overview, stats, and graph narrative
¦   +-- about/page.tsx             # Interactive journey timeline & GitHub contribution graph
¦   +-- projects/                  # Selected systems, compilers, and web builds
¦   ¦   +-- legacy-exodus/         # Deep architectural case study & interactive compiler pipeline
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
+-- lib/
¦   +-- ai/                        # Companion knowledge base, prompt synthesis & rate limiter
¦   +-- data.ts                    # Single source of truth for resume, projects, and education
¦   +-- github.ts                  # Resilient GitHub REST API fetcher with ISR caching
¦   +-- motion.ts                  # Coherent spring physics and motion language specification
+-- public/
    +-- sw.js                      # PWA Service Worker with offline precaching (raitaskeen-v2)
    +-- manifest.webmanifest       # Web app manifest for mobile installability
```

---

## Core Systems & Innovations

### 1. Robust SSE Stream Buffer
The conversational companion streams LLM tokens over Server-Sent Events (`text/event-stream`). To guard against TCP packet fragmentation across slow cellular or throttled networks:
- Incoming stream chunks are decoded into a persistent line buffer.
- Incomplete lines are retained across `reader.read()` iterations until a terminating newline is received.
- Action directives (`[[ACTION: Label | /route]]`) and markdown deltas are parsed with zero token loss even under 1-byte chunk delivery.

### 2. Edge Rate Limiter & Multi-Hop IP Parsing
The chat endpoint guards against denial-of-service and API quota abuse:
- Extracts the genuine client IP from multi-hop `x-forwarded-for` proxy headers.
- Enforces an in-memory sliding window (30 requests/minute).
- Operates a strictly bounded FIFO cache (`MAX_MAP_SIZE = 500`) to guarantee zero memory leaks under sustained distributed burst loads.

### 3. Progressive Web App (PWA) Offline Precache
- Custom Service Worker (`public/sw.js`) precaching all critical routes (`/`, `/about`, `/projects`, `/projects/legacy-exodus`, `/resources`, `/contact`).
- Cache-first strategy for static assets and network-first for live telemetry.

### 4. Accessibility & Motion Discipline
- Native adherence to `prefers-reduced-motion`: all spring transforms, cursor reticles, and animated SVG flow edges gracefully degrade to static indicators.
- Pure GPU transforms (`transform: translate3d`) without continuous `requestAnimationFrame` polling loops.

---

## Tech Stack

| Domain | Technology | Details |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Static site generation (SSG) + Incremental Static Regeneration (ISR) |
| **Library** | React 19 | Latest React primitives with strict typing |
| **Language** | TypeScript 5.6 | Strict mode compilation with zero `any` policy |
| **Runtime & PM** | Bun v1.4+ | Lightning-fast package resolution and lockfile freezing |
| **Animation** | Framer Motion 11 | Physics-based spring animations, gesture tracking, layout transitions |
| **Icons** | Lucide React | Clean, tree-shakeable SVG glyphs |
| **Styling** | Bespoke Modern CSS | High-density drafting grid, dark onyx/jet palette, amber accents |
| **AI Inference** | Groq API / Llama 3.3 70B | Streaming LLM integration with deterministic rule engine fallback |
| **CI / CD** | GitHub Actions | Automated typecheck, ESLint flat config, and production build gate |

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.1+ recommended) or Node.js 20+

### Installation

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
   Add your optional credentials:
   ```env
   # Optional: Powers live AI companion chat streaming (falls back to deterministic engine if omitted)
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server:**
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Starts Next.js development server with hot reloading |
| `bun run build` | Compiles optimized production bundle and generates static pages |
| `bun run start` | Runs the compiled production build locally |
| `bun run lint` | Runs non-interactive ESLint quality gate (flat config) |
| `bun x tsc --noEmit` | Validates TypeScript types across the entire codebase |

---

## CI / CD Pipeline

All pull requests and pushes to `master`, `main`, and `post-production` trigger the automated GitHub Actions quality gate ([.github/workflows/ci.yml](.github/workflows/ci.yml)):

1. **Environment Setup**: Provisions Bun on Ubuntu with dependency caching.
2. **Lockfile Integrity**: Executes `bun install --frozen-lockfile`.
3. **Typecheck Gate**: Runs `tsc --noEmit` with zero tolerated errors.
4. **Linting Gate**: Executes `next lint` non-interactively using modern flat configuration.
5. **Production Build**: Compiles all 11 routes into production artifacts in `< 3s`.
6. **PWA Validation**: Verifies Service Worker (`sw.js`) and Web Manifest integrity.

---

## Deployment

### Vercel (Recommended)
1. Import the repository into [Vercel](https://vercel.com).
2. Set the build command to `bun run build` (or Next.js default).
3. Set the install command to `bun install`.
4. Configure your custom domain (`raitaskeen.me`) under project settings.

---

## Author & Contact

**Taskeen Haider**  
- **Portfolio:** [raitaskeen.me](https://raitaskeen.me)
- **GitHub:** [@raitaskeen](https://github.com/raitaskeen)
- **Email:** [raitaskeenhaider786@gmail.com](mailto:raitaskeenhaider786@gmail.com)
- **Location:** Islamabad, Pakistan

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
