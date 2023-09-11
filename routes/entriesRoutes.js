const express = require('express');
const { getEntries, postEntries, editEntries, deleteEntries } = require('../controllers/entriesController');

const router = express.Router();

router.get('/', getEntries);

router.post('/', postEntries);

router.put('/:id_entry', editEntries);

router.delete('/:id_entry', deleteEntries);


module.exports = router;