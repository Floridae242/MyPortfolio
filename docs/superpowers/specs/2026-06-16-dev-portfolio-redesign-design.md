# Dev Portfolio Redesign — Design Spec

**Date:** 2026-06-16
**Author:** Naruephon Yotmao (Tle) + Claude
**Status:** Approved (design); pending implementation plan

## Goal

Replace the existing editorial "Naruephon Gazette" portfolio with a modern, high-tech,
dark-mode full-stack developer portfolio that feels like a premium immersive workspace /
advanced IDE. Reuse the existing real content and Supabase CMS.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Relationship to existing site | Replace the Gazette; archive old site to `legacy/` |
| Stack | React 18 + Vite + GSAP/ScrollTrigger, deployed on existing Vercel config |
| Language | **TypeScript** (existing `data/*.js` ported to typed modules) |
| Content source | Supabase REST (reads, anon key) with bundled `data/*.js` fallback |
| Admin/CMS | Keep existing `admin.html` CMS logic as-is, behind a new themed `/admin` gateway |
| Palette | **Cyber Cyan** — deep slate + glowing cyan, light secondary syntax tokens in code |
| Hero | **Split**: typing terminal (left) + animated SVG backend node-graph (right) |
| Main data layout | **Bento grid** — featured project large, varied tiles; category filter pills |

## Architecture

- **Routing (React Router):**
  - `/` — single-page scroll: Hero → Projects → Awards → Activities → Self-Development → About → Contact
  - `/case/:slug` — immersive project case-study deep-dives
  - `/admin` — themed gateway entry that hands off to the existing `admin.html` CMS
- **Source tree** (feature-organized, per web coding-style rules):
  ```
  src/
  ├── components/
  │   ├── hero/            Hero.tsx, TerminalIntro.tsx, BackendGraph.tsx
  │   ├── bento/           BentoGrid.tsx, ProjectCard.tsx, FilterPills.tsx
  │   ├── sections/        Awards.tsx, Activities.tsx, SelfDevelopment.tsx, About.tsx, Contact.tsx
  │   ├── case-study/      CaseStudy.tsx, ProblemSolution.tsx, TechTags.tsx, MediaBlock.tsx
  │   └── ui/              GlassCard.tsx, MagneticButton.tsx, NavBar.tsx, AdminGateway.tsx
  ├── hooks/               useReducedMotion.ts, useScrollProgress.ts, useSupabaseData.ts
  ├── lib/                 supabase.ts, animation.ts
  ├── data/                projects.ts, awards.ts, activities.ts, selfDevelopment.ts (ES-module ports of data/*.js, used as fallback)
  └── styles/              tokens.css, typography.css, global.css
  ```
- **Legacy:** existing `index.html`, `case.html`, `project.html`, `pic/`-referencing assets, and the
  Gazette CSS move to `legacy/`. `admin.html` stays at root (still the live CMS).

## Design system — Cyber Cyan

- CSS custom properties in `tokens.css`:
  - `--color-bg` deep slate (~`oklch(14% 0.02 240)`), `--color-surface`, `--color-text`
  - `--color-accent` cyan `#22d3ee`; `--glow-accent` cyan box-shadow
  - Secondary syntax tokens used **only** in code snippets: `--syntax-keyword` magenta,
    `--syntax-string` blue, `--syntax-ok` green
  - Spacing, duration, and easing tokens (no hardcoded repeats)
- **Typography:** bold sans-serif headings (Space Grotesk or Geist); **JetBrains Mono** for
  terminal + technical detail. Max two families. `font-display: swap`, preload critical weight only.
- **Motion:** animate only `transform` / `opacity` / `clip-path` / `filter`. `will-change` used
  narrowly and removed after. `prefers-reduced-motion` fully honored — typing animation renders
  final text immediately, parallax/scroll-pin become static.

## Sections (single page)

1. **Hero** — split layout. Left: terminal window types `whoami` → name → role/affiliation → CTAs.
   Right: animated SVG node-graph (API / CMS / DB / WebSocket) with pulsing edges, representing the
   full-stack/backend story. Faint dot-grid background.
2. **Projects** — bento grid; Smart Flema featured (large tile). Filter pills:
   Competition / Production / Academic (derived from `categories[]`). Cards are glassmorphism with
   hover-reveal detail; click → `/case/:slug`.
3. **Awards** — compact glass card grid (`awards.ts`).
4. **Activities** — glass card grid (`activities.ts`).
5. **Self-Development** — glass card grid (`selfDevelopment.ts`).
6. **About + Contact** — concise; node-graph motif as subtle background texture.
- Sticky top nav with magnetic-button hover effects; smooth in-page scroll.

## Case study (`/case/:slug`)

Immersive scroll layout driven by existing `projects.js` fields:
- Pinned hero with project title + context
- **Problem → Solution** formatting (`problemSolved`, `fullDescription`)
- Tech-stack tags (`techStack[]`), role/context, result (`result`), key learnings (`keyLearnings[]`)
- Rich-media placeholders sourced from `pic/` (`imageUrl`)
- Links: `githubUrl`, `liveUrl`, `canvaUrl` when present
- GSAP ScrollTrigger reveals + parallax; built generically so any data-rich project gets one.
- Example target: `/case/smart-flema`.

## Data flow & CMS

- **`useSupabaseData(resource)`** hook: on mount, fetch from Supabase REST
  (`https://rngeogahhatybnlhmgbz.supabase.co/rest/v1`, anon key for reads) for projects, awards,
  activities, self-development.
- **Fallback:** on any network/HTTP error, render the bundled `src/data/*.ts` (ported from the
  existing `data/*.js`). The site always renders content. Loading state shows skeleton cards.
- **Admin gateway (`/admin`):** sleek, discreet themed login surface. Does **not** reimplement CMS —
  authenticates/redirects into the existing working `admin.html`. Writes continue to use the existing
  Supabase write path (service_role key stays server/admin-side, never shipped to the public bundle).
- **Security:** anon key only in the public bundle (reads); no service_role key client-side. No
  secrets committed. Validate/escape any rendered CMS content (no `dangerouslySetInnerHTML` on
  unsanitized data).

## Error handling

- Every fetch wrapped with explicit error handling and graceful fallback to bundled data.
- User-facing: skeletons while loading; quiet fallback (no error walls) since bundled data covers it.
- Console-level logging of fetch failures for debugging; never silently swallow.

## Performance

- Lazy-load GSAP/ScrollTrigger and the heaviest viz; dynamic import where justified.
- Hero image/media: explicit dimensions, `fetchpriority="high"`; below-the-fold `loading="lazy"`.
- Targets: Lighthouse ≥ 90; CWV per web/performance.md (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- Bundle budget: landing JS < 150kb gzip where feasible (GSAP + React vendor split).

## Testing

- **Unit (Vitest):** data transforms, `useSupabaseData` fallback logic, category filtering, custom hooks.
- **E2E/visual (Playwright):** smoke test (`/` hero visible, projects render, a case route loads);
  visual regression at 320 / 768 / 1024 / 1440; reduced-motion variant.
- Coverage target 80% on logic units (visual regression supplements, doesn't replace).

## Out of scope (YAGNI)

- Full React rebuild of the admin CMS (keeping `admin.html`).
- Light mode / theme switching.
- New backend endpoints — reuse existing Supabase tables and `server.js`.

## Open items

- None blocking. Accent shade tweaks and final font pairing can be confirmed during implementation.
