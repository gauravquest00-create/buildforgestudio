import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/admin/SearchBar';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TaskModal } from '../../components/admin/TaskModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { tasksApi } from '../../api/tasksApi';
import { useToast } from '../../hooks/useToast';
import './AdminTasks.css';

export const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'New', value: 'NEW' },
    { label: 'Quoted', value: 'QUOTED' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        search: search.trim() || undefined,
      };
      const res = await tasksApi.getAll(params);
      if (res.success) setTasks(res.tasks);
    } catch (err) {
      showError(err.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, search]);

  const handleSave = async (data) => {
    try {
      setActionLoading(true);
      if (editingTask) {
        const res = await tasksApi.update(editingTask._id, data);
        if (res.success) showSuccess('Task updated');
      } else {
        const res = await tasksApi.create(data);
        if (res.success) showSuccess('Task created');
      }
      setModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      showError(err.message || 'Failed to save task.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await tasksApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Task deleted');
        setDeleteTargetId(null);
        fetchTasks();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete task.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Task Title',
      accessor: 'title',
      render: (row) => (
        <div className="bf-cell-task">
          <strong>{row.title}</strong>
          <span>{row.technology}</span>
        </div>
      ),
    },
    {
      header: 'Client',
      accessor: 'clientName',
      render: (row) => (
        <div className="bf-cell-client">
          <strong>{row.clientName}</strong>
          <span>{row.clientEmail}</span>
        </div>
      ),
    },
    {
      header: 'Budget / Quote',
      accessor: 'budget',
      render: (row) => (
        <div className="bf-cell-quote">
          <span>Budget: {row.budget}</span>
          {row.quote && <strong>Quote: {row.quote}</strong>}
        </div>
      ),
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => <StatusBadge status={row.priority} />,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
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
            title="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bf-admin-tasks-page">
      <div className="bf-admin-page-header">
        <div>
          <h2>Quick Development Tasks</h2>
          <p>Manage discrete developer bug fixes, API adjustments, and quotes.</p>
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
          Create Task
        </Button>
      </div>

      <div className="bf-admin-controls-bar">
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search tasks, tech, or clients..."
        />
        <FilterBar
          options={filterOptions}
          activeValue={statusFilter}
          onSelect={setStatusFilter}
        />
      </div>

      {loading ? (
        <LoadingSpinner message="Loading task registry..." />
      ) : (
        <DataTable
          columns={columns}
          data={tasks}
          emptyMessage="No development tasks registered."
        />
      )}

      <TaskModal
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
        title="Delete Task?"
        message="This task record will be removed from the studio registry."
        loading={actionLoading}
      />
    </div>
  );
};
