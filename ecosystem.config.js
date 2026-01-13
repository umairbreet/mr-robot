module.exports = {
  apps: [
    {
      name: 'imagetools-backend',
      script: './backend-robot/dist/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      instances: 1,
      exec_mode: 'fork',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
