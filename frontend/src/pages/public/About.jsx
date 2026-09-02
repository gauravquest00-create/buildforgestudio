import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Code, Cpu, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { useSite } from '../../hooks/useSite';
import './About.css';

export const About = () => {
  const { openEnquiry } = useOutletContext();
  const { settings } = useSite();

  const values = [
    {
      icon: Terminal,
      title: 'Direct Developer Access',
      description: 'You communicate directly with the software architect building your system. No account managers, no game of telephone.',
    },
    {
      icon: Code,
      title: 'Production-First Standards',
      description: 'We write clean, modular, and maintainable code with strict typing, schema validation, and security headers out of the box.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Bloat & Pragmatism',
      description: 'We choose the right tool for the job. No unnecessary microservice complexity when a fast, optimized MERN architecture excels.',
    },
  ];

  return (
    <div className="bf-about-page">
      <SEO
        title="About BuildForge Studio"
        description="BuildForge Studio is an independent online development studio delivering custom web applications, SaaS MVPs, and rapid development bug fixes."
      />

      <section className="section-py bf-about-hero">
        <div className="container">
          <SectionHeading
            badge="About the Studio"
            title="Digital systems built around your business."
            subtitle="BuildForge Studio is an independent online development studio. We bridge the gap between expensive enterprise agencies and unpredictable freelancers."
          />

          <div className="bf-about-story-grid">
            <div className="bf-about-story-text">
              <h3>Who We Are</h3>
              <p>
                BuildForge Studio was created with a straightforward mission: to engineer resilient digital systems that solve real business problems without bureaucratic drag.
              </p>
              <p>
                Modern businesses don't need buzzwords or bloated team overhead. They need software that works reliably, loads fast, automates manual bottlenecks, and generates business value from day one.
              </p>
              <p>
                Whether you are a startup founder launching an MVP or an established business replacing spreadsheet chaos with a custom internal system, we deliver full-cycle software engineering with pride.
              </p>
            </div>

            <div className="bf-about-tech-box">
              <h4>Core Technical Stack</h4>
              <ul className="bf-about-stack-list">
                <li><strong>Frontend:</strong> React 18, Vite, React Router, Modern CSS Modules</li>
                <li><strong>Backend:</strong> Node.js, Express.js (ES Modules), REST APIs</li>
                <li><strong>Database:</strong> MongoDB Atlas, Mongoose Schema Modeling</li>
                <li><strong>Media & Storage:</strong> Cloudinary API Pipelines</li>
                <li><strong>Deployment:</strong> Vercel (Frontend SPA) + Render (Node API)</li>
                <li><strong>Security:</strong> JWT HTTP-only Cookies, Helmet, Rate Limiting</li>
              </ul>
            </div>
          </div>

          <div className="bf-about-values-grid">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bf-about-val-card">
                  <div className="bf-val-icon">
                    <Icon size={24} />
                  </div>
                  <h4>{val.title}</h4>
                  <p>{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
