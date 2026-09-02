import apiClient from './apiClient';

export const enquiriesApi = {
  submit: (data) => apiClient.post('/enquiries', data),
  getAll: (params) => apiClient.get('/enquiries', { params }),
  getById: (id) => apiClient.get(`/enquiries/${id}`),
  update: (id, data) => apiClient.patch(`/enquiries/${id}`, data),
  delete: (id) => apiClient.delete(`/enquiries/${id}`),
};
