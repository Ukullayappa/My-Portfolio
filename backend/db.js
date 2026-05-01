const { Pool } = require('pg');
require('dotenv').config();

// 🔍 Debug: check what Render is actually using
console.log("DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false
  }
});

console.log("DB FILE LOADED");
console.log("POOL TYPE:", typeof pool);
console.log("HAS QUERY:", typeof pool.query);

module.exports = pool;