export function loadHeader() {
  const headerContainer = document.getElementById('headerContainer');
  const headerPath = getHeaderPath()

  fetch(headerPath)
  .then(response => response.text())
  .then(html => {
    headerContainer.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching header:', error);
  });

  isLoaded()
}

function getHeaderPath() {
  const scriptUrl = new URL(import.meta.url);
  const scriptPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));
  const headerPath = `${scriptPath}/header.html`;

  return headerPath
}


function isLoaded() {
  const headerElement = document.getElementById('botaoCompra');
  console.log(headerElement)
  if (headerElement) {
    highlightButton();
  } else {
    setTimeout(isLoaded, 100);
  }
}

function highlightButton() {

  const fullPath = window.location.pathname;
  const currentPath = fullPath.split('/')[3]
  console.log(currentPath)

  switch(currentPath) {
    case 'compra':
      document.getElementById('botaoCompra').classList.add('highlighted');
      break;
    case 'cadastro':
      document.getElementById('botaoCadastro').classList.add('highlighted');
      break;
    case 'estoque':
      document.getElementById('botaoEstoque').classList.add('highlighted');
      break;
    case 'movimentacoes':
      document.getElementById('botaoMovimentacoes').classList.add('highlighted');
      break;
  }
}

window.addEventListener('DOMContentLoaded', loadHeader);
