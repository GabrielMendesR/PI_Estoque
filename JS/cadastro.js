
import { addBanco } from './database';




class Something {
    name = "Something Good";
    constructor(element) {
      // Note that the listeners in this case are `this`, not this.handleEvent
      var el = document.getElementById("confirmButton");
      el.addEventListener("click", addEstoque, false);
      
    }
  }
  
  const s = new Something(document.body);

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

function addEstoque() {
    var prod = [document.getElementById('nome').value, document.getElementById('categoria').value, document.getElementById('fornecedor').value, document.getElementById('modelo').value, document.getElementById('preco').value];
    if (prod[0] != '' && prod[1] != '' && prod[2] != '' && prod[3] != '' && (prod[4] != '')) {
        //const produto = new Prod(prod[0], prod[1], prod[2], prod[3], parseFloat(prod[4]))            
            
        console.log(produto);

    }
    console.log("AAAAAAAAAAA")
    addBanco()
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addEstoque();
    }
})

export { addEstoque }