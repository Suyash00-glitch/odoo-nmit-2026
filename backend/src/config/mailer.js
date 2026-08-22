import nodemailer from 'nodemailer';
import { env } from './env.js';


// email verification



const isMailConfigured =
  env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS;

export const transporter = isMailConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

export const sendMail = async (options) => {
  if (!transporter) {
    console.log('[Mailer] SMTP not configured — skipping email to:', options.to);
    return;
  }
  try {
    await transporter.sendMail({
      from: env.SMTP_FROM ?? 'Dayflow HRMS <noreply@dayflow.dev>',
      ...options,
    });
    console.log('[Mailer] Email sent to:', options.to);
  } catch (err) {
    console.error('[Mailer] Failed to send email:', err);
    throw err;
  }
};
