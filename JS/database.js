const sqlite3 = require("sqlite3").verbose();

let sql
  
const db = new sqlite3.Database("../database/estoque.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log(err.message)
})


db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='produtos'",
  (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      if (row) {
        console.log('Table "produtos" already exists');
        // Table exists, perform actions accordingly
      } else {
        // Table does not exist, create it
        const sql = `CREATE TABLE produtos (
          id_produto INTEGER PRIMARY KEY,
          nome TEXT,
          categoria TEXT,
          modelo TEXT,
          fornecedor TEXT,
          preco REAL,
          quantidade INTEGER,
          valor_total INTEGER
        )`;

        db.run(sql, (createErr) => {
          if (createErr) {
            console.error(createErr.message);
          } else {
            console.log('Table "produtos" created');
          }
        });
      }
    }
  }
);


function addBanco(){
  console.log("teste")
  const sql1 = `INSERT INTO produtos(nome, categoria, modelo, fornecedor, preco) VALUES ('luis', 'categoria1', 'modelo1', 'fornecedor1', '30')` 
  db.run(sql1)
}
