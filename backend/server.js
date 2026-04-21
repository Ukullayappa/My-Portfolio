const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }))
app.use(express.json())

// ─── Init DB Tables ───────────────────────────────────────────────────────────
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(150) NOT NULL,
        subject    VARCHAR(200),
        message    TEXT NOT NULL,
        is_read    BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS projects (
        id            SERIAL PRIMARY KEY,
        title         VARCHAR(200) NOT NULL,
        description   TEXT,
        tags          TEXT[],
        github_url    VARCHAR(500),
        live_url      VARCHAR(500),
        emoji         VARCHAR(10) DEFAULT '🚀',
        color         VARCHAR(20) DEFAULT '#2563a8',
        is_featured   BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('✅ Database tables initialized')
  } catch (err) {
    console.error('❌ DB init error:', err.message)
  }
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running 🚀', timestamp: new Date().toISOString() })
})

// ─── Contact: Submit Message ──────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [name.trim(), email.trim(), subject?.trim() || null, message.trim()]
    )
    console.log(`📩 New contact from ${name} <${email}>`)
    res.status(201).json({ success: true, id: result.rows[0].id, message: 'Message saved successfully!' })
  } catch (err) {
    console.error('Contact save error:', err.message)
    res.status(500).json({ error: 'Failed to save message. Please try again.' })
  }
})

// ─── Contact: Get All Messages (admin) ────────────────────────────────────────
app.get('/api/contact/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )
    res.json({ success: true, data: result.rows, count: result.rows.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Projects: Get All ────────────────────────────────────────────────────────
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE is_featured = TRUE ORDER BY display_order ASC, created_at DESC'
    )
    res.json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Projects: Add New ────────────────────────────────────────────────────────
app.post('/api/projects', async (req, res) => {
  const { title, description, tags, github_url, live_url, emoji, color, display_order } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })

  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, tags, github_url, live_url, emoji, color, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, tags || [], github_url, live_url, emoji || '🚀', color || '#2563a8', display_order || 0]
    )
    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Projects: Update ─────────────────────────────────────────────────────────
app.put('/api/projects/:id', async (req, res) => {
  const { id } = req.params
  const { title, description, tags, github_url, live_url, emoji, color, is_featured, display_order } = req.body
  try {
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, tags=$3, github_url=$4,
       live_url=$5, emoji=$6, color=$7, is_featured=$8, display_order=$9
       WHERE id=$10 RETURNING *`,
      [title, description, tags, github_url, live_url, emoji, color, is_featured, display_order, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' })
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Projects: Delete ─────────────────────────────────────────────────────────
app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [id])
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ─── Start Server ─────────────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`)
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`)
  })
})
