'use client';

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductSlider from './ProductSlider';

export default function HotSales() {
  const { products, loading } = useProducts();

  if (loading && (!products || products.length === 0)) {
    return null;
  }

  // Only get products explicitly assigned to Hot Sales from the Admin Panel
  const hotSaleList = (products || []).filter(p => Boolean(p.isHotSale));

  if (hotSaleList.length === 0) {
    return null;
  }

  return (
    <ProductSlider
      id="hot-sales"
      eyebrow="High Demand Products"
      title="Hot Sales & Top Demand"
      subtitle="Our most requested, fast-moving wholesale products trusted by hundreds of retailers nationwide."
      products={hotSaleList}
    />
  );
}
