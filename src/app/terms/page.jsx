import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions — Assemble Distribution',
  description: 'Terms and Conditions for Assemble Distribution wholesale platform.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        {/* Header */}
        <section className="legal-header">
          <div className="container">
            <span className="eyebrow">Legal & Compliance</span>
            <h1 className="legal-title">Terms & Conditions</h1>
            <p className="legal-subtitle">
              Last updated: January 1, 2026. Please read these terms carefully before placing wholesale orders with Assemble Distribution.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="legal-content container">
          <div className="legal-card">
            
            <div className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using the Assemble Distribution website (the &quot;Site&quot;) and placing orders for wholesale products, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree with all of these Terms, you are prohibited from using the Site and our wholesale services.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Wholesale Account & Eligibility</h2>
              <p>
                Assemble Distribution sells exclusively to registered business entities, retailers, distributors, and authorized resale partners. To create a wholesale account or submit wholesale orders, you must provide valid business registration, tax identification numbers, and accurate account information.
              </p>
              <ul>
                <li>Accounts must be kept confidential by the account holder.</li>
                <li>You are responsible for all activities occurring under your account.</li>
                <li>We reserve the right to suspend or terminate accounts that violate our policies.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Pricing & Order Minimums</h2>
              <p>
                All prices listed on our portal are wholesale prices quoted in USD. Prices are subject to change without prior notice based on supplier costs or currency fluctuations.
              </p>
              <ul>
                <li>Minimum Order Quantities (MOQs) apply to specific product categories and items.</li>
                <li>Orders below the specified MOQs may be subject to additional handling fees or cancellation.</li>
                <li>Final pricing, including shipping and taxes, is calculated at checkout or confirmed via invoice.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Shipping, Freight & Delivery</h2>
              <p>
                We strive to process and dispatch wholesale orders within 2-4 business days. Delivery timelines vary based on shipping destination, freight carrier, and order volume.
              </p>
              <ul>
                <li>Risk of loss and title for items pass to you upon delivery to the carrier.</li>
                <li>Inspect all shipments upon delivery and report transit damage within 48 hours.</li>
                <li>International orders may be subject to customs duties, tariffs, and import taxes.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. Returns, Claims & Refunds</h2>
              <p>
                Due to the nature of wholesale transactions, returns are subject to pre-approval. Defective or incorrect items must be reported within 14 days of receipt.
              </p>
              <ul>
                <li>Approved returns must be in original, unopened packaging.</li>
                <li>Restocking fees (up to 15%) may apply for non-defective buyer-remorse returns.</li>
                <li>Refunds are processed to the original payment method or issued as store credit upon inspection.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>6. Intellectual Property</h2>
              <p>
                All trademarks, logos, product images, graphics, and written content on this Site are the property of Assemble Distribution or its brand partners. Unauthorized copying, distribution, or resale under false branding is strictly prohibited.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Limitation of Liability</h2>
              <p>
                Assemble Distribution shall not be liable for indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services, including lost profits or business interruption.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Governing Law & Contact</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States. For questions regarding these Terms, please contact us at:
              </p>
              <div className="legal-contact-box">
                <p><strong>Assemble Distribution Legal Team</strong></p>
                <p>Email: <a href="mailto:support@designpro.com">support@designpro.com</a></p>
                <p>Phone: +1 (800) 555-0192</p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .legal-page {
          background-color: var(--bg-neutral);
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .legal-header {
          padding: 80px 0 60px;
          text-align: center;
          background: #ffffff;
          border-bottom: 1px solid var(--line);
        }

        .legal-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .legal-subtitle {
          font-size: 15px;
          color: var(--gray);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .legal-content {
          margin-top: -30px;
          max-width: 900px;
        }

        .legal-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          padding: 50px 45px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .legal-section h2 {
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 14px;
          border-left: 4px solid var(--teal);
          padding-left: 12px;
        }

        .legal-section p {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.75;
          margin-bottom: 12px;
        }

        .legal-section ul {
          margin-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legal-section li {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
        }

        .legal-contact-box {
          background: var(--bg-neutral);
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-top: 14px;
        }

        .legal-contact-box p {
          margin-bottom: 6px;
          font-size: 14px;
        }

        .legal-contact-box a {
          color: var(--teal);
          font-weight: 600;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .legal-card {
            padding: 30px 20px;
          }
          .legal-header {
            padding: 60px 0 40px;
          }
        }
      `}} />
    </>
  );
}
