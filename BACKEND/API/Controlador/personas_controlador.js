const pool = require("../conexion_BD");
const consultas = require('../Modelo/PERSONA/personas_consultas');

const get = (req, res) => {
    pool.query(consultas.get, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}


const add = (req, res) => {
    const { nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado } = req.body;
    pool.query(consultas.getByCedula, [cedula], (error, results) => {
        if (results.rows.length) {
            res.json("ya existe");
	    return;
        }
        pool.query(consultas.add, [nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado], (error, results) => {
            if (error) throw error;
            res.status(201).json('creado exitosamente');
        });
    });
};



const getById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(consultas.getById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getByCedula = (req, res) => {
    const cedula = req.params.cedula;
    pool.query(consultas.getByCedula, [cedula], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const remove = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(consultas.getById, [id], (error, results) => {
        const notFound = !results.rows.length;
        if (notFound) {
            res.status(404).send("No existe en la base de datos");
            return;
        }
        pool.query(consultas.remove, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Eliminado exitosamente");
        });
    });
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado } = req.body;
    pool.query(consultas.getById, [id], (error, results) => {
        const notFound = !results.rows.length;
        if (notFound) {
            res.status(404).send("No existe en la base de datos");
            return;
        }
        pool.query(consultas.update, [nombre, apellido1, apellido2, cedula, fecha_nacimiento, genero, estado, id], (error, results) => {
            if (error) throw error;
            res.status(200).json("Actualizado exitosamente");
        });
    });
};


module.exports = {
    get,
    getById,
    add,
    remove,
    update,
}
