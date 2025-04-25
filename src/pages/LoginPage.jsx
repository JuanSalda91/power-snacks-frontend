import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { loginUser } from "../services/authService";  // Ensure path is correct
import { useAuth } from '../contexts/AuthContext';   // Ensure path is correct

// --- React Bootstrap Imports ---
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'; // For loading indicator

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, user } = await loginUser({ email, password });
      auth.login(token, user);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use Container with vertical margins
    <Container className="my-4 mb-5">
      {/* Center the form using Row and Col */}
      <Row className="justify-content-md-center">
        <Col md={6} lg={5} xl={4}> {/* Adjust column size as needed */}
          <h2 className="text-center mb-4">Login</h2>

          {/* Use React Bootstrap Form */}
          <Form onSubmit={handleSubmit}>

            {/* Email Input */}
            <Form.Group className="mb-3" controlId="login-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3" controlId="login-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            {/* Error Alert */}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            {/* Submit Button with Loading State */}
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100 mt-3" // Make button full width
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2" // Add margin to spinner
                  />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>

          {/* Optional: Link to Signup Page */}
          <div className="text-center mt-3">
            <small>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </small>
          </div>

        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;