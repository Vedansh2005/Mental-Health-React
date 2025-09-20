import React, { useEffect, useState } from 'react';
import { fetchUserData, bookAppointment, createUser } from '../services/api';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentForm, setAppointmentForm] = useState({
        date: '',
        details: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);

    // Demo user logic: create if not exists, then use returned _id
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getOrCreateDemoUser = async () => {
            setLoading(true);
            try {
                let demoUserId = localStorage.getItem('demoUserId');
                let userData = null;
                if (demoUserId) {
                    try {
                        userData = await fetchUserData(demoUserId);
                    } catch (err) {
                        // User not found, clear localStorage and create new
                        localStorage.removeItem('demoUserId');
                        demoUserId = null;
                        userData = null;
                    }
                }
                if (!userData) {
                    // Create demo user with valid email
                    const newUser = await createUser({ name: 'Demo User', email: `demo${Date.now()}@example.com` });
                    demoUserId = newUser._id;
                    localStorage.setItem('demoUserId', demoUserId);
                    userData = newUser;
                }
                setUserId(demoUserId);
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getOrCreateDemoUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookAppointment = async (e) => {
        e.preventDefault();
        if (!appointmentForm.date || !appointmentForm.details) {
            alert('Please fill in all fields');
            return;
        }
        if (!userId) {
            alert('User not loaded yet.');
            return;
        }
        setBookingLoading(true);
        try {
            const updatedUser = await bookAppointment(userId, appointmentForm);
            setUser(updatedUser);
            setAppointmentForm({ date: '', details: '' });
            alert('Appointment booked successfully!');
        } catch (err) {
            alert('Error booking appointment: ' + err.message);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                        <h3>User Information</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Appointments:</strong> {user.appointments?.length || 0}</p>
                    </div>

                    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                        <h3>Book New Appointment</h3>
                        <form onSubmit={handleBookAppointment}>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    name="date"
                                    value={appointmentForm.date}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label htmlFor="details">Details:</label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={appointmentForm.details}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={bookingLoading}
                                style={{ 
                                    padding: '10px 20px', 
                                    backgroundColor: '#007bff', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: bookingLoading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {bookingLoading ? 'Booking...' : 'Book Appointment'}
                            </button>
                        </form>
                    </div>

                    {user.appointments && user.appointments.length > 0 && (
                        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h3>Your Appointments</h3>
                            {user.appointments.map((appointment, index) => (
                                <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '3px' }}>
                                    <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
                                    <p><strong>Details:</strong> {appointment.details}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default UserProfile;