import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    user: process.env.DB_USER || 'robot_admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'robot_db',
    password: process.env.DB_PASSWORD || 'Rb2150810@',
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
    try {
        console.log('Testing Supabase connection...');
        console.log('Host:', process.env.DB_HOST || 'localhost');
        console.log('Database:', process.env.DB_NAME || 'robot_db');
        console.log('User:', process.env.DB_USER || 'robot_admin');
        
        const client = await pool.connect();
        console.log('✓ Connected successfully');
        
        // Test query
        const result = await client.query('SELECT NOW()');
        console.log('✓ Test query executed');
        console.log('Database time:', result.rows[0]);
        
        // Check tables
        const tables = await client.query(`
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('✓ Tables in database:', tables.rows.map(r => r.table_name));
        
        client.release();
        console.log('\n✓ Connection test passed!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Connection test failed:', error);
        process.exit(1);
    }
}

testConnection();
