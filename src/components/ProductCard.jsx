'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { getHighResImageUrl } from '@/utils/api';
import { ShoppingCart, Heart, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const displaySizes = product.hasSizes && product.sizes && product.sizes.length > 0 
    ? product.sizes.join(', ') 
    : '';
  
  const truncatedSizes = displaySizes.length > 32 
    ? displaySizes.substring(0, 32) + '...' 
    : displaySizes;

  const hasVariations = product.variations && product.variations.length > 0;
  
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const prodId = product.id || product._id;
  const favorited = isFavorite(prodId);

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
  const actionText = (product.hasSizes || hasVariations) ? 'Select Options' : 'Add to Cart';

  return (
    <div className="el-wrapper">
      <div className="box-up">
        {/* Heart Favorite Button */}
        <button
          type="button"
          className={`product-heart-btn ${favorited ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          title={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            fill={favorited ? "#ef4444" : "rgba(255,255,255,0.6)"} 
            color={favorited ? "#ef4444" : "var(--ink, #1C1C1C)"} 
            className={`heart-icon ${favorited ? 'heart-glow' : ''}`}
          />
        </button>

        <Link href={`/product/${product.id || product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        <div className="h-bg">
          <div className="h-bg-inner"></div>
        </div>

        <button 
          className={`cart ${added ? 'cart--added' : ''}`} 
          onClick={(e) => {
            e.preventDefault();
            if (product.hasSizes || hasVariations) {
              router.push(`/product/${product.id || product._id}`);
            } else {
              addToCart(product, null, null, 1, minPrice);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }
          }}
        >
          <span className="price">{added ? '✓ Added!' : actionText}</span>
          <span className="add-to-cart">
            <span className="txt">
              {added ? (
                <Check size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              ) : (
                <ShoppingCart size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              )}
              {added ? 'Added to Cart!' : actionText}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
