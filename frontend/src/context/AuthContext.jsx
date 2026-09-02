import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authApi.getMe();
      if (res.success && res.admin) {
        setAdmin(res.admin);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      setAdmin(null);
      sessionStorage.removeItem('bf_admin_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.success) {
      setAdmin(res.admin);
      if (res.token) {
        sessionStorage.setItem('bf_admin_token', res.token);
      }
    }
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // ignore
    } finally {
      setAdmin(null);
      sessionStorage.removeItem('bf_admin_token');
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
