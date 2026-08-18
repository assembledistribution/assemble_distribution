'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="admin-login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div className="admin-login-card" style={{ backgroundColor: 'var(--color-bg)', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '16px' }}>
            <Lock size={28} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text)' }}>Admin Login</h1>
          <p style={{ color: 'var(--color-text-light)', marginTop: '8px' }}>Secure access to dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: 'var(--color-text)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text)', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s' }}
                autoFocus
              />
            </div>
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '14px' }}>{error}</p>}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
            Login to Dashboard
          </button>
        </form>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--color-primary)', fontSize: '14px', textDecoration: 'none' }}>&larr; Back to Website</Link>
        </div>
      </div>
    </div>
  );
}
