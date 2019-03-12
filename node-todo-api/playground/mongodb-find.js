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

    db.collection('Users').find({Name: 'Mike'}).toArray()
        .then(res => console.log('good', res))
        .catch(err => console.log('bad', err));

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c821abad142cc9ec5661a6d')
    // }).toArray()
    //     .then(res => console.log('success:', (res)))
    //     .catch(err => console.log('error:', err));

    // db.collection('Todos').find().count()
    //     .then(res => console.log('success:', (res)))
    //     .catch(err => console.log('error:', err));

    client.close();
});