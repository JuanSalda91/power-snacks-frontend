import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Adds the Authorization token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage - simple approach
    // For more complex scenarios, you might get it from your AuthContext state
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor (Example: Handle 401 errors globally)
// apiClient.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (e.g., token expired)
//       console.error("Unauthorized request or token expired:", error.response);
//       // Here you might trigger a logout action from your AuthContext
//       // or redirect to login page.
//       // Be careful with infinite loops if the login page itself makes API calls.
//       // Example: Trigger logout (assuming you have access to the logout function)
//       // logout(); // This won't work directly here without context/event emitter
//       // window.location.href = '/login'; // Simple redirect
//     }
//     return Promise.reject(error); // Pass the error along
//   }
// );


// Export the configured instance to be used by service files
export default apiClient;