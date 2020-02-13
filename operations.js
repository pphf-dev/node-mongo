const assert = require('assert').strict;

//create methods for export
exports.insertDocument = (db, document, collection, callback) => {
    //set up constant to interact with specific collection in db
    const coll = db.collection(collection);  //argument = name of collection
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result); //callback is defined somewhere else (index.js). Here we are delivering the result of this method to the callback to use as designed.
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    //$set: update tells mongdb what operation we want
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};