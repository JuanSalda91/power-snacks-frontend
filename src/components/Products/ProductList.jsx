import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';
import Spinner from 'react-bootstrap/Spinner';


// Import the function to fetch all products
import { fetchAllProducts } from '../../services/productService';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  // --- UPDATED: useEffect to fetch data ---
  useEffect(() => {
    // Define async function to load data
    const loadProducts = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        // --- Use the imported fetchAllProducts function ---
        const data = await fetchAllProducts(activeSearchTerm);

        setProducts(data);

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    loadProducts(); // Call the function
  }, [activeSearchTerm]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setActiveSearchTerm(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveSearchTerm('');
  };

  // --- ADDED: Conditional Rendering for Loading/Error ---
  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-4 mb-5"><Alert variant="danger">Error: {error}</Alert></Container>;
  }
  // --- END: Conditional Rendering ---


  // --- JSX for displaying products (no change needed here) ---
  return (
    <Container className="mt-4 mb-5"> {/* Added mb-5 for consistency */}
      <h2>Our Products</h2>

      <Form onSubmit={handleSearchSubmit} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col>
          <Form.Control
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          </Col>
          <Col xs="auto">
          <Button variant="outline-secondary" onClick={handleClearSearch}>Clear</Button>
          </Col>
        </Row>
      </Form>
      
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {products.length === 0 && !loading && (
        <div className="text-center mt-5 mb-5 p-4 bg-light rounded">
          <h4>No Products Found</h4>
          <p className="text-muted">
            {activeSearchTerm ? `Sorry, no snacks found matching "${activeSearchTerm}".` : "Check back later!"}
          </p>
          {activeSearchTerm && (
            <Button variant="secondary" onClick={handleClearSearch}>Clear Search</Button>
          )}
        </div>
      )}
    </Container>
  );
}

export default ProductList;