const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("../database/estoque.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) console.log(err.message)
})
