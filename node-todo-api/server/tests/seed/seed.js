const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {todo} = require('./../../models/todo');
const {user} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: userOneId,
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const users = [{
    _id: new ObjectID,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()

    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];

const populateUsers = (done) => {
    user.remove({})
        .then(() => {
            const userOne = new user(users[0]).save();
            const userTwo = new user(users[1]).save();

            return Promise.all([userOne, userTwo])
        })
        .then(done())
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