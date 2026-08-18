'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || !isAuthenticated) {
    return null;
  }

  return children;
}
