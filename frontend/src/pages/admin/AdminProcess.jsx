import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProcessModal } from '../../components/admin/ProcessModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { processApi } from '../../api/processApi';
import { useToast } from '../../hooks/useToast';

export const AdminProcess = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchProcess = async () => {
    try {
      setLoading(true);
      const res = await processApi.getAllAdmin();
      if (res.success) setSteps(res.steps);
    } catch (err) {
      showError(err.message || 'Failed to fetch process steps.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcess();
  }, []);

  const handleSave = async (payload) => {
    try {
      setActionLoading(true);
      if (editingStep) {
        const res = await processApi.update(editingStep._id, payload);
        if (res.success) showSuccess('Process step updated');
      } else {
        const res = await processApi.create(payload);
        if (res.success) showSuccess('Process step created');
      }
      setModalOpen(false);
      setEditingStep(null);
      fetchProcess();
    } catch (err) {
      showError(err.message || 'Failed to save step.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await processApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Process step deleted');
        setDeleteTargetId(null);
        fetchProcess();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete step.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Step #',
      accessor: 'stepNumber',
      width: '70px',
      render: (row) => <strong>{row.stepNumber}</strong>,
    },
    {
      header: 'Title & Summary',
      accessor: 'title',
      render: (row) => (
        <div className="bf-cell-project">
          <strong>{row.title}</strong>
          <span className="bf-cell-slug">{row.description}</span>
        </div>
      ),
    },
    {
      header: 'Milestones',
      accessor: 'details',
      render: (row) => <span>{row.details?.length || 0} items</span>,
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
              setEditingStep(row);
              setModalOpen(true);
            }}
            title="Edit Step"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Step"
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
          <h2>Engineering Process Timeline</h2>
          <p>Control the 4-step delivery pipeline displayed on the public website.</p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setEditingStep(null);
            setModalOpen(true);
          }}
          icon={Plus}
        >
          Add Step
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading timeline steps..." />
      ) : (
        <DataTable
          columns={columns}
          data={steps}
          emptyMessage="No process steps found."
        />
      )}

      <ProcessModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingStep(null);
        }}
        onSave={handleSave}
        step={editingStep}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Step?"
        message="This process step will be deleted."
        loading={actionLoading}
      />
    </div>
  );
};
