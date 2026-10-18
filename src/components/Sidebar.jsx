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
} from 'lucide-react';
import SchoolLogo from './SchoolLogo';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Classes & Sections', path: '/admin/classes', icon: BookOpen },
  { name: 'Academic Records', path: '/admin/records', icon: FileSpreadsheet },
  { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
  { name: 'System Logs', path: '/admin/logs', icon: Terminal },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <SchoolLogo size={38} className="school-emblem" />
        <div className="sidebar-brand-text">
          <h1>CNHS Learn</h1>
          <p>Cambaog Nat'l High School</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <div className="nav-section-label">Menu</div>
        {NAV_ITEMS.map((item) => {
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
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
