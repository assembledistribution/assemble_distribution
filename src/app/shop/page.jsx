'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  const { products } = useProducts();

  let filteredProducts = products;

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.title?.toLowerCase().includes(searchQuery) ||
      p.description?.toLowerCase().includes(searchQuery) ||
      p.brand?.toLowerCase().includes(searchQuery)
    );
  }

  const categoryTitle = searchQuery ? `Search Results for "${searchQuery}"` : 'All Products';

  return (
    <>
      <div className="shop-header">
        <span className="eyebrow">Shop</span>
        <h1 className="shop-title">{categoryTitle}</h1>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
          <p>No products found in this category.</p>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="section container">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px 0' }}>Loading...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
