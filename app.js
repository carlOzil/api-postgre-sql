const express = require('express');
const cors = require('cors');

require('dotenv').config();


const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/api/v1/entries',require('./routes/entriesRoutes'));

app.listen(port, () => {
    console.log(`Servidor POSTGRE, puerto ${port}`);
});