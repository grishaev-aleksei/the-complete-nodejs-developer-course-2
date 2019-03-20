const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

const todoId = '5c91e8d1efaaa403aa7ecabe',
    newBody = {
        text: 'new one from separate file testing findOneAndUpdate',
        completed: false,
        completedAt: null
    };

todo.findByIdAndUpdate(todoId, {$set: newBody}, {new: true})
    .then(todo => {
        console.log(todo)
    })
    .catch(err => console.log('there was an error'));