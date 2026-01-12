import app from './app.ts';
import { initializeDatabase } from './utils/db.ts';

const PORT = 5000;

// Initialize database before starting server
(async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();