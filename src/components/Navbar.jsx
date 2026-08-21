'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

import { ShoppingCart, Search, Heart, X, ArrowRight, Package } from 'lucide-react';
import Logo from '@/components/Logo';
import { useProducts } from '@/context/ProductContext';

const categories = [
  { id: 'art-craft', label: 'Art, Craft and Sewing' },
  { id: 'toys-games', label: 'Toys and Games' },
  { id: 'garden-outdoor', label: 'Garden and Outdoor' },
  { id: 'office-products', label: 'Office Products' },
  { id: 'home-kitchen', label: 'Home and Kitchen' },
  { id: 'health-household', label: 'Health and Household' },
  { id: 'tools-home-improvement', label: 'Tools and Home Improvement' },
  { id: 'sports-outdoors', label: 'Sports and Outdoors' },
  { id: 'industrial-scientific', label: 'Industrial and Scientific' },
  { id: 'automotive-parts-accessories', label: 'Automotive Parts and Accessories' },
];

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { products } = useProducts();

  // Instant As-You-Type Live Search Filter
  const qClean = searchQuery.toLowerCase().trim();
  const liveSearchResults = qClean
    ? (products || []).filter(p => {
        return (
          p.title?.toLowerCase().includes(qClean) ||
          p.category?.toLowerCase().includes(qClean) ||
          p.asin?.toLowerCase().includes(qClean) ||
          p.description?.toLowerCase().includes(qClean)
        );
      }).slice(0, 5)
    : [];

  const totalMatches = qClean
    ? (products || []).filter(p => {
        return (
          p.title?.toLowerCase().includes(qClean) ||
          p.category?.toLowerCase().includes(qClean) ||
          p.asin?.toLowerCase().includes(qClean) ||
          p.description?.toLowerCase().includes(qClean)
        );
      }).length
    : 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShopOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  // Dynamic scrolled header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileShopOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">

        {/* ── Logo ── */}
        <Link href="/" className="navbar__logo" aria-label="Assemble Distribution home" id="navbar-logo">
          <Logo height={46} />
        </Link>

        {/* ── Center: Nav Links pill (desktop) ── */}
        <div className="navbar__links-wrap">

          <Link href="/" className="navbar__link" id="nav-home">Home</Link>

          {/* Shop + dropdown */}
          <div className="navbar__dropdown-wrap" ref={dropdownRef}>
            <button
              className="navbar__link"
              onClick={() => setShopOpen((o) => !o)}
              aria-expanded={shopOpen}
              aria-haspopup="true"
              id="nav-shop"
            >
              Shop ▾
            </button>

            {shopOpen && (
              <div className="navbar__dropdown" role="menu">
                <Link
                  href="/shop"
                  className="navbar__dropdown-item"
                  role="menuitem"
                  id="nav-category-all"
                  onClick={() => setShopOpen(false)}
                >
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.id}`}
                    className="navbar__dropdown-item"
                    role="menuitem"
                    id={`nav-category-${cat.id}`}
                    onClick={() => setShopOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/shop" className="navbar__link" id="nav-new-arrivals">New Arrivals</Link>
          <Link href="/about" className="navbar__link" id="nav-about">About Us</Link>
          <Link href="/contact" className="navbar__link" id="nav-contact">Contact</Link>

        </div>

        {/* ── Right: Distributor + Search + Cart (desktop) ── */}
        <div className="navbar__right">
          <Link href="/distributor-signup" className="navbar__cta navbar__cta--desktop" id="navbar-distributor-btn">
            <span className="navbar__cta-bg" aria-hidden="true">
              <span className="navbar__cta-bg-inner"></span>
            </span>
            <span className="navbar__cta-txt-default">Sign Up For Distributor</span>
            <span className="navbar__cta-txt-hover">Apply Now ↗</span>
          </Link>

          <div style={{ position: 'relative' }} ref={searchRef}>
            <button 
              className={`navbar__cart ${searchOpen ? 'navbar__cart--active' : ''}`}
              aria-label="Search" 
              id="navbar-search-btn" 
              title="Search products..."
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? (
                <X size={18} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5"/><line x1="12" y1="12" x2="16" y2="16"/>
                </svg>
              )}
            </button>

            {searchOpen && (
              <div className="navbar__live-search-dropdown" style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                width: '380px',
                maxWidth: '90vw',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--line, #E7E5E0)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.05)',
                zIndex: 350,
                padding: '14px',
                animation: 'luxuryDropdownIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both'
              }}>
                <form onSubmit={handleSearchSubmit} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--gray, #6B6F6E)', pointerEvents: 'none' }} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by title or category..." 
                    style={{
                      width: '100%',
                      padding: '11px 36px 11px 36px',
                      borderRadius: '10px',
                      border: '1.5px solid var(--line, #E7E5E0)',
                      outline: 'none',
                      fontSize: '13.5px',
                      backgroundColor: 'var(--cream, #FBFAF8)',
                      color: 'var(--ink, #1C1C1C)',
                      transition: 'border-color 0.2s ease'
                    }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--gray)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px'
                      }}
                      aria-label="Clear"
                    >
                      <X size={14} />
                    </button>
                  )}
                </form>

                {/* Instant Live Results List */}
                {searchQuery.trim() !== '' && (
                  <div style={{ marginTop: '12px', borderTop: '1px solid var(--line, #E7E5E0)', paddingTop: '10px' }}>
                    {liveSearchResults.length > 0 ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--gray, #6B6F6E)', fontWeight: '600', marginBottom: '8px', padding: '0 4px' }}>
                          <span>MATCHING PRODUCTS ({totalMatches})</span>
                          <span style={{ color: 'var(--teal, #1C5C53)' }}>Live Result</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
                          {liveSearchResults.map((prod) => (
                            <Link
                              key={prod.id || prod._id}
                              href={`/product/${prod.id || prod._id}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery('');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 10px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: 'var(--ink, #1C1C1C)',
                                transition: 'background-color 0.15s ease',
                                backgroundColor: 'transparent'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f2f0'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: 'var(--bg-neutral, #F4F3F0)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--line, #E7E5E0)' }}>
                                {prod.imageUrl ? (
                                  <img src={prod.imageUrl} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>
                                    <Package size={18} />
                                  </div>
                                )}
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--ink, #1C1C1C)' }}>
                                  {prod.title}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '11.5px' }}>
                                  <span style={{ color: 'var(--teal, #1C5C53)', fontWeight: '700' }}>
                                    ${prod.price ? Number(prod.price).toFixed(2) : '0.00'}
                                  </span>
                                  <span style={{ color: 'var(--gray, #6B6F6E)', textTransform: 'capitalize' }}>
                                    • {prod.category?.replace(/-/g, ' ')}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          style={{
                            width: '100%',
                            marginTop: '10px',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: 'var(--teal, #1C5C53)',
                            color: '#ffffff',
                            fontWeight: '600',
                            fontSize: '12.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          View all {totalMatches} results in Shop <ArrowRight size={13} />
                        </button>
                      </>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px 10px', color: 'var(--gray, #6B6F6E)' }}>
                        <Search size={22} style={{ opacity: 0.3, marginBottom: '6px' }} />
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>No products found for &quot;{searchQuery}&quot;</div>
                        <div style={{ fontSize: '11.5px', marginTop: '3px' }}>Try searching by category or keywords</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Favorite Icon — only appears when user has favorites */}
          {favoritesCount > 0 && (
            <Link 
              href="/favorites" 
              className="navbar__cart navbar__favorite-btn" 
              aria-label="Favorite items" 
              id="navbar-favorites-btn" 
              title="My Favorites" 
              style={{ position: 'relative', color: '#ef4444', animation: 'heartPop 0.3s ease' }}
            >
              <Heart size={20} fill="#ef4444" color="#ef4444" />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)' }}>
                {favoritesCount}
              </span>
            </Link>
          )}

          <Link href="/cart" className="navbar__cart" aria-label="Shopping cart" id="navbar-cart-btn" title="Shopping Cart" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--teal)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger — visible on mobile/tablet */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            id="navbar-hamburger"
          >
            <span className={`navbar__hamburger-icon ${mobileOpen ? 'navbar__hamburger-icon--open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} aria-label="Mobile navigation">

        {/* Mobile Instant Live Search Bar */}
        <div style={{ marginBottom: '14px', paddingTop: '4px' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(e); closeMobile(); }} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--gray, #6B6F6E)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products instantly..."
              style={{
                width: '100%',
                padding: '10px 36px 10px 36px',
                borderRadius: '8px',
                border: '1.5px solid var(--line, #E7E5E0)',
                outline: 'none',
                fontSize: '13.5px',
                backgroundColor: 'var(--cream, #FBFAF8)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', background: 'transparent', border: 'none', color: 'var(--gray)', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Mobile Instant Live Results (updates on every single letter) */}
          {searchQuery.trim() !== '' && (
            <div style={{ marginTop: '8px', maxHeight: '200px', overflowY: 'auto', backgroundColor: 'var(--cream, #FBFAF8)', borderRadius: '8px', border: '1px solid var(--line, #E7E5E0)', padding: '6px' }}>
              {liveSearchResults.map(prod => (
                <Link
                  key={prod.id || prod._id}
                  href={`/product/${prod.id || prod._id}`}
                  onClick={closeMobile}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: 'var(--ink, #1C1C1C)',
                    borderBottom: '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#fff', flexShrink: 0 }}>
                    {prod.imageUrl ? (
                      <img src={prod.imageUrl} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Package size={16} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {prod.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--teal, #1C5C53)', fontWeight: '700' }}>
                      ${prod.price ? Number(prod.price).toFixed(2) : '0.00'}
                    </div>
                  </div>
                </Link>
              ))}
              {liveSearchResults.length === 0 && (
                <div style={{ padding: '10px', fontSize: '12px', color: 'var(--gray)', textAlign: 'center' }}>
                  No matches for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        <Link href="/" className="navbar__mobile-link" onClick={closeMobile} id="mobile-home">Home</Link>

        {/* Shop with sub-links */}
        <div className="navbar__mobile-group">
          <button
            className="navbar__mobile-link navbar__mobile-link--toggle"
            onClick={() => setMobileShopOpen((o) => !o)}
            aria-expanded={mobileShopOpen}
            id="mobile-shop"
          >
            Shop
            <span className={`navbar__mobile-chevron ${mobileShopOpen ? 'navbar__mobile-chevron--open' : ''}`}>▾</span>
          </button>
          {mobileShopOpen && (
            <div className="navbar__mobile-sub">
              <Link
                href="/shop"
                className="navbar__mobile-sublink"
                onClick={closeMobile}
                id="mobile-cat-all"
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.id}`}
                  className="navbar__mobile-sublink"
                  onClick={closeMobile}
                  id={`mobile-cat-${cat.id}`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/shop" className="navbar__mobile-link" onClick={closeMobile} id="mobile-new-arrivals">New Arrivals</Link>
        <Link href="/about" className="navbar__mobile-link" onClick={closeMobile} id="mobile-about">About Us</Link>
        <Link href="/contact" className="navbar__mobile-link" onClick={closeMobile} id="mobile-contact">Contact</Link>


        {/* Utilities row */}
        <div className="navbar__mobile-utils">
          <button className="navbar__cart" aria-label="Search" id="mobile-search-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="8" cy="8" r="5.5"/><line x1="12" y1="12" x2="16" y2="16"/>
            </svg>
          </button>
          {/* Mobile Favorite Icon */}
          {favoritesCount > 0 && (
            <Link 
              href="/favorites" 
              className="navbar__cart" 
              aria-label="Favorites" 
              id="mobile-favorites-btn" 
              onClick={closeMobile} 
              style={{ position: 'relative', color: '#ef4444' }}
            >
              <Heart size={20} fill="#ef4444" color="#ef4444" />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                {favoritesCount}
              </span>
            </Link>
          )}

          <Link href="/cart" className="navbar__cart" aria-label="Cart" id="mobile-cart-btn" onClick={closeMobile} style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--teal)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <Link href="/distributor-signup" className="navbar__cta navbar__cta--mobile" onClick={closeMobile} id="mobile-distributor-btn">
          <span className="navbar__cta-bg" aria-hidden="true">
            <span className="navbar__cta-bg-inner"></span>
          </span>
          <span className="navbar__cta-txt-default">Sign Up For Distributor</span>
          <span className="navbar__cta-txt-hover">Apply Now ↗</span>
        </Link>
      </div>
    </nav>
  );
}
