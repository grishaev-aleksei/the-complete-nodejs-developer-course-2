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
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = {todo};