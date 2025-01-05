const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        username,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Authenticate user and get token
const authUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.redirect('/api/tasks');
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

module.exports = { registerUser, authUser };