'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const product = products.find(p => p.id === id || p.id === parseInt(id));

  const hasSizes = product?.hasSizes && product?.sizes && product?.sizes.length > 0;
  const hasVariations = product?.variations && product?.variations.length > 0;

  // Auto-select first size/variation on load
  useEffect(() => {
    if (product) {
      if (hasSizes && !selectedSize) setSelectedSize(product.sizes[0]);
      if (hasVariations && !selectedVariation) setSelectedVariation(product.variations[0]);
    }
  }, [product, hasSizes, hasVariations]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Product Not Found</h2>
          <p style={{ color: 'var(--gray)', margin: '20px 0' }}>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button className="btn" onClick={() => router.push('/shop')}>Back to Shop</button>
        </div>
        <Footer />
      </>
    );
  }

  // Determine min and max prices from combinations
  let basePrice = parseFloat(product.price);
  if (isNaN(basePrice)) basePrice = 0;
  let minPrice = basePrice;
  let maxPrice = basePrice;
  let hasVariablePrice = false;

  if (product.combinations && product.combinations.length > 0) {
    const validPrices = product.combinations
      .map(c => parseFloat(c.price))
      .filter(p => !isNaN(p));

    if (validPrices.length > 0) {
      minPrice = Math.min(basePrice, ...validPrices);
      maxPrice = Math.max(basePrice, ...validPrices);
      if (maxPrice > minPrice) {
        hasVariablePrice = true;
      }
    }
  }

  // Determine active selected price
  let activePrice = minPrice;
  let comboMatched = false;
  if (product.combinations && product.combinations.length > 0) {
    const combo = product.combinations.find(c => {
      const sizeMatch = hasSizes ? c.size === selectedSize : true;
      const varMatch = hasVariations ? c.variation === selectedVariation : true;
      return sizeMatch && varMatch;
    });

    if (combo && combo.price != null && combo.price !== '') {
      const parsed = parseFloat(combo.price);
      if (!isNaN(parsed)) {
        activePrice = parsed;
        comboMatched = true;
      }
    }
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const productImages = Array.isArray(product?.images) && product.images.length > 0 
    ? product.images 
    : (product?.imageUrl ? [product.imageUrl] : []);

  const activeMainImage = selectedImage || productImages[0] || product?.imageUrl || null;

  return (
    <>
      <Navbar />
      <div className="product-detail-page section">
        <div className="container">
          <button className="back-btn" onClick={() => router.back()}>
            <ArrowLeft size={20} /> Back
          </button>

          <div className="product-detail-grid">
            <div className="product-image-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="product-image-container">
                <img src={activeMainImage} alt={product.title || ''} className="product-main-image" />
              </div>

              {productImages.length > 1 && (
                <div className="product-gallery-thumbnails" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                  {productImages.map((imgUrl, idx) => {
                    const isSelected = activeMainImage === imgUrl;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid var(--teal)' : '1px solid var(--line)',
                          padding: 0,
                          background: 'var(--bg-neutral)',
                          cursor: 'pointer',
                          opacity: isSelected ? 1 : 0.7,
                          transition: 'all 0.2s ease',
                          flexShrink: 0
                        }}
                      >
                        <img src={imgUrl || null} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="product-info-container">
              <div className="product-brand">{product.brand || 'Premium Quality'}</div>
              <h1 className="product-title-large">{product.title}</h1>

              <div className="product-price-large">
                {hasVariablePrice && !comboMatched ? (
                  `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
                ) : (
                  `$${activePrice.toFixed(2)}`
                )}
              </div>

              <div className="product-short-description" style={{ color: 'var(--gray, #6B6F6E)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                {product.shortDescription || (product.description ? (product.description.length > 140 ? product.description.substring(0, 140) + '...' : product.description) : 'Premium quality craftsmanship with modern design.')}
              </div>

              {hasSizes && (
                <div className="product-options">
                  <h4 className="option-title">Select Size</h4>
                  <div className="size-selector">
                    {product.sizes.map((size, idx) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={idx}
                          className={`size-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {hasVariations && (
                <div className="product-options">
                  <h4 className="option-title">Select Variation / Color</h4>
                  <div className="variation-selector">
                    {product.variations.map((variation, idx) => {
                      const isSelected = selectedVariation === variation;
                      return (
                        <button
                          key={idx}
                          className={`variation-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedVariation(variation)}
                        >
                          {variation}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="product-actions">
                <button
                  className="btn-primary full-width cart-action-btn"
                  style={added ? { background: '#10b981' } : {}}
                  onClick={() => {
                    addToCart(product, selectedSize, selectedVariation, 1, activePrice);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }}
                >
                  {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* Description Section (Visible when scrolling down) */}
          <div className="product-description-section" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--line, #E7E5E0)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--ink, #1C1C1C)', marginBottom: '1.2rem' }}>
              Product Details & Description
            </h3>
            <div style={{ color: 'var(--gray, #4B5563)', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
              {product.description || 'This is a premium quality product designed with attention to detail. Experience the best in class performance and style with this exclusive item.'}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style dangerouslySetInnerHTML={{
        __html: `
        .product-detail-page {
          padding-top: 100px;
          min-height: 80vh;
        }
        .back-btn {
          background: none;
          border: none;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 1rem;
          margin-bottom: 2rem;
          transition: color 0.3s ease;
        }
        .back-btn:hover {
          color: var(--ink);
        }
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .product-image-container {
          background: var(--bg-neutral);
          border-radius: 20px;
          overflow: hidden;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-main-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        .product-brand {
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--teal);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .product-title-large {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.25;
          color: var(--ink);
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .product-price-large {
          font-size: 1.6rem;
          font-weight: 500;
          margin-bottom: 25px;
          color: var(--teal, #1C5C53);
        }
        .product-description {
          color: var(--gray);
          line-height: 1.8;
          margin-bottom: 30px;
          font-size: 1.05rem;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .product-options {
          margin-bottom: 30px;
        }
        .option-title {
          margin-bottom: 12px;
          font-weight: 600;
        }
        .size-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .size-btn {
          min-width: 45px;
          height: auto;
          min-height: 42px;
          padding: 8px 16px;
          border: 1px solid var(--line, #ddd);
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .size-btn:hover, .size-btn:active, .size-btn:focus, .size-btn.active {
          border-color: var(--teal);
          background: var(--teal);
          color: white;
        }
        .variation-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .variation-btn {
          padding: 10px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .variation-btn:hover, .variation-btn:active, .variation-btn:focus, .variation-btn.active {
          border-color: var(--teal);
          color: var(--teal);
          background: var(--bg-neutral);
        }
        .product-actions {
          margin-bottom: 40px;
        }
        .cart-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px;
          font-size: 1.1rem;
          background: var(--teal);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .full-width {
          width: 100%;
        }
        .product-features {
          border-top: 1px solid #eee;
          padding-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--gray);
        }
        @media (max-width: 1024px) {
          .product-detail-grid {
            gap: 2rem;
          }
        }
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .product-image-container {
            padding: 1.5rem;
          }
          .product-title-large {
            font-size: 2rem;
          }
          .product-price-large {
            font-size: 1.8rem;
          }
        }
        @media (max-width: 480px) {
          .product-title-large {
            font-size: 1.7rem;
          }
          .product-main-image {
            max-width: 100%;
          }
          .cart-action-btn {
            padding: 16px;
            font-size: 1rem;
          }
        }
      `}} />
    </>
  );
}
