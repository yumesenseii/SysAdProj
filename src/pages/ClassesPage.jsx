import React, { useState, useMemo } from 'react';
import {
  Plus,
  Users,
  Eye,
  GraduationCap,
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { INITIAL_CLASSES } from '../data/mockData';
import { useAuth } from '../context/useAuth';

export function ClassesPage() {
  const { currentUser, isTeacher } = useAuth();
  const [classesList, setClassesList] = useState(INITIAL_CLASSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingClass, setViewingClass] = useState(null);

  // New Class Form State
  const [newClass, setNewClass] = useState({
    grade: 'Grade 7',
    section: '',
    adviser: '',
    learnerCount: 40,
    room: 'Bldg A - Room 103',
    schedule: '7:00 AM - 1:00 PM (Morning)',
  });

  const filteredClasses = useMemo(() => {
    return classesList.filter((c) => {
      const matchesSearch =
        c.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.adviser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.room.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = gradeFilter === 'ALL' || c.grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [classesList, searchQuery, gradeFilter]);

  const totalLearners = classesList.reduce((acc, c) => acc + c.learnerCount, 0);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `CLS-${Date.now()}`,
      grade: newClass.grade,
      section: newClass.section,
      adviser: newClass.adviser,
      learnerCount: parseInt(newClass.learnerCount, 10) || 40,
      status: 'Active',
      room: newClass.room,
      schedule: newClass.schedule,
    };
    setClassesList([...classesList, created]);
    setIsAddOpen(false);
    setNewClass({
      grade: 'Grade 7',
      section: '',
      adviser: '',
      learnerCount: 40,
      room: 'Bldg A - Room 103',
      schedule: '7:00 AM - 1:00 PM (Morning)',
    });
  };

  const columns = [
    {
      key: 'grade',
      label: 'Grade Level',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#0f172a' }}>{val}</span>
      ),
      width: '130px',
    },
    {
      key: 'section',
      label: 'Section',
      render: (val, row) => (
        <div>
          <span style={{ fontWeight: 700, color: '#14532d', fontSize: '14px' }}>
            {row.grade} – {val}
          </span>
          <div style={{ fontSize: '11.5px', color: '#64748b' }}>{row.room}</div>
        </div>
      ),
    },
    {
      key: 'adviser',
      label: 'Class Adviser',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#14532d',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {val.split(' ').slice(-1)[0][0]}
          </div>
          <span style={{ fontWeight: 500, color: '#1e293b' }}>{val}</span>
        </div>
      ),
    },
    {
      key: 'learnerCount',
      label: 'Learner Count',
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Users size={14} color="#64748b" />
          <span style={{ fontWeight: 600, color: '#0f172a' }}>{val}</span>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>students</span>
        </div>
      ),
      width: '160px',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} label={val} />,
      width: '120px',
    },
    {
      key: 'actions',
      label: 'Action',
      width: '120px',
      render: (_, row) => (
        <Button
          size="sm"
          variant="secondary"
          icon={Eye}
          onClick={() => setViewingClass(row)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>{isTeacher ? 'My Advisory & School Sections' : 'Classes & Sections'}</h2>
          <p>
            {isTeacher
              ? `Advisory assignment for ${currentUser?.name || 'Mrs. Evelyn Bautista'} (Section ${currentUser?.assignedSection || 'Ramon'}) and school roster.`
              : 'Junior High School grade level sections, assigned class advisers, and learner counts.'}
          </p>
        </div>
        <div className="page-header-actions">
          {isTeacher ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '6px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: '#1d4ed8',
                fontSize: '12.5px',
                fontWeight: 600,
              }}
            >
              <GraduationCap size={16} />
              <span>Assigned Section: {currentUser?.assignedGrade || 'Grade 7'} – {currentUser?.assignedSection || 'Ramon'}</span>
            </div>
          ) : (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setIsAddOpen(true)}
            >
              Add New Section
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Sections
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {classesList.length} Sections
          </div>
          <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '4px' }}>
            Grades 7 through 10
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Enrolled
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {totalLearners} Learners
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
            DepEd LIS Verified
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Average Class Size
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {Math.round(totalLearners / (classesList.length || 1))} / class
          </div>
          <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '4px' }}>
            Within DepEd Ratio
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Adviser Coverage
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            100%
          </div>
          <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '4px' }}>
            All sections assigned
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <DataTable
        columns={columns}
        data={filteredClasses}
        keyField="id"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by section name, adviser, or room..."
        filters={[
          {
            label: 'Grade Level',
            value: gradeFilter,
            options: [
              { label: 'All Grades', value: 'ALL' },
              { label: 'Grade 7', value: 'Grade 7' },
              { label: 'Grade 8', value: 'Grade 8' },
              { label: 'Grade 9', value: 'Grade 9' },
              { label: 'Grade 10', value: 'Grade 10' },
            ],
            onChange: setGradeFilter,
          },
        ]}
      />

      {/* Modal: View Section Details */}
      <Modal
        isOpen={Boolean(viewingClass)}
        onClose={() => setViewingClass(null)}
        title={viewingClass ? `${viewingClass.grade} – ${viewingClass.section} Details` : 'Class Details'}
        footer={
          <Button
            variant="secondary"
            onClick={() => setViewingClass(null)}
          >
            Close
          </Button>
        }
      >
        {viewingClass && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Class Code
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingClass.id}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Grade & Section
                </div>
                <div style={{ fontWeight: 700, color: '#14532d', marginTop: '2px' }}>
                  {viewingClass.grade} – {viewingClass.section}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Designated Adviser
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingClass.adviser}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Learner Count
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingClass.learnerCount} Officially Enrolled
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Room Assignment
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingClass.room}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Daily Schedule
                </div>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                  {viewingClass.schedule}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                Sample Roster Preview ({viewingClass.section})
              </h5>
              <div style={{ maxHeight: '160px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f8fafc', color: '#475569', textAlign: 'left' }}>
                    <tr>
                      <th style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>LRN</th>
                      <th style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Student Name</th>
                      <th style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { lrn: '10309924001', name: 'Aquino, Angelo Gabriel M.', status: 'Enrolled' },
                      { lrn: '10309924002', name: 'Bautista, Clarisse Joy D.', status: 'Enrolled' },
                      { lrn: '10309924003', name: 'Castro, Christian Dave R.', status: 'Enrolled' },
                      { lrn: '10309924004', name: 'Dela Cruz, Mark Anthony P.', status: 'Enrolled' },
                    ].map((s, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 10px', fontFamily: 'monospace' }}>{s.lrn}</td>
                        <td style={{ padding: '6px 10px', fontWeight: 500 }}>{s.name}</td>
                        <td style={{ padding: '6px 10px', color: '#16a34a' }}>{s.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Add Section */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create New Section"
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
              Create Section
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Grade Level</label>
              <select
                className="form-input"
                value={newClass.grade}
                onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
              >
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Section Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Mabini or Del Pilar"
                value={newClass.section}
                onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Class Adviser (Faculty)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Mrs. Rosario Santos"
              value={newClass.adviser}
              onChange={(e) => setNewClass({ ...newClass, adviser: e.target.value })}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Room Allocation</label>
              <input
                type="text"
                className="form-input"
                value={newClass.room}
                onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Learners</label>
              <input
                type="number"
                className="form-input"
                value={newClass.learnerCount}
                onChange={(e) => setNewClass({ ...newClass, learnerCount: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ClassesPage;
