import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './TaskModal.css';

export const TaskModal = ({ isOpen, onClose, onSave, task, loading }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    title: '',
    description: '',
    technology: 'React / Node / Mongo',
    budget: '$50',
    quote: '',
    status: 'NEW',
    priority: 'MEDIUM',
    estimatedDelivery: '1-2 Days',
    notes: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        clientName: task.clientName || '',
        clientEmail: task.clientEmail || '',
        title: task.title || '',
        description: task.description || '',
        technology: task.technology || 'React / Node / Mongo',
        budget: task.budget || '$50',
        quote: task.quote || '',
        status: task.status || 'NEW',
        priority: task.priority || 'MEDIUM',
        estimatedDelivery: task.estimatedDelivery || '1-2 Days',
        notes: task.notes || '',
      });
    } else {
      setFormData({
        clientName: '',
        clientEmail: '',
        title: '',
        description: '',
        technology: 'React / Node / Mongo',
        budget: '$50',
        quote: '',
        status: 'NEW',
        priority: 'MEDIUM',
        estimatedDelivery: '1-2 Days',
        notes: '',
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Development Task' : 'Create New Development Task'}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-group">
          <label>Task Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Fix React rendering loop in Checkout page"
            required
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Client Name *</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>Client Email *</label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="bf-form-group">
          <label>Task Description *</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of bug, steps to reproduce, files affected..."
            required
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Technology Stack</label>
            <input
              type="text"
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              placeholder="React / Express / MongoDB"
            />
          </div>

          <div className="bf-form-group">
            <label>Estimated Delivery</label>
            <input
              type="text"
              name="estimatedDelivery"
              value={formData.estimatedDelivery}
              onChange={handleChange}
              placeholder="e.g. 24-48 Hours"
            />
          </div>
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="NEW">NEW</option>
              <option value="REVIEWING">REVIEWING</option>
              <option value="QUOTED">QUOTED</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="PAID">PAID</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div className="bf-form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="URGENT">URGENT</option>
            </select>
          </div>
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Client Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="$50"
            />
          </div>

          <div className="bf-form-group">
            <label>Studio Quote Amount</label>
            <input
              type="text"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="$75"
            />
          </div>
        </div>

        <div className="bf-form-group">
          <label>Internal Studio Notes</label>
          <textarea
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Private task notes..."
          />
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
