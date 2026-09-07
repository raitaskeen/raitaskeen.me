# Taskeen Haider — Portfolio v3

Same core theme (onyx/jet dark background, amber-gold accent) — now multipage,
animated, and synced to your real resume content.

## Audit findings from your uploaded zip

- **Fixed:** `Taskeen_Haider_Resume.pdf` was inside `assets/images/` — moved to
  `public/assets/Taskeen_Haider_Resume.pdf`.
- **Unused assets found:** `avatar-1.png`–`avatar-4.png` and
  `logo-1-color.png`–`logo-6-color.png` are leftovers from the original
  template's Testimonials/Clients sections, which your HTML never included.
  They're harmless but unused — I left them in `public/` in case you want to
  add those sections later; delete them if not.
- **Content mismatch:** your resume/README describe systems programming,
  static analysis (AST/CFG/DFG/IR), and AI agent work — the old site's copy
  only mentioned MERN + tech support. Rewrote bio and added a dedicated
  "Focus Areas" section pulling directly from your README's categories.
- **Removed:** the Blog tab and its 6 placeholder posts (never-clicked `#`
  links) — replaced with the Resources hub below.

## What changed structurally

- **Multipage now** (was a single page with JS tab-switching): `/`, `/about`,
  `/projects`, `/resources`, `/contact` — real routes, each statically
  generated, with animated page transitions between them.
- **Live GitHub data at build time** — repo count, follower count, and star
  counts per featured project are fetched from `api.github.com` during the
  build (ISR, revalidates hourly), not hardcoded.
- **Animations added:** gradient-border hover on every card, a subtle 3D tilt
  on project/focus cards that follows your cursor, shimmer sweep on primary
  buttons, underline-draw links, animated skill-bar fills on scroll, and a
  soft ambient glow behind the hero — all disabled automatically for
  `prefers-reduced-motion`.
- **New Resources page** (replacing Blog): roadmaps (AI engineering, backend,
  Rust, DevOps), a short reading list of actually-relevant papers, a live
  crypto/market pulse widget, your GitHub streak stats, and a shuffleable
  dev-humor quote card — the "surprise" you asked for.
- **Content sourced from your real resume PDF and README**, not
  placeholder text: exact job bullets, notable projects (Cine Vault, YAQAZAH
  Course App, Travel Agency Booking App, Lingdojo, Subscription API), and
  your open-source contributions (freeCodeCamp, MDN).

## On the stack — one deviation from your list, with reasoning

You asked for Tailwind v4 + shadcn/ui. I kept your **original hand-written
CSS** (`globals.css`) completely untouched instead, and added a small
second stylesheet (`effects.css`) using the *same* CSS custom properties
(`--orange-yellow-crayola`, `--jet`, etc.) for the new animated bits. Your
design system isn't Tailwind-based — it's a bespoke, well-built CSS file —
so layering Tailwind on top would risk exactly the kind of visual drift you
told me to avoid ("don't change the core theme"). Everything else on your
list is in: Next.js 15 App Router, Bun-compatible, TypeScript, Motion
(framer-motion), and live GitHub REST API data. If you'd still like a full
Tailwind/shadcn migration later, that's a clean follow-up — just say so.

## Environment Variables

Copy `.env.example` to `.env.local` and add your local credentials (e.g. `GROQ_API_KEY` for the AI companion bot). If omitted, the companion bot gracefully falls back to the deterministic response engine.

```bash
cp .env.example .env.local
```

## Run it

```
bun install
bun dev
```

## Deploy (Vercel + your custom domain)

1. Push to GitHub, import into Vercel.
2. Project → Settings → Domains → add taskeen.space.
3. Point the DNS record Vercel gives you at your registrar.
4. Remove the old GitHub Pages DNS record once verified.
