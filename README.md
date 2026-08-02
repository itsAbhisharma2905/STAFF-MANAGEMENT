# Staff Manager System

Production-minded full-stack MVP for an enterprise Staff Manager / Employee Management System. The current build includes a React dashboard, an Express API, local JSON persistence, CRUD employee storage, and a built-in AI analyzer.

## Overview

This MVP is built as a responsive React application with a dense operations dashboard and module-level data tables. It follows the custom design direction in `app/design_guidelines.json`: Organic & Earthy + Swiss Precision.

The UI avoids generic SaaS styling by using an Emerald/Stone palette, sharp 1px borders, restrained shadows, high-density layouts, and deliberate micro-interactions.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Node.js / Express API
- Local JSON database at `server/data/db.json`
- Built-in deterministic HR analyzer

## Features

- Staff operations dashboard with KPI widgets
- Login and signup demo screens
- Demo accounts for Super Admin, HR Manager, Department Manager, and Employee
- Employee directory with search filtering
- Module navigation for HR workflows
- Attendance, leave, payroll, recruitment, reports, settings, and department table views with at least 10 demo records per area
- Recruitment pipeline classified by Sourcing, Screening, Technical Interview, Panel Interview, Offer, and Background Check
- Detail drawer for row-level records
- AI HR Copilot panel with contextual recommendations and module shortcuts
- Backend AI analyzer API: `GET /api/ai/analyze`
- Custom inserted-data analyzer API: `POST /api/ai/custom-analyze`
- Employee CRUD API: `GET/POST/PATCH/DELETE /api/employees`
- Demo reset API: `POST /api/admin/reset-demo-data`
- Responsive sidebar with mobile drawer behavior
- High-quality CSS interaction layer:
  - Staggered KPI entrance animation
  - Panel hover depth and subtle texture
  - Animated navigation indicators
  - Button shimmer and press elevation
  - Table row focus motion
  - Avatar refinement on row hover
  - Accessible reduced-motion fallback

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

This starts both:

```text
Frontend: http://localhost:5173/
Backend:  http://localhost:4000/
```

Open the app:

```text
http://localhost:5173/
```

## Demo Accounts

```text
Super Admin: admin@staffmanager.dev / Admin@123
HR Manager: hr@staffmanager.dev / Hr@12345
Department Manager: manager@staffmanager.dev / Manager@123
Employee: employee@staffmanager.dev / Employee@123
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the built-in AI analyzer from the terminal:

```bash
npm run ai:analyze
```

Check employee add/edit/delete plus workspace and custom AI analysis:

```bash
npm run check:options
```

The generated report is saved to:

```text
reports/ai-analysis.json
```

## Data Storage

The free local database is a JSON file:

```text
server/data/db.json
```

Employees created, updated, or deleted through the app are persisted there. To reset the demo database, call:

```bash
curl -X POST http://localhost:4000/api/admin/reset-demo-data
```

The employee profile drawer supports creating and editing name, role, department, status, attendance, salary, manager, location, performance, and risk. The row action menu includes profile viewing, profile editing, attendance update, status promotion, and deletion.

## Project Structure

```text
staff-manager-system/
|-- app/
|   `-- design_guidelines.json
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   `-- styles.css
|-- server/
|   |-- data/
|   |-- src/
|   |   |-- data/
|   |   |-- middleware/
|   |   |-- repositories/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- validations/
|   |   |-- app.ts
|   |   `-- index.ts
|-- scripts/
|   `-- run-ai-analysis.ts
|-- reports/
|   `-- ai-analysis.json
|-- index.html
|-- package.json
|-- tailwind.config.js
|-- tsconfig.json
`-- vite.config.ts
```

## Design System

The visual system is documented in:

```text
app/design_guidelines.json
```

Key decisions:

- Headings: Cabinet Grotesk
- Body and tables: IBM Plex Sans
- Primary color: Emerald Ink
- Surface palette: Paper, Stone, Soil
- Interaction style: precise, fast, low-shadow, high-contrast
- UI density: optimized for HR admins who scan many records repeatedly

## Current Scope

This is a full-stack MVP with persisted employee storage and analyzer support. Authentication is still demo-only, while employee CRUD and analyzer execution are backed by the API.

Recommended next implementation steps:

- Add routing for each module
- Extract shared components into `src/components`
- Expand backend CRUD to every module
- Replace demo auth with JWT + refresh tokens
- Add RBAC-aware navigation and actions
- Add form flows for employee creation, leave approval, and payroll exceptions
- Add API and E2E tests

## Verification

The project currently passes:

```bash
npm run build
npm run check:options
npm run ai:analyze
```
