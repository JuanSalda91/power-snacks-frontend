import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import { useAuth } from './contexts/AuthContext';
import ProfilePage from './pages/ProfilePage'; // <-- Import ProfilePage
import ProductList from './components/Products/ProductList';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  // ... handleLogout ...
  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/login'); // Redirect to login after logout
  };
  
  if (isLoading) {
    return <div>Loading application</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Power Snacks {user ? `(Welcome, ${user.email})` : ''}</h1>
        <nav>
          <Link to="/" style={{ marginRight: '10px' }}>Products</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" style={{ marginRight: '10px' }}>My Profile</Link> {/* <-- Link to profile */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />} // <-- Protected Route
          />
          {/* Add other routes */}
        </Routes>
      </main>
      <footer>{/* Footer */}</footer>
    </div>
  );
}

export default App;