// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService'; // Ensure path is correct

// --- React Bootstrap Imports (Removed Row, Col, Image) ---
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// --- No image imports or image URL logic needed ---

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching useEffect (no changes needed) ---
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProduct(data);
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

  // --- Conditional Rendering (no changes needed) ---
  if (loading) {
    return <Container className="text-center mt-5 mb-5"><p>Loading product details...</p></Container>;
  }
  if (error) {
    return <Container className="mt-4 mb-5"><Alert variant="danger">Error: {error}</Alert></Container>;
  }
  if (!product) {
    return <Container className="mt-4 mb-5"><Alert variant="warning">Product data could not be loaded.</Alert></Container>;
  }

  // --- SIMPLIFIED Product Details Display (No Image, No Columns) ---
  return (
    <Container className="my-4 mb-5">

      {/* Product Name */}
      <h1 className="mb-3">{product.name}</h1>

      {/* Price */}
      <p className="fs-4 fw-bold mb-3">${Number(product.price).toFixed(2)}</p>

      {/* Other Details */}
      <p className="mb-1"><strong>Flavor:</strong> {product.flavor}</p>
      <p className="mb-3"><strong>Type:</strong> {product.type}</p>

      {/* Description */}
      {product.description && (
        <>
          <p className="mb-1"><strong>Description:</strong></p>
          <p className="mb-4">{product.description}</p>
        </>
      )}

      {/* Add to Cart Button */}
      <Button variant="primary" size="lg">Add to Cart</Button>
      {/* Add onClick handler later */}

      {/* Removed Row, Col, and Image components */}

    </Container>
  );
}

export default ProductDetailPage;