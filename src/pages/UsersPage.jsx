import React, { useState, useMemo } from 'react';
import {
  UserPlus,
  Eye,
  Edit2,
  UserX,
  UserCheck,
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { INITIAL_USERS } from '../data/mockData';

export function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Teacher',
    email: '',
    department: 'Secondary Faculty',
    status: 'Active',
  });

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: newUser.name,
      role: newUser.role,
      email: newUser.email,
      department: newUser.department,
      status: 'Active',
      lastLogin: 'Never (Just Created)',
    };
    setUsers([created, ...users]);
    setIsAddOpen(false);
    setNewUser({
      name: '',
      role: 'Teacher',
      email: '',
      department: 'Secondary Faculty',
      status: 'Active',
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0f3e2e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {val.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{val}</div>
            <div style={{ fontSize: '11.5px', color: '#64748b' }}>{row.department}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (val) => <StatusBadge role={val} />,
      width: '120px',
    },
    {
      key: 'email',
      label: 'Email',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#334155' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
      width: '110px',
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (val) => (
        <span style={{ fontSize: '12px', color: '#64748b' }}>{val}</span>
      ),
      width: '160px',
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '210px',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Button
            size="sm"
            variant="secondary"
            icon={Eye}
            onClick={() => setViewingUser(row)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon={Edit2}
            onClick={() => setEditingUser(row)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant={row.status === 'Active' ? 'danger' : 'secondary'}
            icon={row.status === 'Active' ? UserX : UserCheck}
            onClick={() => handleToggleStatus(row.id)}
          >
            {row.status === 'Active' ? 'Disable' : 'Enable'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>User Management</h2>
          <p>
            Manage administrative personnel, faculty members, and student accounts for Cambaog National High School.
          </p>
        </div>
        <div className="page-header-actions">
          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddOpen(true)}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* User Table with search and filters */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        keyField="id"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, or department..."
        filters={[
          {
            label: 'Role',
            value: roleFilter,
            options: [
              { label: 'All Roles', value: 'ALL' },
              { label: 'Administrators', value: 'Admin' },
              { label: 'Teachers', value: 'Teacher' },
              { label: 'Students', value: 'Student' },
            ],
            onChange: setRoleFilter,
          },
          {
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'All Statuses', value: 'ALL' },
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ],
            onChange: setStatusFilter,
          },
        ]}
      />

      {/* Modal: View User Details */}
      <Modal
        isOpen={Boolean(viewingUser)}
        onClose={() => setViewingUser(null)}
        title="User Account Details"
        footer={
          <Button
            variant="secondary"
            onClick={() => setViewingUser(null)}
          >
            Close
          </Button>
        }
      >
        {viewingUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#0f3e2e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                {viewingUser.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                  {viewingUser.name}
                </h4>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <StatusBadge role={viewingUser.role} />
                  <StatusBadge status={viewingUser.status} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  User ID
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingUser.id}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Email Address
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px', fontFamily: 'monospace' }}>
                  {viewingUser.email}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Department / Section
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingUser.department}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Last System Login
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingUser.lastLogin}
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
              <strong>DepEd Institutional Account:</strong> Synchronized with the Cambaog NHS active directory database. Access privileges are enforced via role-based access controls.
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Edit User */}
      <Modal
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        title="Edit User Profile"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditSubmit}
            >
              Save Changes
            </Button>
          </>
        }
      >
        {editingUser && (
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  className="form-input"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="Admin">Administrator</option>
                  <option value="Teacher">Teacher / Faculty</option>
                  <option value="Student">Learner / Student</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department / Assignment</label>
              <input
                type="text"
                className="form-input"
                value={editingUser.department}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, department: e.target.value })
                }
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Modal: Add New User */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New User Account"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsAddOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSubmit}
            >
              Create Account
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Rolando S. Mendoza"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                className="form-input"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Teacher">Teacher / Faculty</option>
                <option value="Admin">Administrator</option>
                <option value="Student">Learner / Student</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Department / Assignment</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Science Dept"
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
              placeholder="r.mendoza@cnhs.edu.ph"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UsersPage;
