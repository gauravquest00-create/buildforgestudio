import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LogoIcon } from './Logo';
import './PageTransition.css';

export const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Immediate scroll to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Trigger brief logo transition flash
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Route Switch Indicator */}
      <div className={`bf-route-loader ${animating ? 'is-animating' : ''}`}>
        <div className="bf-route-loader__bar" />
      </div>

      <div className="bf-page-container">
        {children}
      </div>
    </>
  );
};
