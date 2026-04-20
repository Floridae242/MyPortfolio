# Dynamic Content Management System — Integration Guide

## Overview

Your portfolio now supports **dynamic content management** for Certificates and Projects without hardcoding. This guide explains the architecture and how to extend it.

## Current Architecture

### 1. **Data Layer** (Client-Side + Local Storage)

#### Files:
- `data/certificates.js` — Certificate data model
- `data/projects.js` — Project data model

#### Data Models:

**Certificate Schema:**
```javascript
{
  id: number,
  title: string,
  issuer: string,
  dateIssued: string (YYYY-MM-DD),
  credentialUrl: string | null,
  image: string | null
}
```

**Project Schema:**
```javascript
{
  slug: string,
  title: string,
  color: string,
  shortDescription: string,
  fullDescription: string,
  techStack: string[],
  role: string,
  context: string,
  githubUrl: string,
  liveUrl: string,
  canvaUrl: string
}
```

### 2. **Frontend Implementation**

- **Main Page** (`index.html`): Loads certificates dynamically via `renderCertificates()` JavaScript function
- **Admin Dashboard** (`admin.html`): Simple UI for adding/editing/deleting certificates
- **Storage**: Uses browser `localStorage` for persistence

### 3. **How It Works**

1. `index.html` imports `data/certificates.js`
2. On page load, JavaScript calls `renderCertificates()`
3. Certificates are rendered in a clean list format (mobile-responsive)
4. Admin can modify via `admin.html` → changes saved to `localStorage`

## Usage Instructions

### For End Users (Your Visitors)
- Certificates display automatically on the portfolio homepage
- Sorted by date (newest first)
- Each certificate shows: title, issuer, date, and optional "Verify" link

### For You (Portfolio Owner)

#### Adding a Certificate:
1. Go to `admin.html` in your browser
2. Click "Add Certificate"
3. Fill in: Title, Issuer, Date, Credential URL (optional)
4. Click "Save"
5. Certificate appears on your homepage immediately

#### Editing a Certificate:
1. On `admin.html`, find the certificate
2. Click "Edit"
3. Update fields and click "Save"

#### Deleting a Certificate:
1. Click "Delete" on any certificate
2. Confirm deletion

---

## Future Enhancement Paths

### Option A: Supabase (Recommended for Production)

Use Supabase for cloud-hosted data with authentication.

**Setup:**
1. Create a Supabase project at https://supabase.com
2. Create tables: `certificates` and `projects`
3. Add authentication (email/password)

**API Integration:**
```javascript
// Replace localStorage with Supabase client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(PROJECT_URL, ANON_KEY)

async function fetchCertificates() {
  const { data } = await supabase
    .from('certificates')
    .select('*')
  return data
}
```

### Option B: Firebase (Simple Alternative)

Use Firebase Realtime Database with authentication.

**Setup:**
1. Create Firebase project
2. Enable Realtime Database
3. Set security rules to allow authenticated writes

### Option C: GitHub as CMS (Minimal Setup)

Treat `data/certificates.js` as your "database":
- Edit files directly in GitHub web interface
- Commit changes → site auto-updates if you use GitHub Pages with CI/CD

**Recommended CI/CD:** GitHub Actions to rebuild on push

---

## Current Limitations & Notes

✅ **What Works:**
- Add/edit/delete certificates via admin dashboard
- Automatic sorting and formatting
- Mobile-responsive UI
- No backend required (runs in browser)

⚠️ **Limitations:**
- Data persists only in **localStorage** (browser-local, not synced across devices)
- Projects are still static (edit `data/projects.js` manually)
- No authentication on admin panel (anyone with access to `admin.html` can edit)

---

## Recommended Next Steps

1. **Short term**: Use admin.html as-is for personal use
2. **Medium term**: Add password protection to admin.html
3. **Long term**: Migrate to Supabase for cloud sync + multi-device support

---

## File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main portfolio page (renders certificates dynamically) |
| `admin.html` | Admin panel for managing certificates |
| `data/certificates.js` | Certificate data source |
| `data/projects.js` | Project data source |
| `tailwind.config.js` | Design tokens |
| `style.css` | Custom styles |

---

## Quick Export/Backup

To export your certificates as JSON:

```javascript
// Paste in browser console while on admin.html
copy(JSON.stringify(JSON.parse(localStorage.getItem('portfolioCerts')), null, 2))
```

Then paste into a `.json` file to backup.

---

## Support

For questions or to add more complex features (like project management through admin panel), refer to the main `PROJECT_SUMMARY.md`.
