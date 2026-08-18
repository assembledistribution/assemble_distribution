import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Assemble Distribution',
  description: 'Privacy Policy for Assemble Distribution wholesale platform.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="legal-page">
        {/* Header */}
        <section className="legal-header">
          <div className="container">
            <span className="eyebrow">Legal & Compliance</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-subtitle">
              Last updated: January 1, 2026. This policy outlines how Assemble Distribution collects, uses, and safeguards your business information.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="legal-content container">
          <div className="legal-card">
            
            <div className="legal-section">
              <h2>1. Overview & Commitment</h2>
              <p>
                Assemble Distribution (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects the privacy of our wholesale partners, clients, and website visitors. This Privacy Policy describes the personal and business information we collect, how it is processed, and the measures we take to keep your data secure.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>
                When you register a wholesale account, request quotes, or place orders through our platform, we collect the following types of information:
              </p>
              <ul>
                <li><strong>Contact Information:</strong> Full name, business email address, phone number, and physical mailing address.</li>
                <li><strong>Business Credentials:</strong> Company name, tax ID / EIN, retail permit, and shipping warehouse details.</li>
                <li><strong>Transaction Data:</strong> Order history, billing details, payment confirmations, and communication records.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device identifiers, and site usage telemetry.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>
                We use collected information solely for legitimate business operations and fulfilling wholesale services:
              </p>
              <ul>
                <li>Processing and fulfilling wholesale orders and shipping logistics.</li>
                <li>Verifying reseller credentials and wholesale distributor eligibility.</li>
                <li>Sending order confirmations, tracking details, and invoice statements.</li>
                <li>Responding to inquiries submitted via our contact forms.</li>
                <li>Improving site security, preventing fraudulent transactions, and maintaining system integrity.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Information Sharing & Third Parties</h2>
              <p>
                We do not sell, rent, or trade your personal or business data to third-party marketers. We share information only with trusted service providers essential for delivering our services:
              </p>
              <ul>
                <li>Freight carriers and logistics partners for shipping delivery.</li>
                <li>Secure payment processors for handling transaction clearing.</li>
                <li>Cloud infrastructure and database service providers.</li>
                <li>Legal or regulatory authorities if required by law or official subpoena.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. Data Security & Storage</h2>
              <p>
                We implement industry-standard administrative, technical, and physical security controls to safeguard your data. Encrypted connections (SSL/TLS) protect data transmitted over the Internet, and sensitive payment data is handled in compliance with PCI-DSS standards.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Cookies & Analytics</h2>
              <p>
                Our Site uses essential cookies to manage user sessions, shopping cart states, and security tokens. You can adjust your browser settings to decline non-essential cookies, though some features of the wholesale portal may function with reduced capability.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Your Privacy Rights</h2>
              <p>
                Depending on your location, you have rights regarding your personal information, including the right to request access, correction, or deletion of your data stored in our systems.
              </p>
              <div className="legal-contact-box">
                <p><strong>Assemble Distribution Privacy Office</strong></p>
                <p>Email: <a href="mailto:privacy@designpro.com">privacy@designpro.com</a></p>
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
