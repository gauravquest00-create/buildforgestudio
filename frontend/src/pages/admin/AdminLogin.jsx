import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, Layers, Cpu } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { SEO } from '../../components/common/SEO';
import './AdminLogin.css';

export const AdminLogin = () => {
  const { admin, login } = useAuth();
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect
  if (admin) {
    return <Navigate to="/Adminlogidashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please provide both administrative email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        showSuccess('Authentication successful. Welcome back.');
        navigate('/Adminlogidashboard');
      }
    } catch (err) {
      showError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bf-admin-login-layout">
      <SEO title="Studio Administration Access" />

      {/* Left Showcase Side (Desktop Split Screen) */}
      <div className="bf-login-showcase">
        <div className="bf-login-showcase__content">
          <Logo size="lg" textColor="white" />

          <div className="bf-login-showcase__body">
            <span className="bf-login-tag">Internal Command Room</span>
            <h1>Architected for precision control.</h1>
            <p>
              Manage studio inbound enquiries, fast dev bug fixes, project case studies, and live API configurations from a unified management dashboard.
            </p>

            <div className="bf-login-feature-list">
              <div className="bf-login-feat">
                <Zap size={18} className="bf-login-feat-icon" />
                <span>Real-Time Inbound Enquiry Triage</span>
              </div>
              <div className="bf-login-feat">
                <Layers size={18} className="bf-login-feat-icon" />
                <span>Portfolio & Cloudinary Asset Management</span>
              </div>
              <div className="bf-login-feat">
                <Cpu size={18} className="bf-login-feat-icon" />
                <span>Centralized REST Service Configuration</span>
              </div>
            </div>
          </div>

          <div className="bf-login-showcase__footer">
            <ShieldCheck size={16} />
            <span>Encrypted Session Management • Single-Admin Authority</span>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="bf-login-form-side">
        <div className="bf-login-form-wrapper">
          {/* Mobile Logo Only */}
          <div className="bf-login-mobile-logo">
            <Logo size="md" />
          </div>

          <div className="bf-login-form-header">
            <h2>Admin Sign In</h2>
            <p>Enter your studio credentials to access the command room.</p>
          </div>

          <form onSubmit={handleSubmit} className="bf-admin-auth-form">
            <div className="bf-form-group">
              <label>Email Address</label>
              <div className="bf-input-icon-wrap">
                <Mail size={16} className="bf-icon-left" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@buildforgestudio.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="bf-form-group">
              <label>Security Password</label>
              <div className="bf-input-icon-wrap">
                <Lock size={16} className="bf-icon-left" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              type="submit"
              loading={loading}
              className="bf-auth-submit-btn"
              icon={ArrowRight}
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div className="bf-login-form-foot">
            <Link to="/" className="bf-back-site-link">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
