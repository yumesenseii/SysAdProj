import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from './Button';
import StatusBadge from './StatusBadge';

export function RoleGuard({ children, requiredRole = 'Admin', moduleName = 'Administrative Module' }) {
  const { currentUser, isAdmin, switchUser } = useAuth();
  const navigate = useNavigate();

  const hasAccess = requiredRole === 'Admin' ? isAdmin : true;

  if (!hasAccess) {
    return (
      <div style={{ maxWidth: '680px', margin: '40px auto', padding: '0 16px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: '12px',
            padding: '32px 28px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#fff7ed',
              color: '#c2410c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              border: '1px solid #ffedd5',
            }}
          >
            <ShieldAlert size={34} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <StatusBadge role={currentUser.role} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#9a3412',
                backgroundColor: '#ffedd5',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Access Restricted
            </span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
            {requiredRole} Privileges Required
          </h2>

          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
            The module <strong>{moduleName}</strong> is restricted to {requiredRole} accounts.
            You are currently signed in as <strong>{currentUser.name}</strong> ({currentUser.roleTitle || currentUser.role}) under the {currentUser.department || 'Faculty'}.
          </p>

          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              color: '#475569',
              marginBottom: '28px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{ fontWeight: 600, color: '#0f172a' }}>DepEd Data Privacy Notice:</div>
            <div>School audit trails, system configuration, and user permissions are guarded under RA 10173.</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Button
              variant="secondary"
              icon={ArrowLeft}
              onClick={() => navigate('/admin')}
            >
              Return to My Dashboard
            </Button>
            <Button
              variant="primary"
              icon={RefreshCw}
              onClick={() => {
                switchUser('admin');
              }}
            >
              Switch to Principal (Admin)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default RoleGuard;
