// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService'; // Adjust path if needed

function ProductDetailPage() {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const [product, setProduct] = useState(null); // State for product data
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);      // State for error status

  useEffect(() => {
    // Define async function to fetch product data
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProduct(data); // Set the fetched product data in state
      } catch (err) {
        // Handle errors, including the 404 "Product not found"
        if (err.response && err.response.status === 404) {
            setError('Product not found.');
        } else {
            setError(err.message || 'Failed to fetch product details');
        }
        console.error(err);
      } finally {
        setLoading(false); // Stop loading indicator regardless of success/error
      }
    };

    loadProductData(); // Call the function when the component mounts or ID changes

  }, [id]); // Dependency array includes [id] - re-run effect if ID changes

  // --- Conditional Rendering ---
  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!product) {
    // Should be caught by error handling, but good as a fallback
    return <p>Product data could not be loaded.</p>;
  }

  // --- Display Product Details ---
  return (
    <div>
      <h2>{product.name}</h2>
      {/* Add image here later if available: <img src={product.image_url} alt={product.name} /> */}
      <p><strong>Flavor:</strong> {product.flavor}</p>
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
      {product.description && <p><strong>Description:</strong> {product.description}</p>}
      {/* Add more details or components like "Add to Cart" button later */}
    </div>
  );
}

export default ProductDetailPage;