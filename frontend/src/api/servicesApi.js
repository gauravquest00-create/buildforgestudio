import apiClient from './apiClient';

export const servicesApi = {
  getPublic: () => apiClient.get('/services'),
  getAllAdmin: () => apiClient.get('/services/admin/all'),
  create: (data) => apiClient.post('/services', data),
  update: (id, data) => apiClient.patch(`/services/${id}`, data),
  delete: (id) => apiClient.delete(`/services/${id}`),
};
