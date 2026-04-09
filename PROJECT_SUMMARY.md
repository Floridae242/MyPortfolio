# PROJECT_SUMMARY.md

## Project Name & Vision

**Developer Portfolio — Naruephon Yotmao (Tle)**

A minimalist, multi-page portfolio website designed to feel authentic and human-made. Inspired by clean social media profiles. Showcases projects, experience, and skills with direct copywriting and restrained animations.

## Tech Stack & Architecture

- **HTML5** — Semantic markup (`<header>`, `<main>`, `<section>`, `<footer>`)
- **Tailwind CSS** — Via CDN (`cdn.tailwindcss.com`)
- **Google Fonts** — Inter (400, 500, 600, 700)
- **Vanilla JS** — URL parameter-based routing for project detail pages
- **Color palette** — Warm light theme: off-white `#fafaf9`, stone tones, muted teal accent `#4f6d7a`

### File Structure

```
src/
├── index.html            # Main portfolio page
├── project.html          # Dynamic project detail template
├── style.css             # Custom styles
├── tailwind.config.js    # Theme config
└── data/
    └── projects.js       # Centralized project data (5 projects)
pic/
├── IMG_4219.JPG          # Profile photo
└── IMG_3880 3.jpg        # Banner photo
```

### Routing

- `index.html` — Main portfolio (all sections)
- `project.html?slug=<slug>` — Project detail page (reads slug from URL, renders from `projects.js`)
- Slugs: `smart-flema`, `agrilink`, `web3-mesh-network`, `smart-city-lampang`, `library-management-system`

## Current State

- ✅ Banner with real photo + circular profile avatar
- ✅ Bio, skills (11 tags), 5 clickable project cards, experience timeline, education, contact
- ✅ Project cards link to `project.html?slug=...` detail pages
- ✅ Detail page shows: title, role/context, tech badges, full description, back link
- ✅ 404 state for unknown slugs

## Changelog (Recent Updates)

| Date | Change |
|------|--------|
| 2026-04-09 | **Real project links** — Added GitHub repos, live URLs, and Canva presentations for all 5 projects. Added GitHub profile to contact section. |
| 2026-04-09 | **Project detail pages** — Added `project.html`, `data/projects.js`, clickable cards with slug-based routing |
| 2026-04-09 | **Real photos** — User added profile pic and banner image, restructured into `src/` |
| 2026-04-09 | **Separated files** — Extracted styles → `style.css`, config → `tailwind.config.js` |
| 2026-04-09 | **Initial build** — Single-page portfolio with Tailwind CSS CDN + Inter font |

## Next Steps / Pending Tasks

- [ ] Add LinkedIn link to Contact section (if available)
- [ ] Consider adding a dark mode toggle
- [ ] Deploy to a hosting platform (GitHub Pages, Vercel, or Netlify)
