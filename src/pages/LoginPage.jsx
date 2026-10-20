import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck, GraduationCap, Shield } from 'lucide-react';
import SchoolLogo from '../components/SchoolLogo';
import { SCHOOL_INFO, DEMO_ACCOUNTS } from '../data/mockData';
import { useAuth } from '../context/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuth();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@cnhs.edu.ph');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    loginWithCredentials(email, password);
    setTimeout(() => {
      navigate('/admin');
    }, 350);
  };

  const handleSelectDemoRole = (roleKey) => {
    setSelectedRole(roleKey);
    const account = DEMO_ACCOUNTS[roleKey];
    if (account) {
      setEmail(account.email);
      setPassword('password123');
    }
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
          <p>CNHS Learn — School Administration Portal</p>
          <div style={{ fontSize: '11.5px', color: '#14532d', fontWeight: 600, marginTop: '4px' }}>
            {SCHOOL_INFO.name} (ID: {SCHOOL_INFO.schoolId})
          </div>
        </div>

        {/* Demo Credentials Switcher Box */}
        <div className="login-demo-notice">
          <div className="login-demo-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Select Demo Account Role</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '8px 0 10px 0' }}>
            <button
              type="button"
              onClick={() => handleSelectDemoRole('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                borderRadius: '6px',
                border: selectedRole === 'admin' ? '2px solid #166534' : '1px solid #cbd5e1',
                backgroundColor: selectedRole === 'admin' ? '#f0fdf4' : '#ffffff',
                color: selectedRole === 'admin' ? '#14532d' : '#475569',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '11.5px',
                textAlign: 'left',
              }}
            >
              <Shield size={14} style={{ color: selectedRole === 'admin' ? '#166534' : '#64748b', flexShrink: 0 }} />
              <div>
                <div>Principal / Admin</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 400 }}>Full access</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectDemoRole('teacher')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                borderRadius: '6px',
                border: selectedRole === 'teacher' ? '2px solid #1d4ed8' : '1px solid #cbd5e1',
                backgroundColor: selectedRole === 'teacher' ? '#eff6ff' : '#ffffff',
                color: selectedRole === 'teacher' ? '#1d4ed8' : '#475569',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '11.5px',
                textAlign: 'left',
              }}
            >
              <GraduationCap size={14} style={{ color: selectedRole === 'teacher' ? '#1d4ed8' : '#64748b', flexShrink: 0 }} />
              <div>
                <div>Teacher / Adviser</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 400 }}>Grade 7 - Ramon</div>
              </div>
            </button>
          </div>

          <div className="login-demo-creds" style={{ fontSize: '11.5px', lineHeight: 1.45 }}>
            {selectedRole === 'admin' ? (
              <>
                <strong>Role:</strong> School Principal (Juan dela Cruz)<br />
                <strong>Email:</strong> admin@cnhs.edu.ph<br />
                <strong>Access:</strong> Full school & system administration
              </>
            ) : (
              <>
                <strong>Role:</strong> Faculty & Class Adviser (Mrs. Evelyn Bautista)<br />
                <strong>Email:</strong> e.bautista@cnhs.edu.ph<br />
                <strong>Access:</strong> Grade 7 – Ramon, Attendance & Subject Grading
              </>
            )}
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
