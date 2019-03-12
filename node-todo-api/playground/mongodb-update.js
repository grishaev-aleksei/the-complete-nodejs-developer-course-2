// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'node-todo-api';

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        return console.log(err.message)
    }

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c87454429d8ca03b06234de')},
        {
            $set: {
                name: 'old Andrew'
            },
            $inc: {
                age: 7
            }
        }, {
            returnOriginal: false
        }).then(res => console.log(res));



    client.close();
});