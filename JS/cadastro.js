//import { createTable } from './database.js';

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

// Add a click event listener to the button, calling myFunction1 and myFunction2
myButton.addEventListener('click', () => {
  console.log("click")
  //createTable()
  createTableRequest()
  //addEstoque();
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


// Function to send a POST request to create a table
function createTableRequest() {
  const body = JSON.stringify(
    { 
      nomeTabela: document.getElementById('nome').value
    }
  )
  fetch('http://localhost:3000/api/createTable', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Specify content type if needed
      },
      // Optionally, you can send data in the request body
      body: body,
    
  })
  .then(response => {
    console.log(body)
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response JSON if any
  })
  .then(data => {
      // Handle successful response
      console.log('Table created:', data);
  })
  .catch(error => {
      // Handle error
      console.error('There was a problem with the fetch operation:', error);
  });
}


