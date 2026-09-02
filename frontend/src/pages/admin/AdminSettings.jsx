import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { settingsApi } from '../../api/settingsApi';
import { useSite } from '../../hooks/useSite';
import { useToast } from '../../hooks/useToast';
import './AdminSettings.css';

export const AdminSettings = () => {
  const { settings, refreshSettings } = useSite();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    brandName: '',
    tagline: '',
    coreMessage: '',
    businessEmail: '',
    whatsappNumber: '',
    whatsappMessage: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: '',
    },
    metaTitle: '',
    metaDescription: '',
    primaryCtaText: '',
    footerText: '',
    availabilityStatus: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        brandName: settings.brandName || 'BuildForge Studio',
        tagline: settings.tagline || '',
        coreMessage: settings.coreMessage || '',
        businessEmail: settings.businessEmail || '',
        whatsappNumber: settings.whatsappNumber || '',
        whatsappMessage: settings.whatsappMessage || '',
        socialLinks: {
          linkedin: settings.socialLinks?.linkedin || '',
          github: settings.socialLinks?.github || '',
          twitter: settings.socialLinks?.twitter || '',
          instagram: settings.socialLinks?.instagram || '',
        },
        metaTitle: settings.metaTitle || '',
        metaDescription: settings.metaDescription || '',
        primaryCtaText: settings.primaryCtaText || '',
        footerText: settings.footerText || '',
        availabilityStatus: settings.availabilityStatus || '',
      });
      setLoading(false);
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await settingsApi.update(formData);
      if (res.success) {
        showSuccess('Site settings updated successfully');
        await refreshSettings();
      }
    } catch (err) {
      showError(err.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading site settings..." />;
  }

  return (
    <div className="bf-admin-settings-page">
      <div className="bf-admin-page-header">
        <div>
          <h2>Site Settings & Identity</h2>
          <p>Configure global studio brand metadata, direct contact links, and SEO tags.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bf-settings-form">
        {/* Brand & Positioning */}
        <div className="bf-settings-card">
          <h3>Brand & Positioning</h3>
          <div className="bf-form-row">
            <div className="bf-form-group">
              <label>Studio Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bf-form-group">
              <label>Availability Status Badge</label>
              <input
                type="text"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bf-form-group">
            <label>Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
            />
          </div>

          <div className="bf-form-group">
            <label>Core Value Proposition Message</label>
            <textarea
              rows={2}
              name="coreMessage"
              value={formData.coreMessage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Direct Channels */}
        <div className="bf-settings-card">
          <h3>Direct Channels & Instant Chat</h3>
          <div className="bf-form-row">
            <div className="bf-form-group">
              <label>Studio Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bf-form-group">
              <label>WhatsApp Number (International format with +)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="bf-form-group">
            <label>Default WhatsApp Pre-filled Message</label>
            <input
              type="text"
              name="whatsappMessage"
              value={formData.whatsappMessage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bf-settings-card">
          <h3>Social Profiles</h3>
          <div className="bf-form-row">
            <div className="bf-form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.socialLinks.github}
                onChange={handleSocialChange}
              />
            </div>

            <div className="bf-form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
              />
            </div>
          </div>

          <div className="bf-form-row">
            <div className="bf-form-group">
              <label>Twitter / X URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialChange}
              />
            </div>

            <div className="bf-form-group">
              <label>Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
              />
            </div>
          </div>
        </div>

        {/* SEO & Meta */}
        <div className="bf-settings-card">
          <h3>SEO & Metadata</h3>
          <div className="bf-form-group">
            <label>Default Page Title (SEO)</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </div>

          <div className="bf-form-group">
            <label>Default Meta Description</label>
            <textarea
              rows={3}
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
            />
          </div>

          <div className="bf-form-row">
            <div className="bf-form-group">
              <label>Primary CTA Text</label>
              <input
                type="text"
                name="primaryCtaText"
                value={formData.primaryCtaText}
                onChange={handleChange}
              />
            </div>

            <div className="bf-form-group">
              <label>Footer Copyright Text</label>
              <input
                type="text"
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="bf-settings-action-bar">
          <Button variant="gold" size="lg" type="submit" loading={saving} icon={Save}>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
