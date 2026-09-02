import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export const LogoIcon = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`bf-logo-svg ${className}`}
  >
    <rect width="40" height="40" rx="10" fill="#0F172A" />
    {/* Geometric stylized Forge / Hexagonal Structure */}
    <path
      d="M12 11L20 7L28 11V29L20 33L12 29V11Z"
      stroke="#334155"
      strokeWidth="1.5"
      fill="#1E293B"
    />
    <path
      d="M20 7V33"
      stroke="#334155"
      strokeWidth="1.5"
    />
    <path
      d="M12 11L28 29"
      stroke="#D97706"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
    {/* Glowing Gold Core */}
    <path
      d="M15 15H25C26.1046 15 27 15.8954 27 17V17C27 18.1046 26.1046 19 25 19H15V15Z"
      fill="#D97706"
    />
    <path
      d="M15 21H23C24.1046 21 25 21.8954 25 23V23C25 24.1046 24.1046 25 23 25H15V21Z"
      fill="#F59E0B"
    />
    <rect x="15" y="15" width="4" height="10" fill="#FFFFFF" rx="0.5" />
    <circle cx="28" cy="11" r="2.5" fill="#F59E0B" />
  </svg>
);

export const Logo = ({
  size = 'md', // sm | md | lg | xl
  showText = true,
  to = '/',
  className = '',
  textColor = 'default',
}) => {
  const iconSizes = { sm: 26, md: 34, lg: 42, xl: 52 };
  const iconSize = iconSizes[size] || 34;

  const content = (
    <div className={`bf-logo-wrapper bf-logo--${size} bf-logo-text--${textColor} ${className}`}>
      <LogoIcon size={iconSize} />
      {showText && (
        <div className="bf-logo-text">
          <span className="bf-logo-brand">BUILDFORGE</span>
          <span className="bf-logo-tag">STUDIO</span>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="bf-logo-link" aria-label="BuildForge Studio">
        {content}
      </Link>
    );
  }

  return content;
};
