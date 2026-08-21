'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, CheckCircle2, X, ArrowRight } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = 'cart', title, message, imageUrl, link, linkText }) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type,
      title,
      message,
      imageUrl,
      link,
      linkText
    };

    setToasts((prev) => [...prev.slice(-2), newToast]); // Keep max 3 toasts at once

    // Auto remove after 3.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        className="toast-container" 
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none',
          maxWidth: '420px',
          width: 'calc(100% - 32px)'
        }}
      >
        {toasts.map((toast) => {
          const isCart = toast.type === 'cart';
          const isFavAdd = toast.type === 'favorite_add';
          const isFavRemove = toast.type === 'favorite_remove';

          const accentColor = isCart ? 'var(--teal, #1C5C53)' : (isFavAdd ? '#ef4444' : '#6b7280');
          const bgColor = '#ffffff';

          return (
            <div
              key={toast.id}
              className="toast-card"
              style={{
                pointerEvents: 'auto',
                backgroundColor: bgColor,
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
                border: `1.5px solid ${isFavAdd ? '#fecaca' : (isCart ? '#cce3de' : '#e5e7eb')}`,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Left Icon or Product Thumbnail */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {toast.imageUrl ? (
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line, #E7E5E0)', backgroundColor: '#fafafa' }}>
                    <img 
                      src={toast.imageUrl} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                ) : (
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: isFavAdd ? '#fee2e2' : (isCart ? '#e6f2f0' : '#f3f4f6'),
                    color: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isCart && <ShoppingBag size={22} />}
                    {isFavAdd && <Heart size={22} fill="#ef4444" />}
                    {isFavRemove && <Heart size={22} />}
                    {!isCart && !isFavAdd && !isFavRemove && <CheckCircle2 size={22} />}
                  </div>
                )}

                {/* Micro Badge indicator */}
                {toast.imageUrl && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    {isCart && <ShoppingBag size={11} />}
                    {isFavAdd && <Heart size={11} fill="#fff" />}
                    {isFavRemove && <X size={11} />}
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: accentColor }}>
                    {toast.title}
                  </h4>
                </div>

                {toast.message && (
                  <p style={{
                    margin: 0,
                    fontSize: '12px',
                    color: 'var(--ink, #1C1C1C)',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '220px'
                  }}>
                    {toast.message}
                  </p>
                )}

                {toast.link && (
                  <Link
                    href={toast.link}
                    onClick={() => removeToast(toast.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: accentColor,
                      marginTop: '4px',
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px'
                    }}
                  >
                    <span>{toast.linkText || 'View'}</span>
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'var(--gray, #9ca3af)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'color 0.2s'
                }}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: () => {} };
  }
  return context;
}
