import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdUserRecord } from '../record/adUser/adUser.record';

export const loginRouter = Router()

    .post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const user = await AdUserRecord.getUsername(username);

            if (!user) {
                res.status(401).json({ message: 'Nieprawidłowe dane uwierzytelniające.' });
                return;
            }

            const isPasswordValid = await AdUserRecord.checkPassword(username, password);

            if (!isPasswordValid) {
                res.status(401).json({ message: 'Nieprawidłowe dane uwierzytelniające.' });
                return;
            }

            // token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SESSION_SECRET, {
                expiresIn: '15m', // Okres ważności JWT
            });

            res.json({ token });
        } catch (error) {
            next(error);
        }
    });