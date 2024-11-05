const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Create a new user
router.post('/', async (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body);
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
            [email, password, role]
        );

        res.status(201).json({ id: result.insertId, email, password, role, message: 'User created successfully' });
 
         } catch (error) {
             console.error(error);
             res.status(500).json({ message: 'Server error' });
    }
});

// Read all users
router.get('/', async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
