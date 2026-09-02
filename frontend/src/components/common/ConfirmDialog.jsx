import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';
import './ConfirmDialog.css';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone. Are you sure you want to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  danger = true,
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="460px">
      <div className="bf-confirm-dialog">
        <div className={`bf-confirm-dialog__icon ${danger ? 'is-danger' : ''}`}>
          <AlertCircle size={32} />
        </div>
        <h4 className="bf-confirm-dialog__title">{title}</h4>
        <p className="bf-confirm-dialog__message">{message}</p>
        <div className="bf-confirm-dialog__actions">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
