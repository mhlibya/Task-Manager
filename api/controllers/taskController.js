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
        trashed: false
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
        const tasks = await Task.find({ author: req.user._id, trashed: false });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching tasks', error: err.message });
    }
};

// Get all trashed tasks for the authenticated user
const getTrashedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.user._id, trashed: true });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching trashed tasks', error: err.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error fetching task', error: err.message });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error updating task', error: err.message });
    }
};

// Trash a task by ID
const trashTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            { trashed: true },
            { new: true }
        );
        if (task) {
            res.json({ message: 'Task trashed successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error trashing task', error: err.message });
    }
};

module.exports = { createTask, getTasks, getTrashedTasks, getTaskById, updateTask, trashTask };