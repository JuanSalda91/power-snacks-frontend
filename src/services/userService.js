import apiClient from '../api'; // Use the configured Axios instance

export const fetchUserProfile = async () => {
  try {
    // The interceptor in apiClient will automatically add the Authorization header
    const response = await apiClient.get('/auth/me'); // Path relative to baseURL
    return response.data;
  } catch (error) {
    console.error('Fetch User Profile API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};