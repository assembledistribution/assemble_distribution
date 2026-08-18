'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function OrderReceivedPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('designpro_last_order');
      if (saved) {
        setOrderDetails(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load order details:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="section" style={{ backgroundColor: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '18px', color: 'var(--gray)' }}>Loading order details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!orderDetails) {
    return (
      <>
        <Navbar />
        <main className="section" style={{ backgroundColor: 'var(--cream)', minHeight: '80vh', paddingTop: '60px' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: '#fff', padding: '60px 30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }}>
            <ShoppingBag size={48} color="var(--gray)" style={{ margin: '0 auto 20px' }} />
            <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '16px', color: 'var(--ink)' }}>No Order Found</h1>
            <p style={{ color: 'var(--gray)', marginBottom: '28px' }}>We couldn&apos;t find any recent order details. Please check your account or return to the shop.</p>
            <Link href="/shop" className="btn btn--solid" style={{ padding: '14px 32px' }}>
              Return to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="section" style={{ backgroundColor: 'var(--cream)', minHeight: '80vh', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          <div className="order-success-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} color="#1C5C53" />
            </div>
            <h1 className="success-title">Thank you. Your order has been received.</h1>
            <p className="success-subtitle">
              A confirmation email has been sent to <strong>{orderDetails.billing?.email || 'your email'}</strong>
            </p>

            {/* Order Meta Bar */}
            <div className="order-meta-grid">
              <div>
                <span>ORDER NUMBER:</span>
                <strong>{orderDetails.orderId}</strong>
              </div>
              <div>
                <span>DATE:</span>
                <strong>{orderDetails.date}</strong>
              </div>
              <div>
                <span>TOTAL:</span>
                <strong>${orderDetails.total?.toFixed(2)}</strong>
              </div>
              <div>
                <span>PAYMENT METHOD:</span>
                <strong style={{ textTransform: 'capitalize' }}>
                  {orderDetails.paymentMethod === 'wire' ? 'Wire Transfer' : orderDetails.paymentMethod === 'card' ? 'Credit Card' : 'Invoice Net 30'}
                </strong>
              </div>
            </div>

            {/* Order Details Table */}
            <div className="order-summary-box">
              <h3 className="summary-title">Order Details</h3>
              <div className="summary-table">
                <div className="summary-header-row">
                  <span>PRODUCT</span>
                  <span>TOTAL</span>
                </div>

                {orderDetails.items?.map((item, index) => (
                  <div className="summary-item-row" key={index}>
                    <span>
                      {item.title} {item.size ? `(${item.size})` : ''} <strong>× {item.quantity}</strong>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${orderDetails.subtotal?.toFixed(2)}</span>
                </div>

                {orderDetails.discount > 0 && (
                  <div className="summary-row" style={{ color: '#059669' }}>
                    <span>Discount:</span>
                    <span>-${orderDetails.discount?.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free shipping</span>
                </div>

                <div className="summary-row summary-total">
                  <span>Total:</span>
                  <span>${orderDetails.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Addresses Grid */}
            <div className="addresses-grid">
              <div className="address-box">
                <h3>Billing Address</h3>
                <p><strong>{orderDetails.billing?.firstName} {orderDetails.billing?.lastName}</strong></p>
                {orderDetails.billing?.company && <p>{orderDetails.billing.company}</p>}
                <p>{orderDetails.billing?.streetAddress1}</p>
                {orderDetails.billing?.streetAddress2 && <p>{orderDetails.billing.streetAddress2}</p>}
                <p>{orderDetails.billing?.city}, {orderDetails.billing?.state} {orderDetails.billing?.zip}</p>
                <p>{orderDetails.billing?.country}</p>
                <p style={{ marginTop: '8px' }}>📞 {orderDetails.billing?.phone}</p>
                <p>✉️ {orderDetails.billing?.email}</p>
              </div>

              <div className="address-box">
                <h3>Shipping Address</h3>
                <p><strong>{orderDetails.shipping?.firstName} {orderDetails.shipping?.lastName}</strong></p>
                {orderDetails.shipping?.company && <p>{orderDetails.shipping.company}</p>}
                <p>{orderDetails.shipping?.streetAddress1}</p>
                {orderDetails.shipping?.streetAddress2 && <p>{orderDetails.shipping.streetAddress2}</p>}
                <p>{orderDetails.shipping?.city}, {orderDetails.shipping?.state} {orderDetails.shipping?.zip}</p>
                <p>{orderDetails.shipping?.country}</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link href="/shop" className="btn btn--solid" style={{ padding: '14px 36px', fontSize: '15px' }}>
                Continue Shopping
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .order-success-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          padding: 50px 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }
        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(28, 92, 83, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .success-title {
          font-size: clamp(24px, 4vw, 30px);
          font-weight: 700;
          color: var(--ink);
          text-align: center;
          margin-bottom: 8px;
        }
        .success-subtitle {
          font-size: 15px;
          color: var(--gray);
          text-align: center;
          margin-bottom: 36px;
        }
        .order-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px;
          background: var(--bg-neutral);
          padding: 20px 24px;
          border-radius: var(--radius-md);
          border: 1px dashed var(--line);
          margin-bottom: 36px;
        }
        .order-meta-grid span {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: var(--gray);
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .order-meta-grid strong {
          font-size: 15px;
          color: var(--ink);
        }
        .summary-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .summary-table {
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 36px;
        }
        .summary-header-row, .summary-item-row, .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          font-size: 14px;
          border-bottom: 1px solid var(--line);
        }
        .summary-header-row {
          background: var(--bg-neutral);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--ink);
        }
        .summary-total {
          font-weight: 700;
          font-size: 18px;
          color: var(--teal);
          border-bottom: none;
          background: var(--cream);
        }
        .addresses-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .address-box {
          background: var(--bg-neutral);
          padding: 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--line);
        }
        .address-box h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--ink);
        }
        .address-box p {
          font-size: 14px;
          color: var(--gray);
          line-height: 1.6;
        }
        @media(max-width: 640px) {
          .order-success-card { padding: 30px 20px; }
          .addresses-grid { grid-template-columns: 1fr; }
        }
      ` }} />
    </>
  );
}
