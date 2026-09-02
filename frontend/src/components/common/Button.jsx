import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | gold | ghost | danger
  size = 'md', // sm | md | lg
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const classNames = `bf-btn bf-btn--${variant} bf-btn--${size} ${loading ? 'is-loading' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="bf-btn__spinner" aria-hidden="true" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="bf-btn__icon bf-btn__icon--left" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
          <span className="bf-btn__text">{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="bf-btn__icon bf-btn__icon--right" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classNames} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classNames} onClick={onClick} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};
