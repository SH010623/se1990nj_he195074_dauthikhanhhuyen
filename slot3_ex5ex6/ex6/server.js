const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/data", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                error: "Cannot read data"
            });
        }

        res.json(JSON.parse(data));
    });
});

app.post("/update", (req, res) => {
    fs.writeFile(
        "data.json",
        JSON.stringify(req.body, null, 2),
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: "Cannot update data"
                });
            }

            res.json({
                message: "Data updated successfully"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});