import express from 'express';
import cors from 'cors';
import contentCardRoutes from './routes/contentCardRoutes.js';
import { pool } from './utils/db.js';
const app = express();
// Enable CORS for production and local development
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:8080',
    'http://localhost:3000',
    'https://imagetools.shop',
    'http://imagetools.shop'
];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
// Middleware
app.use(express.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});
// Database health check
app.get('/health/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'Database connection OK', timestamp: result.rows[0] });
    }
    catch (error) {
        console.error('Database health check failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ status: 'Database connection failed', error: errorMessage });
    }
});
// Routes
app.use('/api', contentCardRoutes);
export default app;
