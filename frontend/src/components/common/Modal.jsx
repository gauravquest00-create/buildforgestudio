import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '600px',
  showClose = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="bf-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="bf-modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bf-modal-header">
          <div>
            {title && <h3 className="bf-modal-title">{title}</h3>}
            {subtitle && <p className="bf-modal-subtitle">{subtitle}</p>}
          </div>
          {showClose && (
            <button className="bf-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          )}
        </div>
        <div className="bf-modal-body">{children}</div>
      </div>
    </div>
  );
};
