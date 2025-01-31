const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    expected_duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'to do'
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    trashed: {
        type: Boolean,
        default: false
    },
    delay: {
        type: Number,
        default: 0
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;