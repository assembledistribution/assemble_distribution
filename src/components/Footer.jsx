import React from 'react';
import Link from 'next/link';

import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        
        {/* Main 4-Column Clean Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo-wrap">
              <img
                src="/Assembledistribution_final_footer.png"
                alt="Assemble Distribution Logo"
                style={{
                  height: '56px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              />
            </div>
            <p className="footer-brand-tagline">
              Your trusted wholesale partner. Supplying premium products to businesses worldwide with transparency, quality assurance, and fast freight fulfillment.
            </p>
          </div>

          {/* Column 2: Shop Categories (2 balanced columns of 6) */}
          <div className="footer-col footer-col--categories">
            <h3 className="footer-heading">Shop Categories</h3>
            <div className="footer-cat-grid">
              <ul className="footer-links-list">
                <li><Link href="/shop" id="footer-link-all">All Products</Link></li>
                <li><Link href="/shop/art-craft" id="footer-link-art">Art, Craft &amp; Sewing</Link></li>
                <li><Link href="/shop/toys-games" id="footer-link-toys">Toys &amp; Games</Link></li>
                <li><Link href="/shop/garden-outdoor" id="footer-link-garden">Garden &amp; Outdoor</Link></li>
                <li><Link href="/shop/office-products" id="footer-link-office">Office Products</Link></li>
                <li><Link href="/shop/home-kitchen" id="footer-link-kitchen">Home &amp; Kitchen</Link></li>
              </ul>
              <ul className="footer-links-list">
                <li><Link href="/shop/health-household" id="footer-link-health">Health &amp; Household</Link></li>
                <li><Link href="/shop/tools-home-improvement" id="footer-link-tools">Tools &amp; Improvement</Link></li>
                <li><Link href="/shop/sports-outdoors" id="footer-link-sports">Sports &amp; Outdoors</Link></li>
                <li><Link href="/shop/industrial-scientific" id="footer-link-industrial">Industrial &amp; Scientific</Link></li>
                <li><Link href="/shop/automotive-parts-accessories" id="footer-link-auto">Automotive &amp; Parts</Link></li>
                <li><Link href="/shop/pet-supplies" id="footer-link-pets">Pet Supplies</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Company Links */}
          <div className="footer-col footer-col--company">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links-list">
              <li><Link href="/about" id="footer-link-about">About Us</Link></li>
              <li><Link href="/distributor-signup" id="footer-link-dist-signup">Become a Distributor</Link></li>
              <li><Link href="/contact" id="footer-link-contact">Contact Us</Link></li>
              <li><Link href="/terms" id="footer-link-terms">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" id="footer-link-privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Links */}
          <div className="footer-col footer-col--contact">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-links-list footer-contact-list">
              <li>
                <a href="mailto:support@assembledistribution.com" className="contact-item" id="footer-contact-email">
                  <Mail size={16} className="contact-icon" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <span>support@assembledistribution.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+18005550192" className="contact-item" id="footer-contact-phone">
                  <Phone size={16} className="contact-icon" style={{ marginRight: '10px', flexShrink: 0 }} />
                  <span>+1 (800) 555-0192</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Assemble Distribution. All rights reserved.
          </p>

          <div className="footer-legal-links">
            <Link href="/terms">Terms &amp; Conditions</Link>
            <span className="dot-sep">•</span>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .site-footer {
          background: #0f2c27;
          background: linear-gradient(180deg, #133932 0%, #0d2621 100%);
          color: #ffffff;
          padding: 60px 0 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font, sans-serif);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1.8fr 0.9fr 1.2fr;
          gap: 44px;
          padding-bottom: 44px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-wrap {
          margin-bottom: 16px;
        }

        .footer-brand-tagline {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          max-width: 290px;
        }

        .footer-heading {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #2dd4bf;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 24px;
          height: 2px;
          background: #2dd4bf;
          border-radius: 2px;
          opacity: 0.8;
        }

        .footer-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footer-links-list a {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-links-list a:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .footer-contact-list {
          gap: 16px;
        }

        .footer-contact-list .contact-item {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          line-height: 1.4;
          transition: all 0.2s ease;
        }

        .contact-icon {
          color: #2dd4bf;
          flex-shrink: 0;
        }

        .footer-contact-list .contact-item:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copyright {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-legal-links a {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-legal-links a:hover {
          color: #ffffff;
        }

        .dot-sep {
          color: rgba(255, 255, 255, 0.25);
          font-size: 10px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .site-footer {
            padding: 44px 0 20px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding-bottom: 32px;
          }
          .footer-cat-grid {
            gap: 14px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}} />
    </footer>
  );
}
