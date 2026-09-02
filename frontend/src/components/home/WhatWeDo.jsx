import React from 'react';
import { ArrowRight, Zap, Globe, Cpu, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { SectionHeading } from '../common/SectionHeading';
import './WhatWeDo.css';

export const WhatWeDo = ({ onOpenEnquiry }) => {
  const pillars = [
    {
      id: 'quick-tasks',
      tag: 'Starting at $25+',
      title: 'Quick Development Tasks',
      icon: Zap,
      description: 'Small bug fixes, API connections, React adjustments, and fast turnarounds without bloated contracts.',
      bullets: [
        'React & UI component debugging',
        'Node.js & Express API fixes',
        'MongoDB schema & query repairs',
        'Deployment & Vercel/Render troubleshooting',
      ],
      ctaText: 'Submit a Task',
      type: 'QUICK_TASK',
      badgeClass: 'pillar-badge--gold',
    },
    {
      id: 'web-projects',
      tag: 'Full-Cycle Delivery',
      title: 'Web Projects & Apps',
      icon: Globe,
      description: 'High-conversion business websites, interactive client portals, and responsive web applications with CMS control.',
      bullets: [
        'Bespoke React + Vite web architecture',
        'Dynamic administrative content manager',
        'SEO-optimized, fast responsive layouts',
        'Cloudinary automated media pipeline',
      ],
      ctaText: 'Build a Website',
      type: 'WEB_PROJECT',
      badgeClass: 'pillar-badge--dark',
    },
    {
      id: 'saas-systems',
      tag: 'Custom Business Software',
      title: 'Systems & SaaS MVPs',
      icon: Cpu,
      description: 'End-to-end custom business tools, internal management dashboards, CRM pipelines, and monetizable SaaS platforms.',
      bullets: [
        'Custom workflow & inventory databases',
        'Role-based security & auth matrices',
        'Payment gateways & webhook integrations',
        'Sub-second aggregation queries & metrics',
      ],
      ctaText: 'Launch a System',
      type: 'SYSTEM_SAAS',
      badgeClass: 'pillar-badge--purple',
    },
  ];

  return (
    <section className="section-py bf-what-we-do">
      <div className="container">
        <SectionHeading
          badge="Engagement Models"
          title="What do you need built?"
          subtitle="Whether you need a quick $30 fix within 24 hours or a custom full-scale business platform, BuildForge delivers with transparent scope and precision code."
        />

        <div className="bf-pillars-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="bf-pillar-card">
                <div className="bf-pillar-header">
                  <div className="bf-pillar-icon-box">
                    <Icon size={24} />
                  </div>
                  <span className={`bf-pillar-badge ${pillar.badgeClass}`}>
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="bf-pillar-title">{pillar.title}</h3>
                <p className="bf-pillar-desc">{pillar.description}</p>

                <ul className="bf-pillar-list">
                  {pillar.bullets.map((b, idx) => (
                    <li key={idx}>
                      <Check size={16} className="bf-pillar-check" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="bf-pillar-action">
                  <Button
                    variant="secondary"
                    size="md"
                    className="bf-pillar-btn"
                    onClick={() => onOpenEnquiry && onOpenEnquiry(pillar.type)}
                    icon={ArrowRight}
                  >
                    {pillar.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
