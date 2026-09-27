const express = require('express');

const router = express.Router();

const videos = require('../videos');

router.get('/', (req, res) => {
    res.json(videos);
});

router.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const video = videos.find(video => video.id === id);

        if (!video) {
            throw new Error('Video not found');
        }

        res.json(video);

    } catch (err) {
        next(err);
    }
});

module.exports = router;