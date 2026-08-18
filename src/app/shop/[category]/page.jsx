'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';

export default function ShopCategoryPage() {
  const { category } = useParams();
  const { products } = useProducts();

  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;

  const categoryTitle = category ? category.replace('-', ' ') : 'All Products';

  return (
    <>
      <Navbar />
      <main className="section container">
        <div className="shop-header">
          <span className="eyebrow">Shop</span>
          <h1 className="shop-title" style={{ textTransform: 'capitalize' }}>{categoryTitle}</h1>
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
      </main>
      <Footer />
    </>
  );
}
