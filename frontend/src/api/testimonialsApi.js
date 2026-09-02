import apiClient from './apiClient';

export const testimonialsApi = {
  getPublic: () => apiClient.get('/testimonials'),
  getAllAdmin: () => apiClient.get('/testimonials/admin/all'),
  create: (data) => apiClient.post('/testimonials', data),
  update: (id, data) => apiClient.patch(`/testimonials/${id}`, data),
  delete: (id) => apiClient.delete(`/testimonials/${id}`),
};
