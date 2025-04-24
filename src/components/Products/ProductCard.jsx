// src/components/Products/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Needed to make the whole card a link
import Card from 'react-bootstrap/Card';  // Import React-Bootstrap Card
import './ProductCard.css'

function ProductCard({ product }) {
  const productLink = `/products/${product.id}`;

  // Use the displayImage passed in via props, provide a generic placeholder if it's missing
  const imageUrl = product.displayImage || "https://via.placeholder.com/286x180?text=Image+Not+Available";

  // Style for the Link wrapper (important for h-100)
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    height: '100%', // Crucial: Allows card inside to use h-100 correctly
  };

  return (
    <Link to={productLink} style={linkStyle}>
      {/* Add className="h-100" HERE to make cards in the same Row equal height */}
      <Card className="h-100">

        {/* --- ADDED: Card.Img component to display the image --- */}
        <Card.Img
          variant="top"
          src={imageUrl} // Use the image reference passed in product.displayImage
          alt={product.name} // Set alt text
          className="product-card-img" // Apply CSS class for consistent height/fit
        />
        {/* --- End Added Section --- */}

        <Card.Body className="d-flex flex-cloumn">
          {/* Using h5 for title, adjust as needed */}
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
        {/* No Button component */}
      </Card>
    </Link>
  );
}

// Updated PropTypes to reflect expectation of displayImage
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string,
    displayImage: PropTypes.string, // Expecting the processed image path string
  }).isRequired,
};

export default ProductCard;