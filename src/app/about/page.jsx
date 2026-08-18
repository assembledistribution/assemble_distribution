import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';

export const metadata = {
  title: 'Our Story — Assemble Distribution',
  description: 'Learn about Assemble Distribution — our story, values, and commitment to delivering quality wholesale products.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        {/* Prominent Header Section */}
        <section className="about-header" style={{ padding: '70px 0 50px', textAlign: 'center', background: '#ffffff', borderBottom: '1px solid var(--line)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <span className="eyebrow" style={{ marginBottom: '12px', display: 'inline-block' }}>About Assemble Distribution</span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: '800', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '-1px', lineHeight: '1.1' }}>
              Our Story
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--gray)', lineHeight: '1.65', maxWidth: '640px', margin: '0 auto' }}>
              Connecting retailers and businesses with trusted wholesale suppliers, delivering quality products worldwide with transparency, speed, and care.
            </p>
          </div>
        </section>

        {/* Main Grid Section */}
        <section className="section section--cream">
          <div className="container">
            <div className="about__grid">
              <div className="about__text">
                <span className="eyebrow">The Journey</span>
                <h2 className="about__h2">Driven by quality. Defined by trust.</h2>
                <p className="about__p">
                  Since our inception, we have been obsessed with sourcing only the highest quality products. We understand that our retail partners rely on us to stock their shelves with items that their customers will love, which is why we rigorously vet every manufacturer we work with.
                </p>
                <p className="about__p">
                  But it&apos;s not just about the products. It&apos;s about the technology. We built this platform from the ground up to eliminate the friction typically associated with B2B purchasing. From real-time inventory tracking to flexible bulk pricing, everything is designed to make your business run smoother.
                </p>
                <Link href="/shop" className="btn btn--solid">Explore Our Products</Link>
              </div>

              <div className="about__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop"
                  alt="Our collaborative team"
                  className="about__img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Animated Counter Stats Section */}
        <Stats />

      </main>

      <Footer />
    </>
  );
}
