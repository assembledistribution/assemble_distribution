'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize products from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('designpro_demo_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch (e) { /* ignore corrupted data */ }
    setHasInitialized(true);
  }, []);

  // Fallback persistence for local demo
  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem('designpro_demo_products', JSON.stringify(products));
    }
  }, [products, hasInitialized]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const mappedData = data.map(p => ({ ...p, id: p._id || p.id }));
            
            // Only override if backend actually has products, else keep local products
            if (mappedData.length > 0) {
              setProducts(mappedData);
            }
          }
        }
      } catch (error) {
        // Local fallback mode when offline
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [...prev, { ...newProduct, id: newProduct._id }]);
      } else {
        console.warn('Backend failed to add product. Using local fallback.');
        setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
      } else {
        console.warn('Backend failed to delete product. Using local fallback.');
        setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? { ...updatedProduct, id: updatedProduct._id } : p));
      } else {
        console.warn('Backend failed to update product. Using local fallback.');
        setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? { ...updatedData, id } : p));
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? { ...updatedData, id } : p));
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
