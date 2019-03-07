// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();

console.log(obj);

const assert = require('assert');


const user = {
    name: 'Aziz',
    age: 11,
    sex: 'very'
};

const {sex} = user;

console.log(sex);

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

    // db.collection('Users').insertOne({
    //     Name: 'Andrew',
    //     Age: 25,
    //     Location: 'Philadelphia'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp()))
    // })

    client.close();
});