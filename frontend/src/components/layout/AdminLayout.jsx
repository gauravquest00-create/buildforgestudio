import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminHeader } from './AdminHeader';
import { ToastList } from '../common/Toast';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { admin, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (loading) {
    return <LoadingSpinner fullScreen message="Verifying administrative credentials..." />;
  }

  if (!admin) {
    return <Navigate to="/Adminlogidashboard/login" replace />;
  }

  return (
    <div className={`bf-admin-root ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Desktop Sidebar */}
      <AdminSidebar
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Administrative Container */}
      <div className="bf-admin-main-wrapper">
        <AdminHeader
          admin={admin}
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="bf-admin-content">
          <div className="bf-admin-inner">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <AdminMobileNav />

      {/* Admin Toast Feed */}
      <ToastList />
    </div>
  );
};
