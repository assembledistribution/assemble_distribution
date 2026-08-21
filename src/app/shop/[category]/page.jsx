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
    ? products.filter(p => p.category === category || (category === 'art-craft' && p.category === 'art-craft-sewing') || (category === 'art-craft-sewing' && p.category === 'art-craft'))
    : products;

  const categoryTitleMap = {
    'art-craft': 'Art, Craft and Sewing',
    'art-craft-sewing': 'Art, Craft and Sewing',
    'toys-games': 'Toys and Games',
    'garden-outdoor': 'Garden and Outdoor',
    'office-products': 'Office Products',
    'home-kitchen': 'Home and Kitchen',
    'health-household': 'Health and Household',
    'tools-home-improvement': 'Tools and Home Improvement',
    'sports-outdoors': 'Sports and Outdoors',
    'industrial-scientific': 'Industrial and Scientific',
    'automotive-parts-accessories': 'Automotive Parts and Accessories',
  };

  const categoryTitle = category ? (categoryTitleMap[category] || category.replace(/-/g, ' ')) : 'All Products';

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
