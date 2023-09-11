const { pool } = require('../helpers/poolConnection');
const queries = require('./queries.js');

//SON COMO LOS METODOS PARA LAS QUERIES(MongoDB) PERO HECHOS POR NOSOTROS

//metodo "Find"
const getAll = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.all);
        result = data.rows;
    } catch (error) {
        console.log(error);
        throw new Error('error find model');
    } finally {
        client.release();
    };
    return result;
};

//metodo "findbyEmail"

const getByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.byEmail, [email]);
        result = data.rows;
    } catch (error) {
        console.log(error);
        throw new Error('error find model');
    } finally {
        client.release();
    };
    return result;
};

//metodo findByID
const getById = async (id_entry) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.byId, [id_entry]);

        if (data.rows.length === 0) {
            throw new Error('error no ID found');
        }
        result = data.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error('error find model');
    } finally {
        client.release();
    };
    return result;
};

//crear entry
const createEntry = async (title, content, id_author, category) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createOne, [title, content, id_author, category]);
        result = data.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error('error create model');
    } finally {
        client.release();
    };
    return result;
};

//update
const editEntry = async (title, content, id_entry) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.editOne, [title, content, id_entry]);
        result = data.rows[0];
    } catch (error) {
        console.log(error);
        throw new Error('error edit model')
    } finally {
        client.release();
    };
    return result;
};

//delete
const deleteEntry = async (id_entry) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteOne, [id_entry]);
        result = data;
    } catch (error) {
        console.log(error);
        throw new Error('error delete model')
    } finally {
        client.release();
    };
    return result;
};


module.exports = {
    getAll,
    getByEmail,
    getById,
    createEntry,
    editEntry,
    deleteEntry
};