import React, { useState } from 'react';
import {
  School,
  User,
  Shield,
  HardDrive,
  Save,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { SCHOOL_INFO } from '../data/mockData';

export function SettingsPage() {
  const [saveToast, setSaveToast] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Form states
  const [schoolData, setSchoolData] = useState({
    name: SCHOOL_INFO.name,
    schoolId: SCHOOL_INFO.schoolId,
    division: SCHOOL_INFO.division,
    region: SCHOOL_INFO.region,
    district: SCHOOL_INFO.district,
    address: SCHOOL_INFO.address,
    principal: SCHOOL_INFO.principal,
    email: SCHOOL_INFO.email,
    phone: SCHOOL_INFO.phone,
  });

  const [accountData, setAccountData] = useState({
    name: 'Juan dela Cruz',
    email: 'admin@cnhs.edu.ph',
    role: 'School Principal',
    currentPassword: '',
    newPassword: '',
  });

  const [securityData, setSecurityData] = useState({
    sessionTimeout: '60',
    twoFactor: true,
    ipLockout: true,
  });

  const [backupData] = useState({
    autoBackupTime: '03:00',
    retentionDays: '30',
    backupLocation: '/var/backups/cnhs-db',
    lastBackup: 'Today at 03:00 AM (428 MB)',
  });

  const [academicYear, setAcademicYear] = useState('2026 - 2027');
  const [quarter, setQuarter] = useState('Quarter 2');

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    setSaveToast('System settings and institutional parameters successfully updated.');
    setTimeout(() => {
      setSaveToast('');
    }, 2500);
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ paddingBottom: '32px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h2>System Settings</h2>
          <p>
            Institutional parameters, school head account credentials, security policies, and backup routines.
          </p>
        </div>
        <div className="page-header-actions">
          <Button
            variant="primary"
            icon={Save}
            onClick={handleSaveAll}
          >
            Save Settings
          </Button>
        </div>
      </div>

      {saveToast && (
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{saveToast}</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: School Information */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <div className="admin-card-title">
              <School size={18} />
              <span>School Information (DepEd Institutional Data)</span>
            </div>
            <StatusBadge status="Active" label="DepEd Bulacan Verified" />
          </div>
          <div className="admin-card-body">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">School Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.name}
                  onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">DepEd School ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.schoolId}
                  onChange={(e) => setSchoolData({ ...schoolData, schoolId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">School Head / Principal</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.principal}
                  onChange={(e) => setSchoolData({ ...schoolData, principal: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">District</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.district}
                  onChange={(e) => setSchoolData({ ...schoolData, district: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Schools Division</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.division}
                  onChange={(e) => setSchoolData({ ...schoolData, division: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">DepEd Region</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.region}
                  onChange={(e) => setSchoolData({ ...schoolData, region: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Official Campus Address</label>
              <input
                type="text"
                className="form-input"
                value={schoolData.address}
                onChange={(e) => setSchoolData({ ...schoolData, address: e.target.value })}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Official Institutional Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={schoolData.email}
                  onChange={(e) => setSchoolData({ ...schoolData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Telephone</label>
                <input
                  type="text"
                  className="form-input"
                  value={schoolData.phone}
                  onChange={(e) => setSchoolData({ ...schoolData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Principal Account & Security */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <div className="admin-card-title">
              <User size={18} />
              <span>School Principal Account & Security</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#0f3e2e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                JC
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                {accountData.name}
              </span>
              <StatusBadge role="Admin" />
            </div>
          </div>
          <div className="admin-card-body">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Principal Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Administrator Login Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={accountData.currentPassword}
                  onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password (leave blank to keep current)</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Minimum 8 characters"
                  value={accountData.newPassword}
                  onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                />
              </div>
            </div>

            {/* Security Policies */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="#14532d" />
                <span>Security Policies & Session Inactivity</span>
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>
                      Session Timeout
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Auto-disconnect idle sessions
                    </div>
                  </div>
                  <select
                    className="form-input"
                    style={{ width: '130px', padding: '6px 8px' }}
                    value={securityData.sessionTimeout}
                    onChange={(e) => setSecurityData({ ...securityData, sessionTimeout: e.target.value })}
                  >
                    <option value="15">15 mins</option>
                    <option value="30">30 mins</option>
                    <option value="60">60 mins</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>
                      Two-Factor Authentication
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Require DepEd authenticator code
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={securityData.twoFactor}
                    onChange={(e) => setSecurityData({ ...securityData, twoFactor: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#14532d', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Academic Term & Automated Backup */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <div className="admin-card-title">
              <HardDrive size={18} />
              <span>Academic Period & Automated Backups</span>
            </div>
            <StatusBadge status="Completed" label="Backup Engine Active" />
          </div>
          <div className="admin-card-body">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Active Academic Year</label>
                <select
                  className="form-input"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option value="2025 - 2026">2025 - 2026</option>
                  <option value="2026 - 2027">2026 - 2027 (Current)</option>
                  <option value="2027 - 2028">2027 - 2028 (Upcoming)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Grading Period</label>
                <select
                  className="form-input"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                >
                  <option value="Quarter 1">Quarter 1 (Closed)</option>
                  <option value="Quarter 2">Quarter 2 (Active)</option>
                  <option value="Quarter 3">Quarter 3</option>
                  <option value="Quarter 4">Quarter 4</option>
                </select>
              </div>
            </div>

            {backupSuccess && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Manual database snapshot created: <code>cnhs_db_20261018_manual.tar.gz</code> (428 MB).</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginTop: '8px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0f172a' }}>
                  Latest Database Snapshot
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  {backupData.lastBackup} • Target: <code>{backupData.backupLocation}</code> (Retention: {backupData.retentionDays} days)
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                icon={RefreshCw}
                onClick={handleTriggerBackup}
                disabled={isBackingUp}
              >
                {isBackingUp ? 'Creating Snapshot...' : 'Create Snapshot Now'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <Button
            type="submit"
            variant="primary"
            icon={Save}
          >
            Save All Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
