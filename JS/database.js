import sqlite3 from 'sqlite3';
import fs from 'fs-extra';

const databaseFolder = './../sqlite3_database';

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
const db = new sqlite3.Database(databaseFolder + 'database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if(err) console.log(err.message)
})
// Function to create a table
export function createTable(nomeTabela) {
  const sql = `
    CREATE TABLE IF NOT EXISTS ${nomeTabela} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      categoria TEXT,
      modelo TEXT,
      fornecedor TEXT,
      preco REAL
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

export function insertRow(data) {
  
  const { nome, categoria, modelo, fornecedor, preco } = data;
  const sql = `
    INSERT INTO produtos (nome, categoria, modelo, fornecedor, preco)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, categoria, modelo, fornecedor, preco], function(err) {
    if (err) {
      console.error('Error inserting row:', err.message);
    } else {
      console.log(`Row inserted with ID: ${this.lastID}`);
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