'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

import { ShoppingCart, Search, Heart } from 'lucide-react';
import Logo from '@/components/Logo';

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
    <nav className="navbar" role="navigation" aria-label="Main navigation">
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
            Sign Up For Distributor
          </Link>

          <div style={{ position: 'relative' }} ref={searchRef}>
            <button 
              className="navbar__cart" 
              aria-label="Search" 
              id="navbar-search-btn" 
              title="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="8" cy="8" r="5.5"/><line x1="12" y1="12" x2="16" y2="16"/>
              </svg>
            </button>
            {searchOpen && (
              <form onSubmit={handleSearchSubmit} className="navbar__dropdown" style={{ right: 0, left: 'auto', padding: '12px', minWidth: '250px' }}>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', fontSize: '14px' }}
                  autoFocus
                />
              </form>
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
          Sign Up For Distributor
        </Link>
      </div>
    </nav>
  );
}
