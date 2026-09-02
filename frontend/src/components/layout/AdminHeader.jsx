import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  ChevronDown,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './AdminHeader.css';

export const AdminHeader = ({ admin }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/Adminlogidashboard/login');
  };

  return (
    <header className="bf-admin-header">
      <div className="bf-admin-header__left">
        <div className="bf-admin-header__title">
          <h3>Studio Command Room</h3>
          <span className="bf-admin-header__status">System Online</span>
        </div>
      </div>

      <div className="bf-admin-header__right" ref={menuRef}>
        {/* Clickable Admin Profile Button */}
        <button
          className={`bf-admin-user-pill ${dropdownOpen ? 'is-open' : ''}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <div className="bf-admin-user-avatar">
            <User size={16} />
          </div>
          <div className="bf-admin-user-info">
            <span className="bf-admin-user-name">{admin?.name || 'Studio Administrator'}</span>
            <span className="bf-admin-user-role">
              <ShieldCheck size={11} />
              Super Admin
            </span>
          </div>
          <ChevronDown size={14} className={`bf-admin-pill-chevron ${dropdownOpen ? 'is-rotate' : ''}`} />
        </button>

        {/* Interactive Dropdown Menu */}
        {dropdownOpen && (
          <div className="bf-admin-user-dropdown">
            <div className="bf-aud-header">
              <strong>{admin?.name || 'Administrator'}</strong>
              <span>{admin?.email || 'admin@buildforgestudio.com'}</span>
            </div>

            <div className="bf-aud-menu">
              <Link
                to="/Adminlogidashboard/settings"
                className="bf-aud-item"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={16} />
                <span>Site & SEO Settings</span>
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bf-aud-item"
                onClick={() => setDropdownOpen(false)}
              >
                <ExternalLink size={16} />
                <span>View Public Website</span>
              </a>
            </div>

            <div className="bf-aud-footer">
              <button onClick={handleLogout} className="bf-aud-item is-logout">
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
