import React, { useState } from 'react';
import { Bell, Menu, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

export function Header({ title, _subtitle, onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);

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
            onClick={() => setShowNotifications(!showNotifications)}
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

        {/* Current Admin Profile */}
        <div className="admin-profile-pill">
          <div className="profile-avatar">JC</div>
          <div className="profile-info">
            <span className="profile-name">Juan dela Cruz</span>
            <span className="profile-role">School Principal</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
