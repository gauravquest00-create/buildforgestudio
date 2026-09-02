import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { useSite } from '../../hooks/useSite';
import './Navbar.css';

export const Navbar = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useSite();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Quick Tasks', path: '/quick-tasks', badge: 'Fast Fixes' },
    { name: 'Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`bf-navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container bf-navbar-container">
          {/* Logo with custom SVG icon */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="bf-navbar-nav" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `bf-nav-link ${isActive ? 'is-active' : ''}`
                }
              >
                <span>{link.name}</span>
                {link.badge && <span className="bf-nav-link__badge">{link.badge}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="bf-navbar-actions">
            <Button
              variant="gold"
              size="sm"
              onClick={() => onOpenEnquiry && onOpenEnquiry('NOT_SURE')}
              icon={ArrowRight}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`bf-mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div className={`bf-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="bf-mobile-drawer__backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="bf-mobile-drawer__content">
          <div className="bf-mobile-drawer__header">
            <Logo size="md" />
            <button
              className="bf-mobile-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="bf-mobile-nav" aria-label="Mobile Navigation Drawer">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `bf-mobile-nav-link ${isActive ? 'is-active' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="bf-mnav-title">{link.name}</span>
                {link.badge && <span className="bf-nav-link__badge">{link.badge}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="bf-mobile-drawer__footer">
            <Button
              variant="gold"
              size="lg"
              className="bf-mobile-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry('NOT_SURE');
              }}
              icon={ArrowRight}
            >
              Start a Project
            </Button>
            <p className="bf-mobile-drawer__tagline">
              {settings?.availabilityStatus || 'Available for New Projects & Quick Tasks'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
