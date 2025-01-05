const express = require('express');
const { createTask, getTasks, getTrashedTasks, getTaskById, updateTask, trashTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/trashed', protect, getTrashedTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, trashTask);

module.exports = router;