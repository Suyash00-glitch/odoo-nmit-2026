import apiClient from './client.js';

export const leavesApi = {
  apply: (data) => apiClient.post('/leaves', data),
  getMyLeaves: (params) => apiClient.get('/leaves/me', { params }),
  getAllLeaves: (params) => apiClient.get('/leaves', { params }),
  makeDecision: (id, data) => apiClient.patch(`/leaves/${id}/decision`, data),
};
