const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
    author: {
        type: schema.Types.ObjectId,
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
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    trashed: {
        type: Boolean,
        default: false
    }
});

module.exports = taskSchema;