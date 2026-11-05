const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_retrogames'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso!');
});

app.get('/jogos', (req, res) => {
  const query = 'SELECT * FROM jogos ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar jogos:', err);
      return res.status(500).json({ error: 'Erro ao buscar jogos' });
    }
    res.json(results);
  });
});

app.post('/jogos', (req, res) => {
  const { titulo, plataforma, desenvolvedora, descricao, imagem_url, preco } = req.body;
  
  const query = 'INSERT INTO jogos (titulo, plataforma, desenvolvedora, descricao, imagem_url, preco) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [titulo, plataforma, desenvolvedora, descricao, imagem_url, preco];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar jogo:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar jogo' });
    }
    res.status(201).json({ message: 'Jogo cadastrado com sucesso!', id: result.insertId });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});