import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import UsersPage from './pages/UsersPage';
import ClassesPage from './pages/ClassesPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';
import RecordsPage from './pages/RecordsPage';
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import RoleGuard from './components/RoleGuard';

function DashboardSelector() {
  const { isTeacher } = useAuth();
  return isTeacher ? <TeacherDashboard /> : <AdminDashboard />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin / Faculty Portal Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardSelector />} />
            <Route
              path="users"
              element={
                <RoleGuard requiredRole="Admin" moduleName="User Management">
                  <UsersPage />
                </RoleGuard>
              }
            />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="records" element={<RecordsPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route
              path="logs"
              element={
                <RoleGuard requiredRole="Admin" moduleName="System Security & Audit Logs">
                  <LogsPage />
                </RoleGuard>
              }
            />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

