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



module.exports = router;
