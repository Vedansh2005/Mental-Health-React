const express = require('express');
const UserController = require('../controllers/userController');
const User = require('../models/userModel');

const router = express.Router();
const userController = new UserController(User);

// User routes
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.post('/users/:id/appointments', userController.bookAppointment);

module.exports = router;