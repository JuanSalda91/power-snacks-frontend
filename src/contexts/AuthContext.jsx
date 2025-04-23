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
    console.log('AuthContext useEffect: Running initial token check...'); // <-- Log: Start
    setIsLoading(true); // Set loading true at the start
    const storedToken = localStorage.getItem('token');
    console.log('AuthContext useEffect: Found token in storage?', !!storedToken); // <-- Log: Token presence

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log('AuthContext useEffect: Decoded token:', decodedToken); // <-- Log: Decoded payload
        const currentTime = Date.now() / 1000; // Convert ms to seconds
        console.log('AuthContext useEffect: Token Exp time:', decodedToken.exp); // <-- Log: Expiration timestamp
        console.log('AuthContext useEffect: Current time:', currentTime); // <-- Log: Current timestamp

        if (decodedToken.exp < currentTime) {
          // Token is expired
          console.log('AuthContext useEffect: Token determined EXPIRED.'); // <-- Log: Expiry decision
          localStorage.removeItem('token');
          setToken(null); setUser(null); setIsLoggedIn(false);
        } else {
          // Token is valid (at least not expired), set auth state
          console.log('AuthContext useEffect: Token determined VALID.'); // <-- Log: Validity decision
          setToken(storedToken);
          // Ensure these keys (userId, email, role) exactly match your backend JWT payload
          setUser({ id: decodedToken.userId, email: decodedToken.email, role: decodedToken.role });
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Invalid token (e.g., malformed)
        console.error('AuthContext useEffect: Error decoding token:', error); // <-- Log: Decoding error
        localStorage.removeItem('token');
        setToken(null); setUser(null); setIsLoggedIn(false);
      }
    } else {
       console.log('AuthContext useEffect: No token found in storage.'); // <-- Log: No token case
       setToken(null); setUser(null); setIsLoggedIn(false);
    }
    setIsLoading(false); // Finished initial check
    console.log('AuthContext useEffect: Finished initial check. isLoading:', false); // <-- Log: End
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