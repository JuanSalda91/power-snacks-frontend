// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import name

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize token from localStorage
  const [user, setUser] = useState(null); // Initialize user as null
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize logged in status
  const [isLoading, setIsLoading] = useState(true); // To check token validity on initial load

  useEffect(() => {
    // Check for token on initial load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Decode token to get user info and check expiration
        const decodedToken = jwtDecode(storedToken);

        // Check if token is expired (jwtDecode adds 'exp' field in seconds)
        const currentTime = Date.now() / 1000; // Convert ms to seconds
        if (decodedToken.exp < currentTime) {
          // Token is expired
          console.log('Stored token is expired.');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsLoggedIn(false);
        } else {
          // Token is valid (at least not expired), set auth state
          console.log('Found valid token in storage.', decodedToken);
          setToken(storedToken);
          // Assuming your JWT payload has userId, email, role like we set it up
          setUser({ id: decodedToken.userId, email: decodedToken.email, role: decodedToken.role });
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Invalid token
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    setIsLoading(false); // Finished initial check
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function to be called by LoginPage/SignupPage
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData); // Assume userData is { id, email, name, role } from API
    setIsLoggedIn(true);
    console.log('AuthContext: User logged in', userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    console.log('AuthContext: User logged out');
    // Optionally navigate to login page using useNavigate() if needed here or in calling component
  };

  // Value provided by the context
  const value = {
    token,
    user,
    isLoggedIn,
    isLoading, // Provide loading state for initial check
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook for easy consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}