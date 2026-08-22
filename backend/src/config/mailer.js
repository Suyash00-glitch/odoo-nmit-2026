import nodemailer from 'nodemailer';
import { env } from './env.js';

const isMailConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS
);

const cleanPassword = env.SMTP_PASS ? env.SMTP_PASS.replace(/\s+/g, '') : '';

export const transporter = isMailConfigured
  ? nodemailer.createTransport({
      service: env.SMTP_HOST.includes('gmail') ? 'gmail' : undefined,
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: cleanPassword,
      },
    })
  : null;

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ [Mailer] SMTP Verification Warning:', error.message);
    } else {
      console.log('✅ [Mailer] SMTP Server connected ready to send emails via:', env.SMTP_USER);
    }
  });
}

export const sendMail = async (options) => {
  if (!transporter) {
    console.log('[Mailer] SMTP not configured — skipping email to:', options.to);
    return false;
  }
  try {
    const info = await transporter.sendMail({
      from: env.SMTP_FROM || `Dayflow HRMS <${env.SMTP_USER}>`,
      ...options,
    });
    console.log(`✅ [Mailer] Email sent successfully to: ${options.to} (Message ID: ${info.messageId})`);
    return true;
  } catch (err) {
    console.error('❌ [Mailer] Failed to send email to:', options.to, err.message);
    return false;
  }
};

// 1. Welcome & Onboarding Email Template
export const sendWelcomeEmail = async ({ to, name, employeeId, email }) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #6B42EF 0%, #582BD6 100%); padding: 32px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">DAYFLOW</h1>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Welcome to your Workforce Portal</p>
      </div>
      <div style="padding: 32px; color: #1e293b;">
        <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #0f172a;">Hi ${name} 👋</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Your Dayflow HRMS account has been successfully created. You now have full access to daily attendance check-ins, leave requests, and payroll tracking.
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; font-weight: 600;">YOUR ASSIGNED CREDENTIALS</p>
          <p style="margin: 4px 0; font-size: 14px; font-weight: 700;">Employee ID: <span style="font-family: monospace; color: #6B42EF;">${employeeId}</span></p>
          <p style="margin: 4px 0; font-size: 14px; font-weight: 700;">Email: <span style="color: #0f172a;">${email}</span></p>
        </div>
        <div style="text-align: center; margin-top: 32px;">
          <a href="${env.FRONTEND_URL || 'http://localhost:5173'}/signin" style="background: #D4FF00; color: #000000; font-weight: 800; font-size: 14px; padding: 14px 32px; border-radius: 9999px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(212,255,0,0.4);">
            Sign In to Dashboard →
          </a>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
        © ${new Date().getFullYear()} Dayflow HRMS Inc. All rights reserved.
      </div>
    </div>
  `;

  return sendMail({
    to,
    subject: '🎉 Welcome to Dayflow HRMS — Your Account is Ready',
    html,
  });
};

// 2. Leave Application Confirmation Email
export const sendLeaveApplicationEmail = async ({ to, employeeName, leaveType, startDate, endDate, remarks }) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden;">
      <div style="background: #6B42EF; padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800;">Leave Request Submitted 📅</h2>
      </div>
      <div style="padding: 28px; color: #1e293b;">
        <p style="font-size: 14px; color: #475569;">Hi ${employeeName}, your leave request has been submitted for HR review.</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0; font-size: 13px;"><strong>Leave Type:</strong> ${leaveType}</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Duration:</strong> ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</p>
          ${remarks ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Remarks:</strong> <em>"${remarks}"</em></p>` : ''}
          <p style="margin: 4px 0; font-size: 13px;"><strong>Status:</strong> <span style="background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 6px; font-weight: bold;">PENDING</span></p>
        </div>
        <p style="font-size: 13px; color: #64748b;">You will receive an automated email notification as soon as HR reviews your request.</p>
      </div>
    </div>
  `;

  return sendMail({
    to,
    subject: `📅 Leave Request Received (${leaveType})`,
    html,
  });
};

// 3. Leave Decision Email
export const sendLeaveDecisionEmail = async ({ to, employeeName, leaveType, startDate, endDate, status, reviewComments }) => {
  const isApproved = status === 'APPROVED';
  const headerBg = isApproved ? '#059669' : '#DC2626';
  const badgeColor = isApproved ? '#D1FAE5' : '#FEE2E2';
  const badgeText = isApproved ? '#065F46' : '#991B1B';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden;">
      <div style="background: ${headerBg}; padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800;">
          Leave Request ${isApproved ? 'Approved ✅' : 'Rejected ❌'}
        </h2>
      </div>
      <div style="padding: 28px; color: #1e293b;">
        <p style="font-size: 14px; color: #475569;">Hi ${employeeName}, HR has reviewed your leave request.</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0; font-size: 13px;"><strong>Leave Type:</strong> ${leaveType}</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Duration:</strong> ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Status:</strong> <span style="background: ${badgeColor}; color: ${badgeText}; padding: 2px 8px; border-radius: 6px; font-weight: bold;">${status}</span></p>
          ${reviewComments ? `<p style="margin: 8px 0 0; font-size: 13px;"><strong>HR Comment:</strong> <em>"${reviewComments}"</em></p>` : ''}
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${env.FRONTEND_URL || 'http://localhost:5173'}/employee/leaves" style="background: #0f172a; color: #ffffff; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 9999px; text-decoration: none; display: inline-block;">
            View Leave History →
          </a>
        </div>
      </div>
    </div>
  `;

  return sendMail({
    to,
    subject: `📢 Leave Request ${isApproved ? 'Approved' : 'Rejected'} — Dayflow HR`,
    html,
  });
};
