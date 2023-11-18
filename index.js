
// document.addEventListener('DOMContentLoaded', () => {
//   console.log("initialize")
 

// });

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



class Prod{
    constructor(nome, categ, forn, mod, prec) {
        this.nome = nome;
        this.categoria = categ;
        this.fornecedor = forn;
        this.quantidade = 0;
        this.modelo = mod;
        this.preco = prec;

    };
};

function addEstoque() {
    var prod = [document.getElementById('nome').value, document.getElementById('categoria').value, document.getElementById('fornecedor').value, document.getElementById('modelo').value, document.getElementById('preco').value];
    if (prod[0] != '' && prod[1] != '' && prod[2] != '' && prod[3] != '' && (prod[4] != '')) {
        const produto = new Prod(prod[0], prod[1], prod[2], prod[3], parseFloat(prod[4]))            
            
        console.log(produto);
    }
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addEstoque();
    }
})
