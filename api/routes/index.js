const express = require('express');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

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

// Serve the update task page (protected route)
router.get('/update-task', protect, (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/update-task.html'));
});

module.exports = router;