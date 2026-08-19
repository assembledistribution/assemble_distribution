'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getHighResImageUrl } from '@/utils/api';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const displaySizes = product.hasSizes && product.sizes && product.sizes.length > 0 
    ? product.sizes.join(', ') 
    : '';
  
  const truncatedSizes = displaySizes.length > 32 
    ? displaySizes.substring(0, 32) + '...' 
    : displaySizes;

  const hasVariations = product.variations && product.variations.length > 0;
  
  const router = useRouter();
  const { addToCart } = useCart();

  let minPrice = parseFloat(product.price);
  if (isNaN(minPrice)) minPrice = 0;
  let maxPrice = minPrice;
  let hasVariablePrice = false;

  // Determine minimum and maximum price from combinations
  if (product.combinations && product.combinations.length > 0) {
    const validPrices = product.combinations
      .map(c => parseFloat(c.price))
      .filter(p => !isNaN(p));
      
    if (validPrices.length > 0) {
      const minComboPrice = Math.min(...validPrices);
      const maxComboPrice = Math.max(...validPrices);
      minPrice = Math.min(minPrice, minComboPrice);
      maxPrice = Math.max(maxPrice, maxComboPrice);
      
      if (maxPrice > minPrice) {
        hasVariablePrice = true;
      }
    }
  }

  const highResImage = getHighResImageUrl(product.imageUrl);

  return (
    <div className="el-wrapper">
      <div className="box-up">
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img 
            className="img" 
            src={highResImage || null} 
            alt={product.title || ''} 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&auto=format&fit=crop';
            }}
          />
        </Link>
      </div>

      <div className="card-body">
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <h3 className="p-name" style={{ fontWeight: '700', marginBottom: '6px' }}>{product.title}</h3>
          
          {/* Single Price Display */}
          <div className="card-price" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--teal, #1C5C53)', marginBottom: '8px' }}>
            {hasVariablePrice ? (
              `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
            ) : (
              `$${minPrice.toFixed(2)}`
            )}
          </div>

          <p className="p-desc">
            {product.shortDescription || (product.description ? (product.description.length > 55 ? product.description.substring(0, 55) + '...' : product.description) : (product.brand || 'Premium Quality'))}
          </p>

          <div className="p-options">
            {product.hasSizes && displaySizes && (
              <span title={displaySizes}>Sizes: {truncatedSizes}</span>
            )}
            {!product.hasSizes && hasVariations && (
              <span style={{ color: 'var(--teal, #1C5C53)' }}>{product.variations.length} Options Available</span>
            )}
            {product.hasSizes && hasVariations && (
              <span>+ {product.variations.length} Colors/Styles</span>
            )}
          </div>
        </Link>
      </div>

      <div className="box-down">
        <button 
          className="cart-btn-action" 
          onClick={(e) => {
            e.preventDefault();
            if (product.hasSizes || hasVariations) {
              router.push(`/product/${product.id}`);
            } else {
              addToCart(product, null, null, 1, minPrice);
            }
          }}
        >
          <ShoppingCart size={16} />
          <span>{(product.hasSizes || hasVariations) ? 'Select Options' : 'Add to Cart'}</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .el-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cart-btn-action {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--teal, #1C5C53);
          color: white;
          border: none;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .cart-btn-action:hover {
          background: var(--teal-dark, #134943);
        }
      `}} />
    </div>
  );
}
