import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import './ProjectModal.css';
import { ImageUploader } from './ImageUploader';
import { slugify } from '../../utils/formatters';

export const ProjectModal = ({ isOpen, onClose, onSave, project, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Web Application',
    thumbnail: { imageUrl: '', publicId: '', caption: '' },
    technologies: '',
    features: '',
    problem: '',
    solution: '',
    liveDemoUrl: '',
    caseStudyUrl: '',
    featured: false,
    published: true,
    displayOrder: 0,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        shortDescription: project.shortDescription || '',
        fullDescription: project.fullDescription || '',
        category: project.category || 'Web Application',
        thumbnail: project.thumbnail || { imageUrl: '', publicId: '', caption: '' },
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        features: Array.isArray(project.features) ? project.features.join('\n') : '',
        problem: project.problem || '',
        solution: project.solution || '',
        liveDemoUrl: project.liveDemoUrl || '',
        caseStudyUrl: project.caseStudyUrl || '',
        featured: project.featured || false,
        published: project.published !== undefined ? project.published : true,
        displayOrder: project.displayOrder || 0,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        category: 'Web Application',
        thumbnail: { imageUrl: '', publicId: '', caption: '' },
        technologies: 'React, Node.js, Express, MongoDB',
        features: 'Real-time metrics\nAdmin CMS\nAutomated email alerts',
        problem: '',
        solution: '',
        liveDemoUrl: '',
        caseStudyUrl: '',
        featured: false,
        published: true,
        displayOrder: 0,
      });
    }
  }, [project, isOpen]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: project ? prev.slug : slugify(title),
    }));
  };

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
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
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
      title={project ? 'Edit Portfolio Project' : 'Add New Project'}
      maxWidth="760px"
    >
      <form onSubmit={handleSubmit} className="bf-enquiry-form">
        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. PulseBoard CRM & Analytics"
              required
            />
          </div>

          <div className="bf-form-group">
            <label>URL Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="pulseboard-crm-analytics"
              required
            />
          </div>
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Web Application">Web Application</option>
              <option value="SaaS MVP">SaaS MVP</option>
              <option value="Business System">Business System</option>
              <option value="Dashboard">Dashboard</option>
              <option value="Corporate Website">Corporate Website</option>
              <option value="Internal Tool">Internal Tool</option>
              <option value="API / Backend">API / Backend</option>
            </select>
          </div>

          <div className="bf-form-group">
            <label>Live Demo URL (Direct Link)</label>
            <input
              type="url"
              name="liveDemoUrl"
              value={formData.liveDemoUrl}
              onChange={handleChange}
              placeholder="https://demo.example.com"
            />
          </div>
        </div>

        <ImageUploader
          label="Project Thumbnail (Cloudinary Managed) *"
          value={formData.thumbnail}
          onChange={(imgObj) => setFormData((prev) => ({ ...prev, thumbnail: imgObj }))}
          onRemove={() => setFormData((prev) => ({ ...prev, thumbnail: { imageUrl: '', publicId: '', caption: '' } }))}
        />

        <div className="bf-form-group">
          <label>Short Description (Card Summary) *</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="High-velocity metrics dashboard and deal pipeline..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>Full Case Study Overview *</label>
          <textarea
            name="fullDescription"
            rows={4}
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Detailed description of what the system does, who it was built for..."
            required
          />
        </div>

        <div className="bf-form-group">
          <label>The Challenge / Problem Solved</label>
          <textarea
            name="problem"
            rows={2}
            value={formData.problem}
            onChange={handleChange}
            placeholder="What operational bottleneck was the client facing?"
          />
        </div>

        <div className="bf-form-group">
          <label>The Solution / Architecture</label>
          <textarea
            name="solution"
            rows={2}
            value={formData.solution}
            onChange={handleChange}
            placeholder="How BuildForge designed and implemented the resolution..."
          />
        </div>

        <div className="bf-form-group">
          <label>Technology Stack (Comma separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, Express, MongoDB Atlas, Vite"
          />
        </div>

        <div className="bf-form-group">
          <label>Key Features (One per line)</label>
          <textarea
            name="features"
            rows={3}
            value={formData.features}
            onChange={handleChange}
            placeholder="Real-time revenue metrics&#10;Lead conversion kanban&#10;Weekly automated reports"
          />
        </div>

        <div className="bf-form-row">
          <div className="bf-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="featured_cb"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="featured_cb" style={{ cursor: 'pointer' }}>Feature on Home Page</label>
          </div>

          <div className="bf-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="published_cb"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            <label htmlFor="published_cb" style={{ cursor: 'pointer' }}>Published (Visible to Public)</label>
          </div>
        </div>

        <div className="bf-form-actions">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            {project ? 'Update Project' : 'Save Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
