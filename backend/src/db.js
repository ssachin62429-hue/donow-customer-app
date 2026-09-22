const { Pool } = require('pg');
require('dotenv').config();

// Neon PostgreSQL connection pool configuration
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ WARNING: DATABASE_URL is not set. Using local development fallback mode.');
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString && connectionString.includes('localhost')
    ? false
    : { rejectUnauthorized: false }, // Required for Neon cloud SSL
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('connect', () => {
  console.log('✅ Connected to Neon PostgreSQL Database successfully.');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle Neon DB client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
