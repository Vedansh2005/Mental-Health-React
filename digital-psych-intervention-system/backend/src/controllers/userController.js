const fs = require('fs');
const path = require('path');

class UserController {
    constructor(userDataPath) {
        this.userDataPath = userDataPath;
    }

    _readUsers() {
        try {
            const data = fs.readFileSync(this.userDataPath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    _writeUsers(users) {
        // Simple file lock to avoid race conditions
        const tempPath = this.userDataPath + '.tmp';
        fs.writeFileSync(tempPath, JSON.stringify(users, null, 2));
        fs.renameSync(tempPath, this.userDataPath);
    }

    createUser(req, res) {
        try {
            console.log('Incoming createUser request body:', req.body);
            const { name, email } = req.body;
            if (!name || !email) {
                console.error('Missing name or email:', req.body);
                return res.status(400).json({ message: 'Name and email are required' });
            }
            let users = this._readUsers();
            // Email validation
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                console.error('Invalid email format:', email);
                return res.status(400).json({ message: 'Invalid email format' });
            }
            if (users.find(u => u.email === email)) {
                console.error('Duplicate email:', email);
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            const newUser = {
                _id: Date.now().toString() + Math.floor(Math.random()*10000).toString(),
                name,
                email,
                appointments: []
            };
            users.push(newUser);
            try {
                this._writeUsers(users);
            } catch (fileErr) {
                console.error('Error writing to userData.json:', fileErr);
                return res.status(500).json({ message: 'Error writing user data file' });
            }
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getUser(req, res) {
        try {
            const userId = req.params.id;
            const users = this._readUsers();
            const user = users.find(u => u._id === userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    bookAppointment(req, res) {
        try {
            console.log('Incoming bookAppointment request:', { params: req.params, body: req.body });
            const userId = req.params.id;
            const { date, details } = req.body;
            if (!date || !details) {
                console.error('Missing date or details:', req.body);
                return res.status(400).json({ message: 'Date and details are required' });
            }
            let users = this._readUsers();
            const userIndex = users.findIndex(u => u._id === userId);
            if (userIndex === -1) {
                console.error('User not found for booking:', userId);
                return res.status(404).json({ message: 'User not found' });
            }
            // Validate date
            if (isNaN(Date.parse(date))) {
                console.error('Invalid date format:', date);
                return res.status(400).json({ message: 'Invalid date format' });
            }
            const appointmentDetails = {
                date,
                details
            };
            users[userIndex].appointments.push(appointmentDetails);
            try {
                this._writeUsers(users);
            } catch (fileErr) {
                console.error('Error writing to userData.json (booking):', fileErr);
                return res.status(500).json({ message: 'Error writing user data file' });
            }
            res.status(200).json(users[userIndex]);
        } catch (error) {
            console.error('Error booking appointment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;