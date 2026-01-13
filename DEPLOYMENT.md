# Deployment Guide for imagetools.shop

## Server Information
- **Hosting**: LiteSpeed Web Server (LSWS)
- **Node Path**: /opt/alt/alt-nodejs18/root/usr/bin
- **Frontend Path**: /home/u688789577/domains/imagetools.shop/public_html/
- **Backend Path**: /home/u688789577/domains/imagetools.shop/backend/

## Build Instructions

### Step 1: Build Locally
```bash
# Windows
build.bat

# Linux/Mac
./build.sh
```

This creates:
- `mr-robot/dist/` - Frontend build
- `backend-robot/dist/` - Backend compiled JavaScript

### Step 2: Deploy Frontend
```bash
# Upload contents of mr-robot/dist/ to:
/home/u688789577/domains/imagetools.shop/public_html/

# Ensure index.html is at root
```

### Step 3: Deploy Backend
```bash
# Upload to backend folder:
/home/u688789577/domains/imagetools.shop/backend/

# Copy these files/folders:
- dist/ (compiled JavaScript)
- node_modules/ (dependencies)
- .env.production (environment variables)
- package.json
- package-lock.json
```

## Environment Configuration

### Frontend (.env.production)
Located in: `mr-robot/.env.production`
```
VITE_APP_ENV=production
VITE_API_URL=https://api.imagetools.shop
VITE_APP_VERSION=1.0.0
VITE_SPEED_TEST_ENABLED=false
```

### Backend (.env.production)
Located in: `backend-robot/.env.production`
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

## Node.js Configuration on LiteSpeed

For your LiteSpeed server configuration:

1. **Node.js App Entry**: `dist/server.js`
2. **App Port**: `5000`
3. **Working Directory**: `/home/u688789577/domains/imagetools.shop/backend/`
4. **Node.js Version**: 18.20.8 (or higher)

# Full Project Deployment Guide

## Frontend (mr-robot)
- Framework: React (Vite)
- Build: `npm run build` (creates `dist/`)
- Upload `dist/` contents to Hostinger `public_html` directory
- Select "React" or "Vite" preset in Hostinger

## Backend (backend-robot)
- Framework: Node.js (Custom)
- Build: `npm install && npm run build` (creates `dist/`)
- Upload `dist/`, `node_modules/`, `.env.production` to Hostinger backend directory
- Entry file: `dist/server.js`
- Node version: 18.x
- Start: `node dist/server.js`

## Environment Files
- `.env.production` (backend-robot): contains DB and app config
- Do NOT commit `.env.production` to GitHub

## GitHub → Hostinger
- Push all code to GitHub (main branch)
- On Hostinger, pull from GitHub and follow above steps

## Notes
- No backend framework selection needed—just Node.js entry file
- Frontend is static React/Vite build
- Backend is Node.js app with environment variables
