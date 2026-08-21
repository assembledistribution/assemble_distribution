'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      <Navbar />
      <div className="cart-page section" style={{ backgroundColor: 'var(--cream)', minHeight: '80vh', paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h1 style={{ 
            fontSize: 'clamp(28px, 4vw, 40px)', 
            fontWeight: '800', 
            marginBottom: '40px', 
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, #111827 0%, #1c3d37 40%, #2a9d8f 60%, #111827 100%)',
            backgroundSize: '250% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            animation: 'textShine 7s ease-in-out infinite alternate, luxuryTitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}>Cart</h1>
          
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }}>
              <ShoppingCart size={48} color="var(--gray)" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Your cart is currently empty.</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '32px' }}>Before proceed to checkout you must add some products to your shopping cart.</p>
              <Link href="/shop" className="btn btn--solid" style={{ padding: '14px 32px', fontSize: '16px' }}>Return to shop</Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Left Column - Cart Table */}
              <div className="cart-table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="col-remove"></th>
                      <th className="col-thumbnail"></th>
                      <th className="col-product">Product</th>
                      <th className="col-price">Price</th>
                      <th className="col-quantity">Quantity</th>
                      <th className="col-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="col-remove">
                          <button onClick={() => removeFromCart(item.id, item.size, item.variation)} className="remove-btn">
                            <X size={18} />
                          </button>
                        </td>
                        <td className="col-thumbnail">
                          <Link href={`/product/${item.id}`}>
                            <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.title} />
                          </Link>
                        </td>
                        <td className="col-product">
                          <Link href={`/product/${item.id}`} style={{ fontWeight: '600', color: 'var(--ink)', textDecoration: 'none' }}>
                            {item.title}
                          </Link>
                          {/* Show variant details if exist */}
                          {(item.size || item.variation) && (
                            <div style={{ fontSize: '13px', color: 'var(--gray)', marginTop: '4px' }}>
                              {item.size && <span>Size: {item.size} </span>}
                              {item.variation && <span>Color: {item.variation}</span>}
                            </div>
                          )}
                        </td>
                        <td className="col-price" data-label="Price">${item.price.toFixed(2)}</td>
                        <td className="col-quantity" data-label="Quantity">
                          <div className="qty-selector">
                            <button onClick={() => updateQuantity(item.id, item.size, item.variation, item.quantity - 1)} disabled={item.quantity <= 1}>
                              <Minus size={14} />
                            </button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick={() => updateQuantity(item.id, item.size, item.variation, item.quantity + 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="col-subtotal" data-label="Subtotal" style={{ fontWeight: '600', color: 'var(--teal)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Column - Cart Totals */}
              <div className="cart-totals-container">
                <div className="cart-totals">
                  <h2>Cart totals</h2>
                  
                  <div className="totals-row">
                    <span>Subtotal</span>
                    <span style={{ color: 'var(--teal)' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="totals-row totals-shipping">
                    <span>Shipment</span>
                    <div>
                      <p>Free shipping</p>
                      <p style={{ marginTop: '8px', color: 'var(--gray)' }}>Shipping to <strong>TX.</strong></p>
                      <button className="change-address-btn">Change address</button>
                    </div>
                  </div>
                  
                  <div className="totals-row totals-final">
                    <span>Total</span>
                    <span style={{ color: 'var(--teal)', fontSize: '20px' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <Link href="/checkout" className="btn-checkout" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        
        .cart-table-container {
          background: #fff;
          border-radius: var(--radius-md);
          border: 1px solid var(--line);
          padding: 24px;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .cart-table th {
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          color: var(--ink);
          font-weight: 600;
          font-size: 15px;
        }
        
        .cart-table td {
          padding: 24px 0;
          border-bottom: 1px solid var(--line);
          vertical-align: middle;
        }

        .col-remove { width: 40px; text-align: center; }
        .col-thumbnail { width: 90px; }
        .col-thumbnail img { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line); }
        .col-price, .col-quantity, .col-subtotal { width: 15%; }
        
        .remove-btn {
          background: none;
          border: none;
          color: var(--gray);
          cursor: pointer;
          transition: color 0.2s;
        }
        .remove-btn:hover { color: #ef4444; }

        .qty-selector {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--line);
          border-radius: 30px;
          overflow: hidden;
          background: #f9f9f9;
        }
        .qty-selector button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          color: var(--ink);
        }
        .qty-selector button:disabled { color: #ccc; cursor: not-allowed; }
        .qty-selector input {
          width: 30px;
          text-align: center;
          border: none;
          background: none;
          font-weight: 600;
          font-size: 14px;
          -moz-appearance: textfield;
        }
        .qty-selector input::-webkit-outer-spin-button,
        .qty-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .cart-totals-container {
          background: #fff;
          border-radius: 0;
          border: 1px solid var(--line);
        }

        .cart-totals {
          padding: 32px;
        }

        .cart-totals h2 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 24px;
          color: var(--ink);
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid var(--line);
          font-size: 15px;
        }
        .totals-row span:first-child {
          font-weight: 600;
          color: var(--ink);
        }

        .totals-shipping {
          display: flex;
          justify-content: space-between;
          text-align: right;
        }
        .change-address-btn {
          background: none;
          border: none;
          color: var(--gray);
          text-decoration: underline;
          margin-top: 8px;
          font-size: 13px;
          cursor: pointer;
        }

        .totals-final {
          border-bottom: none;
          font-weight: 700;
          align-items: center;
          padding-bottom: 24px;
        }

        .btn-checkout {
          width: 100%;
          background: var(--teal);
          color: white;
          border: none;
          border-radius: 30px;
          padding: 16px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-checkout:hover { background: var(--teal-dark); }

        @media (max-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cart-table-container {
            overflow: visible;
          }
          .cart-table, .cart-table tbody, .cart-table tr, .cart-table td {
            display: block;
            width: 100%;
          }
          .cart-table thead {
            display: none;
          }
          .cart-table tr {
            display: grid;
            grid-template-columns: 70px 1fr 30px;
            grid-template-areas: 
              "thumb prod remove"
              "price price price"
              "qty qty qty"
              "sub sub sub";
            gap: 12px;
            padding: 24px 0;
            border-bottom: 1px solid var(--line);
          }
          .cart-table td {
            padding: 0 !important;
            border: none !important;
          }
          .cart-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: var(--ink);
          }
          .col-thumbnail { 
            grid-area: thumb; 
            display: block !important; 
          }
          .col-product { 
            grid-area: prod; 
            display: flex !important; 
            flex-direction: column; 
            justify-content: center; 
            align-items: flex-start;
          }
          .col-remove { 
            grid-area: remove; 
            display: flex !important; 
            justify-content: flex-end; 
            align-items: flex-start; 
          }
          .col-price { grid-area: price; margin-top: 8px; }
          .col-quantity { grid-area: qty; }
          .col-subtotal { grid-area: sub; }

          .col-price, .col-quantity, .col-subtotal {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center;
          }
        }
      `}} />
    </>
  );
}
