const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Todo-app';

mongoose.connect(url, {useNewUrlParser: true})
    .then(res => console.log('successfully connected'))
    .catch(err => console.log('err', err));


module.exports = {
    mongoose
};