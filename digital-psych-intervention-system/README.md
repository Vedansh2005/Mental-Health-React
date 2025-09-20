# Digital Psychological Intervention System

## Overview
The Digital Psychological Intervention System is a web-based platform designed to provide digital psychological interventions. It aims to support users in managing their mental health through various features such as user profiles, appointment booking, and access to resources.

## Features
- User registration and authentication
- Profile management
- Appointment booking system
- Access to mental health resources
- Peer support forum
- Chatbot for immediate assistance

## Technology Stack
- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** Local storage (for MVP)

## Project Structure
```
digital-psych-intervention-system
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── userController.js
│   │   ├── routes
│   │   │   └── userRoutes.js
│   │   ├── models
│   │   │   └── userModel.js
│   │   └── middleware
│   │       └── authMiddleware.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── components
│   │   │   └── UserProfile.jsx
│   │   ├── pages
│   │   │   └── Home.jsx
│   │   └── services
│   │       └── api.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the server using:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the development server using:
   ```
   npm start
   ```

## API Endpoints
- **POST /api/users** - Create a new user
- **GET /api/users/:id** - Retrieve user information
- **POST /api/appointments** - Book an appointment

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.