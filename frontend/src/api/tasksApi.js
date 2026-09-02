import apiClient from './apiClient';

export const tasksApi = {
  getAll: (params) => apiClient.get('/tasks', { params }),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (data) => apiClient.post('/tasks', data),
  update: (id, data) => apiClient.patch(`/tasks/${id}`, data),
  delete: (id) => apiClient.delete(`/tasks/${id}`),
};
