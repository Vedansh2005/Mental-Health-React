const { validationResult } = require('express-validator');

class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(req, res) {
        try {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email } = req.body;
            
            // Check if user already exists
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            const userData = {
                name,
                email,
                appointments: []
            };
            
            const newUser = await this.userModel.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async bookAppointment(req, res) {
        try {
            const userId = req.params.id;
            const { date, details } = req.body;

            if (!date || !details) {
                return res.status(400).json({ message: 'Date and details are required' });
            }

            const user = await this.userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const appointmentDetails = {
                date: new Date(date),
                details
            };

            user.appointments.push(appointmentDetails);
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            console.error('Error booking appointment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;