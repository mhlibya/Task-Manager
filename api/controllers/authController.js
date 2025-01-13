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
        return res.status(400).send(`
            <html>
            <head>
            <title>Already exists</title></head>
            <body>
                <h1 style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
                    Username has already been taken.
                </h1>
            </body>
        </html>
        `);
    }

    const user = await User.create({
        username,
        password,
    });

    if (user) {
        res.status(201).redirect('/login');
    } else {
        res.status(400).send(`
            <html>
            <head>
            <title>Invalid registration credentials</title></head>
            <body>
                <h1 style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
                    Invalid username or password.
                </h1>
            </body>
        </html>
        `);
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
        res.redirect('/tasks');
    } else {
        res.status(401).send(`
            <html>
            <head>
            <title>Invalid login credentials</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: url('/images/spongebob_squarepants.gif') no-repeat center center fixed;
                    background-size: cover;
                    font-family: Arial, sans-serif;
                }
            </style>
            </head>
        </html>
        `);
    }
};

// Logout user
const logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, authUser, logoutUser };