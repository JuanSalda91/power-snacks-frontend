// src/components/Products/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './ProductCard.css'; // Keep for image sizing consistency


const STATIC_ASSET_URL = import.meta.env.VITE_STATIC_ASSET_URL || 'http://localhost:5001';

function ProductCard({ product }) {
  const productLink = `/products/${product.id}`;

  // --- Construct the full absolute image URL ---
  // Assumes product object has 'image_url' like '/images/your-image.jpg'
  const imageUrl = product.image_url
  ? `${STATIC_ASSET_URL}${product.image_url}` // Correct syntax
  : "YOUR_FALLBACK_PLACEHOLDER_URL"; // Fallback

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    height: '100%',
  };

  return (
    <Link to={productLink} style={linkStyle}>
      <Card className="h-100">
        {/* Card.Img uses the full imageUrl */}
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.name}
          className="product-card-img" // Applies fixed height/object-fit from CSS
        />
        <Card.Body className="d-flex flex-column">
          {/* Wrapper div pushes text content down */}
          <div className="mt-auto">
             <Card.Title as="h5">{product.name}</Card.Title>
             <Card.Text>
               {product.flavor} - {product.type}
             </Card.Text>
             <Card.Text className="fw-bold">
               ${Number(product.price).toFixed(2)}
             </Card.Text>
             {product.description && (
                <Card.Text>
                  <small>{product.description}</small>
                </Card.Text>
             )}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

// Ensure PropTypes reflect expecting image_url string
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired, // Keep as string if that's what API returns
    description: PropTypes.string,
    image_url: PropTypes.string, // Expect image_url string from backend data
  }).isRequired,
};

export default ProductCard;