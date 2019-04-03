process.env.NODE_ENV = 'test';
require('./../config/config');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId.toString(), access: 'auth'}, process.env.JWT_SECRET).toString()

    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}];

function saveUsers() {
    const userOne = new user(users[0]).save()
        .then(res => {
            console.log(res)
        })
}

function verifyUserOne() {

}
//
// const populateUsers = (done) => {
//     user.deleteMany({})
//         .then(() => {
//             const userOne = new user(users[0]).save();
//             const userTwo = new user(users[1]).save();
//
//             return Promise.all([userOne, userTwo])
//         })
//         .then(done())
// };
saveUsers();