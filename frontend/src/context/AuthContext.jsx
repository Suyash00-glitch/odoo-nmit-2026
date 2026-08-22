import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth.api.js';
import { setAccessToken } from '../api/client.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const doLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    }
    setAccessToken(null);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const restore = async () => {
      try {
        const res = await authApi.refresh();
        const token = res.data.data.accessToken;
        setAccessToken(token);
        setToken(token);

        const meRes = await authApi.getMe();
        setUser(meRes.data.data);
      } catch {
        setAccessToken(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  useEffect(() => {
    const handler = () => {
      setAccessToken(null);
      setToken(null);
      setUser(null);
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const { accessToken: token, user: userData } = res.data.data;
    setAccessToken(token);
    setToken(token);
    setUser(userData);
    return userData;
  };

  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout: doLogout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
