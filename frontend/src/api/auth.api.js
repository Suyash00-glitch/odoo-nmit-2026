import apiClient from './client.js';

export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  signup: (data) => apiClient.post('/auth/signup', data),
  verifyEmail: (token) => apiClient.post('/auth/verify-email', { token }),
  activate: (token, password) => apiClient.post('/auth/activate', { token, password }),
  resendVerification: (email) => apiClient.post('/auth/resend-verification', { email }),
  logout: () => apiClient.post('/auth/logout'),
  refresh: () => apiClient.post('/auth/refresh'),
  getMe: () => apiClient.get('/users/me'),
};
