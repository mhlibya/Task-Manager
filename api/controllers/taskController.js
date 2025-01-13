const Task = require('../models/task');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, priority, due_date, expected_duration_hours = 0, expected_duration_minutes = 0 } = req.body;
    const hours = parseInt(expected_duration_hours, 10) || 0;
    const minutes = parseInt(expected_duration_minutes, 10) || 0;
    const expected_duration = (hours * 60) + minutes;

    const task = new Task({
        author: req.user._id,
        title,
        description,
        priority,
        due_date,
        expected_duration,
        status: 'to do',
        trashed: false,
        delay: 0
    });

    try {
        const savedTask = await task.save();
        res.status(201).redirect('/tasks');
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.user._id, trashed: false });
        res.render('tasks', { tasks });
    } catch (err) {
        res.status(400).json({ message: 'Error fetching tasks', error: err.message });
    }
};

// Get all trashed tasks for the authenticated user
const getTrashedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ author: req.user._id, trashed: true });
        res.render('trashedTasks', { tasks });
    } catch (err) {
        res.status(400).json({ message: 'Error fetching trashed tasks', error: err.message });
    }
};

// Get a single task by ID and render the task details page
const viewTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id });
        if (task) {
            res.render('taskDetails', { task });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error fetching task', error: err.message });
    }
};

// Get a single task by ID and respond with JSON
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
        const { expected_duration_hours = 0, expected_duration_minutes = 0, ...rest } = req.body;
        const hours = parseInt(expected_duration_hours, 10) || 0;
        const minutes = parseInt(expected_duration_minutes, 10) || 0;
        const expected_duration = (hours * 60) + minutes;
        const taskData = { ...rest, expected_duration };

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            taskData,
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

// Trash or untrash a task by ID
const toggleTrashTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            { trashed: req.body.trashed },
            { new: true }
        );
        if (task) {
            res.json({ message: `Task ${req.body.trashed ? 'trashed' : 'untrashed'} successfully` });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: `Error ${req.body.trashed ? 'trashing' : 'untrashing'} task`, error: err.message });
    }
};

// Change task status
const changeTaskStatus = async (req, res) => {
    try {
        const updateData = { status: req.body.status };
        if (req.body.status === 'done' && !isNaN(req.body.delay)) {
            updateData.delay = req.body.delay;
        }
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, author: req.user._id },
            updateData,
            { new: true }
        );
        if (task) {
            if (req.body.status === 'in progress') {
                res.render('countdown', { task });
            } else {
                res.json({ message: `Task status changed to ${req.body.status}` });
            }
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error changing task status', error: err.message });
    }
};

// Render the countdown page
const renderCountdownPage = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id });
        if (task) {
            res.render('countdown', { task });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error fetching task', error: err.message });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, author: req.user._id });
        if (task) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error deleting task', error: err.message });
    }
};

module.exports = { deleteTask, createTask, getTasks, getTrashedTasks, viewTaskById, getTaskById, updateTask, toggleTrashTask, changeTaskStatus, renderCountdownPage };