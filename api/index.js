const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const routes = require('./routes/index');

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log('Connected to mongoDB successfully')})
.catch((err) => {console.log("failed to connect to mongoDB", err)});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the pages directory
app.use(express.static(path.join(__dirname, 'pages')));

// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use routes
app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = io; // Export the io instance for use in other files