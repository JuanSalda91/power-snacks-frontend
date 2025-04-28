import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';

// --- React Bootstrap Imports (Ensure Image, Row, Col are imported) ---
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';


import './ProductDetailPage.css';


const STATIC_ASSET_URL = import.meta.env.VITE_STATIC_ASSET_URL || 'http://localhost:5001';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // --- Data Fetching useEffect ---
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        console.log("Fetched Product Data (Check for image_url):", data);
        // Set product state directly, assuming 'data' includes 'image_url'
        setProduct(data);
        // REMOVED frontend logic to determine image - rely on data.image_url
      } catch (err) {
         if (err.response && err.response.status === 404) {
           setError('Product not found.');
         } else {
           setError(err.message || 'Failed to fetch product details');
         }
         console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  // --- Conditional Rendering ---
  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) return <Container className="mt-4 mb-5"><Alert variant="danger">Error: {error}</Alert></Container>;

  // Added check for product *before* accessing its properties
  if (!product) return <Container className="mt-4 mb-5"><Alert variant="warning">Product not found or could not be loaded.</Alert></Container>;


  console.log("Product data for rendering:", product);
  // --- Determine imageUrl from product state ---
  // IMPORTANT: Assumes product object fetched has an 'image_url' property
  const imageUrl = product.image_url
  ? `${STATIC_ASSET_URL}${product.image_url}`
  : "https://via.placeholder.com/600x400?text=Image+Not+Available";

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setToastMessage(`${product.name} added to cart!`);
      setShowToast(true);
    }
  };
  

  return (
    <Container className="my-4 mb-5" position-relative>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2500}
        autohide
        bg="transparent"
        data-bs-theme="light"
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="g-5">

        {/* Column 1: Image */}
        <Col md={6}>
          {/* Image component using imageUrl */}
          <Image
          src={imageUrl}
          alt={product.name}
          rounded
          className="product-detail-img"
          />
        </Col>

        {/* Column 2: Details & Add to Cart */}
        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>
          <p className="fs-4 fw-bold mb-3">${Number(product.price).toFixed(2)}</p>
          <p className="mb-1"><strong>Flavor:</strong> {product.flavor}</p>
          <p className="mb-3"><strong>Type:</strong> {product.type}</p>
          {product.description && (
            <>
              <p className="mb-1"><strong>Description:</strong></p>
              <p className="mb-4">{product.description}</p>
            </>
          )}
          <Button variant="primary" size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>

      </Row>
    </Container>
  );
}

export default ProductDetailPage;