const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get patient details by ID
router.get('/:id', authMiddleware.verifyToken, patientController.getPatientDetails);

// Update patient profile
router.put('/:id', authMiddleware.verifyToken, patientController.updatePatient);

// Delete patient account
router.delete('/:id', authMiddleware.verifyToken, patientController.deletePatient);

// View list of doctors
router.get('/doctors', authMiddleware.verifyToken, patientController.getDoctorsList);

// View patient's appointments
router.get('/appointments', authMiddleware.verifyToken, patientController.getPatientAppointments);

module.exports = router;
