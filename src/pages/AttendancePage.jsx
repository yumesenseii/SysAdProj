import React, { useState } from 'react';
import { Download, CheckCircle2, UserCheck } from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { useAuth } from '../context/useAuth';

export function AttendancePage() {
  const { currentUser, isTeacher } = useAuth();
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [onlyMySection, setOnlyMySection] = useState(isTeacher);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const attendanceData = [
    {
      id: 'ATT-701',
      grade: 'Grade 7',
      section: 'Ramon',
      adviser: 'Mrs. Evelyn Bautista',
      enrolled: 45,
      presentToday: 44,
      absentToday: 1,
      attendanceRate: '97.8%',
      status: 'Submitted',
    },
    {
      id: 'ATT-702',
      grade: 'Grade 7',
      section: 'Quezon',
      adviser: 'Mr. Roberto Cruz',
      enrolled: 44,
      presentToday: 43,
      absentToday: 1,
      attendanceRate: '97.7%',
      status: 'Submitted',
    },
    {
      id: 'ATT-801',
      grade: 'Grade 8',
      section: 'Mabini',
      adviser: 'Ms. Maricel Del Rosario',
      enrolled: 43,
      presentToday: 41,
      absentToday: 2,
      attendanceRate: '95.3%',
      status: 'Submitted',
    },
    {
      id: 'ATT-802',
      grade: 'Grade 8',
      section: 'Aguinaldo',
      adviser: 'Mr. Francisco Reyes',
      enrolled: 42,
      presentToday: 42,
      absentToday: 0,
      attendanceRate: '100%',
      status: 'Submitted',
    },
    {
      id: 'ATT-901',
      grade: 'Grade 9',
      section: 'Rizal',
      adviser: 'Mrs. Grace Mendoza',
      enrolled: 45,
      presentToday: 43,
      absentToday: 2,
      attendanceRate: '95.6%',
      status: 'Submitted',
    },
    {
      id: 'ATT-1001',
      grade: 'Grade 10',
      section: 'Bonifacio',
      adviser: 'Mrs. Lorna Villanueva',
      enrolled: 43,
      presentToday: 42,
      absentToday: 1,
      attendanceRate: '97.7%',
      status: 'Submitted',
    },
  ];

  const filteredData = attendanceData.filter((item) => {
    const matchesGrade = gradeFilter === 'ALL' || item.grade === gradeFilter;
    let matchesTeacher = true;
    if (onlyMySection && isTeacher) {
      matchesTeacher =
        item.adviser.toLowerCase().includes(currentUser.name.toLowerCase().split(' ').slice(-1)[0]) ||
        (currentUser.assignedSection && item.section.toLowerCase().includes(currentUser.assignedSection.toLowerCase()));
    }
    return matchesGrade && matchesTeacher;
  });

  const handleExportSF2 = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const columns = [
    {
      key: 'section',
      label: 'Section & Adviser',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0f172a' }}>
            {row.grade} – {val}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b' }}>Adviser: {row.adviser}</div>
        </div>
      ),
    },
    {
      key: 'enrolled',
      label: 'Enrolled',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
      width: '100px',
    },
    {
      key: 'presentToday',
      label: 'Present Today',
      render: (val) => (
        <span style={{ color: '#16a34a', fontWeight: 600 }}>{val}</span>
      ),
      width: '130px',
    },
    {
      key: 'absentToday',
      label: 'Absent',
      render: (val) => (
        <span style={{ color: val > 0 ? '#dc2626' : '#64748b', fontWeight: 600 }}>
          {val}
        </span>
      ),
      width: '100px',
    },
    {
      key: 'attendanceRate',
      label: 'Rate',
      render: (val) => (
        <span style={{ fontWeight: 700, color: '#14532d' }}>{val}</span>
      ),
      width: '110px',
    },
    {
      key: 'status',
      label: 'Daily Status',
      render: (val) => <StatusBadge status="Completed" label={val} />,
      width: '140px',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Daily Attendance Monitoring</h2>
          <p>
            Real-time learner presence monitoring and DepEd School Form 2 (SF-2) logs.
          </p>
        </div>
        <div className="page-header-actions">
          {isTeacher && (
            <Button
              variant={onlyMySection ? 'primary' : 'secondary'}
              icon={UserCheck}
              onClick={() => setOnlyMySection(!onlyMySection)}
            >
              {onlyMySection ? `Showing: My Section (${currentUser.assignedSection || 'Ramon'})` : 'Show All School Sections'}
            </Button>
          )}
          <Button
            variant="primary"
            icon={Download}
            onClick={handleExportSF2}
          >
            Export DepEd SF-2 Summary
          </Button>
        </div>
      </div>

      {downloadSuccess && (
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
          <span>School Form 2 (SF-2) Monthly Attendance Record exported successfully.</span>
        </div>
      )}

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Today's School Attendance Rate
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#14532d', marginTop: '4px' }}>
            97.4%
          </div>
          <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '4px' }}>
            1,360 / 1,396 learners in attendance
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Absences Today
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            36 Learners
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
            28 excused / 8 unexcused
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Section Logs Submitted
          </div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            32 / 32 Sections
          </div>
          <div style={{ fontSize: '11.5px', color: '#16a34a', marginTop: '4px' }}>
            100% submission compliance
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        keyField="id"
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
    </div>
  );
}

export default AttendancePage;
