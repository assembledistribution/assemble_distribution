'use client';

import React, { useState } from 'react';

const testimonials = [
  {
    id: 'testimonial-1',
    img: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&q=80&auto=format&fit=crop',
    quote:
      '"Luxor completely transformed our home. The attention to detail, the warm materials, the careful curation of every piece — we couldn\'t be happier."',
    name: 'Sarah & James Mitchell',
    role: 'Homeowners, New York',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&faces=true',
  },
  {
    id: 'testimonial-2',
    img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80&auto=format&fit=crop',
    quote:
      '"From the first sketch to the final reveal, the Luxor team made every step feel effortless. Our living room now feels like a page from a design magazine."',
    name: 'Priya Nair',
    role: 'Client, San Francisco',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop',
  },
  {
    id: 'testimonial-3',
    img: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=600&q=80&auto=format&fit=crop',
    quote:
      '"Exceptional service, incredible creativity, and a team that truly listened. Luxor turned our empty apartment into something I\'m proud to come home to."',
    name: 'Marcus Chen',
    role: 'Client, Chicago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop',
  },
  {
    id: 'testimonial-4',
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80&auto=format&fit=crop',
    quote:
      '"I gave Luxor a vague brief and they delivered beyond my imagination. Professional, creative, and wonderfully on budget."',
    name: 'Olivia Hart',
    role: 'Client, London',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const visible = testimonials.slice(startIndex, startIndex + 2);

  const handlePrev = () => {
    setStartIndex((i) => Math.max(0, i - 2));
  };

  const handleNext = () => {
    setStartIndex((i) => Math.min(testimonials.length - 2, i + 2));
  };

  return (
    <section className="section section--cream" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="testimonials__header">
          <h2 className="section-h2" id="testimonials-heading">
            Client feedback on our project
          </h2>
          <div className="testimonials__nav" aria-label="Testimonials navigation">
            <button
              className="testimonials__nav-btn"
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous testimonials"
              id="testimonials-prev-btn"
            >
              ←
            </button>
            <button
              className="testimonials__nav-btn"
              onClick={handleNext}
              disabled={startIndex >= testimonials.length - 2}
              aria-label="Next testimonials"
              id="testimonials-next-btn"
            >
              →
            </button>
          </div>
        </div>

        <div className="testimonials__grid">
          {visible.map((t) => (
            <article className="testimonial-card" key={t.id} id={t.id}>
              <img
                className="testimonial-card__img"
                src={t.img}
                alt={`Project showcased for ${t.name}`}
                loading="lazy"
              />
              <div className="testimonial-card__body">
                <p className="testimonial-card__quote">{t.quote}</p>
                <div className="testimonial-card__reviewer">
                  <img
                    className="testimonial-card__avatar"
                    src={t.avatar}
                    alt={`Avatar of ${t.name}`}
                    loading="lazy"
                  />
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
