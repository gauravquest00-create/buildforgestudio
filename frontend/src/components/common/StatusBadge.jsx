import React from 'react';
import './StatusBadge.css';

export const StatusBadge = ({ status, type = 'enquiry' }) => {
  const getLabelAndClass = () => {
    const s = String(status).toUpperCase();
    switch (s) {
      case 'NEW':
        return { label: 'New', className: 'status-badge--blue' };
      case 'CONTACTED':
      case 'REVIEWING':
        return { label: s, className: 'status-badge--purple' };
      case 'QUALIFIED':
      case 'QUOTED':
        return { label: s, className: 'status-badge--amber' };
      case 'PROPOSAL':
      case 'ACCEPTED':
      case 'PAID':
        return { label: s, className: 'status-badge--teal' };
      case 'IN_PROGRESS':
        return { label: 'In Progress', className: 'status-badge--indigo' };
      case 'WON':
      case 'COMPLETED':
        return { label: s, className: 'status-badge--green' };
      case 'LOST':
      case 'CANCELLED':
        return { label: s, className: 'status-badge--red' };
      case 'ARCHIVED':
        return { label: 'Archived', className: 'status-badge--gray' };
      case 'PUBLISHED':
        return { label: 'Published', className: 'status-badge--green' };
      case 'DRAFT':
      case 'UNPUBLISHED':
        return { label: 'Draft', className: 'status-badge--gray' };
      case 'HIGH':
      case 'URGENT':
        return { label: s, className: 'status-badge--red' };
      case 'MEDIUM':
        return { label: 'Medium', className: 'status-badge--amber' };
      case 'LOW':
        return { label: 'Low', className: 'status-badge--gray' };
      default:
        return { label: status, className: 'status-badge--gray' };
    }
  };

  const { label, className } = getLabelAndClass();

  return <span className={`status-badge ${className}`}>{label}</span>;
};
