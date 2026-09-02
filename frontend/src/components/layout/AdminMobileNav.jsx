import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  CheckSquare,
  FolderGit2,
  MoreHorizontal,
  Boxes,
  Zap,
  ListOrdered,
  Quote,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAuth } from '../../hooks/useAuth';
import './AdminMobileNav.css';

export const AdminMobileNav = () => {
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setMoreDrawerOpen(false);
  }, [location.pathname]);

  const primaryItems = [
    { label: 'Home', path: '/Adminlogidashboard', icon: LayoutDashboard, end: true },
    { label: 'Tasks', path: '/Adminlogidashboard/tasks', icon: CheckSquare },
    { label: 'Enquiries', path: '/Adminlogidashboard/enquiries', icon: Inbox },
    { label: 'Projects', path: '/Adminlogidashboard/projects', icon: FolderGit2 },
  ];

  const secondaryItems = [
    { label: 'Services', path: '/Adminlogidashboard/services', icon: Boxes },
    { label: 'Quick Tasks', path: '/Adminlogidashboard/quick-tasks', icon: Zap },
    { label: 'Process Steps', path: '/Adminlogidashboard/process', icon: ListOrdered },
    { label: 'Testimonials', path: '/Adminlogidashboard/testimonials', icon: Quote },
    { label: 'Site Settings', path: '/Adminlogidashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Fixed Bottom Bar on Mobile */}
      <nav className="bf-admin-mobile-bar" aria-label="Mobile Navigation">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `bf-mobile-bar-item ${isActive ? 'is-active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          className={`bf-mobile-bar-item ${moreDrawerOpen ? 'is-active' : ''}`}
          onClick={() => setMoreDrawerOpen(true)}
          aria-label="More admin sections"
        >
          <MoreHorizontal size={20} />
          <span>More</span>
        </button>
      </nav>

      {/* More Sections Drawer */}
      {moreDrawerOpen && (
        <div className="bf-admin-more-drawer">
          <div className="bf-more-backdrop" onClick={() => setMoreDrawerOpen(false)} />
          <div className="bf-more-sheet">
            <div className="bf-more-header">
              <Logo size="sm" />
              <button
                onClick={() => setMoreDrawerOpen(false)}
                aria-label="Close drawer"
                className="bf-more-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bf-more-grid">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreDrawerOpen(false)}
                    className={({ isActive }) =>
                      `bf-more-grid-item ${isActive ? 'is-active' : ''}`
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="bf-more-footer">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bf-more-ext-link"
              >
                <ExternalLink size={16} />
                <span>Open Public Website</span>
              </a>
              <button onClick={logout} className="bf-more-logout-btn">
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
