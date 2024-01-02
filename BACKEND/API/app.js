const express = require("express");
const cors = require('cors');

const usuarios = require('../API/Modelo/usuario/usuario_rutas');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({origin:'*'}));    //acceso a todos los origenes, cualquier url


app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD"
  );
  next();
});


app.use('/api/usuarios', usuarios);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

app.get('/', (consulta, respuesta) => {
  respuesta.send('Servidor iniciado');
});


