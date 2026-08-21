import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '120px 20px 80px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink, #1C1C1C)', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--gray, #666)', marginBottom: '24px' }}>Could not find the requested page or resource.</p>
        <Link href="/" style={{ padding: '12px 28px', borderRadius: '10px', backgroundColor: 'var(--teal, #1C5C53)', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          Return Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
