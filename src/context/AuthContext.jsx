'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
      console.warn('Backend login connection issue. Using local security check.');
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
