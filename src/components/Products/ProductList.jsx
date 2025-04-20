// src/components/Products/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../../services/productService'; // Adjust path if needed
import ProductCard from './ProductCard'; // Import the card component

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect to fetch data
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error(err); // Log the full error
      } finally {
        setLoading(false);
      }
    };

    loadProducts(); // Call the function to load data
  }, []); // Empty dependency array means this runs once on mount

  // Conditional Rendering based on state
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <h2>Our Products</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;