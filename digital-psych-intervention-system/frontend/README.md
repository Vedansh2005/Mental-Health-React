# Digital Psychological Intervention System

This project is a web-based platform designed to provide digital psychological interventions. It consists of a frontend built with React and a backend powered by Node.js and Express.

## Frontend

The frontend is developed using React and includes the following key components:

- **Home Page**: The landing page that provides access to various features such as the chatbot, booking system, resource hub, and peer support forum.
- **User Profile**: A component that allows users to view and manage their personal information and appointments.

### Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd digital-psych-intervention-system/frontend
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Application**:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Component Descriptions

- **App.jsx**: The main component that sets up routing and renders the application layout.
- **UserProfile.jsx**: Displays user information and allows management of profiles and appointments.
- **Home.jsx**: The main landing page for the application.

### API Integration

The frontend communicates with the backend through the `api.js` service, which includes functions for fetching user data, booking appointments, and retrieving resources.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.