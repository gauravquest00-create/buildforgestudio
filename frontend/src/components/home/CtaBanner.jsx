import React from 'react';
import { ArrowRight, MessageSquare, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { useSite } from '../../hooks/useSite';
import './CtaBanner.css';

export const CtaBanner = ({ onOpenEnquiry }) => {
  const { settings } = useSite();

  return (
    <section className="section-py bf-cta-banner">
      <div className="container">
        <div className="bf-cta-card">
          <div className="bf-cta-card__content">
            <span className="bf-cta-badge">Ready to Ship?</span>
            <h2 className="bf-cta-title">
              Let's engineer your digital system.
            </h2>
            <p className="bf-cta-desc">
              Whether you need a rapid 24-hour bug fix or a scalable SaaS platform, we're ready to build with precision.
            </p>

            <div className="bf-cta-actions">
              <Button
                variant="gold"
                size="lg"
                onClick={() => onOpenEnquiry && onOpenEnquiry('NOT_SURE')}
                icon={ArrowRight}
              >
                {settings?.primaryCtaText || 'Start a Project'}
              </Button>

              {settings?.whatsappNumber && (
                <Button
                  variant="outline"
                  size="lg"
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi BuildForge Studio, I want to discuss a development task.')}`}
                  icon={MessageSquare}
                >
                  Direct WhatsApp
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
