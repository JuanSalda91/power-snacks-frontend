// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'; // To display items
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useCart } from '../contexts/CartContext'; // Import useCart

function CartPage() {
  // Get cart state and functions from the context
  const { cartItems, removeFromCart, getCartTotal, getCartItemCount, clearCart } = useCart();

  const totalItems = getCartItemCount();
  const totalPrice = getCartTotal();

  return (
    <Container className="my-4 mb-5">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        // Display message if cart is empty
        <div className="text-center mt-4">
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        // Display cart items if not empty
        <>
          <ListGroup variant="flush" className="mb-4">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} className="px-0"> {/* Use item.id as key */}
                <Row className="align-items-center"> {/* Align items vertically center */}
                  {/* Image Column */}
                  <Col xs={2} md={1}>
                    <Image
                      src={item.image || "https://via.placeholder.com/150?text=No+Image"} // Use image from cart item
                      alt={item.name}
                      thumbnail // Adds a light border
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }} // Consistent small size
                    />
                  </Col>

                  {/* Name Column */}
                  <Col xs={4} md={5}>
                    <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.name}
                    </Link>
                  </Col>

                  {/* Price/Quantity Column */}
                  <Col xs={3} md={3} className="text-end">
                    <div>Qty: {item.quantity}</div>
                    <div>${Number(item.price).toFixed(2)} each</div>
                  </Col>

                  {/* Line Total / Remove Button Column */}
                  <Col xs={3} md={3} className="text-end">
                     <div>${(Number(item.price) * item.quantity).toFixed(2)}</div>
                     <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)} // Call removeFromCart with item ID
                        className="mt-1"
                     >
                         Remove
                     </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Cart Summary and Actions */}
          <Row className="justify-content-end">
            <Col md={4}>
              <h4>Cart Summary</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal ({totalItems} items):</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
                {/* Add lines for shipping, taxes later if needed */}
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Total:</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>
              <div className="d-grid gap-2 mt-3"> {/* d-grid makes buttons full width */}
                 <Button variant="primary" size="lg" disabled> {/* Disabled for now */}
                    Proceed to Checkout
                 </Button>
                 <Button variant="outline-secondary" onClick={clearCart}>
                    Clear Cart
                 </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default CartPage;