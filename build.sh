#!/bin/bash
cd "$(dirname "$0")"
echo "Installing root dependencies..."
npm install
echo "Installing backend dependencies..."
cd backend-robot && npm install && cd ..
echo "Installing frontend dependencies..."
cd mr-robot && npm install && cd ..
echo "Building backend..."
cd backend-robot && npm run build && cd ..
echo "Building frontend..."
cd mr-robot && npm run build && cd ..
echo "Build complete!"
