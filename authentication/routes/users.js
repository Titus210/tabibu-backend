const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const userController = require('../controllers/userController');

// Create a new user
router.post('/add-user', userController.addUser);

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


router.get('/:email', userController.getUserId);
router.post('/profile',userController.addUserProfile);


// Update a user by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    try {
        const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = {
            first_name: first_name || user[0].first_name,
            last_name: last_name || user[0].last_name,
            email: email || user[0].email,
            password: password || user[0].password
        };

        await pool.execute(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
            [updatedUser.first_name, updatedUser.last_name, updatedUser.email, updatedUser.password, id]
        );

        res.json({ id: Number(id), ...updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        await pool.execute('DELETE FROM users WHERE id = ?', [id]);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
