# SysAdProj — CNHS Learn System Administration Project

A static web application clone inspired by **CNHS Learn** for Cambaog National High School (Cambaog, Bustos, Bulacan), designed for a System Administration project and presentation demo.

## Overview
- **Project Name**: SysAdProj
- **Institution**: Cambaog National High School
- **DepEd School ID**: 300977 (Bustos District, Schools Division of Bulacan)
- **School Head / Principal**: Juan dela Cruz

## Technology Stack
- **Framework**: React 19 + Vite
- **Router**: React Router v7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CNHS Learn Dark Green & Clean White School Admin aesthetic)
- **Data**: Static mock data (no external database or backend required)

## Main Routes & Features
- `/` — Public Landing Page (Home, About, Features, School Info, Contact)
- `/login` — Administrator Login Screen (with one-click demo credentials autofill)
- `/admin` — System Administrator Dashboard (KPI Cards, User Overview, Activity Feed, System Status, Quick Actions)
- `/admin/users` — User Management (View, Edit, Enable/Disable user accounts)
- `/admin/classes` — Classes & Sections (Grade 7 – Ramon, Grade 8 – Mabini, Grade 9 – Rizal, Grade 10 – Bonifacio)
- `/admin/records` — Academic Records & Electronic Class Record (ECR) imports
- `/admin/attendance` — Daily Attendance & DepEd SF-2 summary exports
- `/admin/reports` — Standardized DepEd Reports catalog
- `/admin/logs` — System Security & Audit Trail
- `/admin/settings` — Single-page consolidated School & Principal settings

## Running Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.
