import { pool, createContentCardTableIfNotExists } from '../utils/db';
export const addContentCard = async (card) => {
    await createContentCardTableIfNotExists();
    const { title, description, image_url, hackLevel = 5, status = 'secure', dataSize = '0MB' } = card;
    const query = `INSERT INTO content_cards (title, description, image_url, hack_level, status, data_size)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [title, description, image_url, hackLevel, status, dataSize];
    try {
        const result = await pool.query(query, params);
        return result.rows[0];
    }
    catch (err) {
        console.error('DB error in addContentCard:', {
            query,
            params,
            error: err instanceof Error ? err.stack || err.message : err,
        });
        throw err;
    }
};
export const getAllContentCards = async () => {
    await createContentCardTableIfNotExists();
    const query = `SELECT 
            id,
            title,
            description,
            image_url,
            hack_level as "hackLevel",
            status,
            data_size as "dataSize",
            created_at
        FROM content_cards 
        ORDER BY created_at DESC`;
    try {
        const result = await pool.query(query);
        return result.rows;
    }
    catch (err) {
        console.error('DB error in getAllContentCards:', { query, error: err instanceof Error ? err.stack || err.message : err });
        throw err;
    }
};
