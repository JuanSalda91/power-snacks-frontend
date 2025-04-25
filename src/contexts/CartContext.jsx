// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a custom hook to use the context easily
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  // --- Make sure this useState line exists and is correct ---
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
  });

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart items to localStorage", error);
    }
  }, [cartItems]);

  // --- Cart Logic Functions ---

  // Add item to cart (handles quantity update)
  const addToCart = (product, quantity = 1) => {
    console.log("addToCart called with:", product, "Quantity:", quantity); // Log input
    setCartItems(prevItems => { // Correctly calls setCartItems defined above
      console.log("Current cartItems (prevItems):", prevItems); // Log previous state
      const existingItem = prevItems.find(item => item.id === product.id);
      console.log("Existing item found?", existingItem); // Log if item exists

      let newItems; // Variable to hold the next state

      if (existingItem) {
        console.log("Updating quantity for existing item");
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log("Adding new item");
        // Ensure product object passed to addToCart contains necessary fields
        const newItem = {
          id: product.id,
          name: product.name || 'Unknown Name', // Add fallbacks
          price: product.price || 0, // Add fallbacks
          image: product.displayImage || null, // Use the processed image reference
          quantity: quantity
        };
        console.log("New item object:", newItem);
        newItems = [...prevItems, newItem];
      }

      console.log("New cartItems state will be:", newItems); // Log the calculated new state
      return newItems; // Return the new state array
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId)); // Uses setCartItems
    console.log(`Removed product with ID: ${productId} from cart.`);
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
     if (newQuantity <= 0) {
         removeFromCart(productId); // Remove if quantity is zero or less
     } else {
        setCartItems(prevItems => // Uses setCartItems
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
     }
     console.log(`Updated quantity for product ID: ${productId} to ${newQuantity}.`);
  };

  // Clear cart
  const clearCart = () => {
      setCartItems([]); // Uses setCartItems
      console.log("Cart cleared.");
  };

  // Calculate total items
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price || 0) * item.quantity), 0);
  };


  // Value provided by the context - includes state and functions
  // Note: The 'addToCart' unused warning in THIS file is likely ignorable.
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal
  };

  // 4. Return the Provider wrapping children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Ensure CartProvider is exported if not already default export
// export { CartProvider, useCart }; // Example if not using default export for Provider