import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageSquare, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useSite } from '../../hooks/useSite';
import './Footer.css';

export const Footer = ({ onOpenEnquiry }) => {
  const { settings } = useSite();

  return (
    <footer className="bf-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="bf-footer-grid">
          {/* Brand Col */}
          <div className="bf-footer-brand">
            <div className="bf-footer-logo-wrap">
              <Logo size="md" />
            </div>
            <p className="bf-footer-tagline">
              {settings?.coreMessage || 'We build digital systems that solve real business problems.'}
            </p>
            <div className="bf-footer-status">
              <span className="bf-status-dot" />
              <span>{settings?.availabilityStatus || 'Available for New Projects & Tasks'}</span>
            </div>
          </div>

          {/* Offerings Col */}
          <div className="bf-footer-col">
            <h4 className="bf-footer-heading">Capabilities</h4>
            <ul className="bf-footer-links">
              <li><Link to="/quick-tasks">Quick Dev Tasks ($25+)</Link></li>
              <li><Link to="/services">Custom Web Systems</Link></li>
              <li><Link to="/services">SaaS MVPs & Prototyping</Link></li>
              <li><Link to="/services">Internal Business Tools</Link></li>
              <li><Link to="/services">API Integrations</Link></li>
            </ul>
          </div>

          {/* Studio Col */}
          <div className="bf-footer-col">
            <h4 className="bf-footer-heading">Studio</h4>
            <ul className="bf-footer-links">
              <li><Link to="/work">Featured Work</Link></li>
              <li><Link to="/process">Our 4-Step Process</Link></li>
              <li><Link to="/about">About BuildForge</Link></li>
              <li><Link to="/contact">Contact & Enquiry</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="bf-footer-col">
            <h4 className="bf-footer-heading">Direct Channels</h4>
            <ul className="bf-footer-contact">
              {settings?.businessEmail && (
                <li>
                  <a href={`mailto:${settings.businessEmail}`} className="bf-contact-item">
                    <Mail size={16} />
                    <span>{settings.businessEmail}</span>
                  </a>
                </li>
              )}
              {settings?.whatsappNumber && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsappMessage || 'Hi BuildForge Studio')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bf-contact-item"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Studio Chat</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              )}
            </ul>

            <div className="bf-footer-socials">
              {settings?.socialLinks?.github && (
                <a href={settings.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bf-footer-bottom">
          <p className="bf-footer-copyright">
            {settings?.footerText || '© 2026 BuildForge Studio. All rights reserved.'}
          </p>
          <div className="bf-footer-legal">
            <span>Precision MERN Architecture</span>
            <span className="bf-divider-dot">•</span>
            <span>Production Vercel & Render Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
