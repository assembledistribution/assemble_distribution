import React from 'react';

const galleryImages = [
  {
    id: 'gallery-featured',
    src: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80&auto=format&fit=crop',
    alt: 'Featured — open-plan living and dining room with warm wooden floors',
  },
  {
    id: 'gallery-col1-1',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop',
    alt: 'Bedroom with neutral linen bedding and soft pendant lights',
  },
  {
    id: 'gallery-col1-2',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80&auto=format&fit=crop',
    alt: 'Minimalist bathroom with stone tiles and floating vanity',
  },
  {
    id: 'gallery-col2-1',
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80&auto=format&fit=crop',
    alt: 'Cozy reading nook with built-in shelves and warm floor lamp',
  },
  {
    id: 'gallery-col2-2',
    src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80&auto=format&fit=crop',
    alt: 'Elegant kitchen with marble countertops and handleless cabinets',
  },
];

export default function Gallery() {
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-intro">
          <div className="section-intro__left">
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-h2" id="gallery-heading">Design Gallery</h2>
          </div>
          <p className="section-intro__right">
            Browse a curated selection of our most celebrated projects — each one a
            unique expression of style, craftsmanship, and thoughtful living.
          </p>
        </div>

        <div className="gallery__grid">
          {/* Featured tall image */}
          <div className="gallery__featured" id={galleryImages[0].id}>
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              loading="lazy"
            />
          </div>

          {/* Column 1 */}
          <div className="gallery__col">
            {galleryImages.slice(1, 3).map((img) => (
              <div className="gallery__thumb" key={img.id} id={img.id}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="gallery__col">
            {galleryImages.slice(3, 5).map((img) => (
              <div className="gallery__thumb" key={img.id} id={img.id}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
