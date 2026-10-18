import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Download,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { SYSTEM_LOGS } from '../data/mockData';

export function LogsPage() {
  const [logs] = useState(SYSTEM_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewingLog, setViewingLog] = useState(null);
  const [exportNotice, setExportNotice] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ip.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModule =
        moduleFilter === 'ALL' || log.module.toLowerCase().includes(moduleFilter.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' || log.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesModule && matchesStatus;
    });
  }, [logs, searchQuery, moduleFilter, statusFilter]);

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => {
      setExportNotice(false);
    }, 2500);
  };

  const columns = [
    {
      key: 'dateTime',
      label: 'Date & Time',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#1e293b' }}>
          {val}
        </span>
      ),
      width: '170px',
    },
    {
      key: 'user',
      label: 'User',
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '12.5px' }}>
          {val}
        </span>
      ),
      width: '180px',
    },
    {
      key: 'action',
      label: 'Action',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1e293b' }}>{val}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>{row.details}</div>
        </div>
      ),
    },
    {
      key: 'module',
      label: 'Module',
      render: (val) => (
        <span
          style={{
            fontSize: '11.5px',
            background: '#f1f5f9',
            padding: '2px 8px',
            borderRadius: '4px',
            color: '#475569',
            fontWeight: 500,
          }}
        >
          {val}
        </span>
      ),
      width: '140px',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} label={val} />,
      width: '110px',
    },
    {
      key: 'actions',
      label: 'Details',
      width: '90px',
      render: (_, row) => (
        <Button
          size="sm"
          variant="secondary"
          icon={Eye}
          onClick={() => setViewingLog(row)}
        >
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          <h2>System Audit & Security Logs</h2>
          <p>
            Chronological log of administrative operations, authentication events, backups, and security alerts.
          </p>
        </div>
        <div className="page-header-actions">
          <Button
            variant="secondary"
            icon={Download}
            onClick={handleExport}
          >
            {exportNotice ? 'Exporting CSV...' : 'Export Audit Logs'}
          </Button>
        </div>
      </div>

      {exportNotice && (
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
          <span>Audit trail CSV successfully prepared and exported to administrative storage.</span>
        </div>
      )}

      {/* Security Status Card */}
      <div
        className="admin-card"
        style={{
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f0fdf4',
              color: '#14532d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
              System Integrity Status: Secure & Synchronized
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Log rotation daemon active • Retention policy: 365 Days • Storage consumed: 42.8 MB
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <StatusBadge status="Active" label="Daemon Online" />
        </div>
      </div>

      {/* Logs Table */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        keyField="id"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter by user, action, details, or IP address..."
        filters={[
          {
            label: 'Module',
            value: moduleFilter,
            options: [
              { label: 'All Modules', value: 'ALL' },
              { label: 'Auth Module', value: 'Auth' },
              { label: 'Backup Engine', value: 'Backup' },
              { label: 'Reports Module', value: 'Reports' },
              { label: 'Classes Module', value: 'Classes' },
              { label: 'Security Guard', value: 'Security' },
            ],
            onChange: setModuleFilter,
          },
          {
            label: 'Status',
            value: statusFilter,
            options: [
              { label: 'All Statuses', value: 'ALL' },
              { label: 'Success', value: 'Success' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Failed', value: 'Failed' },
            ],
            onChange: setStatusFilter,
          },
        ]}
      />

      {/* Modal: View Log Details */}
      <Modal
        isOpen={Boolean(viewingLog)}
        onClose={() => setViewingLog(null)}
        title={viewingLog ? `Log Event: ${viewingLog.id}` : 'Log Event Details'}
        footer={
          <Button
            variant="secondary"
            onClick={() => setViewingLog(null)}
          >
            Close
          </Button>
        }
      >
        {viewingLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Event ID
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{viewingLog.id}</div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Timestamp
                </div>
                <div style={{ fontFamily: 'monospace', color: '#0f172a' }}>
                  {viewingLog.dateTime}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Initiating User / Process
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{viewingLog.user}</div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Remote Host / IP
                </div>
                <div style={{ fontFamily: 'monospace', color: '#0f172a' }}>
                  {viewingLog.ip}
                </div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  System Module
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{viewingLog.module}</div>
              </div>

              <div>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Execution Result
                </div>
                <div>
                  <StatusBadge status={viewingLog.status} label={viewingLog.status} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
              <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                Event Payload / Description
              </div>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '12px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#334155',
                }}
              >
                {viewingLog.details}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default LogsPage;
