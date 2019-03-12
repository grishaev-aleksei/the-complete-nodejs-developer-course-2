const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Todo-app';

mongoose.connect(url, {useNewUrlParser: true})
    .then(res => console.log('successfully connected'))
    .catch(err => console.log('err', err));

const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

const newToDo = new Todo({
    text: 'Cook dinner'
});

const toDo2 = new Todo({
    text: 'Make a challenge',
    completed: true,
    completedAt: new Date()
});

toDo2.save()
    .then(res => console.log('successfully saved', res))
    .catch(err => console.log('there was an error', err));