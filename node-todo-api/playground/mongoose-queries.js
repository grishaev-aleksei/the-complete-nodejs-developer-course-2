const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

// const id = '5c8900b8b1c8d50939ccdf02';
//
// todo.find({
//     _id: id
// }).then(todos => {
//     console.log('many todos', todos)
// });
//
// todo.findOne({
//     _id: id
// }).then(todo => {
//     console.log('one todo', todo)
// });
//
// todo.findById(id).then(todo => {
//         if (!todo) {
//             return console.log('todo by ID was not found')
//         }
//         console.log('one todo by ID', todo)
//     }
// ).catch(err => console.log(err));

const userId = '5c879d5ae13d630a8f878bc4';

user.findById(userId)
    .then(user => {
        if (!user) {
            return console.log('404, not found')
        }
        console.log(user)
    })
    .catch(err => console.log(err));


user.find({})
    .then(user => {
        if (!user) {
            return console.log('404, not found')
        }
        console.log(user)
    })
    .catch(err => console.log(err));