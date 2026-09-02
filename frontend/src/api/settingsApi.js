import apiClient from './apiClient';

export const settingsApi = {
  getPublic: () => apiClient.get('/settings'),
  update: (data) => apiClient.patch('/settings', data),
  getStats: () => apiClient.get('/settings/stats'),
};
