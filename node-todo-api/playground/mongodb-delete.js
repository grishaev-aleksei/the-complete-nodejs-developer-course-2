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

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c7c092c6749eb042a8aa7f6')})
        .then(res => console.log('good', res))
        .catch(err => console.log('bad', err));

    db.collection('Users').deleteMany({Name: 'Andrew'})
        .then(res => console.log('good', res))
        .catch(err => console.log('bad', err));
    //
    // db.collection('Todos').deleteOne({text: 'Eat lunch'})
    //     .then(res => console.log('good', res))
    //     .catch(err => console.log('bad', err));


    client.close();
});