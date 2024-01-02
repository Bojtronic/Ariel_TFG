const get = "SELECT nombre, clave FROM usuarios";
const getById = "SELECT nombre, clave FROM usuarios WHERE clave = $1";
const checkIdExists = "SELECT cnombre, clave FROM usuarios WHERE clave = $1";
const add = "INSERT INTO usuarios (nombre, clave) VALUES ($1, $2)";
const remove = "DELETE FROM usuarios WHERE clave = $1";
const update = "UPDATE usuarios SET nombre=$1, clave=$2 WHERE clave = $3";

module.exports = {
    get,
    getById,
    checkIdExists,
    add,
    remove,
    update,
}