import { loadHeader } from './../../shared/header.js'

class Mov{
  constructor(id, quant, tipo) {
    this.idProduto = id;
    this.quant = quant;
    this.tipo = tipo
  };
};


document.addEventListener('DOMContentLoaded', function() {
  getAllProductsRequest().then(data => {
    fillOptions(data)
  })
});

let tipoTransacao = ''

const botaoConfirmar = document.getElementById('confirmButton');

botaoConfirmar.addEventListener('click', () => {
  console.log("tipo:",tipoTransacao)
  var mov = [
    document.getElementById('id_produto').value, 
    parseInt(document.getElementById('quantidade').value),
    tipoTransacao
  ];

  if (mov[0] == '' || mov[1] == '') return

  const movimentacao = new Mov(mov[0], parseFloat(mov[1]), mov[2])            
  addMovimentation(movimentacao)
});


const botaoTipoTransacao = document.querySelector('input[name="transactionType"][checked]');
botaoTipoTransacao.checked = true;
const radioButtons = document.querySelectorAll('input[name="transactionType"]');

radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
    tipoTransacao = radioButton.value
    console.log("change:",tipoTransacao)
  });
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
