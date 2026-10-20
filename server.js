const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Activer le décodage du corps JSON
app.use(express.json());

// 2. Middleware pour afficher les requêtes dans la console
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next(); // Toujours appeler next() pour continuer !
});

// Liste d'articles stockée en mémoire
const articles = [
  { id: 1, title: 'Introduction a la Stack MERN', author: 'Admin' },
  { id: 2, title: 'Comprendre l\'Asynchronisme', author: 'Admin' }
];

// Route GET racine
app.get('/', (req, res) => {
  res.status(200).send('<h1>API Blog MERN operationnelle</h1>');
});

// Route GET : Consulter tous les articles
app.get('/api/articles', (req, res) => {
  res.status(200).json({
    total: articles.length,
    articles
  });
});

// Route POST : Ajouter un nouvel article
app.post('/api/articles', (req, res) => {
  const { title, author = 'Anonyme' } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'Le titre de l\'article est obligatoire.'
    });
  }

  const newArticle = {
    id: Date.now(),
    title,
    author
  };

  articles.push(newArticle);

  return res.status(201).json({
    message: 'Article cree avec succes !',
    article: newArticle
  });
});


app.get('/about', (req, res) => {
  res.status(200).json({
    application: 'API Blog MERN',
    institution: 'École Polytechnique de Sousse',
    version: '1.0.0'
  });
});

const users = [
  { nom: 'Ali', email: 'ali@polytechnicien.tn' },
  { nom: 'Aya', email: 'aya@polytechnicien.tn' },
  { nom: 'Karim', email: 'karim@polytechnicien.tn' }
];

app.get('/api/users', (req, res) => {
  res.status(200).json({
    total: users.length,
    users
  });
});


app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      error: 'Les champs email et message sont obligatoires.'
    });
  }

  return res.status(200).json({
    message: 'Message recu avec succes !'
  });
});


app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});