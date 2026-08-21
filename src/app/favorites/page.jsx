'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, favoritesCount, clearFavorites } = useFavorites();

  return (
    <>
      <Navbar />
      <main className="section container" style={{ minHeight: '65vh', paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Link 
              href="/shop" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--teal, #1C5C53)', fontWeight: '600', marginBottom: '8px', textDecoration: 'none' }}
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <h1 style={{ 
              fontSize: 'clamp(26px, 3.5vw, 36px)', 
              fontWeight: '800', 
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #111827 0%, #1c3d37 40%, #2a9d8f 60%, #111827 100%)',
              backgroundSize: '250% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              animation: 'textShine 7s ease-in-out infinite alternate, luxuryTitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both'
            }}>
              <span>My Favorites</span>
              {favoritesCount > 0 && (
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  backgroundColor: '#fee2e2', 
                  color: '#ef4444', 
                  padding: '4px 12px', 
                  borderRadius: '20px'
                }}>
                  {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
          </div>

          {favoritesCount > 0 && (
            <button
              onClick={clearFavorites}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill, 30px)',
                border: '1px solid var(--line, #E7E5E0)',
                backgroundColor: '#ffffff',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Clear all favorite items"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Favorites Grid / Empty State */}
        {favorites.length > 0 ? (
          <div className="products-grid">
            {favorites.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '70px 20px', 
            backgroundColor: 'var(--cream, #FBFAF8)', 
            borderRadius: 'var(--radius-lg, 22px)', 
            border: '1px solid var(--line, #E7E5E0)',
            maxWidth: '520px',
            margin: '20px auto 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              width: '74px', 
              height: '74px', 
              borderRadius: '50%', 
              backgroundColor: '#fee2e2', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px',
              color: '#ef4444',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.2)'
            }}>
              <Heart size={36} fill="#ef4444" />
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--ink, #1C1C1C)', marginBottom: '8px' }}>
              Your Favorites List is Empty
            </h2>

            <p style={{ fontSize: '14px', color: 'var(--gray, #6B6F6E)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '380px', margin: '0 auto 28px' }}>
              Save items you love by clicking the heart icon on any product, and they will be waiting here for you.
            </p>

            <Link 
              href="/shop" 
              className="btn btn--solid"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 28px', 
                borderRadius: 'var(--radius-pill, 30px)',
                textDecoration: 'none'
              }}
            >
              <ShoppingBag size={16} /> Explore Products
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
