const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo(req.body);

    todo.save()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({todos})
        })
        .catch(err => res.status(400).send(err))
});

app.listen(3000, () => {
    console.log('started on port = 3000')
});

module.exports = {app};


