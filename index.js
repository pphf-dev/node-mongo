const MongoClient = require('mongodb').MongoClient;  
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //port number for mongodb server
const dbname = 'nucampsite';

//use connect method to open connection to db server, connect method's callback provides client object we can use to access the db
MongoClient.connect(url, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    //single promise chain - better than nested callback functions
    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection', result);

        return dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites');
    })
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:' , docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground"}, 
            { description: "Updated Test Description"}, 'campsites');
        })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground"},'campsites');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);
        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err)); //catch error connecting to db