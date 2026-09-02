import React from 'react';
import './StatCard.css';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'gold', subtext }) => {
  return (
    <div className={`bf-stat-card bf-stat-card--${color}`}>
      <div className="bf-stat-card__header">
        <span className="bf-stat-card__title">{title}</span>
        {Icon && (
          <div className="bf-stat-card__icon-box">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="bf-stat-card__val-row">
        <h3 className="bf-stat-card__value">{value ?? 0}</h3>
        {trend && <span className="bf-stat-card__trend">{trend}</span>}
      </div>
      {subtext && <span className="bf-stat-card__subtext">{subtext}</span>}
    </div>
  );
};
