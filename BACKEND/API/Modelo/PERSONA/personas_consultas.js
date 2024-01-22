const get = "SELECT id, nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado FROM PERSONAS";
const getById = "SELECT id, nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado FROM PERSONAS WHERE id = $1";
const getByCedula = "SELECT id, nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado FROM PERSONAS WHERE cedula = $1";
const add = "INSERT INTO PERSONAS (nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const remove = "DELETE FROM PERSONAS WHERE id = $1";
const update = "UPDATE PERSONAS SET nombre=$1, apellido1=$2, apellido2=$3, cedula=$4, fecha_nacimiento=$5, genero=$6, estado=$7 WHERE id = $8";

module.exports = {
    get,
    getById,
    getByCedula,
    add,
    remove,
    update,
}
