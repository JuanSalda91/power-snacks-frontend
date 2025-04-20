import axios from 'axios';

// Get API base URL from environment variables (Vite uses import.met.env)
// Ensure you have VITE_API_URL=http://localhost:5000 in your .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Function to fetch all products
export const fetchAllProducts = async () => {
  try {
    //Note: The full URL will be http://localhost:5001/api/products
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; //The array of products is in response.data
  } catch (error) {
    console.error('Error fetching products:', error);
    // Re-throw the error or return a specific error structure
    throw error;
  }
};

// Function to fetch a single product by ID (we might need this later)
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product with id ${id}:', error);
  }
};