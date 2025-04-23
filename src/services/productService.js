import apiClient from '../api'; // <-- Import the configured instance

// Function to fetch all products
export const fetchAllProducts = async () => {
  try {
    // Use apiClient
    const response = await apiClient.get(`/products`); // Path relative to baseURL
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw to be handled by the component
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    // Use apiClient
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    // Log specific error but still throw it for component handling
    console.error(`Error fetching product with id ${id}:`, error.response?.data || error.message);
    throw error; // Re-throw error
  }
};