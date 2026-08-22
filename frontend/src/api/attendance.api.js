import apiClient from './client.js';

export const attendanceApi = {
  checkIn: () => apiClient.post('/attendance/check-in'),
  checkOut: () => apiClient.post('/attendance/check-out'),
  getMyAttendance: (params) =>
    apiClient.get('/attendance/me', { params }),
  getEmployeeAttendance: (employeeId, params) =>
    apiClient.get(`/attendance/${employeeId}`, { params }),
};
