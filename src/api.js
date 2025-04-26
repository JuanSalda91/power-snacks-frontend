// Corrected code in src/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  // --- ADD THIS LINE ---
  baseURL: baseURL, // Tell axios to use the baseURL we defined
  // --- END ADD ---
  // other config like headers if needed
});

// ... interceptor code ...

export default apiClient;