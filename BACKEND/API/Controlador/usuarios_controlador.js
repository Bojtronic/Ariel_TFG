const pool = require("../conexion_BD");
const consultas = require('../Modelo/usuario/usuario_consultas');

const get = (req, res) => {
    pool.query(consultas.get, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}


const add = (req, res) => {
    const { cedula, name, lastname, age, gender, height, weight, phone, start_date, end_date, bmi } = req.body;
    pool.query(consultas.checkIdExists, [cedula], (error, results) => {
        if (results.rows.length) {
            res.json("ya existe");
	    return;
        }
        pool.query(consultas.add, [cedula, name, lastname, age, gender, height, weight, phone, start_date, end_date, bmi], (error, results) => {
            if (error) throw error;
            res.status(201).json('creado exitosamente');
        });
    });
};



const getById = (req, res) => {
    const id = req.params.id;
    pool.query(consultas.getById, [id], (error, results) => {
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
    const { name, lastname, age, gender, height, weight, phone, start_date, end_date, bmi } = req.body;
    pool.query(consultas.getById, [id], (error, results) => {
        const notFound = !results.rows.length;
        if (notFound) {
            res.status(404).send("No existe en la base de datos");
            return;
        }
        pool.query(consultas.update, [name, lastname, age, gender, height, weight, phone, start_date, end_date, bmi, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Actualizado exitosamente");
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