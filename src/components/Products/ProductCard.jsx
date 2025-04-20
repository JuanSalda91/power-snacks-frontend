// src/components/Products/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Optional: for type checking props
import { Link } from 'react-router-dom'; // Linking to product

function ProductCard({ product }) {
  // Basic styling (you can replace with CSS Modules, Tailwind, etc.)
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '200px', // Example width
    display: 'inline-block', // Example layout
    verticalAlign: 'top',
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Link to={`/products/${product.id}`} style={cardStyle}>
      {/* Add image later using product.image_url if available */}
      <h3>{product.name}</h3>
      <p>{product.flavor} - {product.type}</p>
      <p>${Number(product.price).toFixed(2)}</p>
      {product.description && <p><small>{product.description}</small></p>}
    </Link> // <-- Close Link tag
  );
}

// Optional: Prop type validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    flavor: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired, // or PropTypes.number if API ensures it
    description: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
};

export default ProductCard;