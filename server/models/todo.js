var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, // it should be entered
        minlength: 1, // it should at least one letter
        trim: true // trim spaces in beggining of the word
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
        required: true
    }
});

module.exports = {Todo};