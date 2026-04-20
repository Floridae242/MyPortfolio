# PROJECT_SUMMARY.md

## Project Name & Vision

**Developer Portfolio — Naruephon Yotmao (Tle) — Dynamic Edition**

A minimalist, multi-page portfolio website with **dynamic content management**. Designed to feel authentic and human-made, inspired by clean social media profiles. Now supports easy management of Certificates and Projects without hardcoding.

## Tech Stack & Architecture

- **HTML5** — Semantic markup (`<header>`, `<main>`, `<section>`, `<footer>`)
- **Tailwind CSS** — Via CDN (`cdn.tailwindcss.com`)
- **Google Fonts** — Inter (400, 500, 600, 700)
- **Vanilla JavaScript** — URL parameter-based routing + dynamic rendering
- **Browser localStorage** — Client-side data persistence for certificates
- **Color palette** — Warm light theme: off-white `#fafaf9`, stone tones, muted teal accent `#4f6d7a`

### File Structure

```
root/
├── index.html              # Main portfolio page (renders certificates dynamically)
├── project.html            # Project detail template (slug-based routing)
├── admin.html              # Admin dashboard for managing legacy certificates
├── style.css               # Custom styles
├── tailwind.config.js      # Theme config
├── CMS_INTEGRATION_GUIDE.md # Complete CMS setup documentation
└── data/
    ├── projects.js         # Professional Experience array (categorized)
    ├── self-development.js # Self-Development/Certificates/Workshops array
    ├── awards.js           # Awards & Achievements array
    └── activities.js       # Leadership, Volunteer & Part-time array
└── pic/
    ├── IMG_4219.JPG        # Profile photo
    └── IMG_3880 3.jpg      # Banner photo
```

### Content Management Strategy

**Data Layer:**
- **Certificates**: Managed via `admin.html` → stored in browser `localStorage` → rendered on `index.html`
- **Projects**: Static data in `data/projects.js` (can be edited manually or extended to admin panel in future)

**Routing:**
- `index.html` — Main portfolio (all sections including dynamic certificates)
- `project.html?slug=<slug>` — Project detail page
- `admin.html` — Admin dashboard (add/edit/delete certificates)

### Data Models

**Self-Development Schema (`self-development.js`):**
```javascript
{
  id: number,
  type: string ("Certification" | "Workshop/Seminar"),
  title: string,
  institution: string,
  date: string (YYYY-MM-DD),
  credentialUrl: string | null
}
```

**Projects Schema Additions (`projects.js`):**
```javascript
{
  categories: string[],      // Used for filtering ("Production", "Competition", etc.)
  keyLearnings: string[],
  problemSolved: string,
  // ... (previous fields slug, title, etc remain)
}
```

**Awards Schema (`awards.js`):**
```javascript
{
  id: number,
  category: string ("Competition" | "Honor/Scholarship"),
  title: string,
  organization: string,
  date: string (YYYY-MM-DD),
  description: string
}
```

**Activities Schema (`activities.js`):**
```javascript
{
  id: number,
  activityName: string,
  role: string,
  imageUrl: string | null,
  softSkills: string[]       // array of strings for badges
}
```

## Current State

✅ **Implemented:**
- Main portfolio page with banner + circular avatar
- **NEW**: Professional Experience section with clickable tab category filters
- **NEW**: Leadership & Extracurriculars section with small thumbnails and soft skill badges
- **NEW**: Awards & Achievements clean typography list
- **NEW**: Self-Development section covering certifications and workshops
- Project detail pages with slug-based routing
- Mobile-responsive design (all devices)

✅ **Design Principles:**
- Minimalist, clean aesthetics ("Beauty in simplicity")
- No over-engineered animations or glassmorphism
- Human-centric copywriting (no AI buzzwords)
- Strict max-width constraint (max-w-3xl)

## Changelog (Recent Updates)

| Date | Change |
|------|--------|
| **2026-04-20** | **Interview-Based Content Overhaul** — Conducted structured Q&A with portfolio owner across all 5 content categories. Rewrote all project descriptions with authentic copywriting (problem/solution/learnings/result for each). Updated About Me with conversational storytelling. Upgraded `project.html` detail page with structured "The Problem → What I Built → Key Learnings → Result" layout. Added `imageUrl` support to `self-development.js` with embedded template comments. Updated `activities.js` with real data (Deepa Coding Thailand TA role). Added empty state handling for all dynamic sections. Removed Dark Mode (user preference). |
| **2026-04-10** | **UX/UI Overhaul** — Migrated from 'stone' to the sophisticated 'zinc' palette. Integrated comprehensive `Dark Mode` with a toggle in localStorage. Added `JetBrains Mono` for developer-specific typography (roles, tech tags). Increased spacing to `py-20`/`py-24` and strictly maintained a flat, minimal aesthetic avoiding 3D and glassmorphism. |
| **2026-04-10** | **Massive Content Restructuring** — Built 4 new dedicated sections (Professional Experience, Self-Development, Awards, Leadership). Converted legacy timeline into separated chronological domains. Replaced single project array with advanced category filtering UI. |
| **2026-04-10** | **Data Schema Updates** — Added `awards.js`, `activities.js`, and `self-development.js`. Upgraded `projects.js` with `categories` array for dynamic tab filtering. |
| **2026-04-09** | **Dynamic Content Management** — Introduced `admin.html` dashboard, `data/certificates.js`, and localStorage-based certificate rendering. Supports add/edit/delete without hardcoding. |
| **2026-04-09** | **Certificates Section** — Added clean list-format certificate display on `index.html` with date sorting and optional credential verification links. |
| **2026-04-09** | **CMS Integration Guide** — Created comprehensive documentation (`CMS_INTEGRATION_GUIDE.md`) with setup instructions, data models, and future enhancement paths. |
| 2026-04-09 | Real project links — Added GitHub repos, live URLs, and Canva presentations for all 5 projects. GitHub profile in contact section. |
| 2026-04-09 | Project detail pages — Added `project.html`, `data/projects.js`, clickable cards with slug-based routing |
| 2026-04-09 | Real photos — User added profile pic and banner image |
| 2026-04-09 | Separated files — Extracted styles → `style.css`, config → `tailwind.config.js` |
| 2026-04-09 | Initial build — Single-page portfolio with Tailwind CSS CDN + Inter font |

## Next Steps / Pending Tasks

- [ ] Add password protection to `admin.html` for security
- [ ] Migrate certificates to Supabase for cloud sync (optional, for multi-device access)
- [ ] Extend admin panel to also manage projects dynamically
- [ ] Add dark mode toggle (design already supports it with Tailwind)
- [ ] Set up CI/CD deployment (GitHub Pages, Vercel, or Netlify)
- [ ] Add LinkedIn link to Contact section (if available)
- [ ] Test Lighthouse scores (aim for 100 on all metrics)

## How to Use

### For Visitors
Certificates display automatically on the homepage, sorted by date with issuer and verification links.

### For You (Admin)
1. Open `admin.html` in your browser
2. Click "Add Certificate"
3. Fill in: Title, Issuer, Date, Credential URL
4. Click "Save" → certificate appears on homepage instantly
5. Edit or delete certificates anytime

### Future Enhancements
See `CMS_INTEGRATION_GUIDE.md` for paths to:
- Supabase integration (cloud-hosted, multi-device sync)
- Firebase Realtime Database
- GitHub as CMS
- Multi-user authentication

---

## Technical Notes

- **Performance**: No backend overhead; instant rendering via vanilla JS
- **Storage**: localStorage is device-local (not cloud-synced). Data persists until manually cleared.
- **Accessibility**: Semantic HTML, proper color contrast, keyboard-navigable
- **Responsiveness**: Full mobile-first design with Tailwind CSS breakpoints
- **No Dependencies**: Pure HTML/CSS/JavaScript (CDN-based Tailwind only)
