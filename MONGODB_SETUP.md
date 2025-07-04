# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### 1. Create MongoDB Atlas Account
1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Choose "Create a free cluster"
4. Select a cloud provider (AWS recommended)
5. Choose a region close to you
6. Click "Create Cluster" (takes 1-3 minutes)

### 2. Create Database User
1. In Atlas dashboard, go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (remember these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 4. Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" driver
5. Copy the connection string

### 5. Update Your .env File
1. Open `backend/.env`
2. Replace the `MONGODB_URI` line with your connection string
3. Replace `<username>` and `<password>` with your database user credentials
4. Replace `myFirstDatabase` with `wishlist-app`

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/wishlist-app?retryWrites=true&w=majority
```

### 6. Test Connection
Run your backend server:
```bash
cd backend
npm run dev
```

You should see: "Connected to MongoDB" and "Server running on port 5000"

## Alternative: Local MongoDB Installation

If you prefer to install MongoDB locally:

### Windows
1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB as a service or manually run `mongod`
4. Keep the original `MONGODB_URI=mongodb://localhost:27017/wishlist-app` in your `.env`

### Using Docker (if you have Docker installed)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Troubleshooting

### Common Issues:
1. **Connection timeout**: Check network access settings in Atlas
2. **Authentication failed**: Verify username/password in connection string
3. **Database not found**: MongoDB will create the database automatically when you first write data

### Need Help?
- MongoDB Atlas Documentation: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)
- Connection troubleshooting: [https://docs.atlas.mongodb.com/troubleshoot-connection/](https://docs.atlas.mongodb.com/troubleshoot-connection/)
