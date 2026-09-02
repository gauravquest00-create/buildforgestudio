import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TestimonialModal } from '../../components/admin/TestimonialModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { testimonialsApi } from '../../api/testimonialsApi';
import { useToast } from '../../hooks/useToast';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await testimonialsApi.getAllAdmin();
      if (res.success) setTestimonials(res.testimonials);
    } catch (err) {
      showError(err.message || 'Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (payload) => {
    try {
      setActionLoading(true);
      if (editingTestimonial) {
        const res = await testimonialsApi.update(editingTestimonial._id, payload);
        if (res.success) showSuccess('Testimonial updated');
      } else {
        const res = await testimonialsApi.create(payload);
        if (res.success) showSuccess('Testimonial added');
      }
      setModalOpen(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (err) {
      showError(err.message || 'Failed to save testimonial.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await testimonialsApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Testimonial deleted');
        setDeleteTargetId(null);
        fetchTestimonials();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete testimonial.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Client',
      accessor: 'clientName',
      render: (row) => (
        <div className="bf-cell-client">
          <strong>{row.clientName}</strong>
          <span>{row.role}{row.company ? ` • ${row.company}` : ''}</span>
        </div>
      ),
    },
    {
      header: 'Quote',
      accessor: 'quote',
      render: (row) => (
        <p className="bf-cell-requirement" title={row.quote}>
          "{row.quote}"
        </p>
      ),
    },
    {
      header: 'Rating',
      accessor: 'rating',
      render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B', fontWeight: 700 }}>
          <Star size={14} fill="#F59E0B" /> {row.rating}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'published',
      render: (row) => <StatusBadge status={row.published ? 'PUBLISHED' : 'DRAFT'} />,
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="bf-cell-actions">
          <button
            className="bf-action-icon-btn"
            onClick={() => {
              setEditingTestimonial(row);
              setModalOpen(true);
            }}
            title="Edit Testimonial"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Testimonial"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bf-admin-projects-page">
      <div className="bf-admin-page-header">
        <div>
          <h2>Client Testimonials CMS</h2>
          <p>Manage authentic feedback and reviews displayed on the website.</p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setEditingTestimonial(null);
            setModalOpen(true);
          }}
          icon={Plus}
        >
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching reviews..." />
      ) : (
        <DataTable
          columns={columns}
          data={testimonials}
          emptyMessage="No testimonials registered yet."
        />
      )}

      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={handleSave}
        testimonial={editingTestimonial}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial?"
        message="This testimonial will be removed from the public website."
        loading={actionLoading}
      />
    </div>
  );
};
