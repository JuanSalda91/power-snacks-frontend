import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';

// --- React Bootstrap Imports ---
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Cart } from 'react-bootstrap-icons';

// --- Page Components ---
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';

// --- Component for Product List ---
import ProductList from './components/Products/ProductList';

function App() {
  const { isLoggedIn, logout, isLoading } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const itemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <div className="App d-flex flex-column min-vh-100">

      {/* --- START: Replaced Header with React-Bootstrap Navbar --- */}
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top"> {/* Responsive collapse, dark theme, stays at top */}
        <Container> {/* Constrains navbar content width */}
          {/* Brand/Logo - links to home */}
          <Navbar.Brand>Power Snacks</Navbar.Brand>

          {/* Hamburger button for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible content */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Main navigation links (pushed left) */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>

            {/* Auth-related links/button (pushed right) */}
            <Nav>
              {isLoggedIn ? (
                <>
                  {/* Welcome message can be added here if desired */}
                  {/* <Navbar.Text className="me-2">Welcome, {user.email}</Navbar.Text> */}
                  <Nav.Link as={Link} to="/profile" className="me-2">My Profile</Nav.Link>
                  <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/cart" className="position-relative">
              <Cart size={24} />
              {itemCount > 0 && (
                <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontsize: '0.6em' }}
                >
                  {itemCount}
                  <span className="visually-hidden">items in cart</span>
                  </Badge>
              )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* --- END: Replaced Header --- */}

      {/* Main content area where Routes render pages */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </main>

      {/* Footer can be added/styled later */}
      <footer className="mt-auto py-3 bg-light border-top">
        <Container className="text-center">
          {/* 'text-muted' makes text light gray */}
          <span className="text-muted">
            &copy; {new Date().getFullYear()} Power Snacks. All Rights Reserved.
          </span>
          {/* You can add more links or info here later */}
        </Container>
      </footer>
    </div>
  );
}

export default App;