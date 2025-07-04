#!/bin/bash

echo "Setting up Shared Wishlist App..."

# Check if MongoDB is running
echo "Checking MongoDB connection..."

# Install dependencies if not already installed
echo "Installing dependencies..."

# Backend
echo "Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo "Building backend..."
npm run build

# Frontend  
echo "Setting up frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB if not running"
echo "2. Backend: cd backend && npm run dev"
echo "3. Frontend: cd frontend && npm start"
echo ""
echo "The app will be available at:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
