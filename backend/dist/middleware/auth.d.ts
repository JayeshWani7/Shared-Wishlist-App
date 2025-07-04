import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
export interface AuthenticatedRequest extends Request {
    user?: any;
}
export interface AuthenticatedSocket extends Socket {
    userId?: string;
}
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authenticateSocket: (socket: AuthenticatedSocket, next: (err?: Error) => void) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map