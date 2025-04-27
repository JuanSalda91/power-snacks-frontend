import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';


const apiClient = axios.create({
  baseURL: baseURL,
});


apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (use the same key as in AuthContext)
    const token = localStorage.getItem('token'); // <<< Ensure key 'token' matches AuthContext
    if (token) {
      // If token exists, add the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Interceptor added token to headers:', config.headers.Authorization); // Optional: for debugging
    } else {
      console.log('Interceptor: No token found in localStorage.'); // Optional: for debugging
    }
    return config; // Return the modified config for the request to proceed
  },
  (error) => {
    // Handle request errors (optional here, often handled in service calls)
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);
// --- END INTERCEPTOR ---

// Export the configured client
export default apiClient;