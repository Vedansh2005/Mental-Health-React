const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userDataPath = require('path').join(__dirname, '../models/userData.json');
const userController = new UserController(userDataPath);

// User routes
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUser(req, res));
router.post('/users/:id/appointments', (req, res) => userController.bookAppointment(req, res));

module.exports = router;