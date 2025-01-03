const pool = require("../conexion_BD");
const consultas = require('../Modelo/USUARIO/consultas');

const get = (req, res) => {
    pool.query(consultas.get, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en la consulta', error });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const add = (req, res) => {
    const { id_rol, tipo_identificacion, identificacion, nombre, apellido_1, apellido_2, provincia, canton, distrito, direccion, correo, contrasena, telefono, operador_telefono, estado } = req.body;

    pool.query(consultas.getByIdentificacion, [identificacion], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al verificar la identificación', error });
            return;
        }

        if (results.rows.length) {
            res.status(400).json({ message: "El usuario con esa identificación ya existe" });
            return;
        }

        pool.query(consultas.add, [id_rol, tipo_identificacion, identificacion, nombre, apellido_1, apellido_2, provincia, canton, distrito, direccion, correo, contrasena, telefono, operador_telefono, estado], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al crear el usuario', error });
                return;
            }
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        });
    });
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(consultas.getById, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en la consulta', error });
            return;
        }

        if (!results.rows.length) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(results.rows[0]);
    });
};

const getByIdentificacion = (req, res) => {
    const identificacion = req.params.identificacion;

    pool.query(consultas.getByIdentificacion, [identificacion], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en la consulta', error });
            return;
        }

        if (!results.rows.length) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(results.rows[0]);
    });
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(consultas.getById, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al buscar el usuario', error });
            return;
        }

        if (!results.rows.length) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        pool.query(consultas.remove, [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al eliminar el usuario', error });
                return;
            }
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        });
    });
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { id_rol, tipo_identificacion, identificacion, nombre, apellido_1, apellido_2, provincia, canton, distrito, direccion, correo, contrasena, telefono, operador_telefono, estado } = req.body;

    pool.query(consultas.getById, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al buscar el usuario', error });
            return;
        }

        if (!results.rows.length) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        pool.query(consultas.update, [id_rol, tipo_identificacion, identificacion, nombre, apellido_1, apellido_2, provincia, canton, distrito, direccion, correo, contrasena, telefono, operador_telefono, estado, id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al actualizar el usuario', error });
                return;
            }
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        });
    });
};

module.exports = {
    get,
    getById,
    getByIdentificacion,
    add,
    remove,
    update,
};
