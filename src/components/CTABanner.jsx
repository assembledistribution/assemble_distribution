import React from 'react';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <div className="cta-banner" id="contact">
      <div className="cta-banner__card">
        <img
          className="cta-banner__img"
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85&auto=format&fit=crop"
          alt="Assemble Distribution warehouse and logistics operations"
          loading="lazy"
        />
        <div className="cta-banner__overlay" aria-hidden="true" />
        <div className="cta-banner__content">
          <h2 className="cta-banner__h2">
            Become a Distributor<br />Partner Today
          </h2>
          <p className="cta-banner__p">
            Join hundreds of retailers who trust Assemble Distribution for
            reliable wholesale supply across Art, Craft &amp; Sewing, Toys &amp; Games,
            and Garden &amp; Outdoor categories.
          </p>
          <div className="cta-banner__buttons">
            <Link href="/distributor-signup" className="btn btn--solid btn--slide" id="cta-distributor-btn">
              <span className="btn__slide-bg" aria-hidden="true">
                <span className="btn__slide-bg-inner"></span>
              </span>
              <span className="btn__slide-txt-default">Sign Up For Distributor ↗</span>
              <span className="btn__slide-txt-hover">Apply Now ↗</span>
            </Link>
            <Link href="/contact" className="btn btn--outline" id="cta-contact-btn">
              Call us: +1 (800) 555-0192 ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
