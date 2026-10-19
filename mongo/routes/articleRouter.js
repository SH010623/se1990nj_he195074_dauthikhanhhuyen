const express = require("express");
const Article = require("../models/article");

const articleRouter = express.Router();

// GET: lấy tất cả bài báo
articleRouter.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: tạo bài báo
articleRouter.post("/", async (req, res) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();

        res.status(201).json(savedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: lấy bài báo theo ID
articleRouter.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: cập nhật bài báo theo ID
articleRouter.put("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: xóa bài báo theo ID
articleRouter.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(
            req.params.id
        );

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        res.status(200).json({
            message: "Article deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = articleRouter;