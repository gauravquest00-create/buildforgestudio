import React, { createContext, useState, useEffect } from 'react';
import { settingsApi } from '../api/settingsApi';

export const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    brandName: 'BuildForge Studio',
    tagline: 'An online development studio for modern businesses.',
    coreMessage: 'We build digital systems that solve real business problems.',
    businessEmail: 'hello@buildforgestudio.com',
    whatsappNumber: '+91 8130839987',
    whatsappMessage: 'Hi BuildForge Studio, I would like to discuss a project or quick development task.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
    },
    metaTitle: 'BuildForge Studio | Custom Web Systems, SaaS MVPs & Quick Dev Tasks',
    metaDescription: 'BuildForge Studio is an independent online development studio delivering custom web applications, SaaS MVPs, and rapid development bug fixes.',
    primaryCtaText: 'Start a Project',
    footerText: '© 2026 BuildForge Studio. All rights reserved. Precision software engineering.',
    availabilityStatus: 'Available for New Projects & Quick Tasks',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await settingsApi.getPublic();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    } catch (error) {
      console.warn('[SiteContext] Using fallback site settings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, setSettings, refreshSettings: fetchSettings, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
