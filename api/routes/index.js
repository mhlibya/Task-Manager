const express = require('express');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const Task = require('../models/task');

// Serve the home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});

// Serve the register page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/register.html'));
});

// Serve the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

// Serve the create task page (protected route)
router.get('/create-task', protect, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/create-task.html'));
});

// Serve the edit task page (protected route)
router.get('/edit-task/:id', protect, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/update-task.html'));
});

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

module.exports = router;