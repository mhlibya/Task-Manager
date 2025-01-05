const Task = require('../models/task');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, priority, due_date, expected_duration } = req.body;

    const task = new Task({
        author: req.user._id,
        title,
        description,
        priority,
        due_date,
        expected_duration,
        status: 'pending',
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching tasks', error: err.message });
    }
};

module.exports = { createTask, getTasks };