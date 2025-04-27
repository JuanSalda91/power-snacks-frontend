import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create ({ baseURL: baseURL });


export default apiClient;