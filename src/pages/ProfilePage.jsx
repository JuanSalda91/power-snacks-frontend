import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/userService'; // Ensure path is correct

// --- React Bootstrap Imports ---
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert'; // For errors

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data fetching useEffect (no changes needed) ---
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserProfile();
        setProfileData(data);
      } catch (err) {
        setError(err.message || 'Failed to load profile'); // Simplified error message
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  // --- Conditional Rendering ---
  if (loading) {
    // Added Container for consistency
    return <Container className="text-center mt-5 mb-5"><p>Loading profile...</p></Container>;
  }

  if (error) {
    // Used Alert for consistency
    return <Container className="mt-4 mb-5"><Alert variant="danger">Error loading profile: {error}</Alert></Container>;
  }

  if (!profileData) {
    // Used Alert for consistency
    return <Container className="mt-4 mb-5"><Alert variant="warning">Could not load profile data.</Alert></Container>;
  }

  // --- Styled Profile Display ---
  return (
    <Container className="my-4 mb-5">
      {/* Center the content */}
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}> {/* Control width */}
          <h2 className="text-center mb-4">My Profile</h2>
          {/* Use a Card for visual structure */}
          <Card>
            {/* Optional Header */}
            {/* <Card.Header>User Details</Card.Header> */}
            <ListGroup variant="flush"> {/* Flush removes card borders from list items */}
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>ID:</strong>
                <span>{profileData.id}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Email:</strong>
                <span>{profileData.email}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Name:</strong>
                {/* Use optional chaining and provide fallback */}
                <span>{profileData.name?.trim() ? profileData.name : 'N/A'}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <strong>Role:</strong>
                <span>{profileData.role}</span>
              </ListGroup.Item>
              {profileData.created_at && (
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Member Since:</strong>
                  <span>{new Date(profileData.created_at).toLocaleDateString()}</span>
                </ListGroup.Item>
              )}
            </ListGroup>
             {/* Optional Footer for buttons like Edit Profile */}
            {/* <Card.Footer className="text-end">
              <Button variant="secondary" size="sm">Edit Profile</Button>
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;