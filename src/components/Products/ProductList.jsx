import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'; // Import Alert for errors
import ProductCard from './ProductCard';

// Import the function to fetch all products
import { fetchAllProducts } from '../../services/productService';


function ProductList() {
  const [products, setProducts] = useState([]);
  // --- ADDED: Loading and Error States ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UPDATED: useEffect to fetch data ---
  useEffect(() => {
    // Define async function to load data
    const loadProducts = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        // --- Use the imported fetchAllProducts function ---
        const data = await fetchAllProducts();

        setProducts(data);

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    loadProducts(); // Call the function
  }, []); // Empty dependency array means run once on mount

  // --- ADDED: Conditional Rendering for Loading/Error ---
  if (loading) {
    return <Container className="text-center mt-5 mb-5"><p>Loading products...</p></Container>;
  }

  if (error) {
    return <Container className="mt-4 mb-5"><Alert variant="danger">Error: {error}</Alert></Container>;
  }
  // --- END: Conditional Rendering ---


  // --- JSX for displaying products (no change needed here) ---
  return (
    <Container className="mt-4 mb-5"> {/* Added mb-5 for consistency */}
      <h2>Our Products</h2>
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {products.length === 0 && !loading && (
         <p className="text-center mt-4">No products found.</p>
      )}
    </Container>
  );
}

export default ProductList;