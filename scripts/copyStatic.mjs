/**
 * prebuild script: copy admin.html and pic/ into public/ so Vite includes them in dist/.
 * Run automatically via the `prebuild` npm script before every `npm run build`.
 * Idempotent: removes stale public/pic before copying.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const src = {
  adminHtml: path.join(root, 'admin.html'),
  pic: path.join(root, 'pic'),
};

const dest = {
  publicDir: path.join(root, 'public'),
  adminHtml: path.join(root, 'public', 'admin.html'),
  pic: path.join(root, 'public', 'pic'),
};

// Ensure public/ exists
fs.mkdirSync(dest.publicDir, { recursive: true });

// Copy admin.html
fs.copyFileSync(src.adminHtml, dest.adminHtml);
console.log('[prebuild] copied admin.html → public/admin.html');

// Remove stale public/pic then copy fresh
if (fs.existsSync(dest.pic)) {
  fs.rmSync(dest.pic, { recursive: true, force: true });
}
fs.cpSync(src.pic, dest.pic, { recursive: true });
console.log('[prebuild] copied pic/ → public/pic/');
