import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './TestimonialModal.css';
import { ImageUploader } from './ImageUploader';

export const TestimonialModal = ({ isOpen, onClose, onSave, testimonial, loading }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: 'Founder',
    quote: '',
    avatar: { imageUrl: '', publicId: '' },
    rating: 5,
    published: true,
    displayOrder: 0,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        clientName: testimonial.clientName || '',
        company: testimonial.company || '',
        role: testimonial.role || 'Founder',
        quote: testimonial.quote || '',
        avatar: testimonial.avatar || { imageUrl: '', publicId: '' },
        rating: testimonial.rating || 5,
        published: testimonial.published !== undefined ? testimonial.published : true,
        displayOrder: testimonial.displayOrder || 0,
      });
    } else {
      setFormData({
        clientName: '',
        company: '',
        role: 'Founder',
        quote: '',
        avatar: { imageUrl: '', publicId: '' },
        rating: 5,
        published: true,
        displayOrder: 0,
      });
    }
  }, [testimonial, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Client Name *</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="e.g. David Sterling"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>Company / Project</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Sterling Growth Labs"
            />
          </div>
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Founder & CEO"
            />
          </div>

          <div className="bf-form-group">
            <label>Rating (1-5)</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
        </div>

        <ImageUploader
          label="Client Avatar (Optional)"
          value={formData.avatar}
          onChange={(img) => setFormData((prev) => ({ ...prev, avatar: img }))}
          onRemove={() => setFormData((prev) => ({ ...prev, avatar: { imageUrl: '', publicId: '' } }))}
        />

        <div className="bf-form-group">
          <label>Testimonial Quote *</label>
          <textarea
            name="quote"
            rows={4}
            value={formData.quote}
            onChange={handleChange}
            placeholder="Feedback regarding speed, code quality, communication..."
            required
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Display Order</label>
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
              id="testi_pub_cb"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="testi_pub_cb" style={{ cursor: 'pointer' }}>Published</label>
          </div>
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            Save Testimonial
          </Button>
        </div>
      </form>
    </Modal>
  );
};
