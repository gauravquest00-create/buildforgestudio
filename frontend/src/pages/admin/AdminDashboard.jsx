import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  CheckSquare,
  FolderGit2,
  Boxes,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { formatDate } from '../../utils/formatters';
import { settingsApi } from '../../api/settingsApi';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await settingsApi.getStats();
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error('Error fetching dashboard statistics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen message="Compiling studio metrics..." />;
  }

  const { stats, recentEnquiries = [], recentTasks = [] } = data || {};

  return (
    <div className="bf-admin-dashboard">
      {/* Header Greeting */}
      <div className="bf-admin-dash-header">
        <div>
          <h2>Executive Overview</h2>
          <p>Real-time telemetry across studio enquiries, active tasks, and portfolio deployments.</p>
        </div>
        <div className="bf-admin-dash-actions">
          <Button variant="gold" size="sm" to="/Adminlogidashboard/tasks" icon={CheckSquare}>
            Manage Tasks
          </Button>
          <Button variant="secondary" size="sm" to="/Adminlogidashboard/enquiries" icon={Inbox}>
            View Enquiries
          </Button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="bf-dash-stats-grid">
        <StatCard
          title="Total Inbound Enquiries"
          value={stats?.totalEnquiries}
          icon={Inbox}
          color="blue"
          subtext={`${stats?.newEnquiries || 0} pending review`}
        />
        <StatCard
          title="Active Quick Tasks"
          value={stats?.activeTasks}
          icon={CheckSquare}
          color="gold"
          subtext="In review or progress"
        />
        <StatCard
          title="Published Projects"
          value={stats?.publishedProjects}
          icon={FolderGit2}
          color="purple"
          subtext="Live in public showcase"
        />
        <StatCard
          title="Live Studio Services"
          value={stats?.publishedServices}
          icon={Boxes}
          color="green"
          subtext="Active offerings"
        />
      </div>

      {/* Main Dual Panels */}
      <div className="bf-dash-panels-grid">
        {/* Recent Enquiries */}
        <div className="bf-dash-panel">
          <div className="bf-dash-panel__header">
            <div>
              <h3>Recent Project Enquiries</h3>
              <p>Latest inbound leads from website visitors</p>
            </div>
            <Link to="/Adminlogidashboard/enquiries" className="bf-dash-panel-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bf-dash-panel__content">
            {recentEnquiries.length > 0 ? (
              <div className="bf-dash-list">
                {recentEnquiries.map((enq) => (
                  <div key={enq._id} className="bf-dash-item">
                    <div className="bf-dash-item__main">
                      <strong>{enq.name}</strong>
                      <span className="bf-dash-item__sub">
                        {enq.company ? `${enq.company} • ` : ''}{enq.email}
                      </span>
                      <p className="bf-dash-item__snippet">{enq.requirement}</p>
                    </div>
                    <div className="bf-dash-item__meta">
                      <StatusBadge status={enq.status} />
                      <span className="bf-dash-time">{formatDate(enq.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="bf-dash-empty">No enquiries logged yet.</p>
            )}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bf-dash-panel">
          <div className="bf-dash-panel__header">
            <div>
              <h3>Active Development Tasks</h3>
              <p>Bug fixes, API adjustments, and small features</p>
            </div>
            <Link to="/Adminlogidashboard/tasks" className="bf-dash-panel-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bf-dash-panel__content">
            {recentTasks.length > 0 ? (
              <div className="bf-dash-list">
                {recentTasks.map((t) => (
                  <div key={t._id} className="bf-dash-item">
                    <div className="bf-dash-item__main">
                      <strong>{t.title}</strong>
                      <span className="bf-dash-item__sub">
                        {t.clientName} ({t.technology})
                      </span>
                      <p className="bf-dash-item__snippet">{t.description}</p>
                    </div>
                    <div className="bf-dash-item__meta">
                      <StatusBadge status={t.status} />
                      <span className="bf-dash-time">{t.estimatedDelivery || '1-2 Days'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="bf-dash-empty">No active tasks currently logged.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
