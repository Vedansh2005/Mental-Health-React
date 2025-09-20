import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkHealth, createUser } from '../services/api';

const Home = () => {
    const [backendStatus, setBackendStatus] = useState('checking');
    const [userCreated, setUserCreated] = useState(false);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                await checkHealth();
                setBackendStatus('connected');
            } catch (error) {
                setBackendStatus('disconnected');
            }
        };

        checkBackend();
    }, []);

    const handleCreateDemoUser = async () => {
        try {
            await createUser({
                name: 'Demo User',
                email: 'demo@example.com'
            });
            setUserCreated(true);
            alert('Demo user created successfully! You can now visit the profile page.');
        } catch (error) {
            alert('Error creating demo user: ' + error.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                    Welcome to the Digital Psychological Intervention System
                </h1>
                <div style={{ 
                    padding: '10px', 
                    backgroundColor: backendStatus === 'connected' ? '#d4edda' : '#f8d7da',
                    color: backendStatus === 'connected' ? '#155724' : '#721c24',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    Backend Status: {backendStatus === 'connected' ? '✅ Connected' : '❌ Disconnected'}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
                    <h3 style={{ color: '#3498db' }}>🤖 AI Chatbot</h3>
                    <p>Access our intelligent chatbot for immediate mental health support and guidance.</p>
                    <button 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#3498db', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        disabled
                    >
                        Coming Soon
                    </button>
                </div>

                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
                    <h3 style={{ color: '#e74c3c' }}>📅 Book Appointment</h3>
                    <p>Schedule an appointment with a qualified mental health professional.</p>
                    <Link 
                        to="/profile"
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#e74c3c', 
                            color: 'white', 
                            textDecoration: 'none', 
                            borderRadius: '5px',
                            display: 'inline-block'
                        }}
                    >
                        Book Now
                    </Link>
                </div>

                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
                    <h3 style={{ color: '#f39c12' }}>📚 Resource Hub</h3>
                    <p>Explore our comprehensive library of mental health resources and materials.</p>
                    <button 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#f39c12', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        disabled
                    >
                        Coming Soon
                    </button>
                </div>

                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
                    <h3 style={{ color: '#9b59b6' }}>👥 Peer Support</h3>
                    <p>Connect with others in our supportive community forum.</p>
                    <button 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#9b59b6', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        disabled
                    >
                        Coming Soon
                    </button>
                </div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                <h3>Demo Setup</h3>
                <p>To test the appointment booking feature, create a demo user first:</p>
                <button 
                    onClick={handleCreateDemoUser}
                    disabled={userCreated}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: userCreated ? '#28a745' : '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: userCreated ? 'not-allowed' : 'pointer'
                    }}
                >
                    {userCreated ? '✅ Demo User Created' : 'Create Demo User'}
                </button>
                {userCreated && (
                    <p style={{ marginTop: '10px', color: '#28a745' }}>
                        Demo user created! You can now visit the <Link to="/profile" style={{ color: '#007bff' }}>Profile page</Link> to test appointment booking.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;