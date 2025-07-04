import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
export declare const getWishlists: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getWishlist: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getPublicWishlists: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const createWishlist: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const updateWishlist: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const deleteWishlist: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const addProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const updateProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const deleteProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=wishlists.d.ts.map