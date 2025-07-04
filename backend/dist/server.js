"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./utils/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const wishlists_1 = __importDefault(require("./routes/wishlists"));
const auth_2 = require("./middleware/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;
(0, database_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/auth', auth_1.default);
app.use('/api/wishlists', wishlists_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
io.use(auth_2.authenticateSocket);
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);
    socket.on('join-wishlist', (wishlistId) => {
        socket.join(`wishlist-${wishlistId}`);
        console.log(`User ${socket.userId} joined wishlist ${wishlistId}`);
    });
    socket.on('leave-wishlist', (wishlistId) => {
        socket.leave(`wishlist-${wishlistId}`);
        console.log(`User ${socket.userId} left wishlist ${wishlistId}`);
    });
    socket.on('product-added', (data) => {
        socket.to(`wishlist-${data.wishlistId}`).emit('product-added', data);
    });
    socket.on('product-updated', (data) => {
        socket.to(`wishlist-${data.wishlistId}`).emit('product-updated', data);
    });
    socket.on('product-removed', (data) => {
        socket.to(`wishlist-${data.wishlistId}`).emit('product-removed', data);
    });
    socket.on('wishlist-updated', (data) => {
        socket.to(`wishlist-${data.wishlistId}`).emit('wishlist-updated', data);
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map