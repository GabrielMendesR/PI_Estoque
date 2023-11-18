import { createTable } from './database.js';

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
  createTable()

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
