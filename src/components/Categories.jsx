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
    img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&q=80&auto=format&fit=crop',
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
      const cardWidth = container.querySelector('.cat-card')?.offsetWidth || 280;
      const scrollAmount = cardWidth + 16; // card width + gap
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
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button"
                className={`slider-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next Category"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Track (Mobile & Desktop) */}
        <div className="categories-slider-track" ref={scrollRef}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              id={`cat-${cat.id}`}
              className="cat-card"
            >
              <img src={cat.img} alt={cat.alt} loading="lazy" />
              <div className="cat-bento__overlay" aria-hidden="true" />
              <span className="cat-bento__label">{cat.label}</span>
            </Link>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .categories-section {
          position: relative;
        }

        .cat-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          gap: 1.5rem;
        }

        .cat-header-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .desktop-desc {
          margin-bottom: 0 !important;
          max-width: 450px;
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
          border: 1px solid var(--line, #E7E5E0);
          background: white;
          color: var(--ink, #1C1C1C);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .slider-nav-btn:hover:not(.disabled) {
          background: var(--teal, #1C5C53);
          color: white;
          border-color: var(--teal, #1C5C53);
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(28, 92, 83, 0.25);
        }

        .slider-nav-btn.disabled {
          opacity: 0.35;
          cursor: not-allowed;
          box-shadow: none;
        }

        .categories-slider-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
        }

        .categories-slider-track::-webkit-scrollbar {
          display: none;
        }

        .cat-card {
          flex: 0 0 calc(33.333% - 14px);
          min-width: 260px;
          height: 340px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          scroll-snap-align: start;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }

        .cat-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .cat-card:hover img {
          transform: scale(1.06);
        }

        /* --- Responsive Breakpoints --- */

        @media (max-width: 900px) {
          .cat-card {
            flex: 0 0 78%;
            min-width: 250px;
            height: 280px;
          }
          .desktop-desc {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .categories-section {
            padding: 20px 0 30px !important;
            margin-top: 10px;
          }
          .cat-header-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            gap: 8px;
          }
          .section-intro__left {
            flex: 1;
          }
          .cat-header-row .eyebrow {
            font-size: 10px;
            letter-spacing: 1px;
            margin-bottom: 2px;
          }
          .cat-header-row .section-h2 {
            font-size: 18px;
            margin-bottom: 0;
            line-height: 1.2;
          }
          .cat-header-nav {
            gap: 6px;
            flex-shrink: 0;
          }
          .slider-nav-btn {
            width: 30px;
            height: 30px;
            border-width: 1px;
          }
          .slider-nav-btn svg {
            width: 14px;
            height: 14px;
          }
          .categories-slider-track {
            gap: 12px;
          }
          .cat-card {
            flex: 0 0 65%;
            min-width: 190px;
            height: 280px;
            border-radius: 14px;
          }
          .cat-bento__label {
            font-size: 13px;
            bottom: 12px;
            left: 14px;
          }
        }
      `}} />
    </section>
  );
}
