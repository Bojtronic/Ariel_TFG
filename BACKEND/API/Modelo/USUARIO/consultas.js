const get = `
  SELECT 
    id, 
    id_rol, 
    tipo_identificacion, 
    identificacion, 
    nombre, 
    apellido_1 AS apellido1, 
    apellido_2 AS apellido2, 
    provincia, 
    canton, 
    distrito, 
    direccion, 
    correo, 
    contrasena,
    telefono, 
    operador_telefono, 
    estado 
  FROM usuarios
`;

const getById = `
  SELECT 
    id, 
    id_rol, 
    tipo_identificacion, 
    identificacion, 
    nombre, 
    apellido_1 AS apellido1, 
    apellido_2 AS apellido2, 
    provincia, 
    canton, 
    distrito, 
    direccion, 
    correo, 
    contrasena,
    telefono, 
    operador_telefono, 
    estado 
  FROM usuarios 
  WHERE id = $1
`;

const getByIdentificacion = `
  SELECT 
    id, 
    id_rol, 
    tipo_identificacion, 
    identificacion, 
    nombre, 
    apellido_1 AS apellido1, 
    apellido_2 AS apellido2, 
    provincia, 
    canton, 
    distrito, 
    direccion, 
    correo, 
    contrasena,
    telefono, 
    operador_telefono, 
    estado 
  FROM usuarios 
  WHERE identificacion = $1
`;

const add = `
  INSERT INTO usuarios (
    id_rol, 
    tipo_identificacion, 
    identificacion, 
    nombre, 
    apellido_1, 
    apellido_2, 
    provincia, 
    canton, 
    distrito, 
    direccion, 
    correo, 
    contrasena, 
    telefono, 
    operador_telefono, 
    estado
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
  )
`;

const remove = `
  DELETE FROM usuarios 
  WHERE id = $1
`;

const update = `
  UPDATE usuarios 
  SET 
    id_rol = $1, 
    tipo_identificacion = $2, 
    identificacion = $3, 
    nombre = $4, 
    apellido_1 = $5, 
    apellido_2 = $6, 
    provincia = $7, 
    canton = $8, 
    distrito = $9, 
    direccion = $10, 
    correo = $11, 
    contrasena = $12, 
    telefono = $13, 
    operador_telefono = $14, 
    estado = $15 
  WHERE id = $16
`;

module.exports = {
  get,
  getById,
  getByIdentificacion,
  add,
  remove,
  update,
};
