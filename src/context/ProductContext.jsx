'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize products from localStorage on mount (client-only fallback)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('designpro_demo_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch (e) { /* ignore corrupted data */ }
    setHasInitialized(true);
  }, []);

  // Sync to local demo storage for offline resilience
  useEffect(() => {
    if (hasInitialized && products.length > 0) {
      localStorage.setItem('designpro_demo_products', JSON.stringify(products));
    }
  }, [products, hasInitialized]);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData = data.map(p => ({ ...p, id: p._id || p.id }));
          setProducts(mappedData);
          return mappedData;
        }
      }
    } catch (error) {
      console.error('Error fetching products from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    const API_URL = getApiUrl();
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
        const formatted = { ...newProduct, id: newProduct._id || newProduct.id };
        setProducts(prev => [...prev.filter(p => p.id !== formatted.id), formatted]);
        return { success: true, product: formatted };
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn('Backend failed to add product:', errData);
        const fallback = { ...product, id: Date.now().toString() };
        setProducts(prev => [...prev, fallback]);
        return { success: false, error: errData.message || 'Server error', product: fallback };
      }
    } catch (error) {
      console.error('Error adding product:', error);
      const fallback = { ...product, id: Date.now().toString() };
      setProducts(prev => [...prev, fallback]);
      return { success: false, error: error.message, product: fallback };
    }
  };

  const deleteProduct = async (id) => {
    const API_URL = getApiUrl();
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
        return { success: true };
      } else {
        setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
        return { success: true };
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
      return { success: true };
    }
  };

  const updateProduct = async (id, updatedData) => {
    const API_URL = getApiUrl();
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
        const formatted = { ...updatedProduct, id: updatedProduct._id || updatedProduct.id };
        setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? formatted : p));
        return { success: true, product: formatted };
      } else {
        setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? { ...updatedData, id } : p));
        return { success: false };
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? { ...updatedData, id } : p));
      return { success: false };
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
