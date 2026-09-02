import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ size = 'md', message, fullScreen = false }) => {
  const content = (
    <div className={`bf-spinner-wrapper ${fullScreen ? 'is-fullscreen' : ''}`}>
      <div className={`bf-spinner bf-spinner--${size}`} />
      {message && <p className="bf-spinner__message">{message}</p>}
    </div>
  );

  return content;
};
