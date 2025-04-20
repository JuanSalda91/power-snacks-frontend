// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- Import Routes and Route
import ProductList from './components/Products/ProductList';
import ProductDetailPage from './pages/ProductDetailPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Power Snacks</h1>
        {/* Navbar can go here - potentially with <Link> components later */}
      </header>
      <main>
        <Routes> {/* <-- Define routes within Routes */}
          <Route path="/" element={<ProductList />} /> {/* <-- Homepage route */}
          <Route path="/products/:id" element={<ProductDetailPage />} /> {/* <-- Detail page route */}
          {/* Add other routes here later (e.g., cart, login) */}
        </Routes>
      </main>
      <footer>
        {/* Footer can go here */}
      </footer>
    </div>
  );
}

export default App;