document.addEventListener('DOMContentLoaded', function() {
  getAllProductsRequest().then(data => {
    console.log("data:",data)
    addCodigo(data)
  })
});

function addCodigo(data) {

  const elemento = document.getElementById('itens') 

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