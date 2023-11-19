import { loadHeader } from './../../shared/header.js'

class Mov{
  constructor(id, quant) {
    this.idProduto = id;
    this.quant = quant;
  };
};


document.addEventListener('DOMContentLoaded', function() {
  getAllProductsRequest().then(data => {
    fillOptions(data)
  })
});

const botaoConfirmar = document.getElementById('confirmButton');

botaoConfirmar.addEventListener('click', () => {
  var mov = [
    document.getElementById('id_produto').value, 
    document.getElementById('quantidade').value, 
  ];

  if (mov[0] == '' || mov[1] == '') return

  const movimentacao = new Mov(mov[0], parseFloat(mov[1]))            
  console.log(movimentacao);
          
  addMovimentation(movimentacao)
});

function fillOptions(data) {

  const elemento = document.getElementById('id_produto') 

  data.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.id; 
    option.text = `${produto.id} - ${produto.nome}`; 
    elemento.appendChild(option); 
  });
};

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

async function addMovimentation(object) {

  const body = JSON.stringify(object)

  const response = await fetch('http://localhost:3000/api/movimentation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  });

  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  const data = await response.json(); // Parse the JSON data from the response
  return data.data; 
}
