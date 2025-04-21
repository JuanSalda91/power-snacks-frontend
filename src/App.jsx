import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProductList from './components/Products/ProductList';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  // Basic logout function (implement properly with state management later)
  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/login'); // Redirect to login page
  };

 if (isLoading) {
  return <div>Loading application...</div>;
 }

  
  return (
    <div className="App">
    <header className="App-header">
      <h1>Power Snacks {user ? `(Welcome, ${user.email})` : ''}</h1> {/* Display user email */}
      <nav>
        <Link to="/" style={{ marginRight: '10px' }}>Products</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {/* Add other links like Account/Profile later */}
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Add Protected Routes later */}
      </Routes>
    </main>
    <footer>{/* Footer */}</footer>
  </div>
);
}

export default App;