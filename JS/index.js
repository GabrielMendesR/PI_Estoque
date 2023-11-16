function addEstoque() {
    var prod = {
        id: document.getElementById('id').value, 
        nome: document.getElementById('nome').value, 
        categoria: document.getElementById('categoria').value, 
        fornecedor: document.getElementById('fornecedor').value, 
        quantidade: 0,
        modelo: document.getElementById('modelo').value,
    }

    document.getElementById('estoque').append(prod)
    
}

