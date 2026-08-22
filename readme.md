# ⚡ Dayflow HRMS

A modern, full-stack **Human Resource Management System** built with **React (JavaScript) + Node/Express (JavaScript) + Prisma + PostgreSQL (Neon)**.

---

## 🚀 Quick Start (Just 2 Steps)

From the project root directory:

```bash
# 1. Install all dependencies for Root, Backend & Frontend:
npm install

# 2. Start both Backend & Frontend concurrently:
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health**: `http://localhost:5000/health`

---

## 🔑 Demo Logins

| Role | Email | Password |
|---|---|---|
| 👑 **Admin** | `admin@dayflow.dev` | `password123` |
| 👤 **Employee** | `alice.johnson@dayflow.dev` | `password123` |
| 👤 **Employee 2** | `bob.williams@dayflow.dev` | `password123` |

*(All 8 seeded employees use password: `password123`)*

---

## ✨ Features

### 👤 Employee Portal
- **Dashboard**: Live attendance status, quick Check-In / Check-Out, and personal metrics.
- **My Profile**: View and edit phone, address, and profile photo.
- **Attendance**: Daily and weekly attendance logs with duration calculation.
- **Leaves**: Apply for leave (Paid, Sick, Unpaid) and track approval status.
- **Payroll**: Read-only salary breakdown (Base salary, allowances, and deductions).

### 👑 Admin Portal
- **Executive Dashboard**: Real-time headcount by department, today's attendance rate, and pending leaves.
- **Employee Directory**: Paginated list of employees with search and department filters.
- **Employee Profile & Salary Editor**: Edit employee details and adjust salary structures.
- **Leave Approvals**: One-click approve/reject leave requests with reviewer comments.
- **Payroll Management**: Manage salary, allowances (HRA, transport, medical), and deductions (tax, PF).
- **Analytics Dashboard**: Interactive charts powered by Recharts (attendance rate trends, breakdown, and leave distribution).

---

## 🛠️ Handy Commands (Run from Root)

| Command | Description |
|---|---|
| `npm run dev` | Runs backend (`:5000`) and frontend (`:5173`) together |
| `npm run build` | Builds the frontend for production |
| `npm run db:seed` | Seeds database with 1 admin + 8 employees + 14 days attendance + leaves |
| `npm run db:studio` | Opens Prisma Studio GUI to view/edit database records |
| `npm run db:migrate` | Runs database migrations |

---

## 📂 Project Structure

```
hr_system/
├── backend/                  # Node.js + Express API (Pure JavaScript)
│   ├── prisma/               # Database schema & seed script
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── src/
│       ├── config/           # Database, env & mailer config
│       ├── middlewares/      # Auth, role check, validation & error handling
│       ├── modules/          # Auth, users, employees, attendance, leaves, payroll, dashboard, analytics
│       ├── utils/            # Async handler, JWT, hash & response helpers
│       ├── app.js            # Express app configuration
│       └── server.js         # Server entrypoint
├── frontend/                 # React + Vite (Pure JavaScript + JSX)
│   └── src/
│       ├── api/              # Axios API clients
│       ├── components/       # UI components, modals, badges, layout & sidebar
│       ├── context/          # Auth context (token & session management)
│       ├── pages/            # Auth, Employee & Admin portal pages
│       └── routes/           # Role-based protected router
└── package.json              # Root workspace orchestration
```

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)
```env
DATABASE_URL="postgresql://neondb_owner:npg_UCaj1P9RGdwg@ep-still-bird-b31npzb4-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
PORT=5000
NODE_ENV=development
JWT_ACCESS_SECRET="dayflow-super-secret-access-token-jwt-key-2026-secure-32chars"
JWT_REFRESH_SECRET="dayflow-super-secret-refresh-token-jwt-key-2026-secure-32chars"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```