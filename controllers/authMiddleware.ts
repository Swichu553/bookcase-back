import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Brak tokenu JWT. Autoryzacja nie powiodła się.' });
    }

    jwt.verify(token, process.env.SESSION_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Nieprawidłowy token JWT. Autoryzacja nie powiodła się.' });
        }

        next();
    });
};
