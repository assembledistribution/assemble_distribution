import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';

export const metadata = {
  title: 'About Us | USA B2B Wholesale Distribution',
  description:
    'Learn about Assemble Distribution — our story, manufacturer vetting standards, and commitment to supplying USA retail businesses with dependable wholesale merchandise.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Assemble Distribution — USA Wholesale Partner',
    description: 'Connecting USA retailers and businesses with direct wholesale inventory, fast freight logistics, and verified manufacturer supply.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        {/* Prominent Header Section */}
        <section className="about-header" style={{ padding: '70px 0 50px', textAlign: 'center', background: '#ffffff', borderBottom: '1px solid var(--line)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <span className="eyebrow" style={{ marginBottom: '12px' }}>About Assemble Distribution</span>
            <h1 style={{ 
              fontSize: 'clamp(40px, 6vw, 60px)', 
              fontWeight: '800', 
              letterSpacing: '-1px', 
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #111827 0%, #1c3d37 40%, #2a9d8f 60%, #111827 100%)',
              backgroundSize: '250% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px', 
              display: 'inline-block',
              animation: 'textShine 7s ease-in-out infinite alternate, luxuryTitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' 
            }}>
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
                <span className="eyebrow">Our Mission</span>
                <h2 className="about__h2">Direct manufacturer sourcing. Reliable wholesale supply.</h2>
                <p className="about__p">
                  Assemble Distribution was founded to give retailers, online sellers, and regional shops a dependable source for high-demand wholesale inventory. We work directly with certified manufacturers to keep our catalog authentic, in-stock, and priced for healthy retail margins.
                </p>
                <p className="about__p">
                  We focus on the operational details that matter most to business buyers: straightforward bulk order processing, accurate dispatch timelines, and responsive account support. From single carton orders to full pallet shipments, we keep your inventory moving without unexpected delays.
                </p>
                <Link href="/shop" className="btn btn--solid">Explore Wholesale Catalog</Link>
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
