import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { HeroCanvas } from './HeroCanvas';
import { useSite } from '../../hooks/useSite';
import './Hero.css';

export const Hero = ({ onOpenEnquiry }) => {
  const { settings } = useSite();

  return (
    <section className="bf-hero">
      {/* 3D / VFX Interactive Background Canvas */}
      <HeroCanvas />

      <div className="container bf-hero-container">
        <div className="bf-hero-content">
          {/* Availability Pill */}
          <div className="bf-hero-badge">
            <span className="bf-hero-badge__dot" />
            <span className="bf-hero-badge__text">
              {settings?.availabilityStatus || 'Available for New Projects & Quick Tasks'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="bf-hero-title">
            Digital systems built around{' '}
            <span className="bf-hero-highlight">your business.</span>
          </h1>

          {/* Subtitle */}
          <p className="bf-hero-subtitle">
            {settings?.coreMessage || 'We build digital systems that solve real business problems.'}{' '}
            From rapid <strong>$25+ bug fixes & API integrations</strong> to complete bespoke{' '}
            <strong>SaaS platforms and custom web applications</strong>.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="bf-hero-actions">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onOpenEnquiry && onOpenEnquiry('NOT_SURE')}
              icon={ArrowRight}
            >
              Start a Project
            </Button>

            <Button
              variant="secondary"
              size="lg"
              to="/work"
            >
              Explore Our Work
            </Button>
          </div>

          {/* Value Props Bar */}
          <div className="bf-hero-metrics">
            <div className="bf-metric-item">
              <Zap size={18} className="bf-metric-icon" />
              <div>
                <strong>Same-Day Response</strong>
                <span>Direct developer contact</span>
              </div>
            </div>
            <div className="bf-metric-item">
              <ShieldCheck size={18} className="bf-metric-icon" />
              <div>
                <strong>Production Quality</strong>
                <span>Tested & secured MERN</span>
              </div>
            </div>
            <div className="bf-metric-item">
              <CheckCircle2 size={18} className="bf-metric-icon" />
              <div>
                <strong>Zero Bureaucracy</strong>
                <span>Transparent pricing & scope</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
