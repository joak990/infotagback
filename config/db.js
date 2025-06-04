// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'infotag',
  password: 'admin',
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = pool;
