import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { enquiriesApi } from '../../api/enquiriesApi';
import { useSite } from '../../hooks/useSite';
import { useToast } from '../../hooks/useToast';
import './Contact.css';

export const Contact = () => {
  const { settings } = useSite();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: 'WEB_PROJECT',
    requirement: '',
    budget: '$500 - $2,000',
    timeline: 'Within 2-4 Weeks',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.requirement.trim()) {
      errs.requirement = 'Please describe your requirement or bug fix';
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
        showSuccess('Enquiry sent successfully!');
        setSubmitted(true);
      }
    } catch (err) {
      showError(err.message || 'Failed to send enquiry. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bf-contact-page">
      <SEO
        title="Contact & Project Enquiry"
        description="Contact BuildForge Studio for custom web development, quick bug fixes, and SaaS product engineering."
      />

      <section className="section-py bf-contact-hero">
        <div className="container">
          <SectionHeading
            badge="Direct Channel"
            title="Start your project with BuildForge."
            subtitle="Fill out the brief enquiry below or message the studio directly via WhatsApp or email. We respond within 24 hours."
          />

          <div className="bf-contact-grid">
            {/* Direct Info Column */}
            <div className="bf-contact-info-col">
              <div className="bf-contact-info-card">
                <h3>Direct Studio Channels</h3>
                <p>
                  Prefer chatting immediately? Reach out on WhatsApp or email for rapid task quotes and technical discovery.
                </p>

                <div className="bf-contact-channel-list">
                  {settings?.businessEmail && (
                    <a href={`mailto:${settings.businessEmail}`} className="bf-cchannel-item">
                      <div className="bf-cchannel-icon">
                        <Mail size={20} />
                      </div>
                      <div>
                        <span className="bf-cchannel-label">Studio Email</span>
                        <strong>{settings.businessEmail}</strong>
                      </div>
                    </a>
                  )}

                  {settings?.whatsappNumber && (
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi BuildForge Studio, I have a development requirement.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bf-cchannel-item is-wa"
                    >
                      <div className="bf-cchannel-icon is-wa">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <span className="bf-cchannel-label">Direct WhatsApp</span>
                        <strong>Chat with Studio Architect</strong>
                      </div>
                    </a>
                  )}

                  <div className="bf-cchannel-item">
                    <div className="bf-cchannel-icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className="bf-cchannel-label">Turnaround SLA</span>
                      <strong>Same-Day Response (Mon - Sat)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bf-contact-form-col">
              <div className="bf-contact-form-card">
                {submitted ? (
                  <div className="bf-contact-submitted">
                    <CheckCircle2 size={48} className="bf-submitted-icon" />
                    <h3>Thank you! Your enquiry has been received.</h3>
                    <p>
                      We have logged your request into our database. The lead studio developer will review your specifications and reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          type: 'WEB_PROJECT',
                          requirement: '',
                          budget: '$500 - $2,000',
                          timeline: 'Within 2-4 Weeks',
                        });
                      }}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bf-main-contact-form">
                    <h3>Project Specification Form</h3>
                    
                    <div className="bf-form-group">
                      <label>What type of work do you need? *</label>
                      <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="QUICK_TASK">Quick Development Task ($25+)</option>
                        <option value="WEB_PROJECT">Web Project / Website / App</option>
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
                          placeholder="Jane Doe"
                          className={errors.name ? 'is-invalid' : ''}
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
                          placeholder="jane@company.com"
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
                        placeholder="e.g. Acme Corp"
                      />
                    </div>

                    <div className="bf-form-group">
                      <label>Project / Task Requirement *</label>
                      <textarea
                        name="requirement"
                        rows={5}
                        value={formData.requirement}
                        onChange={handleChange}
                        placeholder="Provide details about your desired system, feature, or bug fix..."
                        className={errors.requirement ? 'is-invalid' : ''}
                      />
                      {errors.requirement && <span className="bf-form-error">{errors.requirement}</span>}
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
                        <label>Desired Timeline</label>
                        <select name="timeline" value={formData.timeline} onChange={handleChange}>
                          <option value="Immediate (24-48 Hours)">Immediate (24-48 Hours)</option>
                          <option value="Within 1-2 Weeks">Within 1-2 Weeks</option>
                          <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      variant="gold"
                      size="lg"
                      type="submit"
                      loading={loading}
                      icon={ArrowRight}
                    >
                      Send Enquiry to Studio
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
