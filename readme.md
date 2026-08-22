# ⚡ Dayflow HRMS — Modern Workforce & People Operations Platform

A production-ready, full-stack **Human Resource Management System (HRMS)** with an ultra-sleek UI, employee self-service, real-time attendance tracking, leave approval workflows, payroll configuration, interactive analytics, and automated email notifications.

---

## 🌟 Key Features

### 🏢 1. Executive Admin Portal
- **Live Metrics Dashboard**: Real-time headcount, today's attendance percentage, and pending leave queue.
- **Employee Directory**: Paginated directory with instant search, department filtering, and detailed profile inspector.
- **Employee Management**: Create, edit, and **permanently delete** employees with cascading database cleanup.
- **Leave Decision Center**: Review pending leave applications with 1-click **Approve** / **Reject** and custom reviewer notes.
- **Dynamic Compensation & Payroll**: Base salary, customizable allowances (HRA, transport, medical), and deductions (Tax, PF) with automatic net pay calculation.
- **14-Day Analytics & Reports**: Trend charts for attendance rate, department breakdown, and leave distribution powered by Recharts.

### 👤 2. Employee Self-Service Portal
- **Interactive Check-In / Check-Out**: 1-click attendance logger with real-time shift duration counter.
- **Leave Request Hub**: Apply for Paid, Sick, or Unpaid leaves with balance checking and approval timeline.
- **Digital Payslips**: Itemized monthly salary breakdown with printable slip layout.
- **Personal Profile**: Update phone, address, and view employment metadata.

### 📧 3. Automated Email Notification Workflows
- **Account Verification & Welcome**: Branded onboarding emails with employee ID and secure activation links.
- **Leave Application Receipt**: Instant confirmation emails sent to employees upon submitting leave requests.
- **Leave Decision Alerts**: Instant HTML email notifications with approval/rejection status and HR notes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, TanStack Query, React Hook Form, Zod, Recharts, React Hot Toast |
| **Backend** | Node.js, Express.js (ES Modules), Prisma ORM, JSON Web Tokens (JWT), Bcrypt, Nodemailer |
| **Database** | Serverless PostgreSQL via **Neon Cloud** |
| **Monorepo** | NPM Workspaces + Concurrently |

---

## 📋 Prerequisites

Before running the project locally, ensure you have:
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **NPM**: `v9.0.0` or higher
- **Git**: Installed on your system ([Download Git](https://git-scm.com/))
- **Neon Cloud Account**: Free serverless PostgreSQL ([Sign up at Neon](https://neon.tech/))
- **Gmail Account (or any SMTP Provider)**: For automated workflow emails

---

## 🚀 Step-by-Step Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Suyash00-glitch/odoo-nmit-2026.git
cd odoo-nmit-2026
```

---

### 2. Set Up a Free PostgreSQL Database on Neon

1. Navigate to **[neon.tech](https://neon.tech/)** and sign up for a free account.
2. Click **"New Project"**, name it `dayflow-hrms`, and select your preferred AWS region.
3. In your project's **Dashboard**, locate the **Connection Details** card.
4. Select **Prisma** or **PostgreSQL (Connection string)** from the dropdown.
5. Copy the connection URL. It will look like:
   ```
   postgresql://<username>:<password>@<endpoint-pooler>.aws.neon.tech/neondb?sslmode=require
   ```

---

### 3. Set Up Email & SMTP Workflows (Step-by-Step)

Dayflow HRMS uses **Nodemailer** to automatically dispatch transaction and workflow emails. You can use **Gmail (Google App Password)**, **Outlook**, **SendGrid**, **Brevo**, or **Mailtrap** (for local development).

#### Option A: Gmail SMTP Setup (Recommended & Free)

> ⚠️ **Important:** Google does **not** allow regular Gmail account passwords for third-party SMTP. You **must** generate a 16-character **App Password**.

Follow these exact steps:

1. **Enable 2-Step Verification**:
   - Go to your **[Google Account Security](https://myaccount.google.com/security)** page.
   - Under *"How you sign in to Google"*, click on **2-Step Verification** and turn it **ON** (if not already enabled).

2. **Generate an App Password**:
   - Go directly to **[Google App Passwords](https://myaccount.google.com/apppasswords)**.
   - If prompted, enter your Google account password.
   - In the **"App name"** text box, enter: `Dayflow HRMS`.
   - Click **Create**.
   - A modal will pop up with a **16-character code** (e.g. `srky buui ojaw uoql` or `abcd efgh ijkl mnop`).
   - Copy this 16-character code.

3. **Add Credentials to `backend/.env`**:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-exact-gmail-address@gmail.com"
   SMTP_PASS="your-16-character-app-password"
   SMTP_FROM="Dayflow HRMS <your-exact-gmail-address@gmail.com>"
   ```
   *(Note: Spaces in `SMTP_PASS` are automatically handled by the system).*

---

#### Option B: Other SMTP Providers

If you prefer using an alternate service, configure your `backend/.env` with these settings:

| Provider | `SMTP_HOST` | `SMTP_PORT` | `SMTP_USER` | `SMTP_PASS` |
| :--- | :--- | :--- | :--- | :--- |
| **Gmail** | `smtp.gmail.com` | `587` | Your Gmail address | 16-character App Password |
| **Outlook / Office 365** | `smtp.office365.com` | `587` | Your Outlook email | Your Outlook App Password |
| **SendGrid** | `smtp.sendgrid.net` | `587` | `apikey` | Your SendGrid API Key |
| **Brevo (Sendinblue)** | `smtp-relay.brevo.com` | `587` | Your Brevo login email | Your Master SMTP Key |
| **Mailtrap (Testing)** | `live.smtp.mailtrap.io` | `587` | `api` | Your Mailtrap API Token |

---

### 4. Configure Environment Files

#### A. Backend Configuration (`backend/.env`)
Create a file named `.env` inside the `backend/` directory:

```env
# 1. Neon PostgreSQL Database URL
DATABASE_URL="postgresql://<user>:<password>@<endpoint-pooler>.aws.neon.tech/neondb?sslmode=require"

# 2. Server Configuration
PORT=5000
NODE_ENV=development

# 3. JWT Authentication Secrets (Generate any 32+ character random strings)
JWT_ACCESS_SECRET="dayflow-hrms-access-token-secret-key-super-secure-2026"
JWT_REFRESH_SECRET="dayflow-hrms-refresh-token-secret-key-super-secure-2026"

# 4. Frontend Origin URL
FRONTEND_URL="http://localhost:5173"

# 5. SMTP Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-16-character-app-password"
SMTP_FROM="Dayflow HRMS <your-email@gmail.com>"
```

#### B. Frontend Configuration (`frontend/.env`)
Create a file named `.env` inside the `frontend/` directory:

```env
VITE_API_URL="http://localhost:5000/api"
```

---

### 5. Install Dependencies

Install all root, backend, and frontend packages with one command from the project root:

```bash
npm install
```

---

### 6. Initialize Database Schema & Seed Demo Data

Push the database models to your Neon PostgreSQL instance and populate all demo users, departments, 14 days of attendance, and sample leave requests:

```bash
# Push Prisma schema to your Neon database
npm --prefix backend run db:push

# Populate sample data (1 Admin + 5 Employees + 14-day attendance logs)
npm --prefix backend run db:seed
```

---

### 7. Run the Application

Launch both the backend API server and frontend client concurrently:

```bash
npm run dev
```

Your system is now live at:
- 🌐 **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- 🔌 **Backend REST API**: [http://localhost:5000/api](http://localhost:5000/api)
- 🩺 **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

When the server starts with valid SMTP credentials, you will see this confirmation in your terminal:
```bash
[BACKEND] ✅ Database connected
[BACKEND] 🚀 Dayflow API running on http://localhost:5000
[BACKEND] ✅ [Mailer] SMTP Server connected ready to send emails via: your-email@gmail.com
```

---

## 🔑 Demo Login Accounts

All seeded demo accounts use the standard password: **`password123`**

| Role | Name | Email | Password | Department |
| :--- | :--- | :--- | :--- | :--- |
| 🛡️ **Admin / HR** | Sarah Connor | `admin@dayflow.dev` | `password123` | HR Director |
| 👤 **Employee** | Alice Johnson | `alice.johnson@dayflow.dev` | `password123` | Engineering |
| 👤 **Employee** | Bob Williams | `bob.williams@dayflow.dev` | `password123` | Product |
| 👤 **Employee** | Carol Davis | `carol.davis@dayflow.dev` | `password123` | Design |
| 👤 **Employee** | David Martinez | `david.martinez@dayflow.dev` | `password123` | Marketing |

> 💡 **Quick Demo Autofill:** On the **[Sign In Page](http://localhost:5173/signin)**, click the **"Admin Demo"** or **"Employee Demo"** pill buttons to autofill credentials with one click!

---

## 📂 Project Structure

```
odoo-nmit-2026/
├── backend/                      # Node.js + Express Backend API
│   ├── prisma/
│   │   ├── schema.prisma         # Prisma ORM Database Models
│   │   └── seed.js               # Database Seeder (Users, Attendance, Leaves)
│   ├── src/
│   │   ├── config/               # Database, Environment & Nodemailer Mailer Config
│   │   ├── controllers/          # Business Logic (Auth, Employees, Leaves, Payroll, Analytics)
│   │   ├── middlewares/          # JWT Verification, Role Authorization, Zod Validation
│   │   ├── routes/               # Express API Route Definitions
│   │   ├── utils/                # Password Hash, JWT Helpers, Response Formatter
│   │   ├── app.js                # Express App Middleware & CORS Configuration
│   │   └── server.js             # HTTP Server Entry Point
│   └── package.json
│
├── frontend/                     # React + Vite Client Application
│   ├── src/
│   │   ├── api/                  # Axios HTTP Client Modules
│   │   ├── components/
│   │   │   ├── common/           # Modal, Loader, Badge, Error State
│   │   │   ├── landing/          # Hero, BentoGrid, Workflows, Integrations, Testimonials
│   │   │   ├── layout/           # Admin/Employee Sidebar & Navigation Shell
│   │   │   └── ui/               # Pill Auth Modal & Form Components
│   │   ├── context/              # Authentication & Session Context
│   │   ├── pages/
│   │   │   ├── admin/            # Dashboard, Employees, Leaves, Payroll, Analytics
│   │   │   ├── employee/         # Dashboard, Attendance, Leaves, Payslip, Profile
│   │   │   ├── auth/             # Sign In, Sign Up, Verify Email, Activate Account
│   │   │   └── landing/          # Landing Page
│   │   ├── routes/               # Protected Role-Based Router
│   │   ├── index.css             # Tailwind Design System & Custom Gradients
│   │   └── main.jsx              # React DOM Entry
│   └── package.json
│
├── package.json                  # Root Monorepo Orchestrator
└── README.md                     # Documentation
```

---

## 🔌 API Reference Overview

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register new account and send activation/verification email.
- `POST /api/auth/login` — Sign in with email and password (returns JWT & sets refresh cookie).
- `POST /api/auth/refresh` — Refresh expired access token.
- `POST /api/auth/logout` — Revoke refresh token and clear session cookies.
- `POST /api/auth/verify-email` — Verify email token.

### 👥 Employees (`/api/employees`)
- `GET /api/employees` — List all employees (supports search, department filtering, pagination).
- `POST /api/employees` — Add new employee and dispatch invitation email.
- `GET /api/employees/:id` — Get single employee profile with documents and payroll structure.
- `PUT /api/employees/:id` — Update employee job details, department, or contact information.
- `DELETE /api/employees/:id` — Delete employee and cascade-delete all linked records.

### ⏱️ Attendance (`/api/attendance`)
- `POST /api/attendance/check-in` — Clock in for today's shift.
- `POST /api/attendance/check-out` — Clock out and record total shift duration.
- `GET /api/attendance/me` — Fetch current user's attendance log history.
- `GET /api/attendance/today` — Real-time company attendance count and status summary (Admin).

### 🏖️ Leave Management (`/api/leaves`)
- `POST /api/leaves` — Submit a leave request (Paid, Sick, Unpaid) and dispatch receipt email.
- `GET /api/leaves/me` — Retrieve logged-in employee's leave requests.
- `GET /api/leaves` — List all company leave requests (Admin).
- `PATCH /api/leaves/:id/decision` — Approve or Reject a leave request and send notification email.

### 💵 Payroll (`/api/payroll`)
- `GET /api/payroll/me` — Get itemized payslip for logged-in employee.
- `GET /api/payroll` — List all employees' salary structures (Admin).
- `PUT /api/payroll/:id` — Update base salary, allowances (HRA, transport, medical), and deductions.

### 📊 Analytics (`/api/analytics`)
- `GET /api/analytics/dashboard` — Live headcount, present today, on-leave count, and pending approvals.
- `GET /api/analytics/attendance-trend` — 14-day company attendance trend for interactive charts.

---

## ❓ Troubleshooting & FAQs

<details>
<summary><b>1. SMTP Error: "535 5.7.8 Username and Password not accepted"</b></summary>
Google rejects normal account passwords for automated SMTP. To fix:
1. Turn ON **2-Step Verification** on your Google Account: https://myaccount.google.com/security
2. Generate an **App Password** from https://myaccount.google.com/apppasswords
3. Copy the 16-character password and paste it into `SMTP_PASS` in `backend/.env`.
4. Ensure `SMTP_USER` matches the exact Gmail address that generated the App Password.
</details>

<details>
<summary><b>2. Port 5000 or 5173 is already in use (EADDRINUSE)</b></summary>
If port 5000 is occupied, you can kill the existing process on Windows:

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process by PID
taskkill /F /PID <PID_NUMBER>
```
Or simply change `PORT=5001` in `backend/.env` and update `VITE_API_URL="http://localhost:5001/api"` in `frontend/.env`.
</details>

<details>
<summary><b>3. Prisma Database Connection Timeout</b></summary>
Ensure your Neon PostgreSQL connection string ends with `?sslmode=require`. If you are using a pooled connection, verify you are using the pooled endpoint URL provided in the Neon console.
</details>

<details>
<summary><b>4. How to inspect the database visually?</b></summary>
Run the built-in Prisma Studio GUI:

```bash
npm --prefix backend run db:studio
```
Open [http://localhost:5555](http://localhost:5555) in your browser to view, edit, and filter database tables visually.
</details>

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute for personal or commercial projects.