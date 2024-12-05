const express = require('express');
const router = express.Router();
const authController= require('../controllers/authController');

// Define routes and map them to controller methods
router.post('/login', authController.login);
router.post('/register', authController.register);
//router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
//router.post('/reset-password', authController.resetPassword);


module.exports = router;
