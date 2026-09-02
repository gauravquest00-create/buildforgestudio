import apiClient from './apiClient';

export const projectsApi = {
  getPublic: (params) => apiClient.get('/projects', { params }),
  getBySlug: (slug) => apiClient.get(`/projects/slug/${slug}`),
  getAllAdmin: () => apiClient.get('/projects/admin/all'),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.patch(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};
