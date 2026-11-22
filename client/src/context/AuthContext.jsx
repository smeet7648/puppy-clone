import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('teddypups_admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.getAdminMe(token);
        if (res.success && res.admin) {
          setAdmin(res.admin);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.adminLogin(email, password);
    if (res.success && res.token) {
      localStorage.setItem('teddypups_admin_token', res.token);
      setToken(res.token);
      setAdmin(res.admin);
      return { success: true };
    }
    return { success: false, message: res.message || 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('teddypups_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token && !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
