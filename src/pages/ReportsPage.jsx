import React, { useState } from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

export function ReportsPage() {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState('');

  const reportList = [
    {
      id: 'REP-001',
      title: 'School Form 1 (SF-1) School Register',
      category: 'DepEd Official',
      format: 'XLSX / PDF',
      description: 'Master list of enrolled students by section with demographic profiles, LRNs, and parent contact information.',
      lastGenerated: 'Today, 14:30',
    },
    {
      id: 'REP-002',
      title: 'School Form 2 (SF-2) Monthly Learner Attendance',
      category: 'DepEd Official',
      format: 'XLSX',
      description: 'Monthly summary of daily attendance per grade level and section in compliance with DepEd reporting standards.',
      lastGenerated: 'Yesterday, 17:15',
    },
    {
      id: 'REP-003',
      title: 'Faculty Load & Section Adviser Directory',
      category: 'Administrative',
      format: 'PDF',
      description: 'Complete roster of 64 faculty members, class adviser designations, room allocations, and teaching loads.',
      lastGenerated: '2026-10-15',
    },
    {
      id: 'REP-004',
      title: 'Quarter 1 Academic Performance Summary',
      category: 'Academic Records',
      format: 'PDF / CSV',
      description: 'Aggregated quarterly grade distribution and general averages across Grades 7 to 10.',
      lastGenerated: '2026-10-17',
    },
    {
      id: 'REP-005',
      title: 'System Security & Access Audit Log',
      category: 'System Admin',
      format: 'CSV',
      description: 'Complete chronological audit log of user logins, role permissions modifications, and administration events.',
      lastGenerated: 'Today, 20:30',
    },
    {
      id: 'REP-006',
      title: 'Database Backup & Infrastructure Health Report',
      category: 'System Admin',
      format: 'JSON / PDF',
      description: 'Verification checksums, snapshot file sizes, server uptime statistics, and storage utilization records.',
      lastGenerated: 'Today, 03:00',
    },
  ];

  const handleExport = (report) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessMessage(`Generated and exported "${report.title}"`);
      setTimeout(() => setDownloadSuccessMessage(''), 2500);
    }, 800);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>Official Reports & Data Exports</h2>
          <p>
            Generate standardized DepEd school forms, administrative rosters, academic summaries, and system logs.
          </p>
        </div>
      </div>

      {downloadSuccessMessage && (
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
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {reportList.map((rep) => (
          <div key={rep.id} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#14532d" />
                <span style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
                  {rep.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {rep.category}
              </span>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 53px)' }}>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                {rep.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  Format: <strong>{rep.format}</strong> • Last: {rep.lastGenerated}
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  icon={Download}
                  onClick={() => handleExport(rep)}
                  disabled={downloadingId === rep.id}
                >
                  {downloadingId === rep.id ? 'Generating...' : 'Export'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsPage;
