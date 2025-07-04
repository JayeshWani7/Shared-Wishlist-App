"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const wishlists_1 = require("../controllers/wishlists");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const wishlistValidation = [
    (0, express_validator_1.body)('title')
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters')
        .trim(),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters')
        .trim(),
    (0, express_validator_1.body)('isPublic')
        .optional()
        .isBoolean()
        .withMessage('isPublic must be a boolean')
];
const productValidation = [
    (0, express_validator_1.body)('name')
        .isLength({ min: 1, max: 100 })
        .withMessage('Product name must be between 1 and 100 characters')
        .trim(),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must be less than 500 characters')
        .trim(),
    (0, express_validator_1.body)('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('imageUrl')
        .optional()
        .isURL()
        .withMessage('Image URL must be a valid URL'),
    (0, express_validator_1.body)('url')
        .optional()
        .isURL()
        .withMessage('Product URL must be a valid URL'),
    (0, express_validator_1.body)('category')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Category must be less than 50 characters')
        .trim(),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high')
];
router.use(auth_1.authenticateToken);
router.get('/', wishlists_1.getWishlists);
router.get('/public', wishlists_1.getPublicWishlists);
router.get('/:id', wishlists_1.getWishlist);
router.post('/', wishlistValidation, wishlists_1.createWishlist);
router.put('/:id', wishlistValidation, wishlists_1.updateWishlist);
router.delete('/:id', wishlists_1.deleteWishlist);
router.post('/:id/products', productValidation, wishlists_1.addProduct);
router.put('/:id/products/:productId', productValidation, wishlists_1.updateProduct);
router.delete('/:id/products/:productId', wishlists_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=wishlists.js.map