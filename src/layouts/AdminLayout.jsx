import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const titlesMap = {
  '/admin': { title: 'Dashboard', subtitle: 'System overview, status monitoring, and key metrics' },
  '/admin/users': { title: 'User Management', subtitle: 'Manage school faculty, administration, and learner accounts' },
  '/admin/classes': { title: 'Classes & Sections', subtitle: 'Grade level sections, room assignments, and class advisers' },
  '/admin/records': { title: 'Academic Records', subtitle: 'Grade sheets, quarterly submissions, and learner records' },
  '/admin/attendance': { title: 'Attendance Monitoring', subtitle: 'Daily school attendance records and DepEd SF-2 summaries' },
  '/admin/reports': { title: 'System Reports', subtitle: 'Official DepEd reports, user directory, and data exports' },
  '/admin/logs': { title: 'System Logs', subtitle: 'Audit trail, security activities, and operational event logs' },
  '/admin/settings': { title: 'Settings', subtitle: 'School parameters, account security, and system configuration' },
};

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentMeta = titlesMap[location.pathname] || {
    title: 'Admin Console',
    subtitle: 'Cambaog National High School Administration System',
  };

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Header
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
