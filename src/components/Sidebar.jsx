import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileSpreadsheet,
  CalendarCheck,
  BarChart3,
  Terminal,
  Settings,
  LogOut,
  GraduationCap,
  Shield,
} from 'lucide-react';
import SchoolLogo from './SchoolLogo';
import { useAuth } from '../context/useAuth';

export function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser, isTeacher, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = isTeacher
    ? [
        { name: 'Teacher Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
        { name: 'My Advisory Class', path: '/admin/classes', icon: BookOpen },
        { name: 'Subject Records & Grades', path: '/admin/records', icon: FileSpreadsheet },
        { name: 'Daily Attendance', path: '/admin/attendance', icon: CalendarCheck },
        { name: 'Class Forms & Reports', path: '/admin/reports', icon: BarChart3 },
        { name: 'Faculty Profile', path: '/admin/settings', icon: Settings },
      ]
    : [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Classes & Sections', path: '/admin/classes', icon: BookOpen },
        { name: 'Academic Records', path: '/admin/records', icon: FileSpreadsheet },
        { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
        { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
        { name: 'System Logs', path: '/admin/logs', icon: Terminal },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <SchoolLogo size={38} className="school-emblem" />
        <div className="sidebar-brand-text">
          <h1>CNHS Learn</h1>
          <p>{isTeacher ? 'Faculty & Advisory Portal' : "Cambaog Nat'l High School"}</p>
        </div>
      </div>

      {/* Role Pill */}
      <div style={{ padding: '0 16px 12px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 8px',
            borderRadius: '6px',
            backgroundColor: isTeacher ? '#eff6ff' : '#f0fdf4',
            border: isTeacher ? '1px solid #bfdbfe' : '1px solid #bbf7d0',
            color: isTeacher ? '#1d4ed8' : '#166534',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          {isTeacher ? <GraduationCap size={14} /> : <Shield size={14} />}
          <span>{isTeacher ? 'Teacher: Gr. 7 – Ramon' : 'Role: Principal / Admin'}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <div className="nav-section-label">{isTeacher ? 'Faculty Menu' : 'Admin Menu'}</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => {
                if (window.innerWidth <= 768 && onClose) onClose();
              }}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="admin-sidebar-footer">
        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout ({currentUser?.role})</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
