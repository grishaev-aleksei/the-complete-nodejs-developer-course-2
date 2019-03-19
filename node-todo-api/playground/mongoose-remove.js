const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

// todo.deleteMany({})
// .then(res => console.log(res));

// todo.findOneAndRemove()
// todo.findByIdAndRemove()

todo.findByIdAndDelete('5c90b30b409fd3061c4aa35a')
    .then(res => console.log(res));