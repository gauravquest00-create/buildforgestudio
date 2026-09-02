import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import './Toast.css';

export const ToastItem = ({ id, message, type }) => {
  const { removeToast } = useToast();

  const getIcon = () => {
    if (type === 'success') return <CheckCircle2 className="toast-icon is-success" size={18} />;
    if (type === 'error') return <AlertCircle className="toast-icon is-error" size={18} />;
    return <Info className="toast-icon is-info" size={18} />;
  };

  return (
    <div className={`bf-toast bf-toast--${type}`}>
      {getIcon()}
      <span className="bf-toast__message">{message}</span>
      <button className="bf-toast__close" onClick={() => removeToast(id)} aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastList = () => {
  const { toasts } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};
