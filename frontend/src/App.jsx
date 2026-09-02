import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { ToastProvider } from './context/ToastContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SiteProvider>
          <AuthProvider>
            <div className="app-root">
              <AppRoutes />
            </div>
          </AuthProvider>
        </SiteProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
