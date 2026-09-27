const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(JSON.parse(data));
    });
});

app.post('/update', (req, res) => {
    const newData = req.body;

    fs.writeFile(
        'data.json',
        JSON.stringify(newData, null, 2),
        (err) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: 'Data updated successfully!'
            });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});