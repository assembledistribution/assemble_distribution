import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        
        {/* Main 4-Column Balanced Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo-wrap">
              <Logo height={42} light={true} />
            </div>
            <p className="footer-brand-tagline">
              Your trusted USA wholesale distributor. Supplying retail stores, online sellers, and commercial businesses nationwide with verified inventory and volume pricing.
            </p>

            <div className="footer-trust-pill">
              <ShieldCheck size={16} className="trust-icon" />
              <span>Verified USA Wholesale Distributor</span>
            </div>

            <div className="footer-direct-contact">
              <a href="mailto:support@assembledistribution.com" className="contact-link">
                <Mail size={15} />
                <span>support@assembledistribution.com</span>
              </a>
              <a href="tel:+18005550192" className="contact-link">
                <Phone size={15} />
                <span>+1 (800) 555-0192</span>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Categories (Split into 2 balanced sub-columns) */}
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
              </ul>
            </div>
          </div>

          {/* Column 3: Company Links */}
          <div className="footer-col footer-col--company">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links-list">
              <li><Link href="/about" id="footer-link-about">About Us</Link></li>
              <li><Link href="/distributor-signup" id="footer-link-dist-signup">Become a Distributor</Link></li>
              <li><Link href="/contact" id="footer-link-contact">Contact &amp; Inquiries</Link></li>
              <li><Link href="/terms" id="footer-link-terms">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" id="footer-link-privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Support & Wholesale Application Card */}
          <div className="footer-col footer-col--support">
            <h3 className="footer-heading">Customer Support</h3>
            
            <div className="footer-support-card">
              <div className="support-info-item">
                <Clock size={15} className="support-icon" />
                <div>
                  <span className="support-label">Business Hours (EST)</span>
                  <p className="support-val">Mon – Fri: 9:00 AM – 5:00 PM</p>
                </div>
              </div>

              <div className="support-info-item">
                <MapPin size={15} className="support-icon" />
                <div>
                  <span className="support-label">Fulfillment Center</span>
                  <p className="support-val">123 Business Ave, New York, NY 10001</p>
                </div>
              </div>

              <Link href="/distributor-signup" className="footer-apply-btn">
                <span>Distributor Application</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Assemble Distribution. All rights reserved.
          </p>

          <div className="footer-bottom-meta">
            <span className="footer-region-badge">🇺🇸 United States (USD)</span>
            <div className="footer-legal-links">
              <Link href="/terms">Terms</Link>
              <span className="dot-sep">•</span>
              <Link href="/privacy">Privacy</Link>
              <span className="dot-sep">•</span>
              <Link href="/contact">Support</Link>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .site-footer {
          background: #0f2c27;
          background: linear-gradient(180deg, #133932 0%, #0d2621 100%);
          color: #ffffff;
          padding: 64px 0 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font, sans-serif);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1.6fr 0.9fr 1.2fr;
          gap: 36px;
          padding-bottom: 48px;
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
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 18px;
          max-width: 320px;
        }

        .footer-trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: var(--radius-pill, 30px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 12px;
          font-weight: 500;
          color: #a7f3d0;
          margin-bottom: 20px;
          width: fit-content;
        }

        .footer-trust-pill .trust-icon {
          color: #34d399;
          flex-shrink: 0;
        }

        .footer-direct-contact {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-link svg {
          color: #2dd4bf;
          flex-shrink: 0;
        }

        .contact-link:hover {
          color: #ffffff;
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
          width: 28px;
          height: 2px;
          background: #2dd4bf;
          border-radius: 2px;
          opacity: 0.8;
        }

        .footer-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
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

        .footer-support-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md, 12px);
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .support-info-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .support-icon {
          color: #2dd4bf;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .support-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 2px;
        }

        .support-val {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          line-height: 1.45;
        }

        .footer-apply-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: var(--radius-sm, 8px);
          background: rgba(45, 212, 191, 0.12);
          border: 1px solid rgba(45, 212, 191, 0.3);
          color: #2dd4bf;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-top: 4px;
        }

        .footer-apply-btn:hover {
          background: #2dd4bf;
          color: #0d2621;
          border-color: #2dd4bf;
          transform: translateY(-1px);
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
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

        .footer-bottom-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-region-badge {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
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
        @media (max-width: 1080px) {
          .footer-grid {
            grid-template-columns: 1.2fr 1.4fr 1fr;
            gap: 30px;
          }
          .footer-col--support {
            grid-column: 1 / -1;
            max-width: 480px;
          }
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 48px 0 24px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            padding-bottom: 36px;
          }
          .footer-cat-grid {
            gap: 16px;
          }
          .footer-col--support {
            max-width: 100%;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}} />
    </footer>
  );
}
