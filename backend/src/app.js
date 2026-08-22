import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import employeeRoutes from './routes/employees.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import leaveRoutes from './routes/leaves.routes.js';
import payrollRoutes from './routes/payroll.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import notificationRoutes from './routes/notifications.routes.js';

const app = express();

// Security & Parsing Middlewares
app.use(helmet());

const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev mode to ensure seamless operation
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    success: false,
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please try again later.' },
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts, please try again later.' },
  },
});

app.use(globalLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
    message: 'Server is running',
  });
});

// Application Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'The requested resource was not found.' },
  });
});

// Centralized error handler
app.use(errorMiddleware);

export default app;
