import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import SchoolLogo from '../components/SchoolLogo';
import { SCHOOL_INFO } from '../data/mockData';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@cnhs.edu.ph');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate instantaneous static admin transition
    setTimeout(() => {
      navigate('/admin');
    }, 400);
  };

  const handleUseDemoCreds = () => {
    setEmail('admin@cnhs.edu.ph');
    setPassword('password123');
  };

  return (
    <div className="login-page-wrap">
      <div className="login-box">
        {/* Brand Header */}
        <div className="login-header">
          <div className="emblem-center">
            <SchoolLogo size={58} />
          </div>
          <h2>Welcome Back</h2>
          <p>CNHS Learn — System Administration Portal</p>
          <div style={{ fontSize: '11.5px', color: '#14532d', fontWeight: 600, marginTop: '4px' }}>
            {SCHOOL_INFO.name} (ID: {SCHOOL_INFO.schoolId})
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="login-demo-notice">
          <div className="login-demo-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Static Demo Account</span>
            </div>
            <button
              type="button"
              onClick={handleUseDemoCreds}
              style={{ fontSize: '11px', color: '#166534', textDecoration: 'underline', fontWeight: 600 }}
            >
              Autofill
            </button>
          </div>
          <div className="login-demo-creds">
            <strong>Role:</strong> School Principal / Administrator (Juan dela Cruz)<br />
            <strong>Email:</strong> admin@cnhs.edu.ph<br />
            <strong>Password:</strong> password123
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email / Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-email"
                type="text"
                className="form-input"
                style={{ paddingLeft: '34px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cnhs.edu.ph"
                required
              />
              <Mail
                size={16}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" htmlFor="login-password" style={{ margin: 0 }}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#64748b' }}
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                <span>{showPassword ? 'Hide' : 'Show password'}</span>
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: '34px', paddingRight: '36px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
              <Lock
                size={16}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', fontSize: '12.5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: '#14532d' }} />
              <span>Remember this session</span>
            </label>
            <span style={{ color: '#14532d', fontWeight: 500 }}>DepEd SSO Ready</span>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px', fontSize: '14px', fontWeight: 600 }}
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Login to System'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="login-back-link">
            <ArrowLeft size={14} />
            <span>Back to Main Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
