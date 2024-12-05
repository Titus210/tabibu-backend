const express = require('express');
require('dotenv').config();
const cors = require('cors')
const session = require('express-session');
const pool = require('./config/database');
const userRoutes = require('./routes/users');
const validationRoutes = require('./routes/validationRoutes');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// express session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false , maxAge: 600000}, 
    })
)

// Port
const PORT = process.env.PORT || 2000;

// routes
app.use('/users', userRoutes);
app.use('/validation', validationRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});