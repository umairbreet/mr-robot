# Backend Robot - Database Setup

## Prerequisites
- PostgreSQL running on localhost:5432
- Database `robot_db` created
- User `robot_admin` with password `Rb2150810@`

## Database Setup Instructions

### Option 1: Using Setup Script (Recommended)
If you haven't set up the database yet, run:

```bash
# As postgres superuser
psql -U postgres -d robot_db -f setup-db.sql
```

### Option 2: Manual Setup
Connect to PostgreSQL as the `postgres` superuser:

```bash
psql -U postgres -d robot_db
```

Then run these commands:

```sql
-- Grant permissions to robot_admin user
GRANT USAGE ON SCHEMA public TO robot_admin;
GRANT CREATE ON SCHEMA public TO robot_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO robot_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO robot_admin;

-- Ensure robot_admin can create tables in future
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO robot_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO robot_admin;
```

Then exit and try the application again.

### Option 3: Connect as robot_admin User Directly

If robot_admin doesn't have permissions, you can alter the role:

```sql
-- As postgres superuser
ALTER ROLE robot_admin WITH CREATEDB CREATEROLE;
```

## Starting the Server

Development mode:
```bash
npm run dev
```

Production mode (after building):
```bash
npm run build
npm start
```

## API Endpoints

- `GET /health` - Server health check
- `GET /health/db` - Database connection check
- `GET /api/cards` - Fetch all content cards
- `POST /api/cards` - Create a new content card

## Troubleshooting

If you get "permission denied for schema public":

1. Connect as postgres superuser:
   ```bash
   psql -U postgres -d robot_db
   ```

2. Run:
   ```sql
   GRANT USAGE ON SCHEMA public TO robot_admin;
   GRANT CREATE ON SCHEMA public TO robot_admin;
   ```

3. Restart the server
