'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingCart, Truck, Check, Package, Loader2 } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  // ALL hooks MUST be declared unconditionally at top level
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const product = products.find(
    p => p.id === id || p._id === id || String(p.id) === String(id) || String(p._id) === String(id)
  );

  const hasSizes = product?.hasSizes && product?.sizes && product?.sizes.length > 0;
  const hasVariations = product?.variations && product?.variations.length > 0;

  // Auto-select first size/variation on load
  useEffect(() => {
    if (product) {
      if (hasSizes && !selectedSize) setSelectedSize(product.sizes[0]);
      if (hasVariations && !selectedVariation) setSelectedVariation(product.variations[0]);
    }
  }, [product, hasSizes, hasVariations]);

  // Render loading state while fetching products from backend on page refresh
  if (loading && !product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '140px 20px 100px', textAlign: 'center', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={44} className="spin-loader" style={{ color: 'var(--teal, #1C5C53)', marginBottom: '16px' }} />
          <p style={{ color: 'var(--gray, #666)', fontSize: '1.05rem', fontWeight: 500 }}>Loading product details...</p>
        </div>
        <Footer />
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-loader {
            animation: spin 1s linear infinite;
          }
          `
        }} />
      </>
    );
  }

  // Render Not Found state if loading is complete and product doesn't exist
  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '120px 20px 80px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Package size={56} style={{ color: 'var(--teal, #1C5C53)', marginBottom: '16px', opacity: 0.6 }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--ink, #1C1C1C)', marginBottom: '10px' }}>Product Not Found</h2>
          <p style={{ color: 'var(--gray, #666)', margin: '0 0 24px', maxWidth: '400px', lineHeight: 1.6 }}>The product you&apos;re looking for doesn&apos;t exist or has been removed from our catalog.</p>
          <button className="btn-primary" style={{ padding: '12px 28px', borderRadius: '10px', cursor: 'pointer' }} onClick={() => router.push('/shop')}>Back to Shop</button>
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

  const productImages = Array.isArray(product?.images) && product.images.length > 0 
    ? product.images 
    : (product?.imageUrl ? [product.imageUrl] : []);

  const activeMainImage = selectedImage || productImages[0] || product?.imageUrl || null;

  return (
    <>
      <Navbar />
      <div className="product-detail-page">
        <div className="container">
          {/* Top Breadcrumb Nav */}
          <button className="back-btn" onClick={() => router.back()} aria-label="Go Back">
            <ArrowLeft size={18} /> <span>Back</span>
          </button>

          <div className="product-detail-grid">
            {/* Left Image Showcase Column */}
            <div className="product-image-section">
              <div className="product-image-container">
                <img 
                  src={activeMainImage} 
                  alt={product.title || 'Product Image'} 
                  className="product-main-image" 
                />
              </div>

              {/* Thumbnails Gallery */}
              {productImages.length > 1 && (
                <div className="product-gallery-thumbnails">
                  {productImages.map((imgUrl, idx) => {
                    const isSelected = activeMainImage === imgUrl;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`thumbnail-btn ${isSelected ? 'active' : ''}`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img src={imgUrl || null} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Product Details Column */}
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

              <div className="product-short-description">
                {product.shortDescription || (product.description ? (product.description.length > 140 ? product.description.substring(0, 140) + '...' : product.description) : 'Premium quality craftsmanship with modern design.')}
              </div>

              {/* Size Selector */}
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

              {/* Variation Selector */}
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

              {/* Add to Cart Actions */}
              <div className="product-actions">
                <button
                  className={`cart-action-btn ${added ? 'added' : ''}`}
                  onClick={() => {
                    addToCart(product, selectedSize, selectedVariation, 1, activePrice);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }}
                >
                  {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                  <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="product-trust-badges">
                <div className="badge-item">
                  <Truck size={18} className="badge-icon" />
                  <span>Fast Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="product-description-section">
            <h3 className="section-title">Product Details & Description</h3>
            <div className="description-content">
              {product.description || 'This is a premium quality product designed with attention to detail. Experience the best in class performance and style with this exclusive item.'}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .product-detail-page {
          padding-top: 110px;
          padding-bottom: 60px;
          min-height: 85vh;
          background: #fafafa;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .back-btn {
          background: white;
          border: 1px solid var(--line, #E5E7EB);
          color: var(--gray, #4B5563);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .back-btn:hover {
          color: var(--ink, #111);
          border-color: var(--teal, #1C5C53);
          background: #f3f4f6;
          transform: translateX(-2px);
        }

        .product-detail-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3.5rem;
          align-items: start;
          max-width: 100%;
        }

        .product-image-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 110px;
          max-width: 100%;
        }

        .product-image-container {
          background: white;
          border-radius: 20px;
          border: 1px solid var(--line, #E5E7EB);
          overflow: hidden;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
          max-height: 480px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          max-width: 100%;
        }

        .product-main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.2s ease;
        }

        .product-gallery-thumbnails {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 6px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          max-width: 100%;
        }
        .product-gallery-thumbnails::-webkit-scrollbar {
          display: none;
        }

        .thumbnail-btn {
          width: 70px;
          height: 70px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid var(--line, #E5E7EB);
          padding: 2px;
          background: white;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .thumbnail-btn:hover {
          opacity: 1;
        }
        .thumbnail-btn.active {
          border-color: var(--teal, #1C5C53);
          opacity: 1;
          box-shadow: 0 0 0 2px rgba(28, 92, 83, 0.2);
        }
        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .product-info-container {
          background: white;
          padding: 2.2rem;
          border-radius: 20px;
          border: 1px solid var(--line, #E5E7EB);
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          max-width: 100%;
          overflow: hidden;
        }

        .product-brand {
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--teal, #1C5C53);
          font-weight: 700;
          font-size: 0.825rem;
          margin-bottom: 8px;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .product-title-large {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.25;
          color: var(--ink, #1C1C1C);
          overflow-wrap: anywhere;
          word-break: break-word;
          max-width: 100%;
        }

        .product-price-large {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 18px;
          color: var(--teal, #1C5C53);
        }

        .product-short-description {
          color: var(--gray, #4B5563);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line, #F3F4F6);
          overflow-wrap: anywhere;
          word-break: break-word;
          max-width: 100%;
        }

        .product-options {
          margin-bottom: 24px;
        }

        .option-title {
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--ink, #111);
        }

        .size-selector, .variation-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .size-btn, .variation-btn {
          min-width: 48px;
          min-height: 44px;
          padding: 8px 16px;
          border: 1.5px solid var(--line, #E5E7EB);
          background: white;
          color: var(--ink, #374151);
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .size-btn:hover, .variation-btn:hover {
          border-color: var(--teal, #1C5C53);
          color: var(--teal, #1C5C53);
          background: #f0fdf4;
        }
        .size-btn.active, .variation-btn.active {
          border-color: var(--teal, #1C5C53);
          background: var(--teal, #1C5C53);
          color: white;
          box-shadow: 0 4px 10px rgba(28, 92, 83, 0.25);
        }

        .product-actions {
          margin-top: 28px;
          margin-bottom: 24px;
        }

        .cart-action-btn {
          width: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          font-size: 1.05rem;
          font-weight: 600;
          background: var(--teal, #1C5C53);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(28, 92, 83, 0.3);
        }
        .cart-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(28, 92, 83, 0.4);
          background: #154740;
        }
        .cart-action-btn.added {
          background: #10b981;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        }

        .product-trust-badges {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid var(--line, #F3F4F6);
          gap: 12px;
          flex-wrap: wrap;
        }
        .badge-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--gray, #6B7280);
          font-weight: 500;
        }
        .badge-icon {
          color: var(--teal, #1C5C53);
          flex-shrink: 0;
        }

        .product-description-section {
          margin-top: 3.5rem;
          padding: 2.5rem;
          background: white;
          border-radius: 20px;
          border: 1px solid var(--line, #E5E7EB);
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          max-width: 100%;
          overflow: hidden;
        }
        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--ink, #1C1C1C);
          margin-bottom: 1rem;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .description-content {
          color: var(--gray, #4B5563);
          line-height: 1.8;
          font-size: 1rem;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
          word-wrap: break-word;
          max-width: 100%;
        }

        /* --- Responsive Breakpoints --- */

        @media (max-width: 1024px) {
          .product-detail-grid {
            gap: 2rem;
          }
          .product-image-section {
            position: static;
          }
          .product-info-container {
            padding: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .product-detail-page {
            padding-top: 90px;
            padding-bottom: 40px;
          }
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .product-image-container {
            max-height: 380px;
            padding: 1.25rem;
          }
          .product-info-container {
            padding: 1.4rem;
            border-radius: 16px;
          }
          .product-title-large {
            font-size: 1.6rem;
          }
          .product-price-large {
            font-size: 1.5rem;
            margin-bottom: 14px;
          }
          .thumbnail-btn {
            width: 60px;
            height: 60px;
          }
          .product-description-section {
            margin-top: 2rem;
            padding: 1.5rem;
            border-radius: 16px;
          }
          .section-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .product-detail-page {
            padding-top: 82px;
          }
          .back-btn {
            margin-bottom: 1rem;
          }
          .product-image-container {
            max-height: 320px;
            padding: 1rem;
            border-radius: 16px;
          }
          .product-info-container {
            padding: 1.2rem;
          }
          .product-title-large {
            font-size: 1.35rem;
          }
          .product-price-large {
            font-size: 1.35rem;
          }
          .size-btn, .variation-btn {
            min-height: 42px;
            padding: 6px 14px;
            font-size: 0.85rem;
          }
          .cart-action-btn {
            min-height: 48px;
            font-size: 0.975rem;
            padding: 12px 18px;
          }
          .product-trust-badges {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .product-description-section {
            padding: 1.2rem;
          }
        }
      `}} />
    </>
  );
}
