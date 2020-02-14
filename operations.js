exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(document); //returns a promise as its return value b/c no callback argument
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    //$set: update tells mongdb what operation we want
    return coll.updateOne(document, { $set: update }, null);
};