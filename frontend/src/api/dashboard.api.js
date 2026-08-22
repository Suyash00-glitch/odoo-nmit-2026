import apiClient from './client.js';

export const dashboardApi = {
  getEmployeeDashboard: () => apiClient.get('/dashboard/employee'),
  getAdminDashboard: () => apiClient.get('/dashboard/admin'),
};
