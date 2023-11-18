//const sqlite3 = require("sqlite3").verbose();
//const database = require('./JS/database.js');
import sqlite3 from 'sqlite3';
import { createTable } from './JS/database.js';


const db = new sqlite3.Database("database/estoque.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log(err.message)
})

//database.createTable()

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());
// Handle POST request to /api/createTable
app.post('/api/createTable', (req, res) => {
    // Perform database operation to create table (using sqlite3, for example)
    // Example:
    // database.createTable(req.body)
    //    .then(result => res.json(result))
    //    .catch(err => res.status(500).json({ error: err.message }));
    createTable(req.body.nomeTabela)

    res.json({ message: `Tabela ${req.body.nomeTabela} criada com sucesso` });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
