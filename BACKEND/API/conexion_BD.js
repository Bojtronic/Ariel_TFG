const { Pool } = require('pg');


// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'ariel',
  host: 'localhost',
  database: 'Ariel_BD',
  password: '12345',
  port: 5432
});

module.exports = pool;

