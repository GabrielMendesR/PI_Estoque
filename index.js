import { createTable, insertRow, getAllProducts } from './scr/utils/database.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/createTable', (req, res) => {
    createTable(req.body.nomeTabela)
    res.json({ message: `Tabela ${req.body.nomeTabela} criada com sucesso` });
});

app.post('/api/new-product', (req, res) => {
  insertRow(req.body)
  res.json({ message: `` });
});

app.get('/api/get-all-products', (req, res) => {
  getAllProducts()
    .then(data => {
      console.log("data:",data)
      res.json({ data }); 
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


function createTableRequest() {
  const body = JSON.stringify(
    { 
      nomeTabela: 'produtos'
    }
  )
  fetch('http://localhost:3000/api/createTable', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: body,
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Ocorreu um erro ao criar a tabela');
      }
      return response.json();
  })
  .then(data => {
      console.log('Tabela criada:', data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}


app.listen(3000, () => {
    console.log('Server running on port 3000');
    createTableRequest()
});
