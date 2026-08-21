'use client';

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductSlider from './ProductSlider';

export default function NewArrivals() {
  const { products, loading } = useProducts();

  if (loading && (!products || products.length === 0)) {
    return null;
  }

  // Only get products explicitly assigned to New Arrivals from the Admin Panel
  const newArrivalList = (products || []).filter(p => Boolean(p.isNewArrival));

  if (newArrivalList.length === 0) {
    return null;
  }

  return (
    <ProductSlider
      id="new-arrivals"
      eyebrow="Fresh In Stock"
      title="New Arrivals"
      subtitle="Explore our freshest additions sourced directly from top brand manufacturers at wholesale rates."
      products={newArrivalList}
    />
  );
}
