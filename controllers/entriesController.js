const { getAll, getByEmail, getById, createEntry, editEntry, deleteEntry } = require('../models/entriesModel')

//getentries y getentriesbyemail pueden ir juntos con un condicional
const getEntries = async (req, res) => {
    let data;
    try {
        const { email, id_entry } = req.body;
        if (email) {
            data = await getByEmail(email);
        } else if (id_entry) {
            data = await getById(id_entry)
        } else {
            data = await getAll();
        };


        res.status(200).json({
            ok: true,
            data
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el Admin'
        });
    };
};

//create (POST)
const postEntries = async (req, res) => {
    let data;
    try {
        const { id_author, title, content, category } = req.body;

        if (!id_author || !title || !content || !category) {

            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        };

        data = await createEntry(id_author, title, content, category);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada creada',
                data
            });

        } else {
            throw new Error('');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el Admin'
        });
    };
};

//edit (PUT)
const editEntries = async (req, res) => {
    let data;

    try {
        const id_entry = req.params.id_entry;
        const { title, content } = req.body;
        const mainData = await getById(id_entry);
        data = await editEntry(id_entry, title, content);
        if (mainData) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada actualizada',
                data: data
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el Admin'
        });
    };
};

//delete (DELETE)
const deleteEntries = async (req, res) => {
    let data;

    try {
        const id_entry = req.params.id_entry;
        data = await deleteEntry(id_entry)
        if (data) {
            return res.status(200).json({
                ok: true,
                data: data,
                msg: "Entrada borrada"
            });
        } else {
            return res.status(400).jason({
                msg: "Esa entrada no existe"
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el Admin'
        });
    };
};


module.exports = {
    getEntries,
    postEntries,
    editEntries,
    deleteEntries
};