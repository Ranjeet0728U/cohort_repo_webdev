import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.env');
dotenv.config({ path: envPath });

const transporter = nodemailer.createTransport({
    host : 'smpt.example.com',
    port : 587,
    secure : false,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    },
})


const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from : `${process.env.SMTP_FROM_EMAIL}`,
        to,
        subject,
        html,
    })
}

const sendVerificationEmail = async (email, token) => {
    transporter.sendMail({
        from : `${process.env.SMTP_FROM_EMAIL}`,
        email,
        subject,
        html,
    })
};

export {
    sendMail,
    sendVerificationEmail
}