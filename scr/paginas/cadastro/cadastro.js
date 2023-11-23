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

const myButton = document.getElementById('confirmButton');

myButton.addEventListener('click', () => {
  insertProductRequest()
});

export function addEstoque() {
  console.log("addEstoque")
  var prod = [document.getElementById('nome').value, document.getElementById('categoria').value, document.getElementById('fornecedor').value, document.getElementById('modelo').value, document.getElementById('preco').value];
  if (prod[0] != '' && prod[1] != '' && prod[2] != '' && prod[3] != '' && (prod[4] != '')) {
    //const produto = new Prod(prod[0], prod[1], prod[2], prod[3], parseFloat(prod[4]))            
          
    console.log(produto);

  }
  //addBanco()
}

document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addEstoque();
  }
})

document.addEventListener('DOMContentLoaded', function() {
 //
});


// Function to send a POST request to create a table

function insertProductRequest() {

  var prod = [
    document.getElementById('nome').value, 
    document.getElementById('categoria').value, 
    document.getElementById('fornecedor').value, 
    document.getElementById('modelo').value, 
    document.getElementById('preco').value
  ];

  if (prod[0] == '' || prod[1] == '' || prod[2] == '' || prod[3] == '' || prod[4] == '') return

  const produto = new Prod(prod[0], prod[1], prod[2], prod[3], parseFloat(prod[4]))            
  console.log(produto);
          
  const body = JSON.stringify(produto)
  fetch('http://localhost:3000/api/new-product', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: body,
  })
  .then(response => {
    console.log(body)
      if (!response.ok) {
          throw new Error('Ocorreu um erro ao consultar os dados');
      }
      return response.json(); // Parse response JSON if any
  })
  .then(data => {
      console.log('Novo produto inserido:', data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}
