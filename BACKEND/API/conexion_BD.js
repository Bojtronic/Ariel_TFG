const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'ariel',
  host: 'localhost',
  database: 'Ariel_BD',
  password: '12345',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
