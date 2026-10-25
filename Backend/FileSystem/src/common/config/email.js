import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.env');
dotenv.config({ path: envPath });

const createTransporter = () => {
    if (!process.env.SMTP_HOST) {
        throw new Error("SMTP_HOST must be configured to send verification emails");
    }

    const port = Number(process.env.SMTP_PORT || 587);
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        auth: process.env.SMTP_USER && process.env.SMTP_PASS
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
    });
};


const sendMail = async (to, subject, html) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to,
        subject,
        html,
    })
};

const sendVerificationEmail = async (email, rawToken) => {
    const frontendUrl = process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 3000}`;
    const verificationUrl = new URL('/verify/', frontendUrl);
    verificationUrl.searchParams.set('token', rawToken);

    await sendMail(
        email,
        'Verify your email address',
        `<p>Thanks for registering. Verify your email address using the link below:</p>
         <p><a href="${verificationUrl.toString()}">Verify email address</a></p>
         <p>This link expires in 15 minutes. If you did not create this account, you can ignore this email.</p>`
    );
};

export {
    sendMail,
    sendVerificationEmail
}