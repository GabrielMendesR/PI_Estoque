counter = 0;

function addCodigo() {
    document.getElementById('itens').innerHTML += "<option value='" + counter + "'>#" + counter + "</option>";
    ++counter
};

addCodigo()