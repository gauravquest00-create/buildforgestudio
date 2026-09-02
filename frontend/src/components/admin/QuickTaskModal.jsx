import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './QuickTaskModal.css';
import { slugify } from '../../utils/formatters';

export const QuickTaskModal = ({ isOpen, onClose, onSave, task, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    startingPrice: '$25',
    technology: 'React / Node / Mongo',
    icon: 'Zap',
    displayOrder: 0,
    published: true,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        slug: task.slug || '',
        description: task.description || '',
        startingPrice: task.startingPrice || '$25',
        technology: task.technology || 'React / Node / Mongo',
        icon: task.icon || 'Zap',
        displayOrder: task.displayOrder || 0,
        published: task.published !== undefined ? task.published : true,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        description: '',
        startingPrice: '$25',
        technology: 'React / Node / Mongo',
        icon: 'Zap',
        displayOrder: 0,
        published: true,
      });
    }
  }, [task, isOpen]);

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
      slug: task ? prev.slug : slugify(title),
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
      title={task ? 'Edit Quick Task Category' : 'Add Quick Task Category'}
      maxWidth="560px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-group">
          <label>Task Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="e.g. React & UI Bug Fixes"
            required
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Starting Price *</label>
            <input
              type="text"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="$35"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>Icon</label>
            <select name="icon" value={formData.icon} onChange={handleChange}>
              <option value="Zap">Zap</option>
              <option value="Code">Code</option>
              <option value="Server">Server</option>
              <option value="Database">Database</option>
              <option value="Plug">Plug</option>
              <option value="ShieldCheck">ShieldCheck</option>
              <option value="CloudUpload">CloudUpload</option>
              <option value="PlusCircle">PlusCircle</option>
            </select>
          </div>
        </div>

        <div className="bf-form-group">
          <label>Task Description *</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="State management bugs, render loops, broken layouts..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>Technology Stack</label>
          <input
            type="text"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            placeholder="React / Vite / Next.js"
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
              id="qtask_pub_cb"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="qtask_pub_cb" style={{ cursor: 'pointer' }}>Published</label>
          </div>
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            Save Quick Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
