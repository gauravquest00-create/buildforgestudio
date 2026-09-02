import React, { useState } from 'react';
import { UploadCloud, X, Check, Image as ImageIcon } from 'lucide-react';
import { uploadApi } from '../../api/uploadApi';
import { Button } from '../common/Button';
import './ImageUploader.css';

export const ImageUploader = ({ value, onChange, onRemove, label = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await uploadApi.uploadImage(file);
      if (res.success) {
        onChange({
          imageUrl: res.imageUrl,
          publicId: res.publicId,
          caption: value?.caption || '',
        });
      }
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value?.publicId) {
      try {
        await uploadApi.deleteImage(value.publicId);
      } catch (e) {
        // ignore
      }
    }
    if (onRemove) onRemove();
  };

  return (
    <div className="bf-image-uploader">
      {label && <label className="bf-uploader-label">{label}</label>}

      {value?.imageUrl ? (
        <div className="bf-uploader-preview">
          <img src={value.imageUrl} alt="Uploaded Preview" />
          <div className="bf-uploader-overlay">
            <button
              type="button"
              className="bf-uploader-remove-btn"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <X size={16} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <label className={`bf-uploader-dropzone ${uploading ? 'is-uploading' : ''}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <div className="bf-uploader-status">
              <span className="bf-btn__spinner" />
              <span>Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="bf-uploader-prompt">
              <UploadCloud size={28} className="bf-uploader-icon" />
              <span className="bf-uploader-text">
                Click or drag image to upload
              </span>
              <span className="bf-uploader-hint">
                PNG, JPG, WebP up to 10MB (Stored via Cloudinary)
              </span>
            </div>
          )}
        </label>
      )}

      {error && <span className="bf-uploader-error">{error}</span>}
    </div>
  );
};
