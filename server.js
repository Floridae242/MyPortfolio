const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// ==================== CERTIFICATES ENDPOINTS ====================

// GET all certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, issuer, date_issued as "dateIssued", credential_url as "credentialUrl", image_url as "image" FROM certificates ORDER BY date_issued DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// GET single certificate
app.get('/api/certificates/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, issuer, date_issued as "dateIssued", credential_url as "credentialUrl", image_url as "image" FROM certificates WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

// POST new certificate
app.post('/api/certificates', async (req, res) => {
  const { title, issuer, dateIssued, credentialUrl, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO certificates (title, issuer, date_issued, credential_url, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, issuer, date_issued as "dateIssued", credential_url as "credentialUrl", image_url as "image"',
      [title, issuer, dateIssued, credentialUrl, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
});

// PUT update certificate
app.put('/api/certificates/:id', async (req, res) => {
  const { title, issuer, dateIssued, credentialUrl, image } = req.body;
  try {
    const result = await pool.query(
      'UPDATE certificates SET title = $1, issuer = $2, date_issued = $3, credential_url = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING id, title, issuer, date_issued as "dateIssued", credential_url as "credentialUrl", image_url as "image"',
      [title, issuer, dateIssued, credentialUrl, image, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
});

// DELETE certificate
app.delete('/api/certificates/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM certificates WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

// ==================== PROJECTS ENDPOINTS ====================

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, slug, title, color, short_description as "shortDescription", full_description as "fullDescription", tech_stack as "techStack", role, context, github_url as "githubUrl", live_url as "liveUrl", canva_url as "canvaUrl" FROM projects ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET project by slug
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, slug, title, color, short_description as "shortDescription", full_description as "fullDescription", tech_stack as "techStack", role, context, github_url as "githubUrl", live_url as "liveUrl", canva_url as "canvaUrl" FROM projects WHERE slug = $1',
      [req.params.slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST new project
app.post('/api/projects', async (req, res) => {
  const { slug, title, color, shortDescription, fullDescription, techStack, role, context, githubUrl, liveUrl, canvaUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (slug, title, color, short_description, full_description, tech_stack, role, context, github_url, live_url, canva_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, slug, title, color, short_description as "shortDescription", full_description as "fullDescription", tech_stack as "techStack", role, context, github_url as "githubUrl", live_url as "liveUrl", canva_url as "canvaUrl"',
      [slug, title, color, shortDescription, fullDescription, techStack, role, context, githubUrl, liveUrl, canvaUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`📈 Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`🏠 Portfolio: http://localhost:${PORT}`);
  console.log('\n✅ Server ready for requests!\n');
});

module.exports = app;
