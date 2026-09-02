import apiClient from './apiClient';

export const uploadApi = {
  uploadImage: (file, folder = 'buildforge_studio') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    return apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (publicId) => apiClient.post('/upload/delete', { publicId }),
};
