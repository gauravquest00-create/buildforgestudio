import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { Mail, MessageSquare, Trash2, Save } from 'lucide-react';
import './EnquiryDetailModal.css';

export const EnquiryDetailModal = ({
  enquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onDelete,
}) => {
  if (!enquiry) return null;

  const [status, setStatus] = useState(enquiry.status || 'NEW');
  const [notes, setNotes] = useState(enquiry.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateStatus(enquiry._id, { status, notes });
    setSaving(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enquiry Details" maxWidth="640px">
      <div className="bf-enquiry-detail-body">
        {/* Top Info */}
        <div className="bf-edetail-grid">
          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Client Name</span>
            <span className="bf-edetail-val">{enquiry.name}</span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Email Address</span>
            <a href={`mailto:${enquiry.email}`} className="bf-edetail-email">
              <Mail size={14} />
              {enquiry.email}
            </a>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Company</span>
            <span className="bf-edetail-val">{enquiry.company || 'Not Specified'}</span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Category</span>
            <span className="bf-edetail-val"><strong>{enquiry.type}</strong></span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Budget</span>
            <span className="bf-edetail-val">{enquiry.budget}</span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Timeline</span>
            <span className="bf-edetail-val">{enquiry.timeline}</span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Created Date</span>
            <span className="bf-edetail-val">{formatDate(enquiry.createdAt)}</span>
          </div>

          <div className="bf-edetail-field">
            <span className="bf-edetail-label">Current Status</span>
            <StatusBadge status={enquiry.status} />
          </div>
        </div>

        {/* Full Requirement */}
        <div className="bf-edetail-block">
          <span className="bf-edetail-label">Client Requirement / Brief</span>
          <div className="bf-edetail-req-text">
            {enquiry.requirement}
          </div>
        </div>

        {/* Admin Workflow Status & Internal Notes */}
        <div className="bf-edetail-admin-controls">
          <div className="bf-form-group">
            <label>Update Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="PROPOSAL">PROPOSAL</option>
              <option value="WON">WON (Converted)</option>
              <option value="LOST">LOST</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div className="bf-form-group">
            <label>Internal Studio Notes (Private)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about client meeting, pricing agreed, technical constraints..."
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bf-edetail-footer">
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(enquiry._id)}
            icon={Trash2}
          >
            Delete
          </Button>

          <div className="bf-edetail-footer-right">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} loading={saving} icon={Save}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
