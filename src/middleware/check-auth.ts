
import {Request, Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
export const checkAuth = (req:Request,res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Your session expired or you are not logged in' });
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not defined!');
        }

        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded; 
        next();
        
    } catch (e) {
        console.log('Error on check-auth middleware: ', e);
        return res.status(401).json({ message: 'Invalid token' });
    }
}