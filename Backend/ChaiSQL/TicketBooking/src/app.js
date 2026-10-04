import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './module/auth/auth.router.js';
import ticketRoutes from './module/ticketBooking/seats.js';

const app = express();

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/',(req, res) => {
    res.redirect('/api/auth/login')
})

app.get('/health', (req, res) => res.json({ success: true, message: 'Server is running' }));
app.use('/api/auth', authRoutes);
app.use('/ticket', ticketRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((error, req, res, next) => {
    console.error(error);
    const status = error.statusCode || 500;
    return res.status(status).json({
        success: false,
        message: error.message || 'Internal server error'
    });
});

export default app;