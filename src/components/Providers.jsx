'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProductProvider>
          <CartProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </CartProvider>
        </ProductProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
