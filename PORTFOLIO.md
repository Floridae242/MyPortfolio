# Portfolio — Naruephon Yotmao (Tle)

A living reference for the portfolio site at `/Users/floridae/Portfolio(Tle)/MyPortfolio`.

---

## 1. Author

| Field | Value |
|---|---|
| Name | Naruephon Yotmao (Tle) |
| Role | Business Analyst · Digital Industry Integration · CAMT |
| Affiliation | College of Arts, Media and Technology (CAMT) — Chiang Mai University |
| Year | First-year, Academic Year 2026 |
| Location | Chiang Mai, Thailand |
| Email | naruephonyotmao@gmail.com |
| GitHub | [@Floridae242](https://github.com/Floridae242) |
| Status | Open to BA · Product · Data internships, 2026 – 2027 |

**Practice:** I work on problems where physical behaviour meets public money — markets, venues, civic spaces — and translate the mess into dashboards, policies, and alerts non-technical stakeholders actually use.

---

## 2. The Site

| Aspect | Value |
|---|---|
| Stack | Vanilla HTML + CSS + JS (no framework, no bundler) |
| CMS | Supabase (REST + Postgres) — projects, activities, awards, certificates |
| Deploy | Vercel (`vercel.json`) |
| Live URL | TBD — set on deploy |
| Source | https://github.com/Floridae242/MyPortfolio |

### Pages
- **`index.html`** — landing page. Editorial broadsheet hero (`The Naruephon Gazette`), 11 sections (§I Cover → §XI Colophon), Supabase-driven works grid, journal feed via Edge Function (Medium RSS).
- **`project.html`** — generic Supabase-driven case viewer. Reads `?slug=…`, queries `projects?slug=eq.<slug>`, renders the blueprint-themed case study layout.
- **`case.html`** — hand-written editorial deep-dive (currently only `?slug=kad-kong-ta`). Falls through to `project.html` for any unknown slug.
- **`admin.html`** — content editor for Supabase tables.
- **`migrate.html`** — one-shot data migration helper.

### Aesthetic — "The Naruephon Gazette"
A 19th-century broadsheet newspaper masthead pulled into a modern editorial layout. Three core moves:
1. **Masthead** above the hero with live Roman-numeral dateline (`Friday, XXIV April MMXXVI`), inverted ticker, banner nameplate.
2. **§I Cover** with byline, drop-cap standfirst, ornamented rule, kicker dagger, standing column sidebar.
3. **Works grid** with editorial cards: folio number, accent dot, "Featured" stamp, auto-derived outcome pill (`★ Popular Vote`, `● Live`, `✓ Recognized`, etc.), full tech-stack chips, hover reveal strip showing role/context.

### Design System
| Token | Value |
|---|---|
| `--bone` | #f5f1ea (paper) |
| `--bone-2` | #ede7db (paper-2) |
| `--iron` | #1a1a1a (ink) |
| `--graphite` | #4a4a4a |
| `--pencil` | #807a6d (muted) |
| `--rule` | #d9d2c4 (hairline) |
| `--rule-2` | #c8bfad (hairline-2) |
| `--oxide` | #c1440e (accent — scarlet) |
| `--moss` | #3d5a3d (live indicator) |
| `--serif` | Fraunces |
| `--italic` | Instrument Serif |
| `--mono` | JetBrains Mono |

Variable-font axes used: `opsz`, `SOFT`, `WONK` on Fraunces.

---

## 3. Projects

The works grid is rendered from Supabase at runtime. `data/projects.js` is the canonical reference — keep it in sync with the DB. Each project resolves at `project.html?slug=<slug>`.

### 3.1 LocalShop School
| | |
|---|---|
| Slug | `localshop-school` |
| Categories | Production · Academic |
| Role | Requirements Analyst · UX/UI Designer · Client Liaison |
| Context | Group Project — See Jak Saphan Khwai team · Small-school smart-farm pilot, Northern Thailand |
| Tech | UX/UI · Figma · Prototyping · Requirements · Firebase |
| Live | https://localshop-shop.web.app/index.html |
| Canva | https://www.canva.com/design/DAG1qlXfbaw/EIpdGwlUm2gvVYKrhkA1Zg/view |
| GitHub | https://github.com/Floridae242/localshop-shcool.git |
| Outcome | Free e-commerce + CSR dashboard. Pilot scope 3 schools → 20 in Northern Thailand. KPIs: −50% teacher admin time, +20% revenue lift. |

Bridges small Northern Thai schools running smart-farm programmes (vegetables, mushrooms, poultry) with parents and CSR sponsors. Zero marketplace fee — the storefront stays free for schools forever; revenue covers operations via CSR programmes and a low-cost dashboard subscription. UI mirrors apps Thai users already trust (Shopee, LINE, banking apps): green for the farm, yellow for warmth, grey for legibility, big buttons, Thai-first.

### 3.2 Smart Flema
| | |
|---|---|
| Slug | `smart-flema` |
| Categories | Competition · Production |
| Role | Idea Initiator · Research & Prototype Design |
| Context | 3rd ICT Startup Competition 2026 — International College of Technology, Kanazawa |
| Tech | AI · Computer Vision · Analytics · Python |
| Canva | https://canva.link/u9lpz7fzu9wihek |
| Outcome | ★ Won the Popular Vote award |

Camera-based foot-traffic heatmap system for street markets and walking-street events. Spin-off from the Smart City Lampang work, refined for market operators who need actionable data on rental pricing and crowd flow.

### 3.3 Smart City Management Platform (Lampang)
| | |
|---|---|
| Slug | `smart-city-lampang` |
| Categories | Production · Academic |
| Role | Project Manager · Frontend Developer |
| Context | CAMT CMU · with Pyramid Solution · Academic Year 2025 |
| Tech | IoT · AI · Smart City · LINE API · JavaScript |
| Live | https://forlp-bams.vercel.app/ |
| GitHub | https://github.com/Floridae242/FORLP.git |
| Canva | https://canva.link/454emqxa8jc1alh |
| Outcome | ● Live — delivered functional dashboard + LINE OA integration to Lampang Municipality |

Real production platform for Lampang Municipality. Dual role: PM coordinating university team, municipal staff, and Pyramid Solution; plus frontend dev integrating LINE OA notifications for real-time alerts. People Counting AI module remained incomplete by deadline — a lesson in scoping realistic deliverables.

### 3.4 AgriLink Agriculture Platform
| | |
|---|---|
| Slug | `agrilink` |
| Categories | Competition · Academic |
| Role | Idea Proposer · Sole Prototype Developer |
| Context | Hylife Hackathon 2025 — Code For Change, CAMT CMU |
| Tech | AI · IoT · QR Code · Firebase · JavaScript |
| Live | https://agrilink-7a2f4.web.app |
| GitHub | https://github.com/Floridae242/agrilink.git |
| Canva | https://canva.link/uumc0gdd6lnff77 |
| Outcome | ● Live Demo — first solo prototype, first vibe-coded project |

Hackathon prototype connecting farmers directly with buyers via AI, IoT, and QR-code traceability. Each product gets a QR identity that traces farm-to-buyer. First time building a complete prototype solo under hackathon pressure.

### 3.5 Decentralized IoT Communication System (Web3 Mesh)
| | |
|---|---|
| Slug | `web3-mesh-network` |
| Categories | Open Source · Academic |
| Role | Developer · Demo Presenter |
| Context | WEB3 Student Club — CAMT CMU · CAMT FEST Exhibition · Academic Year 2025 |
| Tech | IoT · ESP32 · C++ · PlatformIO · Arduino |
| Live | https://heyzine.com/flip-book/6c7e35871a.html |
| GitHub | https://github.com/Floridae242/Web3-Student-Club-Showcase.git |
| Outcome | ✓ Demonstrated at CAMT FEST — verified messages between ESP32 nodes, no internet required |

Local peer-to-peer ESP32 mesh network for disaster scenarios where centralized infrastructure fails. Each device has its own crypto identity (public/private key pair) for message verification. Built Station 1 + Reset Station; presented live demo.

### 3.6 Library Management System (OOP)
| | |
|---|---|
| Slug | `library-management-system` |
| Categories | Academic · Personal |
| Role | Lead Developer (80% of codebase) |
| Context | OOP Post-Midterm Project — CAMT CMU · Academic Year 2026 |
| Tech | Java · OOP · Maven · CSV I/O |
| GitHub | https://github.com/Floridae242/OOP-Post-Midterm-Project.git |
| Outcome | ✓ Recognized — instructor praise for overloading design, interface comprehensiveness, input validation |

Java OOP library system with CRUD, CSV persistence, polymorphic late-fee calculation. 14-method `LibraryService` interface, `Book` and `DigitalMedia` overrides on `calculateLateFee()`. Instructor flagged shallow inheritance, missing Javadoc, and CSV date persistence as improvement areas.

### 3.7 Kad Kong Ta Weekend Night Market — Civic Tech (Case File)
The hand-written editorial deep-dive at `case.html?slug=kad-kong-ta`. Six narrative beats covering the Lampang weekend night-market spatial-economics problem: turning unused city CCTV into a foot-traffic + dwell-time + air-quality decision tool. Smart Insight dashboard plus LINE OA alerts to municipal officers. Reflection: I solved the brief, I didn't solve the system — should have interviewed back-zone vendors first.

---

## 4. How the site works (technical reference)

### Data flow
1. `index.html` page load → `DOMContentLoaded` handler
2. Live Roman-numeral dateline written to `#bs-dateline`
3. Parallel fetches to Supabase REST: `projects`, `activities`, `awards`, `certificates`
4. Snake-case → camelCase normalization in the `.map()` step
5. `renderProjects(filter)` builds work cards via `innerHTML`; `parseOutcome(p)` derives the outcome pill from `result` text + `live_url`
6. Filter buttons re-render the grid client-side
7. `initJournal()` IIFE fetches Medium RSS via Supabase Edge Function (`/functions/v1/medium-feed`) with 1-hour localStorage cache
8. `IntersectionObserver` triggers scroll reveal on `.reveal` elements

### Rendering quirks
- **First two cards on the "All" filter become "Featured"** (full-width, 16:9 image, 40px title) via `i < FEATURED_FALLBACK_COUNT`. To pin a project, change ordering in the Supabase `created_at` column.
- **Outcome pills are auto-parsed** from the project's `result` field. To force a specific pill, edit the `result` text to contain trigger words: "won … award", "in production", "deployed", "recognition", "demonstrated", "delivered".
- **`p.imageUrl` resolves relative to the page** — use `pic/<filename>` for repo-bundled images, or full URLs (Supabase Storage, Firebase, etc.).

### Adding a new project
1. Add the entry to `data/projects.js` (canonical reference)
2. Insert the row into Supabase `projects` table — easiest via `admin.html`, or via direct SQL/REST POST using the service-role key
3. Hard-refresh the homepage; the new card appears at the end of the grid (sorted by `created_at` ascending)

### File structure (key paths)
```
MyPortfolio/
├─ index.html              — landing (3500+ lines, inline CSS+JS)
├─ project.html            — Supabase generic case viewer
├─ case.html               — hand-written deep-dive shell + slug fallback
├─ admin.html              — content editor (hardcoded login)
├─ migrate.html            — migration helper
├─ data/                   — local reference (NOT loaded at runtime by index.html)
│  ├─ projects.js
│  ├─ activities.js
│  ├─ awards.js
│  └─ self-development.js
├─ pic/                    — bundled images
├─ scripts/
│  └─ migrateToSupabase.js — one-shot Supabase upsert script
├─ supabase/               — Edge Functions, schema
├─ server.js               — local Node/Express dev server
├─ vercel.json             — production deploy config
└─ style.css               — global tokens (most styling is inline in <style> blocks)
```

---

## 5. Conventions

- **No build step.** Edit HTML, refresh.
- **Most styles are inline `<style>` in `index.html`** — global `style.css` is minimal (42 lines). Search by class name when hunting.
- **Default to no comments.** Only explain non-obvious WHY.
- **Avoid emojis** in code/files unless the user requests them.
- **Supabase write access** uses the service-role key in `scripts/migrateToSupabase.js`. Read access uses the anon key embedded in `index.html`.
- **Image paths**: `pic/<filename>` for bundled, full URL for hosted. Both work in `image_url`.

---

## 6. Outstanding work / known issues

- **Security debt**: anon Supabase key + admin login credentials are hardcoded in client-side HTML. Plan: migrate writes to a backend proxy with proper auth.
- **`project.html` and `admin.html`** still expose service/admin keys client-side. Same fix needed.
- **No image optimization or `srcset`** — Supabase image URLs render at full size.
- **`case.html`** only has one hand-written case file (`kad-kong-ta`); other deep-dives auto-redirect to `project.html`.
- **Featured logic** depends on render order, not an explicit DB flag. Add a `featured boolean` column to `projects` if you want explicit control.

---

## 7. Quick links

- Live site: TBD
- Repo: https://github.com/Floridae242/MyPortfolio
- Supabase project: `rngeogahhatybnlhmgbz` (Chiang Mai region)
- Author Medium: https://medium.com/@naruephonyotmao
- Author GitHub: https://github.com/Floridae242

---

*Last updated: 2026-04-24*
