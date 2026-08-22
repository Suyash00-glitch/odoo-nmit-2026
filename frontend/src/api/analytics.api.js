import apiClient from './client.js';

export const analyticsApi = {
  getAttendanceSummary: () => apiClient.get('/analytics/attendance-summary'),
  getLeaveSummary: () => apiClient.get('/analytics/leave-summary'),
};
