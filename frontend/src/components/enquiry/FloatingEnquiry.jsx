import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MessageSquare,
  X,
  ArrowRight,
  Zap,
  Globe,
  Cpu,
  HelpCircle,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../common/Button';
import { enquiriesApi } from '../../api/enquiriesApi';
import { useSite } from '../../hooks/useSite';
import { useToast } from '../../hooks/useToast';
import './FloatingEnquiry.css';

export const FloatingEnquiry = ({ isOpen, onOpen, onClose, initialData }) => {
  const { settings } = useSite();
  const { showSuccess, showError } = useToast();
  const modalRef = useRef(null);

  const [step, setStep] = useState(1); // 1 = Select Option, 2 = Form, 3 = Confirmation
  const [formData, setFormData] = useState({
    type: 'NOT_SURE',
    name: '',
    email: '',
    company: '',
    requirement: '',
    budget: '$500 - $2,000',
    timeline: 'Within 2-4 Weeks',
  });
  const [presetTitle, setPresetTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Initial Data Auto-Fill
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      if (typeof initialData === 'string') {
        // String type e.g. 'QUICK_TASK', 'WEB_PROJECT'
        setFormData((prev) => ({ ...prev, type: initialData }));
        setPresetTitle('');
        if (initialData !== 'NOT_SURE') {
          setStep(2);
        } else {
          setStep(1);
        }
      } else if (typeof initialData === 'object') {
        // Full Object auto-fill
        setFormData({
          type: initialData.type || 'NOT_SURE',
          name: initialData.name || '',
          email: initialData.email || '',
          company: initialData.company || '',
          requirement: initialData.requirement || '',
          budget: initialData.budget || '$500 - $2,000',
          timeline: initialData.timeline || 'Within 2-4 Weeks',
        });
        setPresetTitle(initialData.presetTitle || '');
        setStep(2); // Jump directly to the pre-filled form
      }
    } else {
      setStep(1);
    }
  }, [isOpen, initialData]);

  // Auto-scroll modal card to top when step changes
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleSelectType = (selectedType) => {
    setFormData((prev) => ({ ...prev, type: selectedType }));
    setPresetTitle('');
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.requirement.trim()) {
      errs.requirement = 'Please describe your project or bug fix details';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await enquiriesApi.submit(formData);
      if (res.success) {
        showSuccess('Enquiry sent! We will review and respond within 24 hours.');
        setStep(3);
      }
    } catch (error) {
      showError(error.message || 'Failed to submit enquiry. Please try WhatsApp or email.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setPresetTitle('');
    setFormData({
      type: 'NOT_SURE',
      name: '',
      email: '',
      company: '',
      requirement: '',
      budget: '$500 - $2,000',
      timeline: 'Within 2-4 Weeks',
    });
    setErrors({});
    onClose();
  };

  // Render Portal Modal into document.body
  const modalContent = isOpen ? (
    <div className="bf-enquiry-portal-root" role="dialog" aria-modal="true">
      {/* Blurred Backdrop */}
      <div className="bf-enquiry-backdrop" onClick={handleResetAndClose} />

      {/* Centered Modal Card */}
      <div className="bf-enquiry-modal-container">
        <div className="bf-enquiry-card" ref={modalRef}>
          {/* Header */}
          <div className="bf-enquiry-header">
            <div>
              <div className="bf-enquiry-header-badge-row">
                <span className="bf-enquiry-badge">BuildForge Studio</span>
                {presetTitle && (
                  <span className="bf-preset-badge">
                    <Sparkles size={12} /> {presetTitle}
                  </span>
                )}
              </div>
              <h3 className="bf-enquiry-title">
                {step === 1 && 'What do you need built?'}
                {step === 2 && 'Project Specification'}
                {step === 3 && 'Requirement Received!'}
              </h3>
            </div>
            <button
              className="bf-enquiry-close"
              onClick={handleResetAndClose}
              aria-label="Close enquiry modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* STEP 1: Option Selection */}
          {step === 1 && (
            <div className="bf-enquiry-body">
              <p className="bf-enquiry-intro">
                Select your primary requirement category to route your enquiry:
              </p>

              <div className="bf-enquiry-options">
                <button
                  type="button"
                  className="bf-opt-card"
                  onClick={() => handleSelectType('QUICK_TASK')}
                >
                  <div className="bf-opt-icon is-gold">
                    <Zap size={22} />
                  </div>
                  <div className="bf-opt-text">
                    <h4>Quick Dev Task</h4>
                    <p>React/Node bug fixes, API connection, deployments ($25+)</p>
                  </div>
                  <ArrowRight size={18} className="bf-opt-arrow" />
                </button>

                <button
                  type="button"
                  className="bf-opt-card"
                  onClick={() => handleSelectType('WEB_PROJECT')}
                >
                  <div className="bf-opt-icon is-dark">
                    <Globe size={22} />
                  </div>
                  <div className="bf-opt-text">
                    <h4>Web Project & App</h4>
                    <p>Corporate websites, web applications, dashboards & portals</p>
                  </div>
                  <ArrowRight size={18} className="bf-opt-arrow" />
                </button>

                <button
                  type="button"
                  className="bf-opt-card"
                  onClick={() => handleSelectType('SYSTEM_SAAS')}
                >
                  <div className="bf-opt-icon is-purple">
                    <Cpu size={22} />
                  </div>
                  <div className="bf-opt-text">
                    <h4>Custom System & SaaS MVP</h4>
                    <p>Business management tools, internal software, SaaS MVPs</p>
                  </div>
                  <ArrowRight size={18} className="bf-opt-arrow" />
                </button>

                <button
                  type="button"
                  className="bf-opt-card"
                  onClick={() => handleSelectType('NOT_SURE')}
                >
                  <div className="bf-opt-icon is-gray">
                    <HelpCircle size={22} />
                  </div>
                  <div className="bf-opt-text">
                    <h4>Not Sure / General Consultation</h4>
                    <p>Discuss feasibility, technical roadmap, or custom quote</p>
                  </div>
                  <ArrowRight size={18} className="bf-opt-arrow" />
                </button>
              </div>

              {/* Direct Instant Channels */}
              <div className="bf-enquiry-channels">
                <span className="bf-channels-label">Or connect directly with our studio:</span>
                <div className="bf-channels-btns">
                  {settings?.whatsappNumber && (
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi BuildForge Studio, I have a development requirement.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bf-channel-btn bf-channel-btn--wa"
                    >
                      <MessageSquare size={15} />
                      <span>WhatsApp Studio Chat</span>
                    </a>
                  )}
                  {settings?.businessEmail && (
                    <a
                      href={`mailto:${settings.businessEmail}`}
                      className="bf-channel-btn bf-channel-btn--email"
                    >
                      <Mail size={15} />
                      <span>Email Developer</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Pre-filled / Auto-fill Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="bf-enquiry-form">
              <div className="bf-form-group">
                <label>Category *</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="QUICK_TASK">Quick Development Task ($25+)</option>
                  <option value="WEB_PROJECT">Web Project / Web Application</option>
                  <option value="SYSTEM_SAAS">Custom Business System / SaaS MVP</option>
                  <option value="NOT_SURE">General Consultation / Other</option>
                </select>
              </div>

              <div className="bf-form-row">
                <div className="bf-form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    className={errors.name ? 'is-invalid' : ''}
                    autoFocus
                  />
                  {errors.name && <span className="bf-form-error">{errors.name}</span>}
                </div>

                <div className="bf-form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className={errors.email ? 'is-invalid' : ''}
                  />
                  {errors.email && <span className="bf-form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="bf-form-group">
                <label>Company / Project Name (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Studio"
                />
              </div>

              <div className="bf-form-group">
                <label>Project / Task Requirements *</label>
                <textarea
                  name="requirement"
                  rows={4}
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Provide specifications, bug description, or features to build..."
                  className={errors.requirement ? 'is-invalid' : ''}
                />
                {errors.requirement && (
                  <span className="bf-form-error">{errors.requirement}</span>
                )}
              </div>

              <div className="bf-form-row">
                <div className="bf-form-group">
                  <label>Budget Range</label>
                  <select name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="Under $100 (Quick Fix / Task)">Under $100 (Quick Fix / Task)</option>
                    <option value="$100 - $500 (Small Feature / Integration)">$100 - $500 (Small Feature / Integration)</option>
                    <option value="$500 - $2,000 (Website / Web App)">$500 - $2,000 (Website / Web App)</option>
                    <option value="$2,000 - $5,000+ (Full System / SaaS)">$2,000 - $5,000+ (Full System / SaaS)</option>
                    <option value="Flexible / To Discuss">Flexible / To Discuss</option>
                  </select>
                </div>

                <div className="bf-form-group">
                  <label>Target Timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange}>
                    <option value="Immediate (24-48 Hours)">Immediate (24-48 Hours)</option>
                    <option value="Within 1-2 Weeks">Within 1-2 Weeks</option>
                    <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="bf-enquiry-footer-actions">
                <Button
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  variant="gold"
                  size="md"
                  type="submit"
                  loading={loading}
                  icon={ArrowRight}
                >
                  Send Enquiry
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && (
            <div className="bf-enquiry-success">
              <div className="bf-success-icon-box">
                <CheckCircle2 size={44} />
              </div>
              <h4>Requirement Successfully Logged!</h4>
              <p>
                Thank you for reaching out to BuildForge Studio. We have received your project details and will review the specifications immediately. We respond within 24 hours.
              </p>
              <Button variant="primary" size="md" onClick={handleResetAndClose}>
                Return to Site
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Floating Trigger Button always visible at bottom-right */}
      {!isOpen && (
        <button
          className="bf-floating-trigger"
          onClick={() => onOpen && onOpen('NOT_SURE')}
          aria-label="Start a Project or Request a Task"
        >
          <span className="bf-trigger-dot" />
          <MessageSquare size={17} />
          <span>Start a Project</span>
        </button>
      )}

      {/* Render Portal directly under document.body */}
      {typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
};
