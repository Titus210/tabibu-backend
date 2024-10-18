require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
require('./config/passport');

const app = express();

app.use(express.json());
app.use(passport.initialize());


// Authentication Routes
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});