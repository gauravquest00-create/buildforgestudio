import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  CheckSquare,
  FolderGit2,
  Boxes,
  Zap,
  ListOrdered,
  Quote,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Logo, LogoIcon } from '../common/Logo';
import { useAuth } from '../../hooks/useAuth';
import './AdminSidebar.css';

export const AdminSidebar = ({ collapsed, onToggleCollapse }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', path: '/Adminlogidashboard', icon: LayoutDashboard, end: true },
    { label: 'Enquiries', path: '/Adminlogidashboard/enquiries', icon: Inbox },
    { label: 'Tasks', path: '/Adminlogidashboard/tasks', icon: CheckSquare },
    { label: 'Projects', path: '/Adminlogidashboard/projects', icon: FolderGit2 },
    { label: 'Services', path: '/Adminlogidashboard/services', icon: Boxes },
    { label: 'Quick Tasks', path: '/Adminlogidashboard/quick-tasks', icon: Zap },
    { label: 'Process', path: '/Adminlogidashboard/process', icon: ListOrdered },
    { label: 'Testimonials', path: '/Adminlogidashboard/testimonials', icon: Quote },
    { label: 'Site Settings', path: '/Adminlogidashboard/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/Adminlogidashboard/login');
  };

  return (
    <aside className={`bf-admin-sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="bf-admin-sidebar__header">
        {!collapsed ? (
          <>
            <div className="bf-admin-sidebar__brand">
              <Logo size="sm" to="/Adminlogidashboard" />
            </div>
            <button
              className="bf-admin-sidebar__collapse-btn"
              onClick={onToggleCollapse}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </>
        ) : (
          <div className="bf-admin-sidebar__collapsed-header">
            <LogoIcon size={28} />
            <button
              className="bf-admin-sidebar__collapse-btn bf-admin-sidebar__expand-btn"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="bf-admin-sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `bf-admin-nav-item ${isActive ? 'is-active' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="bf-admin-nav-icon" />
              {!collapsed && <span className="bf-admin-nav-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="bf-admin-sidebar__footer">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bf-admin-nav-item bf-admin-nav-item--link"
          title={collapsed ? 'View Public Website' : undefined}
        >
          <ExternalLink size={18} className="bf-admin-nav-icon" />
          {!collapsed && <span className="bf-admin-nav-label">Public Website</span>}
        </a>

        <button
          onClick={handleLogout}
          className="bf-admin-nav-item bf-admin-nav-item--logout"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} className="bf-admin-nav-icon" />
          {!collapsed && <span className="bf-admin-nav-label">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
