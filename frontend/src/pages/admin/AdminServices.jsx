import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ServiceModal } from '../../components/admin/ServiceModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { servicesApi } from '../../api/servicesApi';
import { useToast } from '../../hooks/useToast';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesApi.getAllAdmin();
      if (res.success) setServices(res.services);
    } catch (err) {
      showError(err.message || 'Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (payload) => {
    try {
      setActionLoading(true);
      if (editingService) {
        const res = await servicesApi.update(editingService._id, payload);
        if (res.success) showSuccess('Service updated');
      } else {
        const res = await servicesApi.create(payload);
        if (res.success) showSuccess('Service created');
      }
      setModalOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      showError(err.message || 'Failed to save service.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await servicesApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Service deleted');
        setDeleteTargetId(null);
        fetchServices();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete service.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Service Title',
      accessor: 'title',
      render: (row) => (
        <div className="bf-cell-project">
          <strong>{row.title}</strong>
          <span className="bf-cell-slug">{row.shortDescription}</span>
        </div>
      ),
    },
    {
      header: 'Starting Price',
      accessor: 'startingPrice',
      render: (row) => <strong>{row.startingPrice}</strong>,
    },
    {
      header: 'Deliverables',
      accessor: 'features',
      render: (row) => <span>{row.features?.length || 0} features</span>,
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
              setEditingService(row);
              setModalOpen(true);
            }}
            title="Edit Service"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Service"
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
          <h2>Services Management</h2>
          <p>Add and configure studio development offerings and pricing.</p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setEditingService(null);
            setModalOpen(true);
          }}
          icon={Plus}
        >
          Add Service
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching services..." />
      ) : (
        <DataTable
          columns={columns}
          data={services}
          emptyMessage="No services registered."
        />
      )}

      <ServiceModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingService(null);
        }}
        onSave={handleSave}
        service={editingService}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Service?"
        message="This service will be removed from the public website."
        loading={actionLoading}
      />
    </div>
  );
};
