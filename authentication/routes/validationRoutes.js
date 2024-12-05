const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const validationController = require('../controllers/validationController');

router.post('/check-email', validationController.checkEmail);
router.post('/validate-password', validationController.validatePassword);

module.exports = router;
