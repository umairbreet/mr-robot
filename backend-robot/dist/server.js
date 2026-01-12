import app from './app.js';
import { initializeDatabase } from './utils/db.js';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config({
    path: process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'
});
const PORT = process.env.PORT || 5000;
// Initialize database before starting server
(async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map