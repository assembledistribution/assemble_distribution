'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Search, X, Package } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const { products, loading } = useProducts();

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const qClean = searchTerm.toLowerCase().trim();

  // Instant In-Memory Filter on every single keystroke
  const filteredProducts = qClean
    ? (products || []).filter(p => 
        p.title?.toLowerCase().includes(qClean) ||
        p.category?.toLowerCase().includes(qClean) ||
        p.asin?.toLowerCase().includes(qClean) ||
        p.description?.toLowerCase().includes(qClean)
      )
    : (products || []);

  return (
    <>
      <div className="shop-header">
        <span className="eyebrow">Wholesale Catalog</span>
        <h1 className="shop-title">
          {qClean ? `Results for "${searchTerm}"` : 'All Products'}
        </h1>

        {/* Instant Live Search Input Box */}
        <div style={{
          width: '100%',
          maxWidth: '520px',
          margin: '20px auto 0',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--gray)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title or category..."
            style={{
              width: '100%',
              padding: '13px 44px 13px 46px',
              borderRadius: 'var(--radius-pill, 30px)',
              border: '1.5px solid var(--line, #E7E5E0)',
              backgroundColor: '#ffffff',
              fontSize: '14.5px',
              outline: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              transition: 'all 0.25s ease'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '14px',
                background: 'var(--bg-neutral, #F4F3F0)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--gray)'
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--gray)', marginTop: '10px', fontWeight: '500' }}>
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> wholesale products
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
          <Package size={40} style={{ opacity: 0.35, marginBottom: '12px' }} />
          <p style={{ fontSize: '16px', fontWeight: '600' }}>No products found matching &quot;{searchTerm}&quot;</p>
          <button
            onClick={() => setSearchTerm('')}
            style={{
              marginTop: '12px',
              background: 'var(--teal)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: 'var(--radius-pill, 30px)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Clear Search Filter
          </button>
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
