const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {app} = require('./../../server');

const {todo} = require('./../../models/todo');
const {user} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId.toString(), access: 'auth'}, 'abc123').toString()

    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId.toString(), access: 'auth'}, 'abc123').toString()

    }]
}];

const populateUsers = (done) => {
    user.deleteMany({})
        .then(() => {
            const userOne = new user(users[0]).save();
            const userTwo = new user(users[1]).save();

            return Promise.all([userOne, userTwo])
        })
        .then((res) => {
            done()
        })
};


const populateTodos = (done) => {
    todo.deleteMany({})
        .then(() => {
            return todo.insertMany(todos)
        }).then(done())
};


module.exports = {
    populateTodos,
    todos,
    populateUsers,
    users
};