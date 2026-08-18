import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Brand */}
        <div>
          <div className="footer__logo" style={{ marginBottom: '16px' }}>
            <Logo height={42} light={true} />
          </div>
          <p className="footer__tagline">
            Your trusted wholesale partner. Supplying premium products to businesses worldwide with transparency and efficiency.
          </p>
        </div>

        {/* Menu links */}
        <div>
          <h3 className="footer__col-title">Shop</h3>
          <ul className="footer__links">
            <li><Link href="/shop" id="footer-link-all">All Products</Link></li>
            <li><Link href="/shop/art-craft" id="footer-link-art">Art & Craft</Link></li>
            <li><Link href="/shop/toys-games" id="footer-link-toys">Toys & Games</Link></li>
            <li><Link href="/shop/garden-outdoor" id="footer-link-garden">Garden & Outdoor</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="footer__col-title">Company</h3>
          <ul className="footer__links">
            <li><Link href="/about" id="footer-link-about">About Us</Link></li>
            <li><Link href="/contact" id="footer-link-contact">Contact</Link></li>
            <li><Link href="/terms" id="footer-link-terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy" id="footer-link-privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer__col-title">Contact</h3>
          <ul className="footer__links">
            <li><a href="mailto:support@designpro.com" id="footer-link-email">support@designpro.com</a></li>
            <li><a href="tel:+18005550192" id="footer-link-phone">+1 (800) 555-0192</a></li>
            <li><a href="#" id="footer-link-instagram">Instagram</a></li>
            <li><a href="#" id="footer-link-linkedin">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <p>© {new Date().getFullYear()} Assemble Distribution. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
