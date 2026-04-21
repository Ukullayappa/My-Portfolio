const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

console.log("DB FILE LOADED")
console.log("POOL TYPE:", typeof pool)
console.log("HAS QUERY:", typeof pool.query)

module.exports = pool