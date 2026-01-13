# Backend Deployment (Node.js)

## How to Deploy to Hostinger

1. **Build the backend:**
   ```sh
   npm install
   npm run build
   ```
2. **Upload these folders/files to Hostinger backend directory:**
   - `dist/` (compiled output)
   - `node_modules/` (dependencies)
   - `.env.production` (environment variables, NOT committed to GitHub)
   - `package.json` and `ecosystem.config.js` (for PM2 or process manager)

3. **Set entry file:**
   - `dist/server.js`

4. **Node version:**
   - 18.x

5. **Start the app:**
   ```sh
   node dist/server.js
   ```

## Environment Variables (.env.production)
```
NODE_ENV=production
PORT=5000
DB_USER=robot_admin
DB_HOST=localhost
DB_NAME=robot_db
DB_PASSWORD=your_password
DB_PORT=5432
CORS_ORIGIN=https://imagetools.shop
```

## Notes
- Do NOT commit `.env.production` to GitHub.
- Use Hostinger's file manager or SSH to upload files.
- For database, use local PostgreSQL (as configured).
