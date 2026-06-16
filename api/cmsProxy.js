const express = require('express');

const SUPA_URL = process.env.SUPABASE_URL || 'https://rngeogahhatybnlhmgbz.supabase.co/rest/v1';
const SUPA_SVC = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN;
const ALLOWED_TABLES = new Set(['projects', 'activities', 'awards', 'certificates']);

const router = express.Router();

// Require a matching admin token on every write.
router.use((req, res, next) => {
  if (!ADMIN_TOKEN) return res.status(500).json({ error: 'ADMIN_API_TOKEN not configured on server' });
  if (req.get('x-admin-token') !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  if (!SUPA_SVC) return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured on server' });
  next();
});

async function forward(req, res, method) {
  const { table } = req.params;
  if (!ALLOWED_TABLES.has(table)) return res.status(400).json({ error: `Table not allowed: ${table}` });

  // Pass through an id=eq.X filter for PATCH/DELETE (admin sends ?id=eq.NN)
  const id = req.query.id; // e.g. "eq.5"
  const qs = id ? `?id=${encodeURIComponent(id)}` : '';
  const url = `${SUPA_URL}/${table}${qs}`;

  const headers = {
    apikey: SUPA_SVC,
    Authorization: `Bearer ${SUPA_SVC}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Prefer: 'return=representation',
  };

  try {
    const upstream = await fetch(url, {
      method,
      headers,
      body: method === 'DELETE' ? undefined : JSON.stringify(req.body),
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.set('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    console.error(`CMS proxy ${method} ${table} failed:`, err);
    res.status(502).json({ error: 'Upstream Supabase request failed' });
  }
}

router.post('/:table', (req, res) => forward(req, res, 'POST'));
router.patch('/:table', (req, res) => forward(req, res, 'PATCH'));
router.delete('/:table', (req, res) => forward(req, res, 'DELETE'));

module.exports = router;
