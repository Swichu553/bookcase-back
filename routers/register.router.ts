import { Request, Response, Router } from "express";
import { AdUserRecord } from "../record/adUser/adUser.record";

export const registerRouter = Router()

    .post('/', async (req: Request, res: Response) => {
        try {
            const user = new AdUserRecord(req.body);
            user.insertUser();
            res.status(201).json({ message: `Użytkownik ${user.username} został dodane` });
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas dodawania użytkownika' });
        }
    });