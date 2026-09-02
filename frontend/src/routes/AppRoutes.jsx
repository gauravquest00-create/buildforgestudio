import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { PageTransition } from '../components/common/PageTransition';

// Public Pages
import { Home } from '../pages/public/Home';
import { Work } from '../pages/public/Work';
import { ProjectDetail } from '../pages/public/ProjectDetail';
import { Services } from '../pages/public/Services';
import { QuickTasks } from '../pages/public/QuickTasks';
import { Process } from '../pages/public/Process';
import { About } from '../pages/public/About';
import { Contact } from '../pages/public/Contact';
import { NotFound } from '../pages/public/NotFound';

// Admin Pages
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminEnquiries } from '../pages/admin/AdminEnquiries';
import { AdminTasks } from '../pages/admin/AdminTasks';
import { AdminProjects } from '../pages/admin/AdminProjects';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminQuickTasks } from '../pages/admin/AdminQuickTasks';
import { AdminProcess } from '../pages/admin/AdminProcess';
import { AdminTestimonials } from '../pages/admin/AdminTestimonials';
import { AdminSettings } from '../pages/admin/AdminSettings';

export const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="quick-tasks" element={<QuickTasks />} />
          <Route path="process" element={<Process />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/Adminlogidashboard/login" element={<AdminLogin />} />

        {/* Admin Protected Dashboard Routes */}
        <Route path="/Adminlogidashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="quick-tasks" element={<AdminQuickTasks />} />
          <Route path="process" element={<AdminProcess />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </PageTransition>
  );
};
