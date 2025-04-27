import apiClient from '../api';

// Function to fetch all products, now accepts searchTerm
export const fetchAllProducts = async (searchTerm = '') => {
  try {
    let path = '/products';
    if (searchTerm) {
      path += `?search=${encodeURIComponent(searchTerm)}`;
    }
    console.log(`Fetching products with path: ${path}`);
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
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