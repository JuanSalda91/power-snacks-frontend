import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/userService'; // Adjust path as needed

function ProfilePage() {
  // If you need the login status for other logic here, you can get it:
  // const { isLoggedIn } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserProfile(); // Service function uses configured apiClient
        setProfileData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error details:', err); // Log the full error object
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []); // Fetch on mount

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error loading profile: {error}</p>;
  }

  // It's good practice to check if profileData exists before trying to access its properties
  if (!profileData) {
    return <p>Could not load profile data.</p>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>ID:</strong> {profileData.id}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      {/* Use optional chaining ?. just in case name is null/undefined */}
      <p><strong>Name:</strong> {profileData.name?.trim() ? profileData.name : 'N/A'}</p>
      <p><strong>Role:</strong> {profileData.role}</p>
      {/* Safely format date only if created_at exists */}
      {profileData.created_at && (
          <p><strong>Member Since:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
      )}
      {/* Add edit profile button/functionality later */}
    </div>
  );
}

export default ProfilePage;