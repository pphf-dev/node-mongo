const MongoClient = require('mongodb').MongoClient;  
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //port number for mongodb server
const dbname = 'nucampsite';

//use connect method to open connection to db server, connect method's callback provides client object we can use to access the db
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    //delete campsites collection at beginning of app run - not normal
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //call insertDocument method from operations.js
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:' , docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground"}, 
                    { description: "Updated Test Description"}, 'campsites', 
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);

                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground"},
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);
                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
         });
    });
});
//Note call to insertDocument arguments contains a callback function that won't execute until the end of the insertDocument function when it is called
//We call one function and define another in the parameter list