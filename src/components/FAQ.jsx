'use client';

import React, { useState } from 'react';

const faqs = [
  {
    id: 'faq-1',
    question: 'What product categories does Assemble Distribution carry?',
    answer:
      'We carry 10 premier wholesale categories: Art, Craft and Sewing, Toys and Games, Garden and Outdoor, Office Products, Home and Kitchen, Health and Household, Tools and Home Improvement, Sports and Outdoors, Industrial and Scientific, and Automotive Parts and Accessories. Each category is sourced directly from trusted manufacturers with full quality assurance.',
  },
  {
    id: 'faq-2',
    question: 'How do I become a distributor or wholesale partner?',
    answer:
      'Simply click "Sign Up For Distributor" at the top of the page and fill out our partner application form. Our team reviews applications within 2–3 business days and will contact you with your account details, pricing tiers, and minimum order requirements.',
  },
  {
    id: 'faq-3',
    question: 'What are the minimum order quantities (MOQ)?',
    answer:
      'MOQs vary by product category and item. Generally, our minimum order starts at $250 per order. Bulk discounts are available for orders over $1,000, $5,000, and $10,000. Contact our sales team for category-specific MOQ details.',
  },
  {
    id: 'faq-4',
    question: 'How long does shipping and fulfillment take?',
    answer:
      'Standard orders are processed within 1–2 business days and ship within 3–7 business days depending on your location. Expedited shipping options are available at checkout. For large bulk orders, fulfillment timelines may vary — our team will confirm lead times at the time of order.',
  },
  {
    id: 'faq-5',
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to select international destinations. International shipping rates, duties, and estimated delivery times are calculated at checkout based on your location and order weight. Contact us for bulk international freight quotes.',
  },
  {
    id: 'faq-6',
    question: 'What is your return and exchange policy?',
    answer:
      'We accept returns on defective or incorrectly shipped items within 14 days of delivery. Items must be in original, unopened packaging. Custom or clearance items are non-returnable. Please contact our support team to initiate a return authorization before sending any items back.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState('faq-1');

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="section" id="pricing" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq">
          <div className="faq__heading">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-h2" id="faq-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <ul className="faq__list" role="list">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <li className="faq-item" key={faq.id} id={faq.id}>
                  <button
                    className="faq-item__trigger"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                  >
                    <span className="faq-item__question">{faq.question}</span>
                    <span
                      className={`faq-item__chevron${isOpen ? ' faq-item__chevron--open' : ''}`}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 6 8 10 12 6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`${faq.id}-answer`}
                    role="region"
                    className={`faq-item__answer${isOpen ? ' faq-item__answer--open' : ''}`}
                    aria-hidden={!isOpen}
                  >
                    <p className="faq-item__answer-inner">{faq.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
