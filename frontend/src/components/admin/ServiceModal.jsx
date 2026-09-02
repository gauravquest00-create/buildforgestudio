import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './ServiceModal.css';
import { slugify } from '../../utils/formatters';

export const ServiceModal = ({ isOpen, onClose, onSave, service, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    startingPrice: '$1,200+',
    features: '',
    icon: 'AppWindow',
    ctaText: 'Start a Project',
    displayOrder: 0,
    published: true,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        shortDescription: service.shortDescription || '',
        fullDescription: service.fullDescription || '',
        startingPrice: service.startingPrice || '$1,200+',
        features: Array.isArray(service.features) ? service.features.join('\n') : '',
        icon: service.icon || 'AppWindow',
        ctaText: service.ctaText || 'Start a Project',
        displayOrder: service.displayOrder || 0,
        published: service.published !== undefined ? service.published : true,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        startingPrice: '$1,200+',
        features: 'Full-stack React & Node.js\nMongoDB database architecture\nCloudinary image integration',
        icon: 'AppWindow',
        ctaText: 'Start a Project',
        displayOrder: 0,
        published: true,
      });
    }
  }, [service, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: service ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    };
    onSave(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service ? 'Edit Studio Service' : 'Add New Service'}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Service Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Custom Web Applications"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="custom-web-applications"
              required
            />
          </div>
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Starting Price</label>
            <input
              type="text"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="From $1,200"
            />
          </div>

          <div className="bf-form-group">
            <label>Icon Style</label>
            <select name="icon" value={formData.icon} onChange={handleChange}>
              <option value="AppWindow">AppWindow</option>
              <option value="Rocket">Rocket</option>
              <option value="Layers">Layers</option>
              <option value="Cpu">Cpu</option>
              <option value="Database">Database</option>
              <option value="Shield">Shield</option>
            </select>
          </div>
        </div>

        <div className="bf-form-group">
          <label>Short Description *</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="End-to-end full stack web applications..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>Full Description *</label>
          <textarea
            name="fullDescription"
            rows={3}
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Comprehensive description of service scope and architecture..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>Key Features & Deliverables (One per line)</label>
          <textarea
            name="features"
            rows={4}
            value={formData.features}
            onChange={handleChange}
            placeholder="Custom React frontend&#10;Express REST APIs&#10;Mongoose schema validation"
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Display Order (0 = First)</label>
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
            />
          </div>

          <div className="bf-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <input
              type="checkbox"
              id="svc_pub_cb"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="svc_pub_cb" style={{ cursor: 'pointer' }}>Published</label>
          </div>
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            {service ? 'Update Service' : 'Create Service'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
