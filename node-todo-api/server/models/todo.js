const mongoose = require('mongoose');

const todo = mongoose.model('todo', {
    text: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo: todo};