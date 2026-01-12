import { Pool } from 'pg';
export declare const pool: Pool;
export declare const initializeDatabase: () => Promise<void>;
export declare const createContentCardTableIfNotExists: () => Promise<void>;
