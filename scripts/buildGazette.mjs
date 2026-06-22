/**
 * Build target for the legacy "Gazette" site as production output (dist/).
 * Assembles the static Gazette pages + assets + the secured admin CMS.
 * Used by vercel.json `buildCommand`. The new React app stays in src/ (unused
 * by this build) and can be restored by reverting vercel.json to the Vite build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Gazette static pages (keys already migrated to the publishable key).
for (const file of ['index.html', 'case.html', 'project.html', 'style.css']) {
  const src = path.join(root, 'legacy', file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, file));
}

// Secured CMS (publishable reads + /api/cms writes).
fs.copyFileSync(path.join(root, 'admin.html'), path.join(dist, 'admin.html'));

// Assets.
fs.cpSync(path.join(root, 'data'), path.join(dist, 'data'), { recursive: true });
fs.cpSync(path.join(root, 'pic'), path.join(dist, 'pic'), { recursive: true });

// Optional resume.
const resume = path.join(root, 'resume.pdf');
if (fs.existsSync(resume)) fs.copyFileSync(resume, path.join(dist, 'resume.pdf'));

console.log('[buildGazette] dist/ assembled from legacy/ Gazette + admin.html + data/ + pic/');
