import React from 'react';
import './SectionHeading.css';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center', // center | left
  className = '',
}) => {
  return (
    <div className={`bf-section-heading bf-section-heading--${align} ${className}`}>
      {badge && <span className="bf-section-heading__badge">{badge}</span>}
      <h2 className="bf-section-heading__title">{title}</h2>
      {subtitle && <p className="bf-section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};
