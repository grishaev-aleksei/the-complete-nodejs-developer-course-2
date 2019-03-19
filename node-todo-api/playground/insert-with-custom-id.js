const {ObjectID} = require('mongodb');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');

const newId = new ObjectID();

const newTodo = new todo({
    _id: newId,
    text: 'this to do with predefined ID'
});

// todo.insertMany({text: 'chegebaeag'})
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

newTodo.save()
    .then(res => {
        console.log('res', res);
        mongoose.disconnect();
    })
    .catch(err => console.log('err', err));
//
// console.log(newTodo);
// console.log(newId);

// before('seed todo with newId', (done)=>{
//     todo.insertOne(newTodo)
//         .then(done)
// });



const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
},{
    text: 'mamajan'
}];

// todo.insertMany(todos)
//     .then(todos=>{
//         console.log(todos);
//         mongoose.disconnect();
//     });