'use client';

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductSlider from './ProductSlider';

export default function NewArrivals() {
  const { products, loading } = useProducts();

  if (loading && (!products || products.length === 0)) {
    return null;
  }

  // 1. Get explicitly marked new arrival products
  const explicitNew = products.filter(p => p.isNewArrival);

  // 2. If fewer than 10, fill up to 10 items from newest additions
  const remaining = products.filter(p => !p.isNewArrival);
  const newArrivalList = [...explicitNew, ...remaining].slice(0, 10);

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
