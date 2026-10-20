import React, { useState } from 'react';
import {
  Users,
  CalendarCheck,
  Award,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Printer,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { TEACHER_ADVISORY_STUDENTS, SCHOOL_INFO } from '../data/mockData';
import { useAuth } from '../context/useAuth';

export function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState(TEACHER_ADVISORY_STUDENTS);
  const [searchStudent, setSearchStudent] = useState('');
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('English 7');
  const [toastMessage, setToastMessage] = useState('');

  // Daily attendance state for advisory class
  const presentCount = students.filter((s) => s.attendance === 'Present').length;
  const absentCount = students.filter((s) => s.attendance === 'Absent').length;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.lrn.includes(searchStudent)
  );

  const handleToggleAttendance = (studentId) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            attendance: s.attendance === 'Present' ? 'Absent' : 'Present',
          };
        }
        return s;
      })
    );
  };

  const handleSaveAttendance = () => {
    setToastMessage("Today's advisory attendance (Grade 7 – Ramon) successfully synchronized with DepEd SF-2.");
    setAttendanceModalOpen(false);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveGrades = (e) => {
    e.preventDefault();
    setToastMessage(`Quarter 2 electronic grades for ${selectedSubject} saved and submitted for verification.`);
    setGradingModalOpen(false);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDownloadSF2 = () => {
    setToastMessage("Exporting DepEd SF-2 Monthly Attendance for Grade 7 – Ramon (Excel XLSX)...");
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handlePrintSF9 = () => {
    setToastMessage("Preparing Form 138 / SF-9 Learner Progress Report Cards for 45 learners...");
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#14532d',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={18} color="#86efac" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Teacher Welcome Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f3e2e 0%, #166534 60%, #15803d 100%)',
          borderRadius: '12px',
          padding: '24px 28px',
          color: '#ffffff',
          marginBottom: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Faculty & Class Adviser Portal
            </span>
            <span style={{ fontSize: '12px', opacity: 0.9 }}>
              {SCHOOL_INFO.shortName} • DepEd ID {SCHOOL_INFO.schoolId}
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0 8px 0', color: '#ffffff' }}>
            Welcome back, {currentUser?.name || 'Mrs. Evelyn Bautista'}!
          </h2>

          <p style={{ fontSize: '13.5px', color: '#bbf7d0', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            Adviser of <strong>Grade 7 – Ramon</strong> (45 Enrolled Learners) • Room: Bldg A - Room 101 (Morning Shift: 7:00 AM – 1:00 PM).
          </p>
        </div>

        {/* Action Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '18px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <button
            type="button"
            onClick={() => setAttendanceModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              color: '#14532d',
              padding: '8px 14px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12.5px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <CalendarCheck size={15} />
            <span>Mark Daily Attendance</span>
          </button>

          <button
            type="button"
            onClick={() => setGradingModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12.5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
            }}
          >
            <FileSpreadsheet size={15} />
            <span>Encode Subject Grades (ECR)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSF2}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12.5px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
            }}
          >
            <Download size={15} />
            <span>Export SF-2 Monthly</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card">
          <div className="kpi-card-inner">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
              <Users size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Advisory Class</span>
              <div className="kpi-value">45</div>
              <span className="kpi-subtext">Grade 7 – Ramon (100% Enrolled)</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-inner">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
              <CalendarCheck size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Present Today</span>
              <div className="kpi-value">{presentCount} / 45</div>
              <span className="kpi-subtext" style={{ color: '#15803d', fontWeight: 600 }}>
                {absentCount === 0 ? '100% Perfect Attendance' : `${absentCount} Absent with Excuse`}
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-inner">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
              <BookOpen size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">Teaching Loads</span>
              <div className="kpi-value">2</div>
              <span className="kpi-subtext">English 7 (Sections Ramon & Quezon)</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-inner">
            <div className="kpi-icon-wrap" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
              <Award size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-title">ECR Submission</span>
              <div className="kpi-value">85%</div>
              <span className="kpi-subtext" style={{ color: '#7e22ce', fontWeight: 600 }}>Quarter 2 In Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Subject Grading Progress & Today's Attendance Overview */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        {/* Left Column: Subject Classes & Grading Status */}
        <div className="dashboard-card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div>
              <h3>Electronic Class Record (ECR) Progress</h3>
              <p>Quarter 2 Subject Grade sheets & submission checkpoints</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              icon={FileSpreadsheet}
              onClick={() => setGradingModalOpen(true)}
            >
              Encode
            </Button>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Subject 1 */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                      English 7 — Grade 7 Ramon
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', marginLeft: '8px' }}>
                      45 Students
                    </span>
                  </div>
                  <StatusBadge label="In Session" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                  <span>Written Work & Tasks: 85% completed</span>
                  <span style={{ fontWeight: 600, color: '#166534' }}>Due Oct 28, 2026</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: '#16a34a', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Subject 2 */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                      English 7 — Grade 7 Quezon
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', marginLeft: '8px' }}>
                      44 Students
                    </span>
                  </div>
                  <StatusBadge label="In Session" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                  <span>Written Work & Tasks: 70% completed</span>
                  <span style={{ fontWeight: 600, color: '#166534' }}>Due Oct 28, 2026</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', backgroundColor: '#0284c7', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Subject 3 */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f0fdf4',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                      Homeroom Guidance 7 — Section Ramon
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#64748b', marginLeft: '8px' }}>
                      45 Students
                    </span>
                  </div>
                  <StatusBadge label="Completed" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                  <span>Module 1 & 2 Evaluations: 100% Encoded</span>
                  <span style={{ fontWeight: 600, color: '#15803d' }}>Verified by Principal</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#15803d', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Advisory Class Details & DepEd School Forms */}
        <div className="dashboard-card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div>
              <h3>Advisory Class Profile & Forms</h3>
              <p>DepEd standard forms and section logistics</p>
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            {/* Class metadata */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                marginBottom: '16px',
                fontSize: '12px',
              }}
            >
              <div>
                <span style={{ color: '#64748b' }}>Designation:</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Class Adviser</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Assigned Room:</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Bldg A - Room 101</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Class Schedule:</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>7:00 AM – 1:00 PM (Morning)</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Curriculum:</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>DepEd MATATAG / K-12</div>
              </div>
            </div>

            {/* Quick School Form Downloads */}
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
              DepEd Official School Forms for Grade 7 – Ramon:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0f172a' }}>
                    School Form 1 (SF-1) School Register
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Master list of 45 learners with LRN & Birth Certificates</div>
                </div>
                <Button size="sm" variant="secondary" icon={Download} onClick={() => {
                  setToastMessage("Downloading SF-1 School Register for Section Ramon...");
                  setTimeout(() => setToastMessage(''), 2500);
                }}>
                  SF-1
                </Button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0f172a' }}>
                    School Form 2 (SF-2) Learner Attendance
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>October 2026 Monthly Attendance Record</div>
                </div>
                <Button size="sm" variant="secondary" icon={Download} onClick={handleDownloadSF2}>
                  SF-2
                </Button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0f172a' }}>
                    Form 138 / SF-9 Progress Report Cards
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Learner quarterly grades & values report</div>
                </div>
                <Button size="sm" variant="secondary" icon={Printer} onClick={handlePrintSF9}>
                  SF-9
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Learners Roster Table */}
      <div className="dashboard-card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3>Grade 7 – Ramon Learner Roster</h3>
            <p>Officially enrolled learners, academic general average, and today's attendance status</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search by learner name or LRN..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="form-input"
              style={{ width: '260px', padding: '6px 12px', fontSize: '12.5px' }}
            />
            <Button
              size="sm"
              variant="primary"
              icon={CalendarCheck}
              onClick={() => setAttendanceModalOpen(true)}
            >
              Take Attendance
            </Button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Learner Name</th>
                <th>LRN Number</th>
                <th>Gender</th>
                <th>Q1 Gen. Average</th>
                <th>Today's Attendance</th>
                <th>Academic Standing</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{s.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#475569' }}>{s.lrn}</td>
                  <td>
                    <span
                      style={{
                        fontSize: '11.5px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: s.gender === 'Male' ? '#eff6ff' : '#fdf2f8',
                        color: s.gender === 'Male' ? '#1d4ed8' : '#be185d',
                        fontWeight: 600,
                      }}
                    >
                      {s.gender}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        color: s.generalAverage >= 90 ? '#15803d' : '#0f172a',
                      }}
                    >
                      {s.generalAverage}%
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleAttendance(s.id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      title="Click to toggle attendance for this learner"
                    >
                      <StatusBadge
                        status={s.attendance === 'Present' ? 'Active' : 'Error'}
                        label={s.attendance}
                      />
                    </button>
                  </td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{s.remarks}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setToastMessage(`Viewing academic profile for ${s.name} (LRN: ${s.lrn})`);
                        setTimeout(() => setToastMessage(''), 2500);
                      }}
                      style={{
                        fontSize: '11.5px',
                        color: '#166534',
                        fontWeight: 600,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <span>Details</span>
                      <ChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Interactive Daily Attendance Sheet */}
      <Modal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        title="Mark Daily Class Attendance — Grade 7 Ramon"
        size="lg"
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '12.5px' }}>
            <div style={{ color: '#475569' }}>
              Date: <strong>October 21, 2026</strong> • Adviser: <strong>{currentUser?.name || 'Mrs. Evelyn Bautista'}</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ background: '#f0fdf4', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                {presentCount} Present
              </span>
              <span style={{ background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                {absentCount} Absent
              </span>
            </div>
          </div>

          <div style={{ maxHeight: '360px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Learner Name</th>
                  <th>LRN</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'right' }}>Toggle Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student.id}>
                    <td style={{ fontSize: '11px', color: '#94a3b8' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '11.5px', color: '#64748b' }}>{student.lrn}</td>
                    <td style={{ textAlign: 'center' }}>
                      <StatusBadge
                        status={student.attendance === 'Present' ? 'Active' : 'Error'}
                        label={student.attendance}
                      />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(student.id)}
                        className={`btn ${student.attendance === 'Present' ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ padding: '4px 10px', fontSize: '11.5px' }}
                      >
                        Set as {student.attendance === 'Present' ? 'Absent' : 'Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
            <Button variant="secondary" onClick={() => setAttendanceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={CheckCircle2} onClick={handleSaveAttendance}>
              Save & Submit SF-2 Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Encode Subject Grades */}
      <Modal
        isOpen={gradingModalOpen}
        onClose={() => setGradingModalOpen(false)}
        title="Electronic Class Record (ECR) — Grade Encoding"
        size="md"
      >
        <form onSubmit={handleSaveGrades}>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Select Teaching Load / Subject</label>
            <select
              className="form-input"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="English 7 - Grade 7 Ramon">English 7 — Grade 7 Ramon (Morning)</option>
              <option value="English 7 - Grade 7 Quezon">English 7 — Grade 7 Quezon (Morning)</option>
              <option value="Homeroom Guidance 7 - Grade 7 Ramon">Homeroom Guidance 7 — Grade 7 Ramon</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Grading Period</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ padding: '6px 12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                Quarter 2 (Current)
              </span>
              <span style={{ padding: '6px 12px', background: '#f8fafc', borderRadius: '6px', fontSize: '12px', color: '#64748b' }}>
                S.Y. 2026–2027
              </span>
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', fontSize: '12px' }}>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>DepEd Order No. 8, s. 2015 Grading Weights:</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
              <span>Written Works: <strong>40%</strong></span>
              <span>Performance Tasks: <strong>40%</strong></span>
              <span>Quarterly Exam: <strong>20%</strong></span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label">Batch Electronic Grade Sheet Upload (XLSX / CSV)</label>
            <input
              type="file"
              className="form-input"
              style={{ fontSize: '12px', padding: '8px' }}
            />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Official DepEd Electronic Class Record (.xlsx) template compatible
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <Button variant="secondary" onClick={() => setGradingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={CheckCircle2}>
              Save & Submit Grades
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TeacherDashboard;
