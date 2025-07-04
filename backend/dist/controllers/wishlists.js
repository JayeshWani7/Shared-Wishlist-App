"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.deleteWishlist = exports.updateWishlist = exports.createWishlist = exports.getPublicWishlists = exports.getWishlist = exports.getWishlists = void 0;
const express_validator_1 = require("express-validator");
const Wishlist_1 = require("../models/Wishlist");
const getWishlists = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlists = await Wishlist_1.Wishlist.find({
            $or: [
                { owner: userId },
                { collaborators: userId },
                { isPublic: true }
            ]
        })
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar')
            .sort({ updatedAt: -1 });
        res.json({ wishlists });
    }
    catch (error) {
        console.error('Get wishlists error:', error);
        res.status(500).json({ message: 'Server error fetching wishlists' });
    }
};
exports.getWishlists = getWishlists;
const getWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            $or: [
                { owner: userId },
                { collaborators: userId },
                { isPublic: true }
            ]
        })
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar');
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        res.json({ wishlist });
    }
    catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({ message: 'Server error fetching wishlist' });
    }
};
exports.getWishlist = getWishlist;
const getPublicWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist_1.Wishlist.find({ isPublic: true })
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar')
            .sort({ updatedAt: -1 });
        res.json({ wishlists });
    }
    catch (error) {
        console.error('Get public wishlists error:', error);
        res.status(500).json({ message: 'Server error fetching public wishlists' });
    }
};
exports.getPublicWishlists = getPublicWishlists;
const createWishlist = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { title, description, isPublic } = req.body;
        const userId = req.user._id;
        const wishlist = new Wishlist_1.Wishlist({
            title,
            description,
            owner: userId,
            collaborators: [],
            products: [],
            isPublic: isPublic || false
        });
        await wishlist.save();
        const populatedWishlist = await Wishlist_1.Wishlist.findById(wishlist._id)
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar');
        res.status(201).json({
            message: 'Wishlist created successfully',
            wishlist: populatedWishlist
        });
    }
    catch (error) {
        console.error('Create wishlist error:', error);
        res.status(500).json({ message: 'Server error creating wishlist' });
    }
};
exports.createWishlist = createWishlist;
const updateWishlist = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { title, description, isPublic } = req.body;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            $or: [
                { owner: userId },
                { collaborators: userId }
            ]
        });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        if (wishlist.owner.toString() !== userId.toString()) {
            res.status(403).json({ message: 'Only the owner can update wishlist details' });
            return;
        }
        wishlist.title = title || wishlist.title;
        wishlist.description = description || wishlist.description;
        wishlist.isPublic = isPublic !== undefined ? isPublic : wishlist.isPublic;
        await wishlist.save();
        const populatedWishlist = await Wishlist_1.Wishlist.findById(wishlist._id)
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar');
        res.json({
            message: 'Wishlist updated successfully',
            wishlist: populatedWishlist
        });
    }
    catch (error) {
        console.error('Update wishlist error:', error);
        res.status(500).json({ message: 'Server error updating wishlist' });
    }
};
exports.updateWishlist = updateWishlist;
const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            owner: userId
        });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found or unauthorized' });
            return;
        }
        await Wishlist_1.Wishlist.findByIdAndDelete(id);
        res.json({ message: 'Wishlist deleted successfully' });
    }
    catch (error) {
        console.error('Delete wishlist error:', error);
        res.status(500).json({ message: 'Server error deleting wishlist' });
    }
};
exports.deleteWishlist = deleteWishlist;
const addProduct = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { name, description, price, imageUrl, url, category, priority } = req.body;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            $or: [
                { owner: userId },
                { collaborators: userId }
            ]
        });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        const newProduct = {
            name,
            description,
            price,
            imageUrl,
            url,
            category,
            priority: priority || 'medium',
            addedBy: userId,
            addedAt: new Date(),
            updatedAt: new Date()
        };
        wishlist.products.push(newProduct);
        await wishlist.save();
        const populatedWishlist = await Wishlist_1.Wishlist.findById(wishlist._id)
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar');
        res.status(201).json({
            message: 'Product added successfully',
            wishlist: populatedWishlist
        });
    }
    catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ message: 'Server error adding product' });
    }
};
exports.addProduct = addProduct;
const updateProduct = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id, productId } = req.params;
        const { name, description, price, imageUrl, url, category, priority } = req.body;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            $or: [
                { owner: userId },
                { collaborators: userId }
            ]
        });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        const product = wishlist.products.find(p => p._id.toString() === productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        if (name !== undefined)
            product.name = name;
        if (description !== undefined)
            product.description = description;
        if (price !== undefined)
            product.price = price;
        if (imageUrl !== undefined)
            product.imageUrl = imageUrl;
        if (url !== undefined)
            product.url = url;
        if (category !== undefined)
            product.category = category;
        if (priority !== undefined)
            product.priority = priority;
        product.updatedAt = new Date();
        await wishlist.save();
        const populatedWishlist = await Wishlist_1.Wishlist.findById(wishlist._id)
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar');
        res.json({
            message: 'Product updated successfully',
            wishlist: populatedWishlist
        });
    }
    catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Server error updating product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id, productId } = req.params;
        const userId = req.user._id;
        const wishlist = await Wishlist_1.Wishlist.findOne({
            _id: id,
            $or: [
                { owner: userId },
                { collaborators: userId }
            ]
        });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        const product = wishlist.products.find(p => p._id.toString() === productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        if (product.addedBy.toString() !== userId.toString() &&
            wishlist.owner.toString() !== userId.toString()) {
            res.status(403).json({ message: 'Unauthorized to delete this product' });
            return;
        }
        wishlist.products = wishlist.products.filter(p => p._id.toString() !== productId);
        await wishlist.save();
        const populatedWishlist = await Wishlist_1.Wishlist.findById(wishlist._id)
            .populate('owner', 'username email avatar')
            .populate('collaborators', 'username email avatar')
            .populate('products.addedBy', 'username email avatar');
        res.json({
            message: 'Product deleted successfully',
            wishlist: populatedWishlist
        });
    }
    catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error deleting product' });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=wishlists.js.map