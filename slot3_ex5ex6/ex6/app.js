const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const articleRouter = require('./routers/articleRouter');
const videoRouter = require('./routers/videoRouter');

app.use('/articles', articleRouter);
app.use('/videos', videoRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: err.message
    });
});

app.get('/articles', (req, res) => {
    res.json(articles);
});

app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    res.json(article);
});

app.post('/articles', (req, res) => {
    const article = req.body;

    articles.push(article);

    res.status(201).json(article);
});

app.put('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    article.title = req.body.title;
    article.content = req.body.content;

    res.json(article);
});

app.delete('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = articles.findIndex(article => article.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Article not found'
        });
    }

    const deletedArticle = articles.splice(index, 1);

    res.json(deletedArticle);
});

app.get('/videos', (req, res) => {
    res.json(videos);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});