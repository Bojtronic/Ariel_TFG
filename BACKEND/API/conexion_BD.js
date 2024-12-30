const { Pool } = require('pg');


// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RecursosHumanos',
  password: '12345',
  port: 5432
});

module.exports = pool;

