'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { showToast } = useToast();

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('assemble_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading favorites from localStorage:', e);
    }
    setHasInitialized(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem('assemble_favorites', JSON.stringify(favorites));
    }
  }, [favorites, hasInitialized]);

  const toggleFavorite = (product) => {
    if (!product) return;
    const prodId = product.id || product._id;
    const isCurrentlyFav = favorites.some(p => (p.id || p._id) === prodId);

    setFavorites(prev => {
      const exists = prev.some(p => (p.id || p._id) === prodId);
      if (exists) {
        return prev.filter(p => (p.id || p._id) !== prodId);
      } else {
        return [...prev, {
          id: prodId,
          _id: prodId,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          images: product.images || [],
          category: product.category,
          shortDescription: product.shortDescription,
          description: product.description,
          brand: product.brand,
          hasSizes: product.hasSizes,
          sizes: product.sizes,
          variations: product.variations,
          combinations: product.combinations
        }];
      }
    });

    if (isCurrentlyFav) {
      showToast({
        type: 'favorite_remove',
        title: 'Removed from Favorites',
        message: product.title,
        imageUrl: product.imageUrl
      });
    } else {
      showToast({
        type: 'favorite_add',
        title: 'Added to Favorites!',
        message: product.title,
        imageUrl: product.imageUrl,
        link: '/favorites',
        linkText: 'View Favorites'
      });
    }
  };

  const isFavorite = (productId) => {
    if (!productId) return false;
    return favorites.some(p => (p.id || p._id) === productId || String(p.id) === String(productId) || String(p._id) === String(productId));
  };

  const removeFavorite = (productId) => {
    setFavorites(prev => prev.filter(p => (p.id || p._id) !== productId && String(p.id) !== String(productId) && String(p._id) !== String(productId)));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesCount,
      toggleFavorite,
      isFavorite,
      removeFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
