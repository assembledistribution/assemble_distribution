'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize cart items from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('designpro_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) { /* ignore corrupted data */ }
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem('designpro_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, hasInitialized]);

  const addToCart = (product, selectedSize, selectedVariation, quantity = 1, price = null) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && 
                item.size === selectedSize && 
                item.variation === selectedVariation
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item
        return [...prev, {
          id: product.id,
          title: product.title,
          imageUrl: product.imageUrl,
          size: selectedSize,
          variation: selectedVariation,
          price: price || parseFloat(product.price),
          quantity: quantity
        }];
      }
    });
  };

  const removeFromCart = (id, size, variation) => {
    setCartItems(prev => prev.filter(
      item => !(item.id === id && item.size === size && item.variation === variation)
    ));
  };

  const updateQuantity = (id, size, variation, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size && item.variation === variation) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
