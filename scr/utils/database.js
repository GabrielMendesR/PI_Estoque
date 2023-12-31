import sqlite3 from 'sqlite3';
import fs from 'fs-extra';

const databaseFolder = './../sqlite3_database';
const databaseLocation = `${databaseFolder}/database.db`
let globalNomeTabela  = ''

if (!fs.existsSync(databaseFolder)) {
  fs.mkdirSync(databaseFolder, { recursive: true }, (err) => {
      if (err) {
          console.error('Error creating folder:', err);
      } else {
          console.log('Folder created successfully.');
      }
  });
}

// Create a new SQLite3 database instance
const db = new sqlite3.Database(databaseLocation, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if(err) console.log(err.message)
})
// Function to create a table
export function createTable(nomeTabela) {
  globalNomeTabela = nomeTabela
  const sql = `
    CREATE TABLE IF NOT EXISTS ${nomeTabela} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      categoria TEXT,
      modelo TEXT,
      fornecedor TEXT,
      preco REAL,
      quantidade INTEGER
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log("Tabela criada:", nomeTabela)
    }
  });
  return `Tabela "${nomeTabela}" criada com sucesso.`
}

export function createMovimentationTable() {

  const sql = `
    CREATE TABLE IF NOT EXISTS movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_produto INTEGER,
      valor_total REAL,
      quantidade INTEGER,
      FOREIGN KEY (id_produto) REFERENCES produtos(id)
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log("Tabela de movimentações criada!")
    }
  });
  return `Tabela de movimentações criada com sucesso.`
}


export function insertProduct(data) {
  
  const { nome, categoria, modelo, fornecedor, preco } = data;
  const sql = `
    INSERT INTO produtos (nome, categoria, modelo, fornecedor, preco, quantidade)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, categoria, modelo, fornecedor, preco, 0], function(err) {
    if (err) {
      console.error('Error inserting row:', err.message);
    } else {
      console.log(`Row inserted with ID: ${this.lastID}`);
    }
  });
}

export function insertMovimentation(object) {

  db.get('SELECT preco FROM produtos WHERE id = ?', [object.idProduto], (err, row) => {
    if (err) {
      console.error('Error fetching product price:', err.message);
      //db.close();
    } else {
      const productPrice = row.preco;
      const totalValue = productPrice * object.quant;
      console.log("OBJECT:",object)
      const sinal = object.tipo == 'compra' ? 1 : -1
      const quantidade = object.quant * sinal
      console.log(sinal)
      console.log(quantidade)
      console.log(object, productPrice, totalValue)
      const sql = `
      INSERT INTO movimentacoes (id_produto, quantidade, valor_total)
      VALUES (?, ?, ?)`;
  
      db.run(sql, [object.idProduto, object.quant, totalValue], function(err) {
        if (err) {
          console.error('Erro:', err.message);
        } else {
          console.log(`Compra registrada com produto de ID ${object.idProduto} quantidade: ${object.quant} valor total: ${totalValue}`);
        }
      });

      decreaseProductQuantity(object.idProduto, quantidade)
    } 
  })
}

function decreaseProductQuantity(id_produto, quantidade) {
  const sql = `
  UPDATE produtos 
    SET quantidade = quantidade + ? WHERE id = ?;`;

  db.run(sql, [quantidade, id_produto], function(err) {
    if (err) {
      console.error('Erro:', err.message);
    } else {
      console.log(`Quantidade Atualizada`);
    }
  });
}

function increaseProductQuantity(id_produto, quantidade) {
  const sql = `
  UPDATE produtos 
    SET quantidade = quantidade + ? WHERE id = ?;`;

  db.run(sql, [quantidade, id_produto], function(err) {
    if (err) {
      console.error('Erro:', err.message);
    } else {
      console.log(`Quantidade Atualizada`);
    }
  });
}

// Function to remove a row by ID
export function removeRow(id) {
  const sql = `DELETE FROM produtos WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error removing row:', err.message);
    } else {
      console.log(`Row with ID ${id} removed.`);
    }
  });
}

// Close the database connection when done
export function closeDatabase() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Database connection closed.');
  });
}


export function getAllProducts() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${globalNomeTabela}`;
    db.all(sql, (err, rows) => {
      if (err) {
        console.error('Error retrieving data:', err.message);
        reject(err);
      } else {
        resolve(rows); 
      }
    });
  });
}

export function getAllMovimentations() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM movimentacoes`;
    db.all(sql, (err, rows) => {
      if (err) {
        console.error('Error retrieving data:', err.message);
        reject(err);
      } else {
        resolve(rows); 
      }
    });
  });
}