'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import emailjs from '@emailjs/browser';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const formRef = useRef();
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YreWu9jrl7hIbkk2TXgyy';
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_89o9v1p';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'BwHsNp2ijQiXMWCYS';

    // Pass all common template variable aliases so any template works!
    const templateParams = {
      user_name: formData.user_name,
      from_name: formData.user_name,
      name: formData.user_name,

      user_email: formData.user_email,
      from_email: formData.user_email,
      email: formData.user_email,
      reply_to: formData.user_email,

      user_phone: phone,
      phone_number: phone,
      phone: phone,

      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(
        (response) => {
          setLoading(false);
          console.log('EmailJS Success:', response.status, response.text);
          setStatus({
            type: 'success',
            message: 'Thank you! Your message has been sent successfully. We will contact you shortly.',
          });
          setFormData({
            user_name: '',
            user_email: '',
            subject: '',
            message: ''
          });
          setPhone('');
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error Details:', error);
          const errorMsg = error?.text || error?.message || 'Check EmailJS Keys & Template settings';
          setStatus({
            type: 'error',
            message: `EmailJS Error: ${errorMsg}. Please verify your Service ID, Template ID & Public Key.`,
          });
        }
      );
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        {/* Header Section */}
        <section className="contact-header">
          <div className="container">
            <span className="eyebrow">Get In Touch</span>
            <h1 className="contact-title">We&apos;d love to hear from you.</h1>
            <p className="contact-subtitle">
              Have questions about our wholesale catalog, pricing, or orders? Send us a message below and our team will get back to you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content container">
          <div className="contact-grid">

            {/* Left Column: Information Card */}
            <div className="contact-info">
              <h2 className="info-heading">Contact Information</h2>
              <p className="info-desc">
                Fill out the form and our team will respond within 24 business hours.
              </p>

              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="info-label">Address</h4>
                    <p className="info-text">123 Business Avenue, Suite 400<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="info-label">Phone</h4>
                    <p className="info-text">+1 (555) 123-4567<br />Mon - Fri: 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="info-label">Email</h4>
                    <p className="info-text">support@designpro.com<br />sales@designpro.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="info-label">Working Hours</h4>
                    <p className="info-text">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday & Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: EmailJS Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="info-heading">Send us a Message</h2>

              {status.message && (
                <div className={`status-alert status-alert--${status.type}`}>
                  {status.type === 'success' ? (
                    <CheckCircle size={20} className="status-icon" />
                  ) : (
                    <AlertCircle size={20} className="status-icon" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">

                <div className="form-group">
                  <label htmlFor="user_name">Full Name *</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="user_email">Email Address *</label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* International Phone Input with All Countries & Auto-Formatting */}
                  <div className="form-group">
                    <label htmlFor="phone_input">Phone Number</label>
                    <div className="international-phone-container">
                      <PhoneInput
                        defaultCountry="us"
                        value={phone}
                        onChange={(phoneValue) => setPhone(phoneValue)}
                        className="custom-phone-input"
                        inputProps={{
                          id: 'phone_input',
                          placeholder: 'Enter phone number'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Wholesale Inquiry / Order Question"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your detailed message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn--solid submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spinner" /> Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .contact-page {
          background-color: var(--bg-neutral);
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .contact-header {
          padding: 80px 0 60px;
          text-align: center;
          background: #fff;
          border-bottom: 1px solid var(--line);
        }

        .contact-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .contact-subtitle {
          font-size: 16px;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-content {
          margin-top: -30px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 0;
          background: #fff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }

        .contact-info {
          background: var(--teal);
          color: #fff;
          padding: 50px 40px;
        }

        .info-heading {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: inherit;
        }

        .info-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.78);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .info-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-label {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .info-text {
          font-size: 13px;
          color: rgba(255,255,255,0.78);
          line-height: 1.6;
        }

        .contact-form-wrapper {
          padding: 50px 40px;
          background: #ffffff;
        }

        .contact-form-wrapper .info-heading {
          color: var(--ink);
          margin-bottom: 24px;
        }

        .status-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .status-alert--success {
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .status-alert--error {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .status-icon {
          flex-shrink: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: var(--bg-neutral);
          border: 1.5px solid var(--line);
          border-radius: var(--radius-sm);
          font-family: var(--font);
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--teal);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(28, 92, 83, 0.1);
        }

        /* ── International Phone Input Theme Overrides ── */
        .international-phone-container {
          width: 100%;
        }

        .custom-phone-input {
          display: flex !important;
          width: 100% !important;
        }

        .custom-phone-input .react-international-phone-country-selector-button {
          height: 47px !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-right: none !important;
          border-radius: var(--radius-sm) 0 0 var(--radius-sm) !important;
          padding: 0 12px !important;
          transition: border-color 0.2s, background 0.2s !important;
        }

        .custom-phone-input .react-international-phone-country-selector-button:hover {
          background: var(--cream) !important;
        }

        .custom-phone-input .react-international-phone-input {
          height: 47px !important;
          width: 100% !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0 !important;
          padding: 12px 16px !important;
          font-family: var(--font) !important;
          font-size: 14px !important;
          color: var(--ink) !important;
          outline: none !important;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s !important;
        }

        .custom-phone-input:focus-within .react-international-phone-country-selector-button,
        .custom-phone-input:focus-within .react-international-phone-input {
          border-color: var(--teal) !important;
          background: #ffffff !important;
        }

        .custom-phone-input:focus-within .react-international-phone-input {
          box-shadow: 0 0 0 3px rgba(28, 92, 83, 0.1) !important;
        }

        .react-international-phone-country-selector-dropdown {
          border-radius: var(--radius-md) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12) !important;
          border: 1px solid var(--line) !important;
          padding: 6px 0 !important;
          max-height: 260px !important;
          z-index: 300 !important;
        }

        .form-group textarea {
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 10px;
          border-radius: var(--radius-pill);
          background: var(--teal);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: var(--teal-dark);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-content {
            margin-top: 20px;
          }
          .contact-header {
            padding: 60px 0 40px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .contact-info, .contact-form-wrapper {
            padding: 36px 20px;
          }
        }
      `}} />
    </>
  );
}
