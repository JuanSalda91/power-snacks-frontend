import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // For redirection after login
import { loginUser } from "../services/authService";
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation
  const auth = useAuth(); // Get auth context

  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevent default form submission browser refresh
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state to true

    try {
      const { token, user } = await loginUser({ email, password });

      // Call the login functionfrom context instead of localstorage directly
      auth.login(token, user); // Use context login

      navigate('/'); // Redirect to the root route (product list)

    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;