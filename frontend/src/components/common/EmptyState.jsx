import React from 'react';
import { Button } from './Button';
import { PackageOpen } from 'lucide-react';
import './EmptyState.css';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'There are currently no records available to display.',
  actionText,
  onAction,
  actionTo,
}) => {
  return (
    <div className="bf-empty-state">
      <div className="bf-empty-state__icon">
        <Icon size={36} />
      </div>
      <h3 className="bf-empty-state__title">{title}</h3>
      <p className="bf-empty-state__desc">{description}</p>
      {(actionText && onAction) && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
      {(actionText && actionTo) && (
        <Button variant="secondary" size="sm" to={actionTo}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
