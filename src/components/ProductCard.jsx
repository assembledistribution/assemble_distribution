'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const displaySizes = product.hasSizes && product.sizes && product.sizes.length > 0 
    ? product.sizes.join(', ') 
    : '';

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

  return (
    <div className="el-wrapper">
      <div className="box-up">
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img className="img" src={product.imageUrl || null} alt={product.title || ''} />
        </Link>
      </div>

      <div className="card-body">
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <h3 className="p-name" style={{ fontWeight: '700', marginBottom: '4px' }}>{product.title}</h3>
          <div className="card-price" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--teal, #1C5C53)', marginBottom: '8px' }}>
            {hasVariablePrice ? (
              `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
            ) : (
              `$${minPrice.toFixed(2)}`
            )}
          </div>
          <p className="p-desc">
            {product.description ? (product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description) : (product.brand || 'Premium Quality')}
          </p>
          <div className="p-options">
            {product.hasSizes && displaySizes && (
              <span>Sizes: {displaySizes}</span>
            )}
            {!product.hasSizes && hasVariations && (
              <span style={{color: 'var(--teal)'}}>{product.variations.length} Options Available</span>
            )}
            {product.hasSizes && hasVariations && (
              <span>+ {product.variations.length} Colors/Styles</span>
            )}
          </div>
        </Link>
      </div>

      <div className="box-down">
        <div className="h-bg">
          <div className="h-bg-inner"></div>
        </div>

        <button 
          className="cart" 
          onClick={(e) => {
            e.preventDefault();
            if (product.hasSizes || hasVariations) {
              router.push(`/product/${product.id}`);
            } else {
              addToCart(product, null, null, 1, minPrice);
            }
          }}
        >
          <span className="price" style={hasVariablePrice ? { fontSize: '13px' } : {}}>
            {hasVariablePrice ? (
              `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
            ) : (
              `$${minPrice.toFixed(2)}`
            )}
          </span>
          <span className="add-to-cart">
            <span className="txt">{(product.hasSizes || hasVariations) ? 'Select Options' : 'Add to Cart'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
