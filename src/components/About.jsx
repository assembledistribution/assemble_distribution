'use client';

import React from 'react';

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
              alt="Elegant interior dining room showcasing Luxor's design philosophy"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="about__text">
            <span className="eyebrow">About Us</span>
            <h2 className="about__h2" id="about-heading">
              Turning Houses into Homes,<br />One Design at a Time
            </h2>
            <p className="about__p">
              At Luxor, we believe every space tells a story. Our team of passionate
              designers and architects brings together decades of expertise to create
              interiors that are as functional as they are beautiful.
            </p>
            <p className="about__p">
              From the first consultation to the final reveal, we guide you through
              every decision — ensuring your home reflects who you are and how you
              live. Our warm, neutral aesthetic is rooted in timeless design principles
              that endure long after trends have faded.
            </p>
            <button
              className="btn btn--solid"
              id="about-learn-more-btn"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
