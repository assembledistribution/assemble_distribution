'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <section className="section section--cream" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__grid">
          {/* Image */}
          <div className="about__img-wrap">
            <img
              className="about__img"
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=900&q=85&auto=format&fit=crop"
              alt="Assemble Distribution warehouse and logistics team"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="about__text">
            <span className="eyebrow">About Us</span>
            <h2 className="about__h2" id="about-heading">
              Direct Wholesale Sourcing,<br />Dependable Distribution
            </h2>
            <p className="about__p">
              At Assemble Distribution, we supply retail stores, e-commerce businesses,
              and commercial partners with verified inventory across top product categories.
              We work directly with manufacturers to ensure consistent stock and reliable wholesale pricing.
            </p>
            <p className="about__p">
              From automated order processing to freight fulfillment, we make bulk purchasing
              straightforward and dependable. Our team manages inventory quality and dispatch
              schedules so your business stays stocked without supply chain surprises.
            </p>
            <button
              className="btn btn--solid"
              id="about-learn-more-btn"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Catalog <ArrowUpRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
