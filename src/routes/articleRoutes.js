
const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

// Consultation publique
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

// Opérations protégées par JWT
router.post('/', protect, articleController.createArticle);
router.put('/:id', protect, articleController.updateArticle);
router.delete('/:id', protect, articleController.deleteArticle);

module.exports = router;
