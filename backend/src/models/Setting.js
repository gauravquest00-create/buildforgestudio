import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'BuildForge Studio',
    },
    tagline: {
      type: String,
      default: 'An online development studio for modern businesses.',
    },
    coreMessage: {
      type: String,
      default: 'We build digital systems that solve real business problems.',
    },
    businessEmail: {
      type: String,
      default: 'hello@buildforgestudio.com',
    },
    whatsappNumber: {
      type: String,
      default: '+1234567890',
    },
    whatsappMessage: {
      type: String,
      default: 'Hi BuildForge Studio, I would like to discuss a project / task.',
    },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com' },
      github: { type: String, default: 'https://github.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      instagram: { type: String, default: 'https://instagram.com' },
    },
    metaTitle: {
      type: String,
      default: 'BuildForge Studio | Custom Web Systems, SaaS MVPs & Quick Dev Tasks',
    },
    metaDescription: {
      type: String,
      default: 'BuildForge Studio is an independent online development studio delivering custom web applications, SaaS MVPs, and rapid development bug fixes.',
    },
    primaryCtaText: {
      type: String,
      default: 'Start a Project',
    },
    footerText: {
      type: String,
      default: '© 2026 BuildForge Studio. All rights reserved. Precision software engineering.',
    },
    availabilityStatus: {
      type: String,
      default: 'Available for New Projects & Quick Tasks',
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
