import React from 'react';

export function SchoolLogo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cambaog National High School Emblem"
    >
      {/* Outer circular gold & green borders */}
      <circle cx="60" cy="60" r="56" fill="#092e23" stroke="#eab308" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="51" fill="#0f3e2e" stroke="#16a34a" strokeWidth="1" />
      
      {/* DepEd shield background */}
      <path
        d="M60 18 L94 34 V66 C94 84 60 98 60 98 C60 98 26 84 26 66 V34 Z"
        fill="#14532d"
        stroke="#facc15"
        strokeWidth="2"
      />

      {/* Internal shield quadrant divide */}
      <path d="M60 22 V92" stroke="#eab308" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <path d="M30 55 H90" stroke="#eab308" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

      {/* Sun / Rays */}
      <circle cx="60" cy="42" r="8" fill="#facc15" />
      <path d="M60 30 V32 M60 52 V54 M48 42 H50 M70 42 H72" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />

      {/* Torch of Knowledge */}
      <path d="M57 58 H63 L61 74 H59 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Torch flame */}
      <path
        d="M60 48 C63 51 64 54 62 57 C61 58 59 58 58 57 C56 54 57 51 60 48 Z"
        fill="#f97316"
      />
      <path
        d="M60 51 C61.5 53 62 55 61 56.5 C60.5 57 59.5 57 59 56.5 C58 55 58.5 53 60 51 Z"
        fill="#fde047"
      />

      {/* Open Book of Learning */}
      <path
        d="M40 76 C48 73 57 74 60 77 C63 74 72 73 80 76 V86 C72 83 63 84 60 87 C57 84 48 83 40 86 Z"
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="1"
      />
      {/* Book pages lines */}
      <path d="M44 79 C49 77 55 78 57 80" stroke="#64748b" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M44 82 C49 80 55 81 57 83" stroke="#64748b" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M63 80 C65 78 71 77 76 79" stroke="#64748b" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M63 83 C65 81 71 80 76 82" stroke="#64748b" strokeWidth="0.8" strokeLinecap="round" />

      {/* Laurel wreath leaves */}
      <path
        d="M26 62 C24 74 34 86 42 90 M94 62 C96 74 86 86 78 90"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
export default SchoolLogo;
