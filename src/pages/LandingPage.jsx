import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  FileSpreadsheet,
  CalendarCheck,
  BarChart3,
  Settings,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import SchoolLogo from '../components/SchoolLogo';
import { SCHOOL_INFO } from '../data/mockData';

export function LandingPage() {

  const features = [
    {
      title: "User Management",
      icon: Users,
      desc: "Comprehensive administration of faculty, staff, and student accounts with secure role-based access controls and activity auditing.",
    },
    {
      title: "Class & Section Management",
      icon: BookOpen,
      desc: "Organize Grade 7 to 10 sections, room allocations, class adviser designations, and student roster assignments.",
    },
    {
      title: "Academic Records",
      icon: FileSpreadsheet,
      desc: "Centralized archival and monitoring of quarterly grade submissions, DepEd Form 137 / 138 references, and master records.",
    },
    {
      title: "Attendance Monitoring",
      icon: CalendarCheck,
      desc: "Streamlined daily attendance tracking, automated absence summaries, and DepEd School Form 2 (SF-2) generation.",
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      desc: "Export administrative summaries, learner enrollment statistics, faculty loads, and system operational audit reports.",
    },
    {
      title: "System Settings",
      icon: Settings,
      desc: "Configurable school year schedules, automated backup engines, password security policies, and system status diagnostics.",
    },
  ];

  const whyReasons = [
    {
      title: "Data Integrity",
      desc: "Guaranteed consistency across all student records and grade master lists with validation rules.",
    },
    {
      title: "Role-Based Security",
      desc: "Strict compartmentalization ensuring only authorized administrators and faculty access sensitive data.",
    },
    {
      title: "Centralized Repository",
      desc: "One single source of truth for Cambaog National High School's administrative operations.",
    },
    {
      title: "Reliable & Audit-Ready",
      desc: "Complete operational logging with automated snapshots and instant compliance reporting.",
    },
  ];

  return (
    <div className="landing-page">
      {/* Top Navigation */}
      <header className="landing-header">
        <div className="landing-brand">
          <SchoolLogo size={42} />
          <div>
            <h2>CNHS Learn</h2>
            <span>Cambaog National High School</span>
          </div>
        </div>

        <nav className="landing-nav">
          <a href="#home" className="landing-nav-link">Home</a>
          <a href="#about" className="landing-nav-link">About</a>
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#contact" className="landing-nav-link">Contact</a>
          <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px' }}>
            Login to System
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>Official Administrative Portal • DepEd School ID: {SCHOOL_INFO.schoolId}</span>
          </div>
          <h1 className="hero-title">
            <span>CNHS Learn</span>
          </h1>
          <h2 className="hero-subtitle">
            A Centralized School Data and Administration System for Cambaog National High School
          </h2>
          <p className="hero-description">
            CNHS Learn provides a reliable, secure, and centralized platform designed to organize school records, manage faculty and learner accounts, coordinate class sections, generate official DepEd reports, and maintain robust system administration.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary hero-btn-primary">
              <span>Login to System</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#about" className="btn btn-secondary hero-btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="landing-section">
        <div className="section-container">
          <div className="section-header">
            <h2>About the System</h2>
            <p>
              Engineered specifically for the institutional needs of Cambaog National High School in Cambaog, Bustos, Bulacan.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', color: '#475569', lineHeight: 1.7 }}>
              <p>
                In compliance with the Department of Education’s standards for school data governance, <strong>CNHS Learn</strong> serves as the central administrative hub connecting the administration, faculty advisers, and student population.
              </p>
              <p>
                By replacing fragmented spreadsheets with a centralized, role-based architecture, CNHS Learn accelerates the generation of vital school forms (SF-1, SF-2), secures academic records, and maintains an auditable administrative record of all school operations.
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#14532d' }}>32</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Active Sections</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#14532d' }}>1,482</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>School Users</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#14532d' }}>100%</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>System Uptime</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <ShieldCheck size={22} color="#14532d" />
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>System Administration Highlights</h4>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span>Integrated User Management with granular role permissions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span>Real-time system health checks and database monitoring</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span>Automated daily database snapshot backup routine</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span>Comprehensive audit logging for all security-sensitive events</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span>Optimized for low-bandwidth local campus network deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="landing-section alt-bg">
        <div className="section-container">
          <div className="section-header">
            <h2>Key System Modules</h2>
            <p>
              Essential administrative tools tailored for secondary school operations and DepEd compliance.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why CNHS Learn Section */}
      <section className="landing-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why CNHS Learn</h2>
            <p>Built upon the foundations of dependability, transparency, and data privacy.</p>
          </div>

          <div className="why-grid">
            {whyReasons.map((item, idx) => (
              <div key={idx} className="why-card">
                <h4>
                  <CheckCircle size={16} />
                  {item.title}
                </h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Information & Contact Section */}
      <section id="contact" className="landing-section alt-bg">
        <div className="section-container">
          <div className="section-header">
            <h2>School Information & Contact</h2>
            <p>Official institutional identity and administrative contact details.</p>
          </div>

          <div className="school-info-grid">
            <div className="school-details">
              <h3>{SCHOOL_INFO.name}</h3>
              <div className="school-badge-meta">
                <span>DepEd School ID: <strong>{SCHOOL_INFO.schoolId}</strong></span>
                <span>•</span>
                <span>{SCHOOL_INFO.district}</span>
              </div>

              <div className="school-info-list">
                <div className="school-info-row">
                  <strong>School Head / Principal:</strong>
                  <span>{SCHOOL_INFO.principal}</span>
                </div>
                <div className="school-info-row">
                  <strong>School Division:</strong>
                  <span>{SCHOOL_INFO.division}</span>
                </div>
                <div className="school-info-row">
                  <strong>DepEd Region:</strong>
                  <span>{SCHOOL_INFO.region}</span>
                </div>
                <div className="school-info-row">
                  <strong>Campus Address:</strong>
                  <span>{SCHOOL_INFO.address}</span>
                </div>
                <div className="school-info-row">
                  <strong>Official Email:</strong>
                  <span>{SCHOOL_INFO.email}</span>
                </div>
                <div className="school-info-row">
                  <strong>Telephone:</strong>
                  <span>{SCHOOL_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="school-map-placeholder">
              <SchoolLogo size={72} style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Cambaog National High School
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '300px', marginBottom: '16px' }}>
                Cambaog, Bustos, Bulacan, Central Luzon, Philippines
              </p>
              <Link to="/login" className="btn btn-primary btn-sm">
                Access Administrative Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h4>CNHS Learn</h4>
            <p>
              A Centralized School Data and Administration System for Cambaog National High School. Developed for System Administration presentation and institutional record keeping.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h5>Navigation</h5>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About System</a></li>
                <li><a href="#features">Key Features</a></li>
                <li><a href="#contact">Contact & School Info</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>Admin Portals</h5>
              <ul>
                <li><Link to="/login">Administrator Login</Link></li>
                <li><Link to="/admin">Dashboard Preview</Link></li>
                <li><Link to="/admin/logs">Security Logs</Link></li>
                <li><Link to="/admin/settings">System Parameters</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5>Institutional</h5>
              <ul>
                <li><span style={{ fontSize: '13px', color: '#cbd5e1' }}>DepEd Bulacan Division</span></li>
                <li><span style={{ fontSize: '13px', color: '#cbd5e1' }}>Region III - Central Luzon</span></li>
                <li><span style={{ fontSize: '13px', color: '#cbd5e1' }}>Bustos District</span></li>
                <li><span style={{ fontSize: '13px', color: '#cbd5e1' }}>School ID: 300977</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Cambaog National High School — CNHS Learn System Administration Project.
          </div>
          <div>
            Static Demo Edition • No External DB Dependency
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
