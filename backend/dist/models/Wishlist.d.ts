import mongoose, { Document } from 'mongoose';
export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    url?: string;
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    addedBy: mongoose.Types.ObjectId;
    addedAt: Date;
    updatedAt: Date;
}
export interface IWishlist extends Document {
    title: string;
    description?: string;
    owner: mongoose.Types.ObjectId;
    collaborators: mongoose.Types.ObjectId[];
    products: IProduct[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Wishlist: mongoose.Model<IWishlist, {}, {}, {}, mongoose.Document<unknown, {}, IWishlist> & IWishlist & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Wishlist.d.ts.map