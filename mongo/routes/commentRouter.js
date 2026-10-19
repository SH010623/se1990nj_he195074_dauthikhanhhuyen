const express = require("express");
const Comment = require("../models/comment");

const commentRouter = express.Router();

// GET: lấy danh sách bình luận
commentRouter.get("/", async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate("article");

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: tạo bình luận
commentRouter.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        const savedComment = await comment.save();

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = commentRouter;