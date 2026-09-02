import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../components/admin/SearchBar';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EnquiryDetailModal } from '../../components/admin/EnquiryDetailModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { enquiriesApi } from '../../api/enquiriesApi';
import { useToast } from '../../hooks/useToast';
import { Eye, Trash2 } from 'lucide-react';
import './AdminEnquiries.css';

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'New', value: 'NEW' },
    { label: 'Contacted', value: 'CONTACTED' },
    { label: 'Qualified', value: 'QUALIFIED' },
    { label: 'Proposal', value: 'PROPOSAL' },
    { label: 'Won', value: 'WON' },
    { label: 'Archived', value: 'ARCHIVED' },
  ];

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        search: search.trim() || undefined,
      };
      const res = await enquiriesApi.getAll(params);
      if (res.success) {
        setEnquiries(res.enquiries);
      }
    } catch (err) {
      showError(err.message || 'Failed to fetch enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, search]);

  const handleUpdateStatus = async (id, payload) => {
    try {
      const res = await enquiriesApi.update(id, payload);
      if (res.success) {
        showSuccess('Enquiry updated successfully');
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      showError(err.message || 'Failed to update enquiry.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setDeleteLoading(true);
      const res = await enquiriesApi.delete(deleteTargetId);
      if (res.success) {
        showSuccess('Enquiry deleted');
        setDeleteTargetId(null);
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      showError(err.message || 'Failed to delete enquiry.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      header: 'Client / Contact',
      accessor: 'name',
      render: (row) => (
        <div className="bf-cell-client">
          <strong>{row.name}</strong>
          <span>{row.email}</span>
          {row.company && <small className="bf-cell-company">{row.company}</small>}
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'type',
      render: (row) => <strong>{row.type}</strong>,
    },
    {
      header: 'Requirement Brief',
      accessor: 'requirement',
      render: (row) => (
        <p className="bf-cell-requirement" title={row.requirement}>
          {row.requirement}
        </p>
      ),
    },
    {
      header: 'Budget / Time',
      accessor: 'budget',
      render: (row) => (
        <div className="bf-cell-budget">
          <span>{row.budget}</span>
          <small>{row.timeline}</small>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Date',
      accessor: 'createdAt',
      render: (row) => <span className="bf-cell-date">{formatDate(row.createdAt)}</span>,
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="bf-cell-actions">
          <button
            className="bf-action-icon-btn"
            onClick={() => setSelectedEnquiry(row)}
            title="Inspect & Edit Enquiry"
          >
            <Eye size={16} />
          </button>
          <button
            className="bf-action-icon-btn is-danger"
            onClick={() => setDeleteTargetId(row._id)}
            title="Delete Enquiry"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bf-admin-enquiries-page">
      <div className="bf-admin-page-header">
        <div>
          <h2>Enquiries & Lead Inbox</h2>
          <p>Review, qualify, and triage client project specifications.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bf-admin-controls-bar">
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search by client, email, requirement..."
        />
        <FilterBar
          options={filterOptions}
          activeValue={statusFilter}
          onSelect={setStatusFilter}
        />
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner message="Fetching enquiries..." />
      ) : (
        <DataTable
          columns={columns}
          data={enquiries}
          emptyMessage="No enquiries match your query."
        />
      )}

      {/* Inspect & Edit Modal */}
      {selectedEnquiry && (
        <EnquiryDetailModal
          isOpen={Boolean(selectedEnquiry)}
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdateStatus={handleUpdateStatus}
          onDelete={(id) => setDeleteTargetId(id)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Enquiry?"
        message="This enquiry record will be permanently deleted from the database."
        loading={deleteLoading}
      />
    </div>
  );
};
