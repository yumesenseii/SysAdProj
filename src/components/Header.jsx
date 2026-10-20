import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, CheckCircle2, ChevronDown, Shield, GraduationCap, LogOut } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';
import { useAuth } from '../context/useAuth';

export function Header({ title, _subtitle, onToggleSidebar }) {
  const { currentUser, switchUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Nightly Backup Completed",
      desc: "PostgreSQL automated snapshot #20261018-0300 verified.",
      time: "5 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Teacher Registration",
      desc: "Mrs. Evelyn Santos assigned to Grade 7 – Ramon.",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 3,
      title: "System Audit Status",
      desc: "Zero security vulnerabilities detected across all modules.",
      time: "Yesterday",
      type: "success",
    },
  ];

  const handleSwitchRole = (key) => {
    switchUser(key);
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const avatarBg = currentUser?.role === 'Teacher' ? '#1d4ed8' : '#14532d';

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="header-icon-btn mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
          style={{ display: 'none' }}
        >
          <Menu size={18} />
        </button>

        <div className="school-title-pill">
          <strong>{SCHOOL_INFO.name}</strong>
          <span className="school-id-badge">ID: {SCHOOL_INFO.schoolId}</span>
        </div>

        <div className="header-breadcrumb">
          <span>/</span>
          <span className="current">{title || 'Dashboard'}</span>
        </div>
      </div>

      <div className="header-right">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
          <span style={{ fontWeight: 600, color: '#14532d', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px' }}>
            S.Y. 2026–2027
          </span>
          <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
            Quarter 2
          </span>
        </div>

        {/* Notification bell with dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="View system notifications"
          >
            <Bell size={18} />
            <span className="header-badge-count">3</span>
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 60,
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>System Notifications</span>
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>All Operational</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ display: 'flex', gap: '10px', fontSize: '12px', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ color: '#16a34a', marginTop: '2px' }}>
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{n.title}</div>
                      <div style={{ color: '#64748b', fontSize: '11.5px', marginTop: '2px' }}>{n.desc}</div>
                      <div style={{ color: '#94a3b8', fontSize: '10.5px', marginTop: '3px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current User Profile Pill with Role Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="admin-profile-pill"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '8px',
              transition: 'background-color 0.15s ease',
            }}
            aria-label="User Profile & Role Switcher Menu"
          >
            <div
              className="profile-avatar"
              style={{
                backgroundColor: avatarBg,
                color: '#ffffff',
                fontWeight: 700,
              }}
            >
              {currentUser?.avatar || 'JC'}
            </div>
            <div className="profile-info" style={{ textAlign: 'left' }}>
              <span className="profile-name" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currentUser?.name || 'Juan dela Cruz'}
                <ChevronDown size={12} color="#94a3b8" />
              </span>
              <span className="profile-role" style={{ color: currentUser?.role === 'Teacher' ? '#1d4ed8' : '#166534' }}>
                {currentUser?.roleTitle || (currentUser?.role === 'Teacher' ? 'Faculty Teacher' : 'School Principal')}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '270px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 20px -3px rgba(0, 0, 0, 0.15)',
                zIndex: 70,
                padding: '8px',
              }}
            >
              {/* Profile Overview */}
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{currentUser?.email}</div>
                <div style={{ marginTop: '4px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: currentUser?.role === 'Teacher' ? '#eff6ff' : '#f0fdf4',
                      color: currentUser?.role === 'Teacher' ? '#1d4ed8' : '#14532d',
                      border: currentUser?.role === 'Teacher' ? '1px solid #bfdbfe' : '1px solid #bbf7d0',
                    }}
                  >
                    Active Role: {currentUser?.role}
                  </span>
                </div>
              </div>

              {/* Demo Switcher Section */}
              <div style={{ padding: '8px 10px 4px 10px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  Switch Role (Demo Mode)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => handleSwitchRole('admin')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: currentUser?.role === 'Admin' ? '#f0fdf4' : 'transparent',
                      color: currentUser?.role === 'Admin' ? '#14532d' : '#334155',
                      fontWeight: currentUser?.role === 'Admin' ? 700 : 500,
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Shield size={14} color="#166534" />
                    <span>Principal / Admin (Juan dela Cruz)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSwitchRole('teacher')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-003') ? '#eff6ff' : 'transparent',
                      color: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-003') ? '#1d4ed8' : '#334155',
                      fontWeight: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-003') ? 700 : 500,
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <GraduationCap size={14} color="#1d4ed8" />
                    <span>Teacher (Mrs. Evelyn Bautista - Gr. 7)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSwitchRole('teacherScience')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-004') ? '#eff6ff' : 'transparent',
                      color: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-004') ? '#1d4ed8' : '#334155',
                      fontWeight: (currentUser?.role === 'Teacher' && currentUser?.id === 'USR-004') ? 700 : 500,
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <GraduationCap size={14} color="#1d4ed8" />
                    <span>Teacher (Mr. Roberto Cruz - Gr. 7 Science)</span>
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  <LogOut size={14} />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
