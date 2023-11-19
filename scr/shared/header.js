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
}

function getHeaderPath() {
  const scriptUrl = new URL(import.meta.url);
  const scriptPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));
  const headerPath = `${scriptPath}/header.html`;

  return headerPath
}

window.addEventListener('DOMContentLoaded', loadHeader);