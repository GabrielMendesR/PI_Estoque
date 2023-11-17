
class Prod{
    constructor(nome, categ, forn, mod) {
        this.nome = nome;
        this.categoria = categ;
        this.fornecedor = forn;
        this.quantidade = 0;
        this.modelo = mod;

    };
};

produto = new Prod('raquete', 'esporte', 'atacadao', 'v1');

console.log(produto.nome);
console.log(produto.categoria);
console.log(produto.quantidade);
