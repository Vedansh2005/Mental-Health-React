import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;