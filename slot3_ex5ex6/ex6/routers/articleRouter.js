const express = require('express');

const router = express.Router();

const articles = require('../articles');

// GET all articles
router.get('/', (req, res) => {
    res.json(articles);
});

// GET article by ID
router.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const article = articles.find(article => article.id === id);

        if (!article) {
            throw new Error('Article not found');
        }

        res.json(article);

    } catch (err) {
        next(err);
    }
});


module.exports = router;