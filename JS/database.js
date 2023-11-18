import sqlite3 from 'sqlite3';
//const sqlite3 = require('sqlite3');
//import sqlite3 from '../node_modules/sqlite3'


// Create a new SQLite3 database instance
const db = new sqlite3.Database(':memory:'); // Or specify a file name for a persistent database

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
      // const response = `Table "${nomeTabela}" created successfully.`;
      // return response
    }
  });
  return `Table "${nomeTabela}" created successfully.`
}

// Function to insert a row
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