const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Todo-app';

mongoose.connect(url, {useNewUrlParser: true})
    .then(res => console.log('successfully connected'))
    .catch(err => console.log('err', err));

// const Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 4,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });
//
// new Todo({
//     text: false
// }).save()
//     .then(res => console.log('successfully saved', res))
//     .catch(err => console.log('there was an error', err));

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

new User({
    email: '  Mom   '
}).save()
    .then(res => {
        console.log('successfully added user',res);
        mongoose.disconnect()
            .then(res => console.log('disconnected'))
            .catch(err => console.log('error on disconnect'));
    })
    .catch(err => console.log('error on adding user',err));



