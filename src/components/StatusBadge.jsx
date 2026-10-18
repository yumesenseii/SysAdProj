import React from 'react';

export function StatusBadge({ status, role, label }) {
  if (role) {
    const roleLower = String(role).toLowerCase();
    let roleClass = "badge-role-student";
    if (roleLower === "admin") roleClass = "badge-role-admin";
    if (roleLower === "teacher") roleClass = "badge-role-teacher";
    return (
      <span className={`badge ${roleClass}`}>
        {role}
      </span>
    );
  }

  const statusStr = String(status || label || "").toLowerCase();
  let badgeClass = "badge-inactive";

  if (["active", "online", "operational", "completed", "success"].includes(statusStr)) {
    badgeClass = "badge-active";
  } else if (["warning", "pending", "in session"].includes(statusStr)) {
    badgeClass = "badge-warning";
  } else if (["inactive", "disabled", "error", "failed"].includes(statusStr)) {
    badgeClass = "badge-error";
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-dot" />
      {label || status}
    </span>
  );
}

export default StatusBadge;
