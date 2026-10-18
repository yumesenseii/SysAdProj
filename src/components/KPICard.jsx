import React from 'react';
import { Users, GraduationCap, BookOpen, UserCheck, Activity, HardDrive, ShieldCheck, Database } from 'lucide-react';

const iconMap = {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  Activity,
  HardDrive,
  ShieldCheck,
  Database,
};

export function KPICard({ title, value, subtext, icon, trend }) {
  let IconComponent = Users;
  if (typeof icon === 'string' && iconMap[icon]) {
    IconComponent = iconMap[icon];
  } else if (icon && typeof icon !== 'string') {
    IconComponent = icon;
  }

  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon-wrap">
          <IconComponent size={18} />
        </div>
      </div>
      <div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-bottom">
          {trend && <span className="kpi-trend">{trend}</span>}
          {trend && <span>•</span>}
          <span>{subtext}</span>
        </div>
      </div>
    </div>
  );
}

export default KPICard;
