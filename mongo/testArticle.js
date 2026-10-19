//Kiểm tra validation
const mongoose = require("mongoose");
const Article = require("./models/article");

async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/newspapers"
        );

        const newArticle = new Article({
            title: "Short News",
            text: "Paris is known for its iconic landmarks like the Eiffel Tower and Louvre.",
            comments: [
                { body: "Great article!" }
            ],
            tags: ["News"]
        });

        const savedArticle = await newArticle.save();
        console.log("Article saved:", savedArticle);

    } catch (err) {
        console.error("An error occurred:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}

main();