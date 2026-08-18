import React from 'react';

const logos = [
  { id: 'brand-32degrees', src: '/brands/32-degreee.png', alt: '32 Degrees' },
  { id: 'brand-aurifil', src: '/brands/aurifill.png', alt: 'Aurifil' },
  { id: 'brand-beadalon', src: '/brands/beadalon_logo-2.png', alt: 'Beadalon' },
  { id: 'brand-bondhus', src: '/brands/bondhus.png', alt: 'Bondhus' },
  { id: 'brand-clover', src: '/brands/clover.png', alt: 'Clover' },
  { id: 'brand-electricquilt', src: '/brands/electric-quilt.png', alt: 'Electric Quilt' },
  { id: 'brand-fabriccafe', src: '/brands/fabric-cafe.avif', alt: 'Fabric Cafe' },
  { id: 'brand-generalpencil', src: '/brands/genral-pencil.webp', alt: 'General Pencil' },
  { id: 'brand-gildan', src: '/brands/gildan.png', alt: 'Gildan' },
  { id: 'brand-hachet', src: '/brands/hachet.png', alt: 'Hatchette' },
  { id: 'brand-honeywell', src: '/brands/honeywell.png', alt: 'Honeywell' },
  { id: 'brand-olfa', src: '/brands/olfa.avif', alt: 'Olfa' },
  { id: 'brand-pulse', src: '/brands/pulse.png', alt: 'Pulse' },
  { id: 'brand-shaka', src: '/brands/shaka.png', alt: 'Shaka Wear' },
  { id: 'brand-tulip', src: '/brands/tulip.jpg', alt: 'Tulip' },
  { id: 'brand-universitygames', src: '/brands/university-games.avif', alt: 'University Games' },
];

export default function LogoCarousel() {
  // Duplicate for seamless infinite loop
  const items = [...logos, ...logos];

  return (
    <section className="logo-carousel" aria-label="Our brand partners">
      <div className="logo-carousel__label">Trusted Brands</div>

      <div className="logo-carousel__track-wrap">
        {/* Fade edges */}
        <div className="logo-carousel__fade logo-carousel__fade--left" aria-hidden="true" />
        <div className="logo-carousel__fade logo-carousel__fade--right" aria-hidden="true" />

        {/* Scrolling track */}
        <div className="logo-carousel__track">
          {items.map((logo, i) => (
            <div
              className="logo-carousel__item"
              key={`${logo.id}-${i}`}
              id={i < logos.length ? logo.id : undefined}
            >
              <div className="logo-carousel__card" title={logo.alt}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="logo-carousel__img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

