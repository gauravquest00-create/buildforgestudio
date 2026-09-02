import React from 'react';
import { ArrowRight, Check, Code, Rocket, Layers, Cpu, Database, Shield } from 'lucide-react';
import { Button } from '../common/Button';
import './ServiceCard.css';

export const ServiceCard = ({ service, onSelect }) => {
  const {
    title,
    slug,
    shortDescription,
    startingPrice,
    features = [],
    icon,
    ctaText = 'Start a Project',
  } = service;

  const getIcon = (name) => {
    switch (name) {
      case 'Rocket': return <Rocket size={24} />;
      case 'Layers': return <Layers size={24} />;
      case 'Cpu': return <Cpu size={24} />;
      case 'Database': return <Database size={24} />;
      case 'Shield': return <Shield size={24} />;
      default: return <Code size={24} />;
    }
  };

  const handleClick = () => {
    if (onSelect) {
      const type = (slug && slug.includes('saas')) ? 'SYSTEM_SAAS' : 'WEB_PROJECT';
      onSelect({
        type,
        presetTitle: title,
        requirement: `Service Scope: ${title}\n\nOverview: ${shortDescription}\n\nKey Deliverables:\n${features.map(f => '- ' + f).join('\n')}`,
        budget: startingPrice ? `From ${startingPrice}` : '$1,200+',
        timeline: 'Within 2-4 Weeks',
      });
    }
  };

  return (
    <div className="bf-service-card">
      <div className="bf-service-card__top">
        <div className="bf-service-card__icon">{getIcon(icon)}</div>
        {startingPrice && (
          <span className="bf-service-card__price">From {startingPrice}</span>
        )}
      </div>

      <h3 className="bf-service-card__title">{title}</h3>
      <p className="bf-service-card__desc">{shortDescription}</p>

      <div className="bf-service-card__features">
        <span className="bf-features-label">Key Deliverables:</span>
        <ul>
          {features.map((feat, idx) => (
            <li key={idx}>
              <Check size={15} className="bf-feat-check" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bf-service-card__action">
        <Button
          variant="primary"
          size="md"
          className="bf-service-btn"
          onClick={handleClick}
          icon={ArrowRight}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};
