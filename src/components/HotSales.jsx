'use client';

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductSlider from './ProductSlider';

export default function HotSales() {
  const { products, loading } = useProducts();

  if (loading && (!products || products.length === 0)) {
    return null;
  }

  // 1. Get explicitly marked hot sale products
  const explicitHot = products.filter(p => p.isHotSale);

  // 2. If fewer than 10, fill up to 10 items from top products
  const remaining = products.filter(p => !p.isHotSale);
  const hotSaleList = [...explicitHot, ...remaining].slice(0, 10);

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
