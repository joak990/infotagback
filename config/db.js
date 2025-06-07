const { Pool } = require('pg');

const pool = new Pool({
  user: 'infotag_user',  // usuario que usaste en Render
  host: 'dpg-d129h5emcj7s73f54spg-a.oregon-postgres.render.com',  // host que te da Render
  database: 'infotag',  // nombre de tu base en Render
  password: 'dBL34BcF3H9emzRSiSNERmwhpqgXu1Qa', // la que usaste para el usuario
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // importante para Render
  },
});

module.exports = pool;
