const express = require('express');
const { createTask, getTasks, getTrashedTasks, viewTaskById, getTaskById, updateTask, toggleTrashTask, changeTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/trash', protect, getTrashedTasks);
router.get('/view/:id', protect, viewTaskById);
router.get('/json/:id', protect, getTaskById);
router.put('/:id', protect, updateTask);
router.put('/toggle-trash/:id', protect, toggleTrashTask);
router.put('/status/:id', protect, changeTaskStatus);

module.exports = router;