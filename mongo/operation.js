//Chứa hàm CRUD dùng lại được
const assert = require("assert");

exports.insertDocument = async (db, document, collection) => {
    const result = await db.collection(collection)
        .insertOne(document);

    assert.equal(result.acknowledged, true);
    console.log("Inserted document:", result.insertedId);

    return result;
};

exports.findDocuments = async (db, collection) => {
    const docs = await db.collection(collection)
        .find({})
        .toArray();

    return docs;
};

exports.updateDocument = async (
    db, filter, update, collection
) => {
    const result = await db.collection(collection)
        .updateOne(filter, { $set: update });

    console.log("Updated documents:", result.modifiedCount);
    return result;
};

exports.removeDocument = async (db, filter, collection) => {
    const result = await db.collection(collection)
        .deleteOne(filter);

    console.log("Deleted documents:", result.deletedCount);
    return result;
};