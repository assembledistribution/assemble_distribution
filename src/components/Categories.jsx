import React from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 'art-craft',
    label: 'Art and Craft',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&auto=format&fit=crop',
    alt: 'Art and craft supplies — paints, brushes, tools',
  },
  {
    id: 'toys-games',
    label: 'Toys and Games',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Toys and games for all ages',
  },
  {
    id: 'garden-outdoor',
    label: 'Garden and Outdoor',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop',
    alt: 'Garden and outdoor tools and plants',
  },
];

export default function Categories() {
  return (
    <section className="section" id="services" aria-labelledby="categories-heading">
      <div className="container">

        {/* Header row */}
        <div className="section-intro">
          <div className="section-intro__left">
            <span className="eyebrow">Our Categories</span>
            <h2 className="section-h2" id="categories-heading">
              Shop by Category.
            </h2>
          </div>
          <p className="section-intro__right">
            From creative art supplies, exciting toys, to everything you need for the outdoors — browse our wide range of wholesale product categories.
          </p>
        </div>

        {/* 3 Grid cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              id={`cat-${cat.id}`}
              style={{
                position: 'relative',
                height: '320px',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none'
              }}
            >
              <img src={cat.img} alt={cat.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-bento__overlay" aria-hidden="true" />
              <span className="cat-bento__label">{cat.label}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
