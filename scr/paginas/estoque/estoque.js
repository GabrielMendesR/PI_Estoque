import { loadHeader } from './../../shared/header.js'

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

let allProducts = []

document.addEventListener('DOMContentLoaded', function() {
  getAllProductsRequest().then(data => {
    console.log("data:",data)
    popularTabela(data)
  })

});


function popularTabela(data) {
  const tableBody = document.getElementById('corpoTabela');

  // Clear any existing content in the table body
  tableBody.innerHTML = '';

  // Loop through the data and create table rows and cells
  data.forEach(product => {
    const row = document.createElement('tr');

    // Create table cells for each property of the product
    const idCell = document.createElement('td');
    idCell.textContent = product.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = product.nome;
    row.appendChild(nameCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.categoria;
    row.appendChild(categoryCell);

    const fornecedor = document.createElement('td');
    fornecedor.textContent = product.fornecedor;
    row.appendChild(fornecedor);

    const preco = document.createElement('td');
    preco.textContent = product.preco;
    row.appendChild(preco);

    const quant = document.createElement('td');
    quant.textContent = product.quantidade;
    row.appendChild(quant);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

async function getAllProductsRequest() {
  const response = await fetch('http://localhost:3000/api/get-all-products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  const data = await response.json(); // Parse the JSON data from the response
  return data.data; 
}