'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSlider({
  id = 'product-slider',
  eyebrow = 'Explore Collection',
  title = 'Featured Products',
  subtitle = 'Discover our premier wholesale selection backed by direct manufacturer pricing.',
  products = [],
  viewAllHref = '/shop',
  viewAllText = 'View All Products'
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.querySelector('.product-slider-card')?.offsetWidth || 280;
      const scrollAmount = (cardWidth + 20) * 2;
      const target = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="section product-slider-section" id={id} aria-label={title}>
      <div className="container">
        
        {/* Header row with Title & Navigation Controls */}
        <div className="section-intro product-slider-header">
          <div className="section-intro__left">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-h2">{title}</h2>
          </div>

          <div className="product-slider-nav-wrap">
            {subtitle && (
              <p className="section-intro__right product-slider-desc desktop-desc">
                {subtitle}
              </p>
            )}

            <div className="product-slider-actions">
              {/* Left / Right Arrow Slider Controls */}
              <div className="slider-nav-btns">
                <button 
                  type="button"
                  className={`slider-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  aria-label={`Previous ${title}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  type="button"
                  className={`slider-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  aria-label={`Next ${title}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Products Track */}
        <div className="product-slider-track-wrap">
          <div className="product-slider-track" ref={scrollRef}>
            {products.map((product) => (
              <div 
                className="product-slider-card" 
                key={product.id || product._id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
