import apiClient from './apiClient';

export const processApi = {
  getPublic: () => apiClient.get('/process'),
  getAllAdmin: () => apiClient.get('/process/admin/all'),
  create: (data) => apiClient.post('/process', data),
  update: (id, data) => apiClient.patch(`/process/${id}`, data),
  delete: (id) => apiClient.delete(`/process/${id}`),
};
