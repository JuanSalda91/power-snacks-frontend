import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService"; // Import the signup service

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true);

    try {
      const { message } = await signupUser({ name, email, password }); //Token/user also returned, handle if needed
      setSuccessMessage(message + 'Redirecting to login...');

      // Clear form (optional)
      // setName(''); setEmail(''); setPassword('');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      } , 2000); // 2 seconds delay

    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signup-name">Name:</label>
          <input
            type="text"
            id="sigup-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required // add if name is required by backend logic/DB
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor ="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} //Example: add password complexity requirements later
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;