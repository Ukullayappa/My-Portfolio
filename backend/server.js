const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// ─────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────

// Allow frontend to call this backend
app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

app.options('*', cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})


// ─────────────────────────────────────────────
// CREATE TABLE (runs once when server starts)
// ─────────────────────────────────────────────

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('DB initialized successfully')
  } catch (err) {
    console.error('DB init error:', err.message)
  }
}


// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

// Test if server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' })
})

// Test if DATABASE is connected (open this in browser to check)
// URL: https://your-backend.onrender.com/test-db
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ success: true, time: result.rows[0] })
  } catch (err) {
    console.error('DB test error:', err.message)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Submit a contact form message
// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Check all required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    // Save message to database
    await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject || '', message]
    )

    res.status(200).json({ success: true })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Get all contact messages (for admin)
// GET /api/messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete a message by ID
// DELETE /api/messages/:id
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM contact_messages WHERE id = $1', [id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Mark a message as read
// PUT /api/messages/:id/read
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query(
      'UPDATE contact_messages SET is_read = true WHERE id = $1',
      [id]
    )
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})


// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})