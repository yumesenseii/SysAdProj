import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  BookOpen,
  UserPlus,
  FileText,
  Clock,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Download,
  FolderOpen,
} from 'lucide-react';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import Button from '../components/Button';
import {
  KPI_DATA,
  USER_OVERVIEW,
  RECENT_ACTIVITIES,
  SYSTEM_STATUS,
  SCHOOL_INFO,
} from '../data/mockData';

export function AdminDashboard() {
  const navigate = useNavigate();

  // Modals
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccessMessage, setReportSuccessMessage] = useState('');

  // Add User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Teacher',
    email: '',
    department: 'Junior High School',
  });
  const [userAddedSuccess, setUserAddedSuccess] = useState(false);

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setUserAddedSuccess(true);
    setTimeout(() => {
      setUserAddedSuccess(false);
      setIsAddUserOpen(false);
      setNewUser({ name: '', role: 'Teacher', email: '', department: 'Junior High School' });
    }, 1200);
  };

  const handleGenerateReport = (reportType) => {
    setReportSuccessMessage(`Report "${reportType}" successfully prepared and downloaded.`);
    setTimeout(() => {
      setReportSuccessMessage('');
      setIsReportModalOpen(false);
    }, 1500);
  };

  return (
    <div>
      {/* Top Welcome Banner */}
      <div className="page-header">
        <div className="page-header-title">
          <h2>System Administrator Dashboard</h2>
          <p>
            Central control console for {SCHOOL_INFO.name} (School ID: {SCHOOL_INFO.schoolId})
          </p>
        </div>
        <div className="page-header-actions">
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => setIsReportModalOpen(true)}
          >
            Generate Report
          </Button>
          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddUserOpen(true)}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {KPI_DATA.map((kpi) => (
          <KPICard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            subtext={kpi.subtext}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Row 1: User Overview & Recent System Activity */}
      <div className="dashboard-grid-2">
        {/* A. User Overview */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Users size={18} />
              <span>User Overview</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/admin/users')}
            >
              <span>Manage Users</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="admin-card-body">
            <div className="user-overview-list">
              {USER_OVERVIEW.map((item, idx) => (
                <div key={idx} className="user-overview-item">
                  <div className="user-overview-info">
                    <span className="user-role-label">
                      <span>{item.role}</span>
                      <StatusBadge
                        role={
                          item.role.includes('Admin')
                            ? 'Admin'
                            : item.role.includes('Faculty')
                            ? 'Teacher'
                            : 'Student'
                        }
                      />
                    </span>
                    <span className="user-role-count">
                      {item.count.toLocaleString()} accounts
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-bar-fill ${item.colorClass}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                    {item.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* B. Recent System Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Clock size={18} />
              <span>Recent System Activity</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/admin/logs')}
            >
              <span>View All Logs</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="admin-card-body">
            <div className="activity-list">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon-bullet">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{act.title}</div>
                    <div className="activity-detail">{act.detail}</div>
                  </div>
                  <div className="activity-time">{act.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: System Status & Quick Actions */}
      <div className="dashboard-grid-2">
        {/* C. System Status */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Activity size={18} />
              <span>System Status</span>
            </div>
            <StatusBadge status="Operational" label="All Services Online" />
          </div>
          <div className="admin-card-body" style={{ padding: 0 }}>
            <table className="system-status-table">
              <tbody>
                {SYSTEM_STATUS.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="system-status-item-name">
                        <span className="pulse-dot" />
                        <span>{item.name}</span>
                      </div>
                      <div className="system-status-desc">{item.detail}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <StatusBadge status={item.status} label={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* D. Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <FolderOpen size={18} />
              <span>Quick Actions</span>
            </div>
            <span className="admin-card-subtitle">Frequently accessed tools</span>
          </div>
          <div className="admin-card-body">
            <div className="quick-actions-grid">
              <button
                type="button"
                className="quick-action-btn"
                onClick={() => setIsAddUserOpen(true)}
              >
                <div className="quick-action-icon">
                  <UserPlus size={20} />
                </div>
                <span>Add User</span>
              </button>

              <button
                type="button"
                className="quick-action-btn"
                onClick={() => navigate('/admin/classes')}
              >
                <div className="quick-action-icon">
                  <BookOpen size={20} />
                </div>
                <span>Manage Classes</span>
              </button>

              <button
                type="button"
                className="quick-action-btn"
                onClick={() => navigate('/admin/logs')}
              >
                <div className="quick-action-icon">
                  <Clock size={20} />
                </div>
                <span>View Logs</span>
              </button>

              <button
                type="button"
                className="quick-action-btn"
                onClick={() => setIsReportModalOpen(true)}
              >
                <div className="quick-action-icon">
                  <FileText size={20} />
                </div>
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add User */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add New School User"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsAddUserOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddUserSubmit}
            >
              Create Account
            </Button>
          </>
        }
      >
        {userAddedSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              Account Successfully Created
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              User credentials registered to CNHS Learn user database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAddUserSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Maria Corazon Santos"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">User Role</label>
                <select
                  className="form-input"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Teacher">Teacher / Faculty</option>
                  <option value="Admin">System Administrator</option>
                  <option value="Student">Learner / Student</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department / Section</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. English Dept / Grade 7"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (@cnhs.edu.ph)</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@cnhs.edu.ph"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>

            <div style={{ fontSize: '12px', color: '#64748b', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
              A temporary setup password <code>Pass2026!</code> will be provisioned. User will be prompted to set their credentials on initial login.
            </div>
          </form>
        )}
      </Modal>

      {/* Modal: Generate Report */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Generate Official School Report"
        footer={
          <Button
            variant="secondary"
            onClick={() => setIsReportModalOpen(false)}
          >
            Close
          </Button>
        }
      >
        {reportSuccessMessage ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              Report Generated
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              {reportSuccessMessage}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
              Select a standard DepEd or administrative document to export from CNHS Learn:
            </p>

            {[
              {
                title: "School Form 1 (SF-1) School Register",
                desc: "Official masterlist of enrolled students with demographic profiles.",
              },
              {
                title: "School Form 2 (SF-2) Attendance Log",
                desc: "Monthly learner attendance summary by section and grade level.",
              },
              {
                title: "Faculty & Staff Directory Roster",
                desc: "Complete listing of teachers, advisers, and designations.",
              },
              {
                title: "System Audit & Security Logs",
                desc: "Raw chronological audit trail of all administrative events.",
              },
            ].map((rep, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#1e293b' }}>
                    {rep.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    {rep.desc}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={Download}
                  onClick={() => handleGenerateReport(rep.title)}
                >
                  Export
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
