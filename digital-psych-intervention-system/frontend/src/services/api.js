import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};

export const fetchUserData = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching user data');
    }
};

export const bookAppointment = async (userId, appointmentDetails) => {
    try {
        const response = await api.post(`/users/${userId}/appointments`, appointmentDetails);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error booking appointment');
    }
};

export const getResources = async () => {
    try {
        const response = await api.get('/resources');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching resources');
    }
};

export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        throw new Error('Backend is not responding');
    }
};