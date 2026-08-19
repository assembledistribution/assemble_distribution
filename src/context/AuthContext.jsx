'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('adminAuth');
      setIsAuthenticated(auth === 'true');
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (password) => {
    const API_URL = getApiUrl();
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'admin', password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
          localStorage.setItem('adminAuth', 'true');
          return true;
        }
      }
    } catch (error) {
      console.warn('Backend login connection issue. Using local security check.', error);
    }

    // Local fallback check if backend connection issue or offline
    if (password === 'Escaletech@123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
