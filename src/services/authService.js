import axios from 'axios';

// Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Signup function
export const signupUser =  async (userData) => {
  // userData expected to be an object like { email, password, name }
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data; // Should contain { message, token, user }
  } catch (error) {
    console.error('Signup API Error:', error);
    // re-throw error but potentially include backend message if available
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

//Login function

export const loginUser = async (credentials) => {
  // Credetials expected to be an object like { email, password }
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data; // Should contain { message, token, user }
  } catch (error) {
    console.error('Login API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};