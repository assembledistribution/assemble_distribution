import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero__card">
        <img
          className="hero__img"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Large warehouse with organized product shelves — Assemble Distribution"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content">
          <span className="hero__eyebrow">Welcome to</span>

          <h1 className="hero__h1" id="hero-heading">
            {/* Each word animates in with fold */}
            <span className="hero__fold hero__fold--1">Assemble</span>
            <br className="hero__br" />
            <span className="hero__fold hero__fold--2 hero__word--teal">Distribution</span>
          </h1>

          <p className="hero__sub hero__fold hero__fold--3">
            Your trusted wholesale distributor for Art, Craft &amp; Sewing,
            Toys &amp; Games, and Garden &amp; Outdoor products — delivered fast, priced right.
          </p>

          <Link href="/shop" className="btn btn--solid hero__fold hero__fold--4" id="hero-shop-btn">
            Shop Now ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
