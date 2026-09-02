import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import './ErrorState.css';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Failed to load content. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="bf-error-state">
      <div className="bf-error-state__icon">
        <AlertTriangle size={32} />
      </div>
      <h3 className="bf-error-state__title">{title}</h3>
      <p className="bf-error-state__message">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
