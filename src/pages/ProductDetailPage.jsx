import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService'; // Ensure path is correct
import { useCart } from '../contexts/CartContext'; // Correct path

// --- React Bootstrap Imports ---
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// Removed unused Image, Row, Col based on previous step

// --- ADD: Import specific images ---
import caramelBiteImage from '../assets/caramelBite.jpg';
import caramelTubeImage from '../assets/caramelTube.jpg';
import chocolateBiteImage from '../assets/chocolateBite.jpg';
import chocolateTubeImage from '../assets/chocolateTube.jpg';
// import placeholderImage from '../../assets/placeholder.png'; // Optional

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // --- Data Fetching useEffect ---
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);

        // --- ADD: Determine image reference AFTER fetching data ---
        let imageToShow = null; // Default or placeholder
        if (data) { // Check if data was successfully fetched
            if (data.type === "Tube") {
                if (data.flavor === "Chocolate Chunk") imageToShow = chocolateTubeImage;
                else if (data.flavor === "Caramel") imageToShow = caramelTubeImage;
            } else if (data.type === "Bites") {
                if (data.flavor === "Chocolate Chunk") imageToShow = chocolateBiteImage;
                else if (data.flavor === "Caramel") imageToShow = caramelBiteImage;
            }
            // else { imageToShow = placeholderImage; }
        }
        // Add the determined image reference to the product data in state
        setProduct({ ...data, displayImage: imageToShow });
        // --- END: Image determination ---

      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product data.');
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
  }, [id]);

  // --- Conditional Rendering ... ---
  if (loading) return <Container className="text-center mt-5 mb-5"><p>Loading...</p></Container>;
  if (error) return <Container className="mt-4 mb-5"><Alert variant="danger">Error: {error}</Alert></Container>;
  if (!product) return <Container className="mt-4 mb-5"><Alert variant="warning">Product not found.</Alert></Container>;


  const handleAddToCart = () => {
    if (product) {
      // Now 'product' state includes 'displayImage'
      addToCart(product);
      console.log(`${product.name} added to cart`);
    }
  };

  // --- Simplified Product Details Display ---
  return (
    <Container className="my-4 mb-5">
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
    </Container>
  );
}

export default ProductDetailPage;
