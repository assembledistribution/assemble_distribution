'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl, getHighResImageUrl } from '../utils/api';

const ProductContext = createContext();

const formatProductHd = (p) => {
  if (!p) return p;
  const imageUrl = getHighResImageUrl(p.imageUrl);
  const images = Array.isArray(p.images) && p.images.length > 0 
    ? p.images.map(getHighResImageUrl) 
    : (imageUrl ? [imageUrl] : []);

  const combinations = Array.isArray(p.combinations) 
    ? p.combinations.map(c => ({
        ...c,
        imageUrl: c.imageUrl ? getHighResImageUrl(c.imageUrl) : ''
      }))
    : (p.combinations || []);

  return {
    ...p,
    id: p._id || p.id,
    imageUrl,
    images,
    combinations
  };
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend (MongoDB Atlas) - Single Source of Truth
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/products?_t=${Date.now()}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedData = data.map(formatProductHd);
          setProducts(mappedData);
          return mappedData;
        }
      }
    } catch (error) {
      console.error('Error fetching products from MongoDB backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    const API_URL = getApiUrl();
    const formattedPayload = formatProductHd(product);
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPayload),
      });

      if (response.ok) {
        const newProduct = await response.json();
        const formatted = formatProductHd(newProduct);
        
        await fetchProducts();
        return { success: true, product: formatted };
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn('Backend failed to add product:', errData);
        return { success: false, error: errData.message || 'Server error saving product to MongoDB' };
      }
    } catch (error) {
      console.error('Error adding product:', error);
      return { success: false, error: error.message };
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
        await fetchProducts();
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false };
    }
  };

  const updateProduct = async (id, updatedData) => {
    const API_URL = getApiUrl();
    const formattedPayload = formatProductHd(updatedData);
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPayload),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        const formatted = formatProductHd(updatedProduct);
        await fetchProducts();
        return { success: true, product: formatted };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Error updating product:', error);
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
