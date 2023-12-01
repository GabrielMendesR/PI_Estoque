import { loadHeader } from './../../shared/header.js'

document.addEventListener('DOMContentLoaded', function() {
  getAllMovimentationsRequest().then(data => {
    console.log("data:",data)
    popularTabela(data)
  })

});


function popularTabela(data) {
    const tableBody = document.getElementById('corpoTabela');
  
    // Clear any existing content in the table body
    tableBody.innerHTML = '';
  
    // Loop through the data and create table rows and cells
    data.forEach(mov => {
      const row = document.createElement('tr');
      console.log(mov)
  
      // Create table cells for each property of the product
      const idCell = document.createElement('td');
      idCell.textContent = mov.id_produto;
      row.appendChild(idCell);
  
      const quant = document.createElement('td');
      quant.textContent = mov.quantidade;
      row.appendChild(quant);
      
      const valor = document.createElement('td');
      valor.textContent = mov.valor_total;
      row.appendChild(valor);

      tableBody.appendChild(row);
    });
  }


async function getAllMovimentationsRequest() {
  const response = await fetch('http://localhost:3000/api/get-all-movimentations', {
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