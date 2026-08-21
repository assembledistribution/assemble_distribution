'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  ArrowLeft,
  Tag,
  CheckCircle2,
  Lock,
  CreditCard,
  Building2,
  Truck,
  Loader2,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  // Coupon state
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  // Shipping toggle
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);

  // Billing form state
  const [billing, setBilling] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: 'Texas',
    zip: '',
    phone: '',
    email: '',
    orderNotes: ''
  });

  // Shipping form state (if different)
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: 'Texas',
    zip: ''
  });

  // Payment Method state
  const [paymentMethod, setPaymentMethod] = useState('wire');

  // Submission / Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Handle billing field changes
  const handleBillingChange = (e) => {
    setBilling({
      ...billing,
      [e.target.name]: e.target.value
    });
  };

  // Handle shipping field changes
  const handleShippingChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  // Apply Coupon Logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const codeUpper = couponCode.trim().toUpperCase();
    if (codeUpper === 'WELCOME10' || codeUpper === 'WHOLESALE10') {
      const discountVal = cartTotal * 0.1;
      setDiscount(discountVal);
      setCouponMessage({ type: 'success', text: 'Coupon "10% OFF" applied successfully!' });
    } else if (codeUpper === 'SAVE20') {
      const discountVal = cartTotal * 0.2;
      setDiscount(discountVal);
      setCouponMessage({ type: 'success', text: 'Coupon "20% OFF" applied successfully!' });
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code. Try WELCOME10 or SAVE20' });
    }
  };

  const router = useRouter();

  // Final Order Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalTotal = Math.max(0, cartTotal - discount);
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      const details = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        billing,
        shipping: shipToDifferentAddress ? shipping : billing,
        items: [...cartItems],
        subtotal: cartTotal,
        discount,
        total: finalTotal,
        paymentMethod
      };

      try {
        localStorage.setItem('designpro_last_order', JSON.stringify(details));
      } catch (err) {
        console.error('Failed to save order:', err);
      }

      clearCart();
      router.push('/order-received');
    }, 1200);
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  // ── ORDER CONFIRMATION / RECEIVED SCREEN ──
  if (orderPlaced && orderDetails) {
    return (
      <>
        <Navbar />
        <main className="section" style={{ backgroundColor: 'var(--cream)', minHeight: '80vh', paddingTop: '60px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            
            <div className="order-success-card">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} color="#1C5C53" />
              </div>
              <h1 className="success-title">Thank you. Your order has been received.</h1>
              <p className="success-subtitle">A confirmation email has been sent to <strong>{orderDetails.billing.email}</strong></p>

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
                  <strong>${orderDetails.total.toFixed(2)}</strong>
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
                  {orderDetails.items.map((item, index) => (
                    <div className="summary-item-row" key={index}>
                      <span>
                        {item.title} {item.size ? `(${item.size})` : ''} <strong>× {item.quantity}</strong>
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  {orderDetails.discount > 0 && (
                    <div className="summary-row" style={{ color: '#059669' }}>
                      <span>Discount:</span>
                      <span>-${orderDetails.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free shipping</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total:</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Addresses Grid */}
              <div className="addresses-grid">
                <div className="address-box">
                  <h3>Billing Address</h3>
                  <p><strong>{orderDetails.billing.firstName} {orderDetails.billing.lastName}</strong></p>
                  {orderDetails.billing.company && <p>{orderDetails.billing.company}</p>}
                  <p>{orderDetails.billing.streetAddress1}</p>
                  {orderDetails.billing.streetAddress2 && <p>{orderDetails.billing.streetAddress2}</p>}
                  <p>{orderDetails.billing.city}, {orderDetails.billing.state} {orderDetails.billing.zip}</p>
                  <p>{orderDetails.billing.country}</p>
                  <p style={{ marginTop: '8px' }}>📞 {orderDetails.billing.phone}</p>
                  <p>✉️ {orderDetails.billing.email}</p>
                </div>

                <div className="address-box">
                  <h3>Shipping Address</h3>
                  <p><strong>{orderDetails.shipping.firstName} {orderDetails.shipping.lastName}</strong></p>
                  {orderDetails.shipping.company && <p>{orderDetails.shipping.company}</p>}
                  <p>{orderDetails.shipping.streetAddress1}</p>
                  {orderDetails.shipping.streetAddress2 && <p>{orderDetails.shipping.streetAddress2}</p>}
                  <p>{orderDetails.shipping.city}, {orderDetails.shipping.state} {orderDetails.shipping.zip}</p>
                  <p>{orderDetails.shipping.country}</p>
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
            font-size: 26px;
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

  // ── EMPTY CART REDIRECT BANNER ──
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="section" style={{ backgroundColor: 'var(--cream)', minHeight: '70vh', paddingTop: '60px' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: '#fff', padding: '60px 30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: 'var(--ink)' }}>Your Cart is Empty</h1>
            <p style={{ color: 'var(--gray)', marginBottom: '28px' }}>Please add products to your cart before proceeding to checkout.</p>
            <Link href="/shop" className="btn btn--solid" style={{ padding: '14px 32px' }}>
              Return to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── MAIN CHECKOUT FORM ──
  return (
    <>
      <Navbar />

      <main className="checkout-page section" style={{ backgroundColor: 'var(--bg-neutral)', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>

          {/* Top Bar: Back to Cart Link */}
          <div style={{ marginBottom: '24px' }}>
            <Link href="/cart" className="back-to-cart-link">
              <ArrowLeft size={16} /> Back to cart
            </Link>
          </div>

          <h1 className="checkout-main-title">Checkout</h1>

          {/* Coupon Toggle Banner */}
          <div className="coupon-banner-card">
            <div className="coupon-banner-header" onClick={() => setShowCouponInput(!showCouponInput)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Tag size={18} color="var(--teal)" />
                <span>Have a coupon? <strong>Click here to enter your code</strong></span>
              </div>
              {showCouponInput ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {showCouponInput && (
              <form onSubmit={handleApplyCoupon} className="coupon-expand-form">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button type="submit" className="btn btn--solid apply-coupon-btn">
                  Apply coupon
                </button>
              </form>
            )}

            {couponMessage.text && (
              <p className={`coupon-msg coupon-msg--${couponMessage.type}`}>
                {couponMessage.text}
              </p>
            )}
          </div>

          {/* Main Checkout Form Grid */}
          <form onSubmit={handlePlaceOrder} className="checkout-grid">

            {/* LEFT COLUMN: Billing & Shipping Details */}
            <div className="checkout-col-left">

              <div className="form-card">
                <h2 className="form-card-title">Billing details</h2>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="firstName">First name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={billing.firstName}
                      onChange={handleBillingChange}
                      required
                      placeholder="John"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={billing.lastName}
                      onChange={handleBillingChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company name (optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={billing.company}
                    onChange={handleBillingChange}
                    placeholder="Business / Retail Store Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country / Region *</label>
                  <select
                    id="country"
                    name="country"
                    value={billing.country}
                    onChange={handleBillingChange}
                    className="select-field"
                    required
                  >
                    <option value="United States (US)">United States (US)</option>
                    <option value="Canada (CA)">Canada (CA)</option>
                    <option value="United Kingdom (GB)">United Kingdom (GB)</option>
                    <option value="Pakistan (PK)">Pakistan (PK)</option>
                    <option value="United Arab Emirates (AE)">United Arab Emirates (AE)</option>
                    <option value="Saudi Arabia (SA)">Saudi Arabia (SA)</option>
                    <option value="Australia (AU)">Australia (AU)</option>
                    <option value="Germany (DE)">Germany (DE)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="streetAddress1">Street address *</label>
                  <input
                    type="text"
                    id="streetAddress1"
                    name="streetAddress1"
                    value={billing.streetAddress1}
                    onChange={handleBillingChange}
                    placeholder="House number and street name"
                    required
                    style={{ marginBottom: '10px' }}
                  />
                  <input
                    type="text"
                    id="streetAddress2"
                    name="streetAddress2"
                    value={billing.streetAddress2}
                    onChange={handleBillingChange}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label htmlFor="city">Town / City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={billing.city}
                      onChange={handleBillingChange}
                      placeholder="Houston"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <select
                      id="state"
                      name="state"
                      value={billing.state}
                      onChange={handleBillingChange}
                      className="select-field"
                      required
                    >
                      {usStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code *</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={billing.zip}
                      onChange={handleBillingChange}
                      placeholder="77001"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="phone_input">Phone *</label>
                    <PhoneInput
                      defaultCountry="us"
                      value={billing.phone}
                      onChange={(phoneVal) => setBilling({ ...billing, phone: phoneVal })}
                      className="custom-phone-input"
                      inputProps={{
                        id: 'phone_input',
                        required: true,
                        placeholder: 'Enter phone number'
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={billing.email}
                      onChange={handleBillingChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Ship to a Different Address Checkbox */}
                <div className="checkbox-group" style={{ marginTop: '16px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={shipToDifferentAddress}
                      onChange={(e) => setShipToDifferentAddress(e.target.checked)}
                    />
                    <span>Ship to a different address?</span>
                  </label>
                </div>

                {/* Optional Expanded Shipping Address Form */}
                {shipToDifferentAddress && (
                  <div className="shipping-address-expanded">
                    <h3 className="form-subheading">Shipping details</h3>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="ship_firstName">First name *</label>
                        <input
                          type="text"
                          id="ship_firstName"
                          name="firstName"
                          value={shipping.firstName}
                          onChange={handleShippingChange}
                          required={shipToDifferentAddress}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ship_lastName">Last name *</label>
                        <input
                          type="text"
                          id="ship_lastName"
                          name="lastName"
                          value={shipping.lastName}
                          onChange={handleShippingChange}
                          required={shipToDifferentAddress}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="ship_street1">Street address *</label>
                      <input
                        type="text"
                        id="ship_street1"
                        name="streetAddress1"
                        value={shipping.streetAddress1}
                        onChange={handleShippingChange}
                        placeholder="House number and street name"
                        required={shipToDifferentAddress}
                      />
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label htmlFor="ship_city">Town / City *</label>
                        <input
                          type="text"
                          id="ship_city"
                          name="city"
                          value={shipping.city}
                          onChange={handleShippingChange}
                          required={shipToDifferentAddress}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ship_state">State *</label>
                        <select
                          id="ship_state"
                          name="state"
                          value={shipping.state}
                          onChange={handleShippingChange}
                          className="select-field"
                          required={shipToDifferentAddress}
                        >
                          {usStates.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="ship_zip">ZIP Code *</label>
                        <input
                          type="text"
                          id="ship_zip"
                          name="zip"
                          value={shipping.zip}
                          onChange={handleShippingChange}
                          required={shipToDifferentAddress}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Notes */}
                <div className="form-group" style={{ marginTop: '24px' }}>
                  <label htmlFor="orderNotes">Order notes (optional)</label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={billing.orderNotes}
                    onChange={handleBillingChange}
                    rows="4"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  ></textarea>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: Your Order & Payment */}
            <div className="checkout-col-right">

              <div className="order-summary-card">
                <h2 className="form-card-title">Your order</h2>

                {/* Items List */}
                <div className="order-items-list">
                  <div className="order-items-header">
                    <span>PRODUCT</span>
                    <span>SUBTOTAL</span>
                  </div>

                  {cartItems.map((item, index) => (
                    <div className="order-item-row" key={index}>
                      <div className="order-item-info">
                        {Boolean(item.imageUrl) && (
                          <img src={item.imageUrl || null} alt={item.title || ''} className="order-item-img" />
                        )}
                        <div>
                          <p className="order-item-name">{item.title}</p>
                          <span className="order-item-qty">
                            {item.size ? `Size: ${item.size} • ` : ''}
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="totals-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="breakdown-row breakdown-row--discount">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="breakdown-row">
                    <span>Shipment</span>
                    <span style={{ fontWeight: '600', color: 'var(--teal)' }}>Free shipping</span>
                  </div>

                  <div className="breakdown-row breakdown-row--total">
                    <span>Total</span>
                    <span className="total-amount">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method - Wire Transfer Only */}
                <div className="payment-methods-box">
                  <div className="payment-option active">
                    <div className="payment-option-header">
                      <span className="payment-title" style={{ fontWeight: '700' }}>Wire Transfer</span>
                      <Building2 size={18} className="payment-icon" color="var(--teal)" />
                    </div>
                    <div className="payment-description" style={{ marginTop: '10px' }}>
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will be shipped after funds have cleared in our account.
                    </div>
                  </div>
                </div>

                {/* Privacy Policy Text */}
                <p className="privacy-notice">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="/privacy" target="_blank" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>privacy policy</Link>.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--solid place-order-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" /> Processing Order...
                    </>
                  ) : (
                    <>
                      <Lock size={16} /> Place order
                    </>
                  )}
                </button>

                <div className="security-badge">
                  <ShieldCheck size={16} color="var(--teal)" />
                  <span>256-Bit SSL Encrypted & Secure Checkout</span>
                </div>

              </div>

            </div>

          </form>

        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-main-title {
          font-size: clamp(32px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #111827 0%, #1c3d37 40%, #2a9d8f 60%, #111827 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
          display: inline-block;
          animation: textShine 7s ease-in-out infinite alternate, luxuryTitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .back-to-cart-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--gray);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-to-cart-link:hover {
          color: var(--teal);
        }

        /* Coupon Banner */
        .coupon-banner-card {
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          margin-bottom: 32px;
        }
        .coupon-banner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          color: var(--ink);
        }
        .coupon-expand-form {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed var(--line);
        }
        .coupon-input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--line);
          border-radius: var(--radius-sm);
          font-size: 14px;
          outline: none;
        }
        .coupon-input:focus {
          border-color: var(--teal);
        }
        .apply-coupon-btn {
          padding: 10px 20px;
          font-size: 13px;
          white-space: nowrap;
        }
        .coupon-msg {
          font-size: 13px;
          margin-top: 10px;
          font-weight: 500;
        }
        .coupon-msg--success { color: #059669; }
        .coupon-msg--error { color: #dc2626; }

        /* Checkout Grid */
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 36px;
          align-items: start;
        }

        /* Form Cards */
        .form-card, .order-summary-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          padding: 36px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .form-card-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 24px;
        }

        .form-subheading {
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
          margin: 24px 0 16px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .form-group input,
        .form-group textarea,
        .select-field {
          width: 100%;
          padding: 12px 14px;
          background: var(--bg-neutral);
          border: 1.5px solid var(--line);
          border-radius: var(--radius-sm);
          font-family: var(--font);
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .select-field:focus {
          border-color: var(--teal);
          background: #ffffff;
        }

        /* Country Phone Input Overrides */
        .custom-phone-input {
          display: flex !important;
          width: 100% !important;
        }
        .custom-phone-input .react-international-phone-country-selector-button {
          height: 46px !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-right: none !important;
          border-radius: var(--radius-sm) 0 0 var(--radius-sm) !important;
        }
        .custom-phone-input .react-international-phone-input {
          height: 46px !important;
          width: 100% !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0 !important;
          padding: 12px 14px !important;
          font-size: 14px !important;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
        }
        .checkbox-label input {
          width: 18px;
          height: 18px;
          accent-color: var(--teal);
        }

        /* Order Items List */
        .order-items-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--gray);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 14px;
        }

        .order-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px dashed var(--line);
        }

        .order-item-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .order-item-img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid var(--line);
        }

        .order-item-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.3;
        }

        .order-item-qty {
          font-size: 12px;
          color: var(--gray);
        }

        .order-item-price {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }

        /* Totals Breakdown */
        .totals-breakdown {
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          margin-bottom: 24px;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--ink);
          margin-bottom: 10px;
        }

        .breakdown-row--discount {
          color: #059669;
        }

        .breakdown-row--total {
          font-size: 18px;
          font-weight: 700;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
          margin-bottom: 0;
        }

        .total-amount {
          color: var(--teal);
        }

        /* Payment Options Box */
        .payment-methods-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .payment-option {
          display: block;
          border: 1.5px solid var(--line);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          background: var(--bg-neutral);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .payment-option.active {
          border-color: var(--teal);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(28, 92, 83, 0.08);
        }

        .payment-option-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .payment-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }

        .payment-icon {
          color: var(--gray);
        }

        .payment-description {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.5;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--line);
        }

        .mock-card-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 13px;
          border: 1px solid var(--line);
          border-radius: 6px;
          outline: none;
        }

        .privacy-notice {
          font-size: 12px;
          color: var(--gray);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .place-order-btn {
          width: 100%;
          justify-content: center;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: var(--radius-pill);
          background: var(--teal);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 16px;
        }

        .place-order-btn:hover {
          background: var(--teal-dark);
        }

        .security-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: var(--gray);
          font-weight: 500;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 992px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2, .form-row-3 {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .form-card, .order-summary-card {
            padding: 24px 18px;
          }
        }
      ` }} />
    </>
  );
}
