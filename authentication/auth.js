const express = require('express');
require('dotenv').config();
const cors = require('cors')
const pool = require('./config/database');
const userRoutes = require('./routes/users');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Port
const PORT = process.env.PORT || 2000;

// routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
