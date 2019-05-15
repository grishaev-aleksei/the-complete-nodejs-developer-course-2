require('./../config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {todo} = require('./models/todo');
const {user} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {

    new todo({
        text: req.body.text,
        _creator: req.user._id
    })
        .save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(400).send(err));
});

app.get('/todos', authenticate, (req, res) => {
    todo.find({
        _creator: req.user._id
    })
        .then((todos) => {
            res.send({todos})
        })
        .catch(err => res.status(400).json(err))
});

app.get('/todos/:id', authenticate, (req, res) => {
    const todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(400).json({error: 'invalid ID'})
    }
    todo.findOne({
        _id: todoId,
        _creator: req.user._id
    })
        .then(todo => {
            if (!todo) {
                return res.status(404).json({error: 'todo not found'})
            }
            res.status(200).json(todo)
        })
        .catch(err => res.status(400).json(err))
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    const todoId = req.params.id;
    if (!ObjectID.isValid(todoId)) {
        return res.status(400).json({error: 'invalid ID'})
    }
    try {
        const resTodo = await todo.findOneAndDelete({
            _id: todoId,
            _creator: req.user._id
        });
        if (!resTodo) {
            return res.status(404).json({error: 'todo not found'})
        }
        res.status(200).json(resTodo)
    } catch (e) {
        res.status(400).json(e)
    }

});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    todo.findOneAndUpdate({
        _id: todoId,
        _creator: req.user._id
    }, {
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

//Users

app.post('/users', async (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);

    const thisUser = new user(body);

    try {
        await thisUser.save();
        const token = await thisUser.generateAuthToken();
        res.header('x-auth', token).send(thisUser);
    } catch (e) {
        res.status(400).send(e)
    }

});

app.post('/users/login', async (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    try {
        const resUser = await user.findByCredentials(body.email, body.password);
        const token = await resUser.generateAuthToken();
        res.header('x-auth', token).send(resUser);
    } catch (e) {
        res.status(400).send(e)
    }

});

app.get('/users', (req, res) => {
    user.find()
        .then(users => {
            res.send({users})
        })
        .catch(err => res.status(400).json(err));
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).end()
    } catch (e) {
        res.status(400).end()
    }
});

app.listen(process.env.PORT, () => {
    console.log(`application started on port === ${process.env.PORT}`)
});

module.exports = {app};



