import React, { useState } from 'react';
import { Upload, CheckCircle2, Eye, UserCheck } from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useAuth } from '../context/useAuth';

export function RecordsPage() {
  const { currentUser, isTeacher } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [onlyMyRecords, setOnlyMyRecords] = useState(isTeacher);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const initialRecords = [
    {
      id: 'REC-701',
      grade: 'Grade 7',
      section: 'Ramon',
      subject: 'English 7',
      teacher: 'Mrs. Evelyn Bautista',
      quarter: 'Quarter 1',
      status: 'Verified',
      submissionDate: '2026-10-14',
      learnersRecorded: 45,
    },
    {
      id: 'REC-702',
      grade: 'Grade 7',
      section: 'Quezon',
      subject: 'Science 7',
      teacher: 'Mr. Roberto Cruz',
      quarter: 'Quarter 1',
      status: 'Verified',
      submissionDate: '2026-10-15',
      learnersRecorded: 44,
    },
    {
      id: 'REC-801',
      grade: 'Grade 8',
      section: 'Mabini',
      subject: 'Mathematics 8',
      teacher: 'Ms. Maricel Del Rosario',
      quarter: 'Quarter 1',
      status: 'Verified',
      submissionDate: '2026-10-16',
      learnersRecorded: 43,
    },
    {
      id: 'REC-802',
      grade: 'Grade 8',
      section: 'Aguinaldo',
      subject: 'Filipino 8',
      teacher: 'Mr. Francisco Reyes',
      quarter: 'Quarter 1',
      status: 'Verified',
      submissionDate: '2026-10-16',
      learnersRecorded: 42,
    },
    {
      id: 'REC-901',
      grade: 'Grade 9',
      section: 'Rizal',
      subject: 'Araling Panlipunan 9',
      teacher: 'Mrs. Grace Mendoza',
      quarter: 'Quarter 2',
      status: 'In Session',
      submissionDate: 'Pending',
      learnersRecorded: 45,
    },
    {
      id: 'REC-1001',
      grade: 'Grade 10',
      section: 'Bonifacio',
      subject: 'MAPEH 10',
      teacher: 'Mrs. Lorna Villanueva',
      quarter: 'Quarter 1',
      status: 'Verified',
      submissionDate: '2026-10-17',
      learnersRecorded: 43,
    },
  ];

  const [records] = useState(initialRecords);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'ALL' || r.grade === gradeFilter;

    let matchesTeacher = true;
    if (onlyMyRecords && isTeacher) {
      matchesTeacher =
        r.teacher.toLowerCase().includes(currentUser.name.toLowerCase().split(' ').slice(-1)[0]) ||
        (currentUser.assignedSection && r.section.toLowerCase().includes(currentUser.assignedSection.toLowerCase()));
    }

    return matchesSearch && matchesGrade && matchesTeacher;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
    }, 1200);
  };

  const columns = [
    {
      key: 'section',
      label: 'Class & Section',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0f172a' }}>
            {row.grade} – {val}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b' }}>{row.subject}</div>
        </div>
      ),
    },
    {
      key: 'teacher',
      label: 'Subject Teacher',
      render: (val) => <span style={{ fontWeight: 500, color: '#1e293b' }}>{val}</span>,
    },
    {
      key: 'quarter',
      label: 'Quarter',
      render: (val) => (
        <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
          {val}
        </span>
      ),
      width: '120px',
    },
    {
      key: 'learnersRecorded',
      label: 'Learners',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#334155' }}>{val} students</span>
      ),
      width: '130px',
    },
    {
      key: 'status',
      label: 'Submission Status',
      render: (val) => <StatusBadge status={val} label={val} />,
      width: '150px',
    },
    {
      key: 'submissionDate',
      label: 'Date Uploaded',
      render: (val) => (
        <span style={{ fontSize: '12px', color: '#64748b' }}>{val}</span>
      ),
      width: '130px',
    },
    {
      key: 'actions',
      label: 'Action',
      width: '90px',
      render: (_, row) => (
        <Button
          size="sm"
          variant="secondary"
          icon={Eye}
          onClick={() => setViewingRecord(row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Academic Records & Grade Submissions</h2>
          <p>
            Central monitoring of electronic class records, quarterly grade imports, and DepEd Form 137 archives.
          </p>
        </div>
        <div className="page-header-actions">
          {isTeacher && (
            <Button
              variant={onlyMyRecords ? 'primary' : 'secondary'}
              icon={UserCheck}
              onClick={() => setOnlyMyRecords(!onlyMyRecords)}
            >
              {onlyMyRecords ? 'Showing: My Classes Only' : 'Show All School Classes'}
            </Button>
          )}
          <Button
            variant="primary"
            icon={Upload}
            onClick={() => setUploadModalOpen(true)}
          >
            Upload Grade Sheet
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredRecords}
        keyField="id"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by section, subject, or teacher..."
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

      {/* Modal: View Grade Sheet Record */}
      <Modal
        isOpen={Boolean(viewingRecord)}
        onClose={() => setViewingRecord(null)}
        title={viewingRecord ? `${viewingRecord.grade} – ${viewingRecord.section} Grade Sheet` : 'Record'}
        footer={
          <Button variant="secondary" onClick={() => setViewingRecord(null)}>
            Close
          </Button>
        }
      >
        {viewingRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Section & Subject
                </div>
                <div style={{ fontWeight: 700, color: '#14532d' }}>
                  {viewingRecord.grade} – {viewingRecord.section} ({viewingRecord.subject})
                </div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Subject Teacher
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {viewingRecord.teacher}
                </div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Quarter Term
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {viewingRecord.quarter} (S.Y. 2026–2027)
                </div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Status
                </div>
                <div>
                  <StatusBadge status={viewingRecord.status} label={viewingRecord.status} />
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
              Electronic Class Record (DepEd Order No. 8, s. 2015). Validated for {viewingRecord.learnersRecorded} registered learners.
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Upload Sheet */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Electronic Class Record (ECR)"
        footer={
          <>
            <Button variant="secondary" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUploadSubmit}>
              Upload Record
            </Button>
          </>
        }
      >
        {uploadSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
              ECR Successfully Uploaded
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
              Grade entries recorded and verified against DepEd standards.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUploadSubmit}>
            <div className="form-group">
              <label className="form-label">Grade & Section</label>
              <select className="form-input">
                <option>Grade 7 – Ramon</option>
                <option>Grade 7 – Quezon</option>
                <option>Grade 8 – Mabini</option>
                <option>Grade 8 – Aguinaldo</option>
                <option>Grade 9 – Rizal</option>
                <option>Grade 10 – Bonifacio</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Learning Area / Subject</label>
              <input type="text" className="form-input" placeholder="e.g. Science 7 or Mathematics 8" required />
            </div>
            <div className="form-group">
              <label className="form-label">Grading Period</label>
              <select className="form-input">
                <option>Quarter 1</option>
                <option>Quarter 2 (Current)</option>
              </select>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default RecordsPage;
