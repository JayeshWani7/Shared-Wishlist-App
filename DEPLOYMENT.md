# Deployment Guide - Shared Wishlist App

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git (optional)

### 2. Setup
1. Extract the project files or clone the repository
2. Open terminal/command prompt
3. For Windows users, run: `setup.bat`
4. For Mac/Linux users, run: `chmod +x setup.sh && ./setup.sh`

### 3. Manual Setup (if scripts don't work)

#### Backend Setup:
```bash
cd backend
npm install
npm run build
```

#### Frontend Setup:
```bash
cd frontend  
npm install
```

### 4. Environment Configuration

#### Backend (.env file in /backend):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wishlist-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

#### Frontend (.env file in /frontend):
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
PORT=3000
```

### 5. Start the Application

#### Option A: Manual Start
Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

#### Option B: VS Code Tasks
1. Open VS Code
2. Ctrl+Shift+P → "Tasks: Run Task"
3. Select "Start Backend Server"
4. Select "Start Frontend Server"

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 7. Demo Data (Optional)
To populate with sample data:
```bash
cd backend
npm run seed
```

**Demo Accounts:**
- Email: demo@example.com, Password: demo123
- Email: john@example.com, Password: demo123
- Email: jane@example.com, Password: demo123

## Production Deployment

### 1. Environment Variables (Production)
```bash
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wishlist-app
JWT_SECRET=very-secure-random-string-here
NODE_ENV=production

# Frontend
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_SOCKET_URL=https://your-api-domain.com
```

### 2. Deployment Platforms

#### Vercel (Frontend) + Railway (Backend)
1. **Frontend (Vercel):**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Backend (Railway):**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

#### Heroku (Full Stack)
1. **Backend:**
   ```bash
   heroku create your-app-backend
   heroku config:set MONGODB_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=your-secret
   git push heroku main
   ```

2. **Frontend:**
   ```bash
   heroku create your-app-frontend
   heroku buildpacks:set mars/create-react-app
   heroku config:set REACT_APP_API_URL=https://your-app-backend.herokuapp.com/api
   git push heroku main
   ```

#### AWS (EC2 + MongoDB Atlas)
1. Launch EC2 instance
2. Install Node.js and PM2
3. Clone repository
4. Configure environment variables
5. Use PM2 for process management
6. Configure nginx as reverse proxy

### 3. Database Setup (Production)

#### MongoDB Atlas
1. Create cluster at mongodb.com
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update MONGODB_URI

#### Self-hosted MongoDB
1. Install MongoDB on server
2. Configure authentication
3. Set up replica set (recommended)
4. Configure backup strategy

### 4. SSL/HTTPS Setup
1. Obtain SSL certificate (Let's Encrypt recommended)
2. Configure nginx/Apache
3. Update environment variables to use HTTPS

### 5. Performance Optimization

#### Backend
- Enable compression
- Implement caching (Redis)
- Database indexing
- Rate limiting

#### Frontend
- Code splitting
- Image optimization
- CDN for static assets
- Service worker for caching

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
- Check if MongoDB is running
- Verify connection string
- Check network connectivity
- Ensure proper authentication

#### 2. CORS Errors
- Update CORS origin in backend
- Check environment variables
- Verify API URLs

#### 3. Socket.io Connection Issues
- Check firewall settings
- Verify WebSocket support
- Update socket URL configuration

#### 4. Build Errors
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are installed

### Performance Issues
- Monitor memory usage
- Check database query performance
- Implement proper error handling
- Use production build for frontend

## Monitoring & Maintenance

### 1. Health Checks
- Implement health check endpoints
- Monitor database connectivity
- Set up uptime monitoring

### 2. Logging
- Use structured logging
- Monitor error rates
- Set up log aggregation

### 3. Backups
- Regular database backups
- Test backup restoration
- Document recovery procedures

### 4. Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in staging environment

## Security Considerations

### 1. Authentication
- Use strong JWT secrets
- Implement token expiration
- Consider refresh tokens

### 2. Data Validation
- Validate all input data
- Sanitize user inputs
- Use HTTPS in production

### 3. Database Security
- Use authentication
- Limit database access
- Regular security updates

### 4. Rate Limiting
- Implement API rate limiting
- Protect against brute force
- Monitor unusual activity

## Support

For technical issues:
1. Check console logs (browser & server)
2. Verify environment configuration
3. Test with demo data
4. Review documentation

For feature requests or bugs:
1. Document the issue clearly
2. Include steps to reproduce
3. Provide system information
4. Include relevant error messages
