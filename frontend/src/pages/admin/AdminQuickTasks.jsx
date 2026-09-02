import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { QuickTaskModal } from '../../components/admin/QuickTaskModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { quickTasksApi } from '../../api/quickTasksApi';
import { useToast } from '../../hooks/useToast';

export const AdminQuickTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await quickTasksApi.getAllAdmin();
      if (res.success) setTasks(res.quickTasks);
    } catch (err) {
      showError(err.message || 'Failed to fetch quick task categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (payload) => {
    try {
      setActionLoading(true);
      if (editingTask) {
        const res = await quickTasksApi.update(editingTask._id, payload);
        if (res.success) showSuccess('Quick task updated');
      } else {
        const res = await quickTasksApi.create(payload);
        if (res.success) showSuccess('Quick task created');
      }
      setModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      showError(err.message || 'Failed to save quick task.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await quickTasksApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Quick task category deleted');
        setDeleteTargetId(null);
        fetchTasks();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete quick task.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Category Title',
      accessor: 'title',
      render: (row) => (
        <div className="bf-cell-project">
          <strong>{row.title}</strong>
          <span className="bf-cell-slug">{row.technology}</span>
        </div>
      ),
    },
    {
      header: 'Starting Price',
      accessor: 'startingPrice',
      render: (row) => <strong>{row.startingPrice}</strong>,
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
              setEditingTask(row);
              setModalOpen(true);
            }}
            title="Edit Quick Task"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Quick Task"
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
          <h2>Quick Task Categories CMS</h2>
          <p>Configure rapid bug fix listings, starting rates, and technology tags.</p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          icon={Plus}
        >
          Add Category
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching categories..." />
      ) : (
        <DataTable
          columns={columns}
          data={tasks}
          emptyMessage="No quick task categories found."
        />
      )}

      <QuickTaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
        task={editingTask}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="This quick task offering will be removed from the public website."
        loading={actionLoading}
      />
    </div>
  );
};
