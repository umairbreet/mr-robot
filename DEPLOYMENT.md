# Deployment Guide for imagetools.shop

## Overview
This project is configured to run on the domain **imagetools.shop** with proper CORS setup and environment variables.

## Architecture
- **Frontend**: React app (mr-robot) - runs on https://imagetools.shop
- **Backend API**: Express.js (backend-robot) - runs on https://api.imagetools.shop
- **Database**: PostgreSQL/Supabase

## Environment Configuration

### Frontend (.env.production)
```
VITE_APP_ENV=production
VITE_API_URL=https://api.imagetools.shop
VITE_APP_VERSION=1.0.0
VITE_SPEED_TEST_ENABLED=false
```

### Backend (.env.production)
```
NODE_ENV=production
PORT=5000
DB_USER=robot_admin
DB_HOST=localhost
DB_NAME=robot_db
DB_PASSWORD=Rb2150810@
DB_PORT=5432
CORS_ORIGIN=https://imagetools.shop
```

## Deployment Steps

### 1. Frontend Deployment (to https://imagetools.shop)
```bash
cd mr-robot
npm run build
# Upload dist/ contents to web server at imagetools.shop root
```

### 2. Backend Deployment (to https://api.imagetools.shop)
```bash
cd backend-robot
npm run build
# Start with: NODE_ENV=production npm start
# Ensure it runs on port 5000
```

### 3. DNS/Server Configuration Required
- **imagetools.shop** → Frontend web server
- **api.imagetools.shop** → Backend API server (port 5000)

### 4. SSL/HTTPS
- Ensure SSL certificates are installed on both domains
- Update CORS settings in [backend-robot/src/app.ts](backend-robot/src/app.ts) if needed

## Testing Domain Connection
```bash
# Test backend API health
curl https://api.imagetools.shop/health

# Test database connection
curl https://api.imagetools.shop/health/db

# Test from frontend
# The API_URL environment variable will automatically use the production domain
```

## API Endpoints
All endpoints are prefixed with `/api`:
- `GET /api/cards` - Fetch all content cards
- `POST /api/cards` - Create new content card
- `PUT /api/cards/:id` - Update content card
- `DELETE /api/cards/:id` - Delete content card

## Current CORS Settings
The backend accepts requests from:
- http://localhost:5173
- http://localhost:5174
- http://localhost:5175
- http://localhost:8080
- http://localhost:3000
- https://imagetools.shop
- http://imagetools.shop

See [backend-robot/src/app.ts](backend-robot/src/app.ts) line 9-16 to modify.
