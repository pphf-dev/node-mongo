const MongoClient = require('mongodb').MongoClient;  //mongodb - node.js driver + imported MongoClient object from it
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/'; //port number for mongodb server
const dbname = 'nucampsite';

//use connect method to open connection to db server, connect method's callback provides client object we can use to access the db
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); //checks to see if first argument strictly equals the expected second argument, if actual and expected values match we continue on, but if not then assert will fail, throw and error, terminate the entire app, and log error to console.

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    //delete campsites collection at beginning of app run - not normal
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //recreate collection
        const collection = db.collection('campsites');

        //insert new document
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //ops contains array that contains the inserted document

            collection.find().toArray((err, docs) => { //convert document objects to array to display in console
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close(); //close connection to db server
            });
        });
    });
}); 
//Note the nested callback functions used for asynchronous operations - not something we would normally do