'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'art-craft',
    label: 'Art, Craft and Sewing',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format&fit=crop',
    alt: 'Art, craft and sewing supplies — paints, brushes, tools',
  },
  {
    id: 'toys-games',
    label: 'Toys and Games',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=870&auto=format&fit=crop',
    alt: 'Toys and games for all ages',
  },
  {
    id: 'garden-outdoor',
    label: 'Garden and Outdoor',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    alt: 'Garden and outdoor tools and plants',
  },
  {
    id: 'office-products',
    label: 'Office Products',
    img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80&auto=format&fit=crop',
    alt: 'Office supplies, stationery and desk organization',
  },
  {
    id: 'home-kitchen',
    label: 'Home and Kitchen',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80&auto=format&fit=crop',
    alt: 'Home decor, kitchenware and cookware',
  },
  {
    id: 'health-household',
    label: 'Health and Household',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&auto=format&fit=crop',
    alt: 'Health, wellness and household essentials',
  },
  {
    id: 'tools-home-improvement',
    label: 'Tools and Home Improvement',
    img: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&q=80&auto=format&fit=crop',
    alt: 'Hardware tools and home improvement supplies',
  },
  {
    id: 'sports-outdoors',
    label: 'Sports and Outdoors',
    img: 'https://images.unsplash.com/photo-1596274646574-266971f0dfad?w=800&auto=format&fit=crop&q=80',
    alt: 'Sports equipment, fitness gear and outdoor activities',
  },
  {
    id: 'industrial-scientific',
    label: 'Industrial and Scientific',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop',
    alt: 'Industrial equipment, scientific instruments and supplies',
  },
  {
    id: 'automotive-parts-accessories',
    label: 'Automotive Parts and Accessories',
    img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&auto=format&fit=crop',
    alt: 'Automotive parts, car accessories and maintenance supplies',
  },
];

export default function Categories() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.querySelector('.cat-circle-card')?.offsetWidth || 160;
      const scrollAmount = (cardWidth + 24) * 2;
      const target = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section categories-section" id="services" aria-labelledby="categories-heading">
      <div className="container">

        {/* Header row with Title & Navigation Controls */}
        <div className="section-intro cat-header-row">
          <div className="section-intro__left">
            <span className="eyebrow">Our Categories</span>
            <h2 className="section-h2" id="categories-heading">
              Shop by Category.
            </h2>
          </div>

          <div className="cat-header-nav">
            <p className="section-intro__right desktop-desc">
              From creative art supplies, exciting toys, to everything you need for the outdoors — browse our wide range of wholesale product categories.
            </p>
            {/* Left / Right Arrow Slider Controls */}
            <div className="slider-nav-btns">
              <button 
                type="button"
                className={`slider-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous Category"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button"
                className={`slider-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next Category"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Circular Slider Track (Mobile & Desktop) */}
        <div className="categories-slider-track" ref={scrollRef}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              id={`cat-${cat.id}`}
              className="cat-circle-card"
            >
              <div className="cat-circle-img-wrap">
                <img src={cat.img} alt={cat.alt} loading="lazy" />
              </div>
              <span className="cat-circle-label">{cat.label}</span>
            </Link>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .categories-section {
          position: relative;
          padding: 40px 0 60px;
        }

        .cat-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.2rem;
          gap: 1.5rem;
        }

        .cat-header-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .desktop-desc {
          margin-bottom: 0 !important;
          max-width: 440px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--gray, #6B6F6E);
        }

        .slider-nav-btns {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .slider-nav-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid var(--line, #E7E5E0);
          background: #ffffff;
          color: var(--ink, #1C1C1C);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .slider-nav-btn:hover:not(.disabled) {
          background: var(--teal, #1C5C53);
          color: #ffffff;
          border-color: var(--teal, #1C5C53);
          transform: scale(1.06);
          box-shadow: 0 4px 14px rgba(28, 92, 83, 0.25);
        }

        .slider-nav-btn.disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        .categories-slider-track {
          display: flex;
          gap: 28px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          padding: 10px 4px 20px;
        }

        .categories-slider-track::-webkit-scrollbar {
          display: none;
        }

        /* ===== CIRCULAR CATEGORY CARD ===== */
        .cat-circle-card {
          flex: 0 0 calc(33.333% - 18px);
          min-width: 250px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
          scroll-snap-align: start;
          gap: 16px;
          transition: transform 0.3s ease;
          outline: none;
        }

        .cat-circle-img-wrap {
          width: 230px;
          height: 230px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          border: 5px solid #ffffff;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1), 0 3px 8px rgba(0, 0, 0, 0.05);
          background-color: var(--bg-neutral, #F4F3F0);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, border-color 0.3s ease;
        }

        .cat-circle-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .cat-circle-card:hover .cat-circle-img-wrap {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 36px rgba(28, 92, 83, 0.25), 0 6px 14px rgba(0, 0, 0, 0.08);
          border-color: var(--teal, #1C5C53);
        }

        .cat-circle-card:hover .cat-circle-img-wrap img {
          transform: scale(1.1);
        }

        .cat-circle-label {
          font-family: var(--font);
          font-size: 17px;
          font-weight: 700;
          color: var(--ink, #1C1C1C);
          line-height: 1.35;
          max-width: 220px;
          text-align: center;
          transition: color 0.2s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cat-circle-card:hover .cat-circle-label {
          color: var(--teal, #1C5C53);
        }

        /* --- Responsive Breakpoints --- */

        @media (max-width: 900px) {
          .cat-circle-card {
            flex: 0 0 220px;
            min-width: 200px;
            gap: 14px;
          }
          .cat-circle-img-wrap {
            width: 190px;
            height: 190px;
          }
          .cat-circle-label {
            font-size: 15px;
            max-width: 190px;
          }
          .desktop-desc {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .categories-section {
            padding: 30px 0 40px !important;
          }
          .cat-header-row {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-end !important;
            margin-bottom: 20px !important;
            gap: 12px !important;
          }
          .section-intro__left {
            flex: 1 !important;
            text-align: left !important;
          }
          .cat-header-row .eyebrow {
            font-size: 12px !important;
            letter-spacing: 1.2px !important;
            margin-bottom: 3px !important;
            display: block !important;
            text-align: left !important;
          }
          .cat-header-row .section-h2 {
            font-size: 22px !important;
            line-height: 1.2 !important;
            text-align: left !important;
          }
          .slider-nav-btns {
            gap: 8px !important;
          }
          .slider-nav-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .slider-nav-btn svg {
            width: 18px !important;
            height: 18px !important;
          }
          .categories-slider-track {
            gap: 20px !important;
            padding: 8px 4px 16px !important;
          }
          .cat-circle-card {
            flex: 0 0 68% !important;
            min-width: 210px !important;
            gap: 12px !important;
          }
          .cat-circle-img-wrap {
            width: 190px !important;
            height: 190px !important;
            border-width: 4px !important;
          }
          .cat-circle-label {
            font-size: 15px !important;
            max-width: 190px !important;
            line-height: 1.35 !important;
            font-weight: 700 !important;
          }
        }
      `}} />
    </section>
  );
}
