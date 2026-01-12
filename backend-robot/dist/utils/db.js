import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
export const pool = new Pool({
    user: process.env.DB_USER || 'robot_admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'robot_db',
    password: process.env.DB_PASSWORD || 'Rb2150810@',
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
// Test the connection on startup
pool.on('connect', () => {
    console.log('Database connected successfully');
});
pool.on('error', (err) => {
    console.error('Pool error:', err);
});
export const initializeDatabase = async () => {
    try {
        console.log('Initializing database...');
        // Create table with explicit schema
        const query = `
            CREATE TABLE IF NOT EXISTS content_cards (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url VARCHAR(500),
            hack_level INTEGER DEFAULT 5,
            status VARCHAR(50) DEFAULT 'secure',
            data_size VARCHAR(50) DEFAULT '0MB',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        const result = await pool.query(query);
        console.log('Content cards table ensured');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        // Don't throw - allow app to start even if table creation fails
        // The table might already exist
    }
};
export const createContentCardTableIfNotExists = async () => {
    // Create table if it doesn't exist, then ensure expected columns exist
    const createQuery = `
        CREATE TABLE IF NOT EXISTS content_cards (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url VARCHAR(500),
            hack_level INTEGER DEFAULT 5,
            status VARCHAR(50) DEFAULT 'secure',
            data_size VARCHAR(50) DEFAULT '0MB',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await pool.query(createQuery);
    // Run ALTER TABLE to add any missing columns (safe to run on existing tables)
    const alterQueries = [
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS description TEXT;`,
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);`,
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS hack_level INTEGER DEFAULT 5;`,
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'secure';`,
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS data_size VARCHAR(50) DEFAULT '0MB';`,
        `ALTER TABLE content_cards ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
    ];
    for (const q of alterQueries) {
        try {
            await pool.query(q);
        }
        catch (err) {
            console.error('Error ensuring column exists for content_cards:', { query: q, error: err instanceof Error ? err.message : err });
        }
    }
};
