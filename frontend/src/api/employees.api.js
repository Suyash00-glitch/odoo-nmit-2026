import apiClient from './client.js';

export const employeesApi = {
  getAll: (params) => apiClient.get('/employees', { params }),
  create: (data) => apiClient.post('/employees', data),
  getOne: (id) => apiClient.get(`/employees/${id}`),
  update: (id, data) => apiClient.put(`/employees/${id}`, data),
  delete: (id) => apiClient.delete(`/employees/${id}`),
  updateMe: (data) => apiClient.put('/users/me', data),
};
