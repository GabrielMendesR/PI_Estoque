const dbFunctions = require('..index.js')

function addBanco(){


  console.log("addBanco")
  return
  const sql1 = `INSERT INTO produtos(nome, categoria, modelo, fornecedor, preco) VALUES ('luis', 'categoria1', 'modelo1', 'fornecedor1', '30')` 
  db.run(sql1)
}


module.exports = {
  addBanco
}