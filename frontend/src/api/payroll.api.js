import apiClient from './client.js';

export const payrollApi = {
  getMyPayroll: () => apiClient.get('/payroll/me'),
  getEmployeePayroll: (employeeId) => apiClient.get(`/payroll/${employeeId}`),
  updatePayroll: (employeeId, data) => apiClient.put(`/payroll/${employeeId}`, data),
};
