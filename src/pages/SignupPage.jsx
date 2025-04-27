import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from '../contexts/AuthContext';

// --- React Bootstrap Imports ---
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true);

    try {
      const { message, token, user } = await signupUser({ name, email, password });
      setSuccessMessage(message + ' Logging you in...');

      if (token && user) {
        auth.login(token, user);
      } else {
        console.warm("Signup successful but token/user data missing in response.");
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/');
      } , 1500); // 2 seconds delay

    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
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
          <h2 className="text-center mb-4">Sign Up</h2>

          {/* Use React Bootstrap Form */}
          <Form onSubmit={handleSubmit}>

            {/* Name Input */}
            <Form.Group className="mb-3" controlId="signup-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // required // Uncomment if name is required
                disabled={loading || !!successMessage} // Disable if loading or success
              />
            </Form.Group>

            {/* Email Input */}
            <Form.Group className="mb-3" controlId="signup-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || !!successMessage}
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3" controlId="signup-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6} // Keep or adjust based on backend requirements
                disabled={loading || !!successMessage}
              />
              <Form.Text className="text-muted">
                 Password must be at least 6 characters long.
               </Form.Text>
            </Form.Group>

             {/* Error Alert */}
             {error && (
               <Alert variant="danger" className="mt-3">
                 {error}
               </Alert>
             )}

             {/* Success Alert */}
             {successMessage && (
               <Alert variant="success" className="mt-3">
                 {successMessage}
               </Alert>
             )}


            {/* Submit Button with Loading State */}
            <Button
              variant="primary"
              type="submit"
              disabled={loading || !!successMessage} // Disable if loading or success
              className="w-100 mt-3"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Signing up...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </Form>

           {/* Optional: Link to Login Page */}
           <div className="text-center mt-3">
             <small>
               Already have an account? <Link to="/login">Log In</Link>
             </small>
           </div>

        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;