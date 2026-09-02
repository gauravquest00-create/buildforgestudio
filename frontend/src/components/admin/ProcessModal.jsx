import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './ProcessModal.css';

export const ProcessModal = ({ isOpen, onClose, onSave, step, loading }) => {
  const [formData, setFormData] = useState({
    stepNumber: '01',
    title: '',
    description: '',
    details: '',
    displayOrder: 0,
    published: true,
  });

  useEffect(() => {
    if (step) {
      setFormData({
        stepNumber: step.stepNumber || '01',
        title: step.title || '',
        description: step.description || '',
        details: Array.isArray(step.details) ? step.details.join('\n') : '',
        displayOrder: step.displayOrder || 0,
        published: step.published !== undefined ? step.published : true,
      });
    } else {
      setFormData({
        stepNumber: '01',
        title: '',
        description: '',
        details: '',
        displayOrder: 0,
        published: true,
      });
    }
  }, [step, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      details: formData.details
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean),
    };
    onSave(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step ? 'Edit Process Step' : 'Add Process Step'}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Step Number (e.g. 01) *</label>
            <input
              type="text"
              name="stepNumber"
              value={formData.stepNumber}
              onChange={handleChange}
              placeholder="01"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>Step Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Discover & Plan"
              required
            />
          </div>
        </div>

        <div className="bf-form-group">
          <label>Step Description *</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Comprehensive description of stage activities..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>Key Milestones / Deliverables (One per line)</label>
          <textarea
            name="details"
            rows={3}
            value={formData.details}
            onChange={handleChange}
            placeholder="Requirements breakdown&#10;Technical feasibility audit&#10;Architecture design"
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
              id="proc_pub_cb"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="proc_pub_cb" style={{ cursor: 'pointer' }}>Published</label>
          </div>
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            Save Step
          </Button>
        </div>
      </form>
    </Modal>
  );
};
