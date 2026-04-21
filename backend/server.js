
const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

console.log("SERVER FILE LOADED")
console.log("POOL VALUE:", pool)
console.log("TYPEOF pool.query:", typeof pool.query)
const app = express()
const PORT = process.env.PORT || 5000

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

async function initDB() {
try {
await pool.query(`       CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
} catch (err) {
console.error(err.message)
}
}

app.get('/api/health', (req, res) => {
res.json({ status: 'OK' })
})

app.post('/api/contact', async (req, res) => {
try {
const { name, email, subject, message } = req.body

if (!name || !email || !message) {
  return res.status(400).json({ error: 'Missing fields' })
}

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
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params

    await pool.query(
      'DELETE FROM contact_messages WHERE id = $1',
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
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


initDB().then(() => {
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
})
