import apiClient from './apiClient';

export const quickTasksApi = {
  getPublic: () => apiClient.get('/quick-tasks'),
  getAllAdmin: () => apiClient.get('/quick-tasks/admin/all'),
  create: (data) => apiClient.post('/quick-tasks', data),
  update: (id, data) => apiClient.patch(`/quick-tasks/${id}`, data),
  delete: (id) => apiClient.delete(`/quick-tasks/${id}`),
};
