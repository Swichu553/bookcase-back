import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

// Trasa do logowania
export const authRouter = router
    .post('/login', (req: Request, res: Response, next) => {
        // Użyj Passport.js do uwierzytelnienia
        passport.authenticate('local', (err: string, user: string, info: string) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // Uwierzytelnianie nie powiodło się
                return res.status(401).json({ message: 'Nieprawidłowe dane uwierzytelniające' });
            }
            // Uwierzytelnianie zakończone sukcesem
            req.login(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json({ message: 'Zalogowano pomyślnie' });
            });
        })(req, res, next);
    });

