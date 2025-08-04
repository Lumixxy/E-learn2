import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === course.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (courseId) => {
    return cart.some(item => item.id === courseId);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 