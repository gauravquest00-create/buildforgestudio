import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProjectModal } from '../../components/admin/ProjectModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { projectsApi } from '../../api/projectsApi';
import { useToast } from '../../hooks/useToast';
import './AdminProjects.css';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsApi.getAllAdmin();
      if (res.success) setProjects(res.projects);
    } catch (err) {
      showError(err.message || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (payload) => {
    try {
      setActionLoading(true);
      if (editingProject) {
        const res = await projectsApi.update(editingProject._id, payload);
        if (res.success) showSuccess('Project updated successfully');
      } else {
        const res = await projectsApi.create(payload);
        if (res.success) showSuccess('Project created and published');
      }
      setModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      showError(err.message || 'Failed to save project.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setActionLoading(true);
      const res = await projectsApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Project deleted');
        setDeleteTargetId(null);
        fetchProjects();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete project.');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      header: 'Preview',
      accessor: 'thumbnail',
      width: '80px',
      render: (row) => (
        <img
          src={row.thumbnail?.imageUrl || 'https://via.placeholder.com/80'}
          alt={row.title}
          className="bf-table-thumb"
        />
      ),
    },
    {
      header: 'Title / Slug',
      accessor: 'title',
      render: (row) => (
        <div className="bf-cell-project">
          <div className="bf-cell-project-title-row">
            <strong>{row.title}</strong>
            {row.featured && (
              <span className="bf-cell-featured-pill">
                <Sparkles size={10} /> Featured
              </span>
            )}
          </div>
          <span className="bf-cell-slug">/work/{row.slug}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => <span>{row.category}</span>,
    },
    {
      header: 'Live Demo URL',
      accessor: 'liveDemoUrl',
      render: (row) =>
        row.liveDemoUrl ? (
          <a
            href={row.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bf-table-link"
          >
            Demo <ExternalLink size={12} />
          </a>
        ) : (
          <span className="bf-table-muted">-</span>
        ),
    },
    {
      header: 'Status',
      accessor: 'published',
      render: (row) => (
        <StatusBadge status={row.published ? 'PUBLISHED' : 'DRAFT'} />
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="bf-cell-actions">
          <button
            className="bf-action-icon-btn"
            onClick={() => {
              setEditingProject(row);
              setModalOpen(true);
            }}
            title="Edit Project"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Project"
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
          <h2>Work & Case Studies CMS</h2>
          <p>Manage public portfolio case studies, live demo links, and media assets.</p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => {
            setEditingProject(null);
            setModalOpen(true);
          }}
          icon={Plus}
        >
          Add Project
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching case study registry..." />
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          emptyMessage="No portfolio projects found. Click Add Project to publish one."
        />
      )}

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSave}
        project={editingProject}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Project?"
        message="This project will be removed from the public website and its Cloudinary media cleaned up."
        loading={actionLoading}
      />
    </div>
  );
};
