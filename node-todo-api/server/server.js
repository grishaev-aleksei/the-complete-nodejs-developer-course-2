const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {todo} = require('./models/todo');
const {user} = require('./models/user');

const app = express();

app.use(bodyParser.json());

//todo 77-79 series 


app.post('/todos', (req, res) => {
    new todo(req.body)
        .save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    todo.find()
        .then((todos) => {
            res.send({todos})
        })
        .catch(err => res.status(400).json(err))
});

app.get('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(400).json({error: 'invalid ID'})
    }
    todo.findById(todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({error: 'todo not found'})
            }
            res.status(200).json(todo)
        })
        .catch(err => res.status(400).json(err))
});

app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(400).json({error: 'invalid ID'})
    }
    todo.findByIdAndDelete(todoId)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({error: 'todo not found'})
            }
            res.status(200).json(todo)
        })
        .catch(err => res.status(400).json(err))
});

app.patch('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(todoId)) {
        return res.status(400).json({error: 'invalid ID'})
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null
    }

    todo.findOneAndUpdate(todoId, {
        $set: body
    }, {new: true})
        .then(todo => {
            if (!todo) {
                return res.status(404).json({error: 'todo not found'})
            }
            res.status(200).json(todo)
        })
        .catch(err => res.status(400).json(err))
});

app.get('/users', (req, res) => {
    user.find()
        .then(users => {
            res.send({users})
        })
        .catch(err => res.status(400).json({error: err}));
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).json({error: 'invalid ID'})
    }
    user.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }
            res.status(200).json(user)
        })
        .catch(err => res.status(400).json({error: err}))
});


app.listen(3000, () => {
    console.log('started on port = 3000')
});

module.exports = {app};



