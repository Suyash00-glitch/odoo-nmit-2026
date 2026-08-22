import apiClient from './client.js';

export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  signup: (data) => apiClient.post('/auth/signup', data),
  logout: () => apiClient.post('/auth/logout'),
  refresh: () => apiClient.post('/auth/refresh'),
  verifyEmail: (token, email) =>
    apiClient.post('/auth/verify-email', { token, email }),
  getMe: () => apiClient.get('/users/me'),
};
