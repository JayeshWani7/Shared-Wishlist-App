# Shared Wishlist App

A collaborative product wishlist application where multiple users can create, manage, and interact with wishlists in real-time.

## 🚀 Features

- **User Authentication**: Sign up, log in with JWT authentication
- **Wishlist Management**: Create, edit, and delete wishlists
- **Product Management**: Add, edit, and remove products with images and prices
- **Real-time Collaboration**: Live updates using WebSockets
- **User Tracking**: See who added which items
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean, intuitive design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- Socket.io-client for real-time updates
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time features
- CORS for cross-origin requests

### Database
- MongoDB for data storage
- Collections: Users, Wishlists, Products

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/wishlist-app
   JWT_SECRET=your-secret-key-here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## 🏗️ Project Structure

```
shared-wishlist-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Wishlists
- `GET /api/wishlists` - Get user's wishlists
- `POST /api/wishlists` - Create new wishlist
- `GET /api/wishlists/:id` - Get specific wishlist
- `PUT /api/wishlists/:id` - Update wishlist
- `DELETE /api/wishlists/:id` - Delete wishlist

### Products
- `POST /api/wishlists/:id/products` - Add product to wishlist
- `PUT /api/wishlists/:wishlistId/products/:productId` - Update product
- `DELETE /api/wishlists/:wishlistId/products/:productId` - Remove product

## 🔄 Real-time Features

The app uses Socket.io for real-time updates:
- Live product additions/removals
- Real-time wishlist updates
- User activity notifications

## 🎨 UI/UX Features

- Responsive design that works on all devices
- Modern, clean interface
- Intuitive navigation
- Visual feedback for user actions
- Loading states and error handling

## 🚀 Future Enhancements

- **Invite System**: Email invitations to join wishlists
- **Comments & Reactions**: Add comments and emoji reactions to products
- **Push Notifications**: Browser notifications for updates
- **Product Recommendations**: AI-powered product suggestions
- **Price Tracking**: Monitor price changes for products
- **Categories**: Organize products by categories
- **Search & Filter**: Advanced search and filtering options
- **Export Options**: Export wishlists to PDF or CSV

## 🏢 Scaling Considerations

### Performance
- Implement Redis for caching frequent queries
- Use CDN for static assets
- Optimize database queries with proper indexing
- Implement pagination for large wishlists

### Architecture
- Microservices architecture for better scalability
- API Gateway for request routing
- Load balancing for high availability
- Database sharding for large datasets

### Security
- Input validation and sanitization
- Rate limiting to prevent abuse
- HTTPS in production
- Secure file upload handling

## 📱 Mobile Considerations

- Progressive Web App (PWA) features
- Offline functionality
- Touch-friendly interface
- Optimized for mobile performance

## 🧪 Testing

- Unit tests for backend APIs
- Integration tests for database operations
- Frontend component testing
- End-to-end testing with Cypress

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please open an issue in the repository or contact Jayesh Wani (me).
