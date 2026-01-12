-- Connect as postgres superuser first
-- psql -U postgres -d robot_db -f setup-db.sql

-- Grant permissions to robot_admin user
GRANT USAGE ON SCHEMA public TO robot_admin;
GRANT CREATE ON SCHEMA public TO robot_admin;
ALTER SCHEMA public OWNER TO robot_admin;

-- Drop existing table if it exists (so we can recreate with proper owner)
DROP TABLE IF EXISTS content_cards CASCADE;

-- Create the content_cards table (will be owned by postgres, then we'll alter it)
CREATE TABLE public.content_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Change ownership to robot_admin
ALTER TABLE public.content_cards OWNER TO robot_admin;
ALTER SEQUENCE public.content_cards_id_seq OWNER TO robot_admin;

-- Grant all privileges
GRANT ALL PRIVILEGES ON public.content_cards TO robot_admin;
GRANT ALL PRIVILEGES ON public.content_cards_id_seq TO robot_admin;

-- Set future defaults
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO robot_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO robot_admin;
