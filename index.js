import sqlite3 from 'sqlite3';
import { createTable, insertRow } from './JS/database.js';


const db = new sqlite3.Database("database/estoque.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log(err.message)
})

//database.createTable()

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/createTable', (req, res) => {
    createTable(req.body.nomeTabela)
    res.json({ message: `Tabela ${req.body.nomeTabela} criada com sucesso` });
});

app.post('/api/insertProduct', (req, res) => {
  insertRow(req.body)
  res.json({ message: `` });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
