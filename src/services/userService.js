import apiClient from '../api'; // Use the configured Axios instance

export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Fetch User Profile API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};