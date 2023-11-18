//const sqlite3 = require("sqlite3").verbose();
//const database = require('./JS/database.js');
import sqlite3 from 'sqlite3';
import { createTable } from './JS/database.js';


const db = new sqlite3.Database("database/estoque.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log(err.message)
})

//database.createTable()
createTable()

// db.get(
//   "SELECT name FROM sqlite_master WHERE type='table' AND name='produtos'",
//   (err, row) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       const sql = `CREATE TABLE produtos (
//         id_produto INTEGER PRIMARY KEY,
//         nome TEXT,
//         categoria TEXT,
//         modelo TEXT,
//         fornecedor TEXT,
//         preco REAL
//       )`;

//       if (row) {
//         console.log('tabela "produtos" já existe, dropando tabela e criando novamente...');
//         db.run('DROP TABLE produtos', (dropErr) => {
//           if (dropErr) {
//             console.error(dropErr.message);
//           } else {
//             console.log('Tabela "produtos" dropada com sucesso.');
//             db.run(sql, (createErr) => {
//               if (createErr) {
//                 console.error(createErr.message);
//               } else {
//                 console.log('Nova tabela "produtos" criada');
//               }
//             });
//             return
//           }
//         })

//       } else {

//         db.run(sql, (createErr) => {
//           if (createErr) {
//             console.error(createErr.message);
//           } else {
//             console.log('Tabela "produtos" criada');
//           }
//         });
//       }
//     }
//   }
// );
