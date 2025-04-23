import apiClient from '../api'; // <-- Import the configured instance

// Signup function
export const signupUser = async (userData) => {
  try {
    // Use apiClient, just provide the path relative to baseURL
    const response = await apiClient.post(`/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

//Login function
export const loginUser = async (credentials) => {
  try {
    // Use apiClient
    const response = await apiClient.post(`/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};