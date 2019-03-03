const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(res.ops))
    // })

    db.collection('Users').insertOne({
        Name: 'Andrew',
        Age: 25,
        Location: 'Philadelphia'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(res.ops))
    })

    // client.close();
});