import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingEnquiry } from '../enquiry/FloatingEnquiry';
import { ToastList } from '../common/Toast';
import './PublicLayout.css';

export const PublicLayout = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState(null);

  const handleOpenEnquiry = useCallback((presetData = 'NOT_SURE') => {
    setEnquiryInitialData(presetData);
    setEnquiryModalOpen(true);
  }, []);

  const handleCloseEnquiry = useCallback(() => {
    setEnquiryModalOpen(false);
  }, []);

  return (
    <div className="bf-public-layout">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('NOT_SURE')} />
      <main className="bf-public-main">
        <Outlet context={{ openEnquiry: handleOpenEnquiry }} />
      </main>
      <Footer onOpenEnquiry={() => handleOpenEnquiry('NOT_SURE')} />

      {/* Floating Global Enquiry Widget */}
      <FloatingEnquiry
        isOpen={enquiryModalOpen}
        onOpen={handleOpenEnquiry}
        onClose={handleCloseEnquiry}
        initialData={enquiryInitialData}
      />

      {/* Global Toast Notifications */}
      <ToastList />
    </div>
  );
};
