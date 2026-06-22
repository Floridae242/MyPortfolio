# Dev Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the editorial "Gazette" portfolio with a dark-mode, high-tech React+Vite+TypeScript developer portfolio (Cyber Cyan, split terminal hero, bento grid), reusing the existing Supabase content and `admin.html` CMS.

**Architecture:** Vite + React 18 + TypeScript SPA with React Router. Single-page scroll for main sections, dedicated `/case/:slug` routes for case studies, and a themed `/admin` gateway that hands off to the existing `admin.html`. Content loads from Supabase REST with bundled `src/data/*.ts` as a graceful offline fallback. GSAP/ScrollTrigger drives reveal + parallax motion, fully degraded under `prefers-reduced-motion`.

**Tech Stack:** React 18, TypeScript, Vite, React Router, GSAP + ScrollTrigger, Vitest + Testing Library, Playwright (visual + smoke), Supabase REST.

---

## File Structure

```
MyPortfolio/
├── legacy/                         # archived Gazette (index.html, case.html, project.html, style.css, src/)
├── admin.html                      # UNCHANGED — moved into public/ at build (existing CMS)
├── api/                            # UNCHANGED — existing serverless functions
├── data/                           # UNCHANGED legacy JS (kept; TS ports live in src/data)
├── pic/                            # UNCHANGED — images, copied to public/pic
├── index.html                      # NEW Vite entry (was Gazette; Gazette → legacy/)
├── vite.config.ts                  # NEW
├── tsconfig.json / tsconfig.node.json  # NEW
├── package.json                    # MODIFIED — Vite scripts + deps
├── vercel.json                     # MODIFIED — Vite build + SPA rewrites + keep /api + /admin
├── public/
│   ├── admin.html                  # copy of root admin.html (shipped as-is)
│   └── pic/...                      # copied images
└── src/
    ├── main.tsx                    # React entry + Router
    ├── App.tsx                     # routes
    ├── lib/
    │   ├── supabase.ts             # REST client + table mappers
    │   └── animation.ts            # GSAP helpers, reduced-motion guard
    ├── data/
    │   ├── types.ts                # Project, Award, Activity, SelfDev types
    │   ├── projects.ts             # fallback data (ported)
    │   ├── awards.ts
    │   ├── activities.ts
    │   └── selfDevelopment.ts
    ├── hooks/
    │   ├── useReducedMotion.ts
    │   ├── useScrollProgress.ts
    │   └── useSupabaseData.ts      # fetch + fallback
    ├── components/
    │   ├── hero/        Hero.tsx, TerminalIntro.tsx, BackendGraph.tsx
    │   ├── bento/       BentoGrid.tsx, ProjectCard.tsx, FilterPills.tsx
    │   ├── sections/    Awards.tsx, Activities.tsx, SelfDevelopment.tsx, About.tsx, Contact.tsx
    │   ├── case-study/  CaseStudy.tsx, ProblemSolution.tsx, TechTags.tsx, MediaBlock.tsx
    │   └── ui/          GlassCard.tsx, MagneticButton.tsx, NavBar.tsx, AdminGateway.tsx
    └── styles/
        ├── tokens.css  typography.css  global.css
```

**Build order:** Phase 0 scaffold → Phase 1 tokens → Phase 2 data/hooks (TDD core) → Phase 3 UI primitives → Phase 4 hero → Phase 5 bento → Phase 6 sections → Phase 7 case study → Phase 8 admin gateway → Phase 9 routing/assembly → Phase 10 testing/perf → Phase 11 deploy config.

---

## Phase 0 — Scaffolding & Legacy Archive

### Task 0: Archive the Gazette and scaffold Vite + React + TS

**Files:**
- Create: `legacy/` (move existing site files in)
- Create: `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Modify: `package.json`

- [ ] **Step 1: Archive legacy site (do NOT touch admin.html, api/, data/, pic/)**

```bash
cd "MyPortfolio"
mkdir -p legacy
git mv index.html legacy/index.html
git mv case.html legacy/case.html 2>/dev/null || true
git mv project.html legacy/project.html 2>/dev/null || true
git mv case-smart-flema-draft.html legacy/ 2>/dev/null || true
git mv migrate.html legacy/ 2>/dev/null || true
git mv style.css legacy/style.css 2>/dev/null || true
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install react react-dom react-router-dom gsap
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom \
  vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test
```
Expected: packages added to `package.json`.

- [ ] **Step 3: Add scripts to `package.json`** (merge into existing `"scripts"`, keep `dev`/`start` for the express server renamed to `server`)

```json
{
  "scripts": {
    "server": "node server.js",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:up": "docker-compose up -d",
    "db:down": "docker-compose down"
  }
}
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 5: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
} as any);
```

- [ ] **Step 7: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 8: Create new `index.html` (Vite entry)**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Naruephon Yotmao — Full-Stack Developer</title>
    <meta name="description" content="Naruephon Yotmao (Tle) — Full-Stack Developer, CAMT CMU. Projects, awards, activities, and case studies." />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⌘</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Create minimal `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

- [ ] **Step 10: Create minimal `src/App.tsx` and placeholder styles**

```tsx
export default function App() {
  return <div style={{ padding: 40 }}>Portfolio scaffold OK</div>;
}
```
Also create empty `src/styles/global.css`, `src/styles/tokens.css`, `src/styles/typography.css` (filled in Phase 1).

- [ ] **Step 11: Verify dev server boots**

Run: `npm run dev` then `curl -s http://localhost:5173 | grep -c root`
Expected: `1` (the `#root` div is served). Stop the server.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite+React+TS app, archive Gazette to legacy/"
```

---

## Phase 1 — Design System (Cyber Cyan)

### Task 1: Design tokens, typography, global styles

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/typography.css`, `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* surfaces */
  --color-bg: oklch(14% 0.02 240);
  --color-bg-elev: oklch(18% 0.025 240);
  --color-surface: oklch(20% 0.03 240 / 0.55);
  --color-border: oklch(40% 0.04 220 / 0.35);
  --color-text: oklch(92% 0.01 220);
  --color-text-dim: oklch(70% 0.02 220);

  /* accent (Cyber Cyan) */
  --color-accent: #22d3ee;
  --color-accent-soft: #7ee7fb;
  --glow-accent: 0 0 24px rgba(34, 211, 238, 0.45);
  --glow-accent-strong: 0 0 40px rgba(34, 211, 238, 0.6);

  /* secondary syntax tokens (code snippets only) */
  --syntax-keyword: #d2a8ff;
  --syntax-string: #a5d6ff;
  --syntax-fn: #79c0ff;
  --syntax-ok: #56d364;
  --syntax-dim: #5b6675;

  /* type scale */
  --text-base: clamp(1rem, 0.92rem + 0.4vw, 1.125rem);
  --text-h2: clamp(1.6rem, 1rem + 2.5vw, 2.75rem);
  --text-hero: clamp(2.5rem, 1rem + 6vw, 5rem);

  /* rhythm */
  --space-section: clamp(4rem, 3rem + 5vw, 9rem);
  --radius: 12px;

  /* motion */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  --font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
}
```

- [ ] **Step 2: Write `src/styles/typography.css`** (preload-friendly font import)

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

body { font-family: var(--font-sans); font-size: var(--text-base); }
h1, h2, h3 { font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
code, .mono { font-family: var(--font-mono); }
```

- [ ] **Step 3: Write `src/styles/global.css`**

```css
@import './tokens.css';
@import './typography.css';

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
.container { width: min(1200px, 92vw); margin-inline: auto; }
.section { padding-block: var(--space-section); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 4: Verify build compiles**

Run: `npm run build`
Expected: build succeeds, `dist/` produced.

- [ ] **Step 5: Commit**

```bash
git add src/styles && git commit -m "feat: Cyber Cyan design tokens, typography, global styles"
```

---

## Phase 2 — Data Layer & Hooks (TDD core)

### Task 2: Type definitions

**Files:**
- Create: `src/data/types.ts`

- [ ] **Step 1: Write `src/data/types.ts`**

```ts
export type ProjectCategory = 'Competition' | 'Production' | 'Academic' | 'Honor';

export interface Project {
  slug: string;
  categories: string[];
  title: string;
  color: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  problemSolved: string;
  keyLearnings: string[];
  techStack: string[];
  role: string;
  context: string;
  result: string;
  githubUrl: string;
  liveUrl: string;
  canvaUrl: string;
}

export interface Award {
  id: number;
  category: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Activity {
  id: number;
  activityName: string;
  role: string;
  period: string;
  description: string;
  imageUrl: string | null;
  softSkills: string[];
}

export interface SelfDev {
  id: number;
  type: string;
  title: string;
  institution: string;
  date: string;
  credentialUrl: string | null;
  imageUrl: string | null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/types.ts && git commit -m "feat: data type definitions"
```

### Task 3: Port fallback data to TS modules

**Files:**
- Create: `src/data/projects.ts`, `src/data/awards.ts`, `src/data/activities.ts`, `src/data/selfDevelopment.ts`

- [ ] **Step 1: Port `data/projects.js` → `src/data/projects.ts`**

Convert the existing `const projectsData = [...]` array into:
```ts
import type { Project } from './types';
export const projects: Project[] = [
  // paste each object from data/projects.js, ensuring every field in Project is present
  // (use "" for missing githubUrl/liveUrl/canvaUrl, [] for missing arrays)
];
```
Copy all objects verbatim from `data/projects.js`, fixing field names to match `Project` and filling required fields with safe empties.

- [ ] **Step 2: Port the other three** the same way:
  - `data/awards.js` → `src/data/awards.ts` exporting `export const awards: Award[]`
  - `data/activities.js` → `src/data/activities.ts` exporting `export const activities: Activity[]` (drop the HOW-TO comment block)
  - `data/self-development.js` → `src/data/selfDevelopment.ts` exporting `export const selfDevelopment: SelfDev[]`

- [ ] **Step 3: Verify types compile**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data && git commit -m "feat: port portfolio content to typed TS modules (fallback data)"
```

### Task 4: Supabase REST mappers (TDD)

**Files:**
- Create: `src/lib/supabase.ts`
- Test: `src/lib/supabase.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { mapProject, mapActivity, mapSelfDev, SB_URL } from './supabase';

describe('supabase mappers', () => {
  it('maps snake_case project row to camelCase Project', () => {
    const row = {
      slug: 'x', categories: ['Production'], title: 'X', color: 'emerald',
      image_url: 'pic/x.png', short_description: 'short', full_description: 'full',
      problem_solved: 'prob', key_learnings: ['a'], tech_stack: ['React'],
      role: 'Dev', context: 'ctx', result: 'res',
      github_url: 'g', live_url: 'l', canva_url: 'c',
    };
    const p = mapProject(row);
    expect(p.shortDescription).toBe('short');
    expect(p.techStack).toEqual(['React']);
    expect(p.imageUrl).toBe('pic/x.png');
    expect(p.githubUrl).toBe('g');
  });

  it('maps activity row, defaulting missing arrays', () => {
    const a = mapActivity({ id: 1, activity_name: 'Club', role: 'Dev', period: '2025', description: 'd', image_url: null, soft_skills: null });
    expect(a.activityName).toBe('Club');
    expect(a.softSkills).toEqual([]);
  });

  it('maps certificate row to SelfDev with date_issued', () => {
    const s = mapSelfDev({ id: 1, type: 'Hackathon', title: 'T', institution: 'I', date_issued: '2023-11-11', credential_url: null, image_url: 'pic/c.jpg' });
    expect(s.date).toBe('2023-11-11');
    expect(s.imageUrl).toBe('pic/c.jpg');
  });

  it('exposes the rest endpoint', () => {
    expect(SB_URL).toContain('supabase.co/rest/v1');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/supabase.test.ts`
Expected: FAIL — cannot find module './supabase'.

- [ ] **Step 3: Write `src/lib/supabase.ts`**

```ts
import type { Project, Award, Activity, SelfDev } from '@/data/types';

export const SB_URL = 'https://rngeogahhatybnlhmgbz.supabase.co/rest/v1';
// anon key — read-only, already public in the prior client; never the service_role key.
const SB_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2OTUxNDgsImV4cCI6MjA5MjI3MTE0OH0.Tm1lczfkcRhTE16ygRxHRz1RlgH3moy4xneZ7cB9JIs';

const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Accept: 'application/json' };

export function mapProject(r: any): Project {
  return {
    slug: r.slug, categories: r.categories ?? [], title: r.title, color: r.color ?? 'sky',
    imageUrl: r.image_url ?? '', shortDescription: r.short_description ?? '',
    fullDescription: r.full_description ?? '', problemSolved: r.problem_solved ?? '',
    keyLearnings: r.key_learnings ?? [], techStack: r.tech_stack ?? [],
    role: r.role ?? '', context: r.context ?? '', result: r.result ?? '',
    githubUrl: r.github_url ?? '', liveUrl: r.live_url ?? '', canvaUrl: r.canva_url ?? '',
  };
}
export function mapAward(r: any): Award {
  return { id: r.id, category: r.category, title: r.title, organization: r.organization, date: r.date, description: r.description };
}
export function mapActivity(r: any): Activity {
  return { id: r.id, activityName: r.activity_name, role: r.role, period: r.period, description: r.description, imageUrl: r.image_url ?? null, softSkills: r.soft_skills ?? [] };
}
export function mapSelfDev(r: any): SelfDev {
  return { id: r.id, type: r.type, title: r.title, institution: r.institution, date: r.date_issued, credentialUrl: r.credential_url ?? null, imageUrl: r.image_url ?? null };
}

async function getJson(path: string): Promise<any[]> {
  const res = await fetch(`${SB_URL}/${path}`, { headers });
  if (!res.ok) throw new Error(`Supabase ${path} -> ${res.status}`);
  return res.json();
}

export const fetchProjects = () => getJson('projects?select=*&order=created_at.asc').then((d) => d.map(mapProject));
export const fetchAwards = () => getJson('awards?select=*&order=date.desc').then((d) => d.map(mapAward));
export const fetchActivities = () => getJson('activities?select=*&order=created_at.asc').then((d) => d.map(mapActivity));
export const fetchSelfDev = () => getJson('certificates?select=*&order=date_issued.desc').then((d) => d.map(mapSelfDev));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/supabase.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts src/lib/supabase.test.ts
git commit -m "feat: Supabase REST mappers + fetchers (TDD)"
```

### Task 5: `useSupabaseData` hook with fallback (TDD)

**Files:**
- Create: `src/hooks/useSupabaseData.ts`
- Test: `src/hooks/useSupabaseData.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSupabaseData } from './useSupabaseData';

describe('useSupabaseData', () => {
  it('returns fetched data on success', async () => {
    const fetcher = () => Promise.resolve([{ id: 1 }]);
    const { result } = renderHook(() => useSupabaseData(fetcher, [{ id: 99 }]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 1 }]);
    expect(result.current.usedFallback).toBe(false);
  });

  it('falls back to bundled data on fetch error', async () => {
    const fetcher = () => Promise.reject(new Error('network'));
    const { result } = renderHook(() => useSupabaseData(fetcher, [{ id: 99 }]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 99 }]);
    expect(result.current.usedFallback).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hooks/useSupabaseData.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/hooks/useSupabaseData.ts`**

```ts
import { useEffect, useState } from 'react';

interface State<T> { data: T[]; loading: boolean; usedFallback: boolean; }

export function useSupabaseData<T>(fetcher: () => Promise<T[]>, fallback: T[]): State<T> {
  const [state, setState] = useState<State<T>>({ data: fallback, loading: true, usedFallback: false });

  useEffect(() => {
    let active = true;
    fetcher()
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) setState({ data, loading: false, usedFallback: false });
        else setState({ data: fallback, loading: false, usedFallback: true });
      })
      .catch((err) => {
        console.warn('useSupabaseData fallback:', err);
        if (active) setState({ data: fallback, loading: false, usedFallback: true });
      });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hooks/useSupabaseData.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useSupabaseData.ts src/hooks/useSupabaseData.test.tsx
git commit -m "feat: useSupabaseData hook with graceful fallback (TDD)"
```

### Task 6: Category filtering util (TDD)

**Files:**
- Create: `src/lib/filter.ts`
- Test: `src/lib/filter.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { filterByCategory, deriveCategories } from './filter';

const items = [
  { categories: ['Production', 'Academic'] },
  { categories: ['Competition'] },
  { categories: ['Production'] },
];

describe('filterByCategory', () => {
  it('returns all when category is "All"', () => {
    expect(filterByCategory(items, 'All')).toHaveLength(3);
  });
  it('returns only matching items', () => {
    expect(filterByCategory(items, 'Production')).toHaveLength(2);
  });
  it('derives unique sorted categories with All first', () => {
    expect(deriveCategories(items)).toEqual(['All', 'Academic', 'Competition', 'Production']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/filter.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/lib/filter.ts`**

```ts
export function filterByCategory<T extends { categories: string[] }>(items: T[], category: string): T[] {
  if (category === 'All') return items;
  return items.filter((i) => i.categories.includes(category));
}

export function deriveCategories<T extends { categories: string[] }>(items: T[]): string[] {
  const set = new Set<string>();
  items.forEach((i) => i.categories.forEach((c) => set.add(c)));
  return ['All', ...Array.from(set).sort()];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/filter.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/filter.ts src/lib/filter.test.ts
git commit -m "feat: category filter util (TDD)"
```

### Task 7: Reduced-motion + animation helpers

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/lib/animation.ts`
- Test: `src/hooks/useReducedMotion.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: true, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('useReducedMotion', () => {
  it('returns true when the media query matches', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hooks/useReducedMotion.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/hooks/useReducedMotion.ts`**

```ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 4: Write `src/lib/animation.ts`** (lazy GSAP loader so it's not in the main chunk)

```ts
export async function loadGsap() {
  const gsap = (await import('gsap')).default;
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/hooks/useReducedMotion.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useReducedMotion.ts src/hooks/useReducedMotion.test.tsx src/lib/animation.ts
git commit -m "feat: reduced-motion hook + lazy GSAP loader"
```

---

## Phase 3 — UI Primitives

### Task 8: GlassCard

**Files:**
- Create: `src/components/ui/GlassCard.tsx`, `src/components/ui/glass-card.css`
- Test: `src/components/ui/GlassCard.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  it('renders children inside an article with the glass-card class', () => {
    render(<GlassCard>hello</GlassCard>);
    const el = screen.getByText('hello');
    expect(el).toBeInTheDocument();
    expect(el.closest('.glass-card')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/GlassCard.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ui/glass-card.css`**

```css
.glass-card {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  padding: 1.25rem;
  transition: transform var(--duration-normal) var(--ease-out-expo),
              border-color var(--duration-normal), box-shadow var(--duration-normal);
  will-change: transform;
}
.glass-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--glow-accent);
}
.glass-card:focus-within { border-color: var(--color-accent); box-shadow: var(--glow-accent); }
```

- [ ] **Step 4: Write `src/components/ui/GlassCard.tsx`**

```tsx
import type { ReactNode } from 'react';
import './glass-card.css';

export function GlassCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <article className={`glass-card ${className}`} style={style}>{children}</article>;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ui/GlassCard.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/GlassCard.tsx src/components/ui/glass-card.css src/components/ui/GlassCard.test.tsx
git commit -m "feat: GlassCard primitive"
```

### Task 9: MagneticButton

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`, `src/components/ui/magnetic-button.css`
- Test: `src/components/ui/MagneticButton.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MagneticButton } from './MagneticButton';

describe('MagneticButton', () => {
  it('renders label and fires onClick', () => {
    const onClick = vi.fn();
    render(<MagneticButton onClick={onClick}>Projects</MagneticButton>);
    fireEvent.click(screen.getByText('Projects'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/MagneticButton.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ui/magnetic-button.css`**

```css
.magnetic-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.7rem 1.4rem; border-radius: 8px;
  font-family: var(--font-mono); font-size: 0.95rem; cursor: pointer;
  background: rgba(34, 211, 238, 0.1); color: var(--color-accent-soft);
  border: 1px solid var(--color-accent);
  transition: transform var(--duration-fast) var(--ease-out-expo), box-shadow var(--duration-fast);
  will-change: transform;
}
.magnetic-btn:hover { box-shadow: var(--glow-accent); }
.magnetic-btn.ghost { background: transparent; color: var(--color-text-dim); border-color: var(--color-border); }
```

- [ ] **Step 4: Write `src/components/ui/MagneticButton.tsx`**

```tsx
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './magnetic-button.css';

export function MagneticButton({ children, onClick, variant = 'solid' }: { children: ReactNode; onClick?: () => void; variant?: 'solid' | 'ghost' }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function reset() { if (ref.current) ref.current.style.transform = ''; }

  return (
    <button ref={ref} className={`magnetic-btn ${variant === 'ghost' ? 'ghost' : ''}`} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ui/MagneticButton.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/MagneticButton.tsx src/components/ui/magnetic-button.css src/components/ui/MagneticButton.test.tsx
git commit -m "feat: MagneticButton primitive"
```

### Task 10: NavBar

**Files:**
- Create: `src/components/ui/NavBar.tsx`, `src/components/ui/navbar.css`
- Test: `src/components/ui/NavBar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the main section links', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Awards/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/NavBar.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ui/navbar.css`**

```css
.navbar {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; gap: 1.5rem;
  padding: 0.9rem clamp(1rem, 4vw, 3rem);
  background: oklch(14% 0.02 240 / 0.7); backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}
.navbar .brand { font-family: var(--font-mono); color: var(--color-accent); font-weight: 700; }
.navbar nav { display: flex; gap: 1.2rem; margin-left: auto; font-family: var(--font-mono); font-size: 0.9rem; }
.navbar nav a { color: var(--color-text-dim); transition: color var(--duration-fast); }
.navbar nav a:hover { color: var(--color-accent-soft); }
@media (max-width: 640px) { .navbar nav { display: none; } }
```

- [ ] **Step 4: Write `src/components/ui/NavBar.tsx`**

```tsx
import { Link } from 'react-router-dom';
import './navbar.css';

const LINKS = [
  ['Projects', '#projects'], ['Awards', '#awards'], ['Activities', '#activities'],
  ['Growth', '#self-development'], ['About', '#about'], ['Contact', '#contact'],
] as const;

export function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">~/naruephon</Link>
      <nav aria-label="Main navigation">
        {LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <Link to="/admin" aria-label="Admin">·</Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ui/NavBar.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/NavBar.tsx src/components/ui/navbar.css src/components/ui/NavBar.test.tsx
git commit -m "feat: sticky NavBar with discreet admin link"
```

---

## Phase 4 — Hero

### Task 11: TerminalIntro (typing animation)

**Files:**
- Create: `src/components/hero/TerminalIntro.tsx`, `src/components/hero/terminal.css`
- Test: `src/components/hero/TerminalIntro.test.tsx`

- [ ] **Step 1: Write the failing test** (reduced-motion shows final text immediately)

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TerminalIntro } from './TerminalIntro';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: true, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('TerminalIntro', () => {
  it('renders the full name immediately under reduced motion', () => {
    render(<TerminalIntro />);
    expect(screen.getByText(/Naruephon Yotmao/)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack Developer/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/hero/TerminalIntro.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/hero/terminal.css`**

```css
.terminal {
  border: 1px solid rgba(34, 211, 238, 0.25); border-radius: 10px;
  background: rgba(8, 13, 20, 0.85); box-shadow: var(--glow-accent);
  font-family: var(--font-mono); max-width: 480px;
}
.terminal .bar { display: flex; gap: 6px; padding: 9px 12px; border-bottom: 1px solid rgba(34, 211, 238, 0.15); }
.terminal .dot { width: 9px; height: 9px; border-radius: 50%; }
.terminal .body { padding: 1.1rem; line-height: 1.8; font-size: 0.9rem; }
.terminal .name { font-size: clamp(1.6rem, 1rem + 3vw, 2.4rem); color: var(--color-accent-soft); text-shadow: var(--glow-accent); margin: 0.3rem 0; }
.terminal .prompt { color: var(--color-accent); }
.terminal .muted { color: var(--syntax-dim); }
.caret { animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

- [ ] **Step 4: Write `src/components/hero/TerminalIntro.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './terminal.css';

const LINES = ['whoami', 'Naruephon Yotmao', 'Full-Stack Developer · CAMT, CMU'];

export function TerminalIntro() {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) { setShown(LINES.length); return; }
    setShown(0);
    let i = 0;
    const id = setInterval(() => { i += 1; setShown(i); if (i >= LINES.length) clearInterval(id); }, 700);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="terminal">
      <div className="bar">
        <span className="dot" style={{ background: '#ff5f56' }} />
        <span className="dot" style={{ background: '#ffbd2e' }} />
        <span className="dot" style={{ background: '#27c93f' }} />
        <span className="muted" style={{ marginLeft: 'auto', fontSize: 11 }}>~/naruephon</span>
      </div>
      <div className="body">
        <div><span className="prompt">$</span> {LINES[0]}</div>
        {shown >= 2 && <div className="name">Naruephon Yotmao<span className="caret">▋</span></div>}
        {shown >= 3 && <div className="muted">Full-Stack Developer · CAMT, CMU</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/hero/TerminalIntro.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/TerminalIntro.tsx src/components/hero/terminal.css src/components/hero/TerminalIntro.test.tsx
git commit -m "feat: TerminalIntro typing hero (reduced-motion safe)"
```

### Task 12: BackendGraph (animated SVG nodes)

**Files:**
- Create: `src/components/hero/BackendGraph.tsx`, `src/components/hero/backend-graph.css`
- Test: `src/components/hero/BackendGraph.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BackendGraph } from './BackendGraph';

describe('BackendGraph', () => {
  it('renders an svg with the four backend nodes', () => {
    const { container } = render(<BackendGraph />);
    expect(container.querySelector('svg')).not.toBeNull();
    ['API', 'CMS', 'DB', 'WS'].forEach((label) => {
      expect(container.textContent).toContain(label);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/hero/BackendGraph.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/hero/backend-graph.css`**

```css
.backend-graph { width: 100%; max-width: 460px; }
.backend-graph .edge { stroke: rgba(34, 211, 238, 0.35); stroke-width: 1.5; }
.backend-graph .pulse { stroke-dasharray: 4 6; animation: dash 2s linear infinite; }
.backend-graph .node { fill: #0a0e14; stroke: var(--color-accent); stroke-width: 2; filter: drop-shadow(0 0 6px var(--color-accent)); }
.backend-graph text { fill: var(--color-accent-soft); font: 9px var(--font-mono); text-anchor: middle; }
@keyframes dash { to { stroke-dashoffset: -20; } }
@media (prefers-reduced-motion: reduce) { .backend-graph .pulse { animation: none; } }
```

- [ ] **Step 4: Write `src/components/hero/BackendGraph.tsx`**

```tsx
import './backend-graph.css';

export function BackendGraph() {
  return (
    <svg className="backend-graph" viewBox="0 0 200 200" role="img" aria-label="Backend architecture: API connected to CMS, database, and WebSocket">
      <g>
        <line className="edge pulse" x1="100" y1="40" x2="50" y2="110" />
        <line className="edge pulse" x1="100" y1="40" x2="150" y2="110" />
        <line className="edge pulse" x1="50" y1="110" x2="100" y2="170" />
        <line className="edge pulse" x1="150" y1="110" x2="100" y2="170" />
        <line className="edge" x1="50" y1="110" x2="150" y2="110" />
      </g>
      <g>
        <circle className="node" cx="100" cy="40" r="16" />
        <circle className="node" cx="50" cy="110" r="13" />
        <circle className="node" cx="150" cy="110" r="13" />
        <circle className="node" cx="100" cy="170" r="13" />
      </g>
      <g>
        <text x="100" y="43">API</text>
        <text x="50" y="113">CMS</text>
        <text x="150" y="113">DB</text>
        <text x="100" y="173">WS</text>
      </g>
    </svg>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/hero/BackendGraph.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/BackendGraph.tsx src/components/hero/backend-graph.css src/components/hero/BackendGraph.test.tsx
git commit -m "feat: animated BackendGraph SVG"
```

### Task 13: Hero (compose split layout)

**Files:**
- Create: `src/components/hero/Hero.tsx`, `src/components/hero/hero.css`
- Test: `src/components/hero/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders terminal intro, backend graph, and CTAs', () => {
    const { container } = render(<MemoryRouter><Hero /></MemoryRouter>);
    expect(screen.getByText(/Naruephon Yotmao/)).toBeInTheDocument();
    expect(container.querySelector('svg.backend-graph')).not.toBeNull();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/hero/Hero.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/hero/hero.css`**

```css
.hero { min-height: 92vh; display: grid; place-items: center; position: relative; overflow: hidden; }
.hero::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px);
  background-size: 24px 24px; pointer-events: none;
}
.hero .split { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; width: min(1100px, 92vw); }
.hero .ctas { display: flex; gap: 0.8rem; margin-top: 1.2rem; }
@media (max-width: 820px) { .hero .split { grid-template-columns: 1fr; gap: 2rem; } .hero .graph-col { order: -1; } }
```

- [ ] **Step 4: Write `src/components/hero/Hero.tsx`**

```tsx
import { TerminalIntro } from './TerminalIntro';
import { BackendGraph } from './BackendGraph';
import { MagneticButton } from '@/components/ui/MagneticButton';
import './hero.css';

export function Hero() {
  const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero" aria-label="Introduction">
      <div className="split">
        <div>
          <TerminalIntro />
          <div className="ctas">
            <MagneticButton onClick={go('projects')}>Projects →</MagneticButton>
            <MagneticButton variant="ghost" onClick={go('contact')}>Contact</MagneticButton>
          </div>
        </div>
        <div className="graph-col" style={{ display: 'grid', placeItems: 'center' }}>
          <BackendGraph />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/hero/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/Hero.tsx src/components/hero/hero.css src/components/hero/Hero.test.tsx
git commit -m "feat: split-layout Hero"
```

---

## Phase 5 — Bento Projects

### Task 14: ProjectCard

**Files:**
- Create: `src/components/bento/ProjectCard.tsx`, `src/components/bento/project-card.css`
- Test: `src/components/bento/ProjectCard.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/data/types';

const p: Project = {
  slug: 'smart-flema', categories: ['Competition'], title: 'Smart Flema', color: 'emerald',
  imageUrl: 'pic/1.png', shortDescription: 'CV heatmaps', fullDescription: '', problemSolved: '',
  keyLearnings: [], techStack: ['AI', 'CV'], role: '', context: '', result: '',
  githubUrl: '', liveUrl: '', canvaUrl: '',
};

describe('ProjectCard', () => {
  it('renders title, short description, tech tags, and links to the case route', () => {
    render(<MemoryRouter><ProjectCard project={p} /></MemoryRouter>);
    expect(screen.getByText('Smart Flema')).toBeInTheDocument();
    expect(screen.getByText('CV heatmaps')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/case/smart-flema');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/bento/ProjectCard.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/bento/project-card.css`**

```css
.project-card { display: flex; flex-direction: column; height: 100%; gap: 0.6rem; }
.project-card h3 { color: var(--color-text); font-size: 1.15rem; }
.project-card.featured h3 { font-size: 1.6rem; color: var(--color-accent-soft); text-shadow: var(--glow-accent); }
.project-card .desc { color: var(--color-text-dim); font-size: 0.9rem; flex: 1; }
.project-card .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.project-card .tag { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-accent); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.15rem 0.5rem; }
.project-card .cats { font-family: var(--font-mono); font-size: 0.7rem; color: var(--syntax-dim); }
```

- [ ] **Step 4: Write `src/components/bento/ProjectCard.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project } from '@/data/types';
import './project-card.css';

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <GlassCard className={`project-card ${featured ? 'featured' : ''}`}>
      <Link to={`/case/${project.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
        <span className="cats">{project.categories.join(' · ')}</span>
        <h3>{featured ? '★ ' : ''}{project.title}</h3>
        <p className="desc">{project.shortDescription}</p>
        <div className="tags">
          {project.techStack.slice(0, featured ? 6 : 3).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </Link>
    </GlassCard>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/bento/ProjectCard.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/bento/ProjectCard.tsx src/components/bento/project-card.css src/components/bento/ProjectCard.test.tsx
git commit -m "feat: ProjectCard"
```

### Task 15: FilterPills

**Files:**
- Create: `src/components/bento/FilterPills.tsx`, `src/components/bento/filter-pills.css`
- Test: `src/components/bento/FilterPills.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPills } from './FilterPills';

describe('FilterPills', () => {
  it('renders categories and calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<FilterPills categories={['All', 'Production']} active="All" onChange={onChange} />);
    fireEvent.click(screen.getByText('Production'));
    expect(onChange).toHaveBeenCalledWith('Production');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/bento/FilterPills.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/bento/filter-pills.css`**

```css
.filter-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.pill { font-family: var(--font-mono); font-size: 0.82rem; padding: 0.35rem 0.9rem; border-radius: 20px; cursor: pointer; color: var(--syntax-dim); background: transparent; border: 1px solid var(--color-border); transition: all var(--duration-fast); }
.pill:hover { color: var(--color-accent-soft); }
.pill.active { color: var(--color-accent-soft); border-color: var(--color-accent); background: rgba(34, 211, 238, 0.1); box-shadow: var(--glow-accent); }
```

- [ ] **Step 4: Write `src/components/bento/FilterPills.tsx`**

```tsx
import './filter-pills.css';

export function FilterPills({ categories, active, onChange }: { categories: string[]; active: string; onChange: (c: string) => void }) {
  return (
    <div className="filter-pills" role="tablist" aria-label="Project categories">
      {categories.map((c) => (
        <button key={c} role="tab" aria-selected={c === active} className={`pill ${c === active ? 'active' : ''}`} onClick={() => onChange(c)}>{c}</button>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/bento/FilterPills.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/bento/FilterPills.tsx src/components/bento/filter-pills.css src/components/bento/FilterPills.test.tsx
git commit -m "feat: FilterPills"
```

### Task 16: BentoGrid (compose with filter + featured)

**Files:**
- Create: `src/components/bento/BentoGrid.tsx`, `src/components/bento/bento-grid.css`
- Test: `src/components/bento/BentoGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BentoGrid } from './BentoGrid';
import type { Project } from '@/data/types';

const mk = (slug: string, cat: string): Project => ({
  slug, categories: [cat], title: slug, color: 'sky', imageUrl: '', shortDescription: 's',
  fullDescription: '', problemSolved: '', keyLearnings: [], techStack: [], role: '', context: '', result: '',
  githubUrl: '', liveUrl: '', canvaUrl: '',
});

describe('BentoGrid', () => {
  it('renders all projects and filters by category', () => {
    const projects = [mk('a', 'Production'), mk('b', 'Competition')];
    render(<MemoryRouter><BentoGrid projects={projects} /></MemoryRouter>);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Competition'));
    expect(screen.queryByText('a')).toBeNull();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/bento/BentoGrid.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/bento/bento-grid.css`**

```css
.bento { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(150px, auto); gap: 1rem; }
.bento > :first-child { grid-column: span 2; grid-row: span 2; }
.bento > * { grid-column: span 2; }
@media (max-width: 900px) { .bento { grid-template-columns: repeat(2, 1fr); } .bento > :first-child { grid-column: span 2; grid-row: span 1; } }
@media (max-width: 560px) { .bento { grid-template-columns: 1fr; } .bento > *, .bento > :first-child { grid-column: span 1; } }
```

- [ ] **Step 4: Write `src/components/bento/BentoGrid.tsx`**

```tsx
import { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { FilterPills } from './FilterPills';
import { filterByCategory, deriveCategories } from '@/lib/filter';
import type { Project } from '@/data/types';
import './bento-grid.css';

export function BentoGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');
  const categories = useMemo(() => deriveCategories(projects), [projects]);
  const visible = useMemo(() => filterByCategory(projects, active), [projects, active]);

  return (
    <div>
      <FilterPills categories={categories} active={active} onChange={setActive} />
      <div className="bento">
        {visible.map((p, i) => <ProjectCard key={p.slug} project={p} featured={i === 0} />)}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/bento/BentoGrid.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/bento/BentoGrid.tsx src/components/bento/bento-grid.css src/components/bento/BentoGrid.test.tsx
git commit -m "feat: BentoGrid with filter + featured tile"
```

---

## Phase 6 — Secondary Sections

### Task 17: Awards, Activities, SelfDevelopment, About, Contact

**Files:**
- Create: `src/components/sections/Awards.tsx`, `Activities.tsx`, `SelfDevelopment.tsx`, `About.tsx`, `Contact.tsx`, `sections.css`
- Test: `src/components/sections/Awards.test.tsx`

- [ ] **Step 1: Write the failing test (Awards representative)**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Awards } from './Awards';
import type { Award } from '@/data/types';

const awards: Award[] = [{ id: 1, category: 'Competition', title: 'Gold Medalist', organization: 'X', date: '2023-01-20', description: 'desc' }];

describe('Awards', () => {
  it('renders award title and organization', () => {
    render(<Awards awards={awards} />);
    expect(screen.getByText('Gold Medalist')).toBeInTheDocument();
    expect(screen.getByText(/X/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/Awards.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/sections/sections.css`**

```css
.section-head { margin-bottom: 2rem; }
.section-head h2 { font-size: var(--text-h2); }
.section-head .kicker { font-family: var(--font-mono); color: var(--color-accent); font-size: 0.85rem; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.meta { font-family: var(--font-mono); font-size: 0.75rem; color: var(--syntax-dim); }
.skill-tag { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-accent); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.1rem 0.45rem; margin: 0.15rem 0.15rem 0 0; display: inline-block; }
```

- [ ] **Step 4: Write the five section components**

`src/components/sections/Awards.tsx`:
```tsx
import { GlassCard } from '@/components/ui/GlassCard';
import type { Award } from '@/data/types';
import './sections.css';

export function Awards({ awards }: { awards: Award[] }) {
  return (
    <section id="awards" className="section container" aria-labelledby="awards-h">
      <div className="section-head"><div className="kicker">// awards</div><h2 id="awards-h">Awards & Honors</h2></div>
      <div className="card-grid">
        {awards.map((a) => (
          <GlassCard key={a.id}>
            <div className="meta">{a.category} · {a.date}</div>
            <h3 style={{ fontSize: '1.05rem', margin: '0.3rem 0' }}>{a.title}</h3>
            <div className="meta">{a.organization}</div>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.88rem', marginTop: '0.5rem' }}>{a.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
```

`src/components/sections/Activities.tsx`:
```tsx
import { GlassCard } from '@/components/ui/GlassCard';
import type { Activity } from '@/data/types';
import './sections.css';

export function Activities({ activities }: { activities: Activity[] }) {
  return (
    <section id="activities" className="section container" aria-labelledby="act-h">
      <div className="section-head"><div className="kicker">// activities</div><h2 id="act-h">Activities</h2></div>
      <div className="card-grid">
        {activities.map((a) => (
          <GlassCard key={a.id}>
            <div className="meta">{a.role} · {a.period}</div>
            <h3 style={{ fontSize: '1.05rem', margin: '0.3rem 0' }}>{a.activityName}</h3>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.88rem' }}>{a.description}</p>
            <div style={{ marginTop: '0.5rem' }}>{a.softSkills.map((s) => <span key={s} className="skill-tag">{s}</span>)}</div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
```

`src/components/sections/SelfDevelopment.tsx`:
```tsx
import { GlassCard } from '@/components/ui/GlassCard';
import type { SelfDev } from '@/data/types';
import './sections.css';

export function SelfDevelopment({ items }: { items: SelfDev[] }) {
  return (
    <section id="self-development" className="section container" aria-labelledby="sd-h">
      <div className="section-head"><div className="kicker">// growth</div><h2 id="sd-h">Self-Development</h2></div>
      <div className="card-grid">
        {items.map((s) => (
          <GlassCard key={s.id}>
            <div className="meta">{s.type} · {s.date}</div>
            <h3 style={{ fontSize: '1.02rem', margin: '0.3rem 0' }}>{s.title}</h3>
            <div className="meta">{s.institution}</div>
            {s.credentialUrl && <a href={s.credentialUrl} target="_blank" rel="noreferrer" className="meta" style={{ color: 'var(--color-accent)' }}>credential →</a>}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
```

`src/components/sections/About.tsx`:
```tsx
import './sections.css';

export function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-h">
      <div className="section-head"><div className="kicker">// about</div><h2 id="about-h">About</h2></div>
      <p style={{ maxWidth: '60ch', color: 'var(--color-text-dim)', fontSize: '1.05rem', lineHeight: 1.7 }}>
        Full-stack developer and Digital Industry student at CAMT, Chiang Mai University. I build systems,
        fix problems, and turn data into decisions — across web, IoT, and civic tech.
      </p>
    </section>
  );
}
```

`src/components/sections/Contact.tsx`:
```tsx
import { MagneticButton } from '@/components/ui/MagneticButton';
import './sections.css';

export function Contact() {
  return (
    <section id="contact" className="section container" aria-labelledby="contact-h">
      <div className="section-head"><div className="kicker">// contact</div><h2 id="contact-h">Get in touch</h2></div>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <a href="mailto:naruephonyotmao@gmail.com"><MagneticButton>Email →</MagneticButton></a>
        <a href="https://github.com/Floridae242" target="_blank" rel="noreferrer"><MagneticButton variant="ghost">GitHub</MagneticButton></a>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/sections/Awards.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections
git commit -m "feat: Awards, Activities, SelfDevelopment, About, Contact sections"
```

---

## Phase 7 — Case Study Route

### Task 18: CaseStudy sub-components

**Files:**
- Create: `src/components/case-study/TechTags.tsx`, `ProblemSolution.tsx`, `MediaBlock.tsx`, `case-study.css`
- Test: `src/components/case-study/ProblemSolution.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProblemSolution } from './ProblemSolution';

describe('ProblemSolution', () => {
  it('renders problem and solution text with headings', () => {
    render(<ProblemSolution problem="the problem" solution="the solution" />);
    expect(screen.getByText('the problem')).toBeInTheDocument();
    expect(screen.getByText('the solution')).toBeInTheDocument();
    expect(screen.getByText(/Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Solution/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/case-study/ProblemSolution.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/case-study/case-study.css`**

```css
.case { width: min(900px, 92vw); margin-inline: auto; padding-block: 3rem; }
.case h1 { font-size: clamp(2rem, 1rem + 4vw, 3.5rem); color: var(--color-accent-soft); text-shadow: var(--glow-accent); }
.case .context { font-family: var(--font-mono); color: var(--syntax-dim); margin-bottom: 2rem; }
.ps { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0; }
.ps .label { font-family: var(--font-mono); color: var(--color-accent); font-size: 0.85rem; }
.ps p { color: var(--color-text-dim); line-height: 1.7; margin-top: 0.5rem; }
@media (max-width: 700px) { .ps { grid-template-columns: 1fr; } }
.tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tech-tags .tag { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-accent); border: 1px solid var(--color-accent); border-radius: 6px; padding: 0.2rem 0.6rem; }
.media-block { border: 1px solid var(--color-border); border-radius: var(--radius); overflow: hidden; margin: 1.5rem 0; }
.media-block img { width: 100%; height: auto; display: block; }
.media-block .ph { aspect-ratio: 16/9; display: grid; place-items: center; color: var(--syntax-dim); font-family: var(--font-mono); background: var(--color-bg-elev); }
```

- [ ] **Step 4: Write the three sub-components**

`src/components/case-study/ProblemSolution.tsx`:
```tsx
import './case-study.css';
export function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="ps">
      <div><div className="label">// Problem</div><p>{problem}</p></div>
      <div><div className="label">// Solution</div><p>{solution}</p></div>
    </div>
  );
}
```

`src/components/case-study/TechTags.tsx`:
```tsx
import './case-study.css';
export function TechTags({ tags }: { tags: string[] }) {
  return <div className="tech-tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>;
}
```

`src/components/case-study/MediaBlock.tsx`:
```tsx
import './case-study.css';
export function MediaBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="media-block">
      {src ? <img src={src} alt={alt} loading="lazy" /> : <div className="ph">[ media ]</div>}
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/case-study/ProblemSolution.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study/ProblemSolution.tsx src/components/case-study/TechTags.tsx src/components/case-study/MediaBlock.tsx src/components/case-study/case-study.css src/components/case-study/ProblemSolution.test.tsx
git commit -m "feat: case study sub-components"
```

### Task 19: CaseStudy page (route by slug)

**Files:**
- Create: `src/components/case-study/CaseStudy.tsx`
- Test: `src/components/case-study/CaseStudy.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CaseStudy } from './CaseStudy';

describe('CaseStudy', () => {
  it('renders the matching project by slug', () => {
    render(
      <MemoryRouter initialEntries={['/case/smart-flema']}>
        <Routes><Route path="/case/:slug" element={<CaseStudy />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Smart Flema/)).toBeInTheDocument();
  });

  it('shows a not-found state for an unknown slug', () => {
    render(
      <MemoryRouter initialEntries={['/case/does-not-exist']}>
        <Routes><Route path="/case/:slug" element={<CaseStudy />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/case-study/CaseStudy.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/case-study/CaseStudy.tsx`** (reads from bundled data for synchronous render + tests; Supabase enrichment optional later)

```tsx
import { Link, useParams } from 'react-router-dom';
import { projects } from '@/data/projects';
import { ProblemSolution } from './ProblemSolution';
import { TechTags } from './TechTags';
import { MediaBlock } from './MediaBlock';
import { MagneticButton } from '@/components/ui/MagneticButton';
import './case-study.css';

export function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="case">
        <h1>404 — case not found</h1>
        <p className="context">No case study exists for "{slug}".</p>
        <Link to="/"><MagneticButton>← Back home</MagneticButton></Link>
      </div>
    );
  }

  return (
    <article className="case">
      <Link to="/" className="context">← index</Link>
      <h1>{project.title}</h1>
      <div className="context">{project.context} · {project.role}</div>
      <MediaBlock src={project.imageUrl} alt={project.title} />
      <ProblemSolution problem={project.problemSolved} solution={project.fullDescription} />
      <h3 style={{ margin: '1.5rem 0 0.5rem' }}>Tech stack</h3>
      <TechTags tags={project.techStack} />
      {project.keyLearnings.length > 0 && (
        <>
          <h3 style={{ margin: '1.5rem 0 0.5rem' }}>Key learnings</h3>
          <ul style={{ color: 'var(--color-text-dim)', lineHeight: 1.7, paddingLeft: '1.1rem' }}>
            {project.keyLearnings.map((k) => <li key={k}>{k}</li>)}
          </ul>
        </>
      )}
      {project.result && (<><h3 style={{ margin: '1.5rem 0 0.5rem' }}>Result</h3><p style={{ color: 'var(--color-text-dim)', lineHeight: 1.7 }}>{project.result}</p></>)}
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">GitHub</MagneticButton></a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">Live</MagneticButton></a>}
        {project.canvaUrl && <a href={project.canvaUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">Deck</MagneticButton></a>}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/case-study/CaseStudy.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/CaseStudy.tsx src/components/case-study/CaseStudy.test.tsx
git commit -m "feat: CaseStudy page with slug routing + not-found state"
```

---

## Phase 8 — Admin Gateway

### Task 20: AdminGateway (themed entry → existing admin.html)

**Files:**
- Create: `src/components/ui/AdminGateway.tsx`, `src/components/ui/admin-gateway.css`
- Test: `src/components/ui/AdminGateway.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdminGateway } from './AdminGateway';

describe('AdminGateway', () => {
  it('renders a themed gateway that links to the existing admin.html CMS', () => {
    render(<AdminGateway />);
    const link = screen.getByRole('link', { name: /enter cms/i });
    expect(link).toHaveAttribute('href', '/admin.html');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/AdminGateway.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ui/admin-gateway.css`**

```css
.admin-gate { min-height: 100vh; display: grid; place-items: center; }
.admin-gate .panel { width: min(420px, 92vw); border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); backdrop-filter: blur(12px); padding: 2rem; box-shadow: var(--glow-accent); font-family: var(--font-mono); }
.admin-gate .lock { font-size: 1.6rem; color: var(--color-accent); text-shadow: var(--glow-accent); }
.admin-gate .row { color: var(--syntax-dim); margin: 0.4rem 0; }
.admin-gate a.enter { display: inline-flex; margin-top: 1.2rem; padding: 0.7rem 1.4rem; border-radius: 8px; border: 1px solid var(--color-accent); color: var(--color-accent-soft); background: rgba(34,211,238,0.1); }
.admin-gate a.enter:hover { box-shadow: var(--glow-accent); }
```

- [ ] **Step 4: Write `src/components/ui/AdminGateway.tsx`** (the existing `admin.html` does the real auth; this is the themed front door)

```tsx
import { Link } from 'react-router-dom';
import './admin-gateway.css';

export function AdminGateway() {
  return (
    <div className="admin-gate">
      <div className="panel">
        <div className="lock">◈ secure gateway</div>
        <div className="row">$ auth --realm cms</div>
        <div className="row">// credentials handled by the CMS</div>
        <a className="enter" href="/admin.html" aria-label="Enter CMS">Enter CMS →</a>
        <div style={{ marginTop: '1rem' }}><Link to="/" className="row">← back to site</Link></div>
      </div>
    </div>
  );
}
```

> Note: `href="/admin.html"` (a full-page nav, NOT a React `Link`) so the browser loads the existing static CMS outside the SPA. Confirm `admin.html` ships to `dist/` via Phase 11.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ui/AdminGateway.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/AdminGateway.tsx src/components/ui/admin-gateway.css src/components/ui/AdminGateway.test.tsx
git commit -m "feat: themed admin gateway to existing CMS"
```

---

## Phase 9 — Routing & Page Assembly

### Task 21: Home page composition + App routes

**Files:**
- Create: `src/components/Home.tsx`, `src/components/Projects.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing', () => {
  it('renders the home hero at /', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    expect(screen.getByText(/Naruephon Yotmao/)).toBeInTheDocument();
  });
  it('renders the admin gateway at /admin', () => {
    render(<MemoryRouter initialEntries={['/admin']}><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /enter cms/i })).toBeInTheDocument();
  });
});
```

> NOTE: `App` must render routes WITHOUT its own `<BrowserRouter>` (the router is provided by `main.tsx` in prod and `MemoryRouter` in tests). Keep the router only in `main.tsx`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL — current App is a placeholder.

- [ ] **Step 3: Create `src/components/Projects.tsx`** (section wrapper with data hook)

```tsx
import { BentoGrid } from './bento/BentoGrid';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fetchProjects } from '@/lib/supabase';
import { projects as fallback } from '@/data/projects';
import './sections/sections.css';

export function Projects() {
  const { data } = useSupabaseData(fetchProjects, fallback);
  return (
    <section id="projects" className="section container" aria-labelledby="proj-h">
      <div className="section-head"><div className="kicker">// projects</div><h2 id="proj-h">Selected Work</h2></div>
      <BentoGrid projects={data} />
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/Home.tsx`**

```tsx
import { Hero } from './hero/Hero';
import { Projects } from './Projects';
import { Awards } from './sections/Awards';
import { Activities } from './sections/Activities';
import { SelfDevelopment } from './sections/SelfDevelopment';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fetchAwards, fetchActivities, fetchSelfDev } from '@/lib/supabase';
import { awards as awardsFallback } from '@/data/awards';
import { activities as activitiesFallback } from '@/data/activities';
import { selfDevelopment as sdFallback } from '@/data/selfDevelopment';

export function Home() {
  const { data: awards } = useSupabaseData(fetchAwards, awardsFallback);
  const { data: activities } = useSupabaseData(fetchActivities, activitiesFallback);
  const { data: sd } = useSupabaseData(fetchSelfDev, sdFallback);
  return (
    <main>
      <Hero />
      <Projects />
      <Awards awards={awards} />
      <Activities activities={activities} />
      <SelfDevelopment items={sd} />
      <About />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 5: Rewrite `src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/NavBar';
import { Home } from './components/Home';
import { CaseStudy } from './components/case-study/CaseStudy';
import { AdminGateway } from './components/ui/AdminGateway';

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminGateway />} />
      <Route path="*" element={<><NavBar /><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:slug" element={<CaseStudy />} />
      </Routes></>} />
    </Routes>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Run the full unit suite + build**

Run: `npm run test && npm run build`
Expected: all tests pass; build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/components/Home.tsx src/components/Projects.tsx src/App.test.tsx
git commit -m "feat: assemble Home page + App routes (home, case, admin)"
```

---

## Phase 10 — Motion, E2E & Visual Regression

### Task 22: GSAP scroll reveals (progressive enhancement)

**Files:**
- Create: `src/hooks/useScrollProgress.ts` (used by section reveal)
- Modify: `src/components/Home.tsx` to wrap sections with a reveal effect
- Test: covered by E2E (visual) — no unit test for GSAP side effects

- [ ] **Step 1: Write `src/hooks/useScrollProgress.ts`** (reveal-on-enter, reduced-motion safe)

```ts
import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollReveal(selector = '.section') {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return; // sections are visible by default; no-op under reduced motion
    let cleanup = () => {};
    import('@/lib/animation').then(({ loadGsap }) =>
      loadGsap().then(({ gsap, ScrollTrigger }) => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        const tweens = els.map((el) =>
          gsap.from(el, {
            opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }),
        );
        cleanup = () => { tweens.forEach((t) => t.scrollTrigger?.kill()); };
      }),
    );
    return () => cleanup();
  }, [reduced, selector]);
}
```

- [ ] **Step 2: Wire it into `src/components/Home.tsx`** — add `useScrollReveal()` call at the top of the `Home` component body (after the data hooks).

```tsx
// add import
import { useScrollReveal } from '@/hooks/useScrollProgress';
// inside Home(), after the three useSupabaseData calls:
useScrollReveal();
```

- [ ] **Step 3: Verify build + unit tests still pass**

Run: `npm run test && npm run build`
Expected: PASS + build OK.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useScrollProgress.ts src/components/Home.tsx
git commit -m "feat: GSAP scroll reveals (reduced-motion safe)"
```

### Task 23: Playwright smoke + visual regression

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`, `e2e/visual.spec.ts`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: { command: 'npm run build && npm run preview -- --port 4173', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI, timeout: 120000 },
  use: { baseURL: 'http://localhost:4173' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
```

- [ ] **Step 2: Write `e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('home hero loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/Naruephon Yotmao/)).toBeVisible();
});

test('projects render and a case study opens', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.bento .glass-card').first()).toBeVisible();
  await page.locator('.bento a').first().click();
  await expect(page).toHaveURL(/\/case\//);
});

test('admin gateway exposes the CMS link', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByRole('link', { name: /enter cms/i })).toHaveAttribute('href', '/admin.html');
});
```

- [ ] **Step 3: Write `e2e/visual.spec.ts`** (breakpoints per web testing rules)

```ts
import { test, expect } from '@playwright/test';

for (const width of [320, 768, 1024, 1440]) {
  test(`home @ ${width}px has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
    await expect(page).toHaveScreenshot(`home-${width}.png`, { fullPage: false, maxDiffPixelRatio: 0.02 });
  });
}
```

- [ ] **Step 4: Install browser + run E2E**

Run: `npx playwright install chromium && npm run test:e2e`
Expected: smoke tests PASS; visual tests create baseline screenshots on first run (review them).

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts e2e/ e2e/**/*.png
git commit -m "test: Playwright smoke + visual regression at 320/768/1024/1440"
```

---

## Phase 11 — Deployment Config

### Task 24: Vite-aware Vercel config + ship admin.html and pic/

**Files:**
- Modify: `vercel.json`
- Create: `public/admin.html` (copy), `public/pic/` (copy)

- [ ] **Step 1: Copy static assets into `public/` so Vite ships them to `dist/`**

```bash
cd "MyPortfolio"
mkdir -p public
cp admin.html public/admin.html
cp -R pic public/pic
```
> Keep root `admin.html` too (it's still used by the express dev server). `public/admin.html` is the build copy.

- [ ] **Step 2: Rewrite `vercel.json`** for a Vite SPA that keeps `/api/*` serverless and serves `admin.html` + the SPA fallback

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": { "api/index.js": { "maxDuration": 30, "memory": 1024 } },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/admin.html", "destination": "/admin.html" },
    { "source": "/((?!api/|admin.html|assets/|pic/|.*\\.[a-zA-Z0-9]+$).*)", "destination": "/index.html" }
  ]
}
```
> The last rewrite sends all non-asset, non-api, non-admin routes to `index.html` so React Router handles `/case/:slug` and `/admin` deep links.

- [ ] **Step 3: Verify production build serves SPA + admin locally**

Run:
```bash
npm run build
npm run preview -- --port 4173 &
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/         # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4173/admin.html # 200
kill %1
```
Expected: both `200`.

- [ ] **Step 4: Add build copy to `.gitignore` if desired and commit**

```bash
git add vercel.json public/admin.html
# pic/ copy is large; ship via build instead — add public/pic to .gitignore if you prefer copying at build time
git commit -m "chore: Vite-aware Vercel config; ship admin.html via build"
```

> **Deploy note:** if `public/pic` duplication is unwanted, replace Step 1's `cp -R pic public/pic` with a `prebuild` script in `package.json`: `"prebuild": "cp admin.html public/ && rm -rf public/pic && cp -R pic public/pic"`, and gitignore `public/`. Pick one approach and keep it consistent.

---

## Final Verification

### Task 25: Full green check + PR

- [ ] **Step 1: Run everything**

Run: `npm run test && npm run build && npm run test:e2e`
Expected: all unit tests pass, build succeeds, all E2E pass.

- [ ] **Step 2: Manual smoke (dev)**

Run: `npm run dev`, open `http://localhost:5173`, verify: terminal types, backend graph animates, bento filters work, a case study opens, `/admin` shows the gateway. Stop server.

- [ ] **Step 3: Commit any fixes, then open PR** (only when the user asks)

```bash
git push -u origin feat/dev-portfolio-redesign
gh pr create --title "Dark dev portfolio redesign" --body "Implements docs/superpowers/specs/2026-06-16-dev-portfolio-redesign-design.md"
```

---

## Self-Review Notes (author check)

- **Spec coverage:** hero split+terminal+graph (T11-13) ✓; bento + filters (T14-16) ✓; 4 data categories (T16,17) ✓; case study immersive (T18-19) ✓; Supabase reads + fallback (T4-5,21) ✓; admin gateway over admin.html (T20,24) ✓; Cyber Cyan tokens (T1) ✓; TS (T0,2) ✓; perf: lazy GSAP (T7,22), code-split (T0), lazy images (T18) ✓; testing: Vitest units + Playwright visual at 4 breakpoints (T4-17,23) ✓; legacy archive (T0) ✓; magnetic buttons + glassmorphism (T8,9) ✓; backend node-graph background motif reused in hero (T12) ✓.
- **Type consistency:** `Project`/`Award`/`Activity`/`SelfDev` defined once (T2) and used identically across mappers (T4), hook (T5), cards (T14,16,17), case study (T19). Hook signature `useSupabaseData(fetcher, fallback)` consistent in T5/T21. `filterByCategory`/`deriveCategories` names consistent T6/T16.
- **Known integration risks flagged inline:** router lives only in `main.tsx`/tests (T21 note); `admin.html` must reach `dist/` (T20 note + T24); `public/pic` duplication approach (T24 note).
- **Open data caveat:** Supabase `projects` table column names (`problem_solved`, `key_learnings`, `full_description`, `result`, `context`, `role`) are assumed to match the mapper in T4; if a column is absent the mapper defaults to empty and the bundled fallback covers it. Verify column names in the Supabase dashboard during T4 if any project renders with empty case-study fields.
```
