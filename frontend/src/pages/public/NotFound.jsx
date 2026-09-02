import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="bf-not-found-page">
      <SEO title="404 - Page Not Found" />
      <div className="container bf-not-found-container">
        <span className="bf-404-badge">404 Error</span>
        <h1 className="bf-404-title">Resource not found</h1>
        <p className="bf-404-desc">
          The page or system endpoint you are looking for does not exist or may have been moved.
        </p>
        <Button variant="primary" size="lg" to="/" icon={ArrowLeft} iconPosition="left">
          Return to Studio Home
        </Button>
      </div>
    </div>
  );
};
