import { Response, Request, Router } from "express";
import { AdUserRecord } from "../record/adUser/adUser.record";

export const adUserRouter = Router()

    .get('/:id', async (req: Request, res: Response) => {
        try {
            const user = await AdUserRecord.getOneUserId(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas pobierania użytkownika' });
        }

    })
    .post('/:id', async (req: Request, res: Response) => {
        try {
            const user = new AdUserRecord(req.body);
            user.updateUser();
            res.status(200).json({ message: `Dane użytkownika ${user.username} został zmienione.` })
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas zmiany danych użytkownika.' });
        }
    })

    .post('/', async (req: Request, res: Response) => {
        try {
            const user = new AdUserRecord(req.body);
            user.insertUser();
            res.status(201).json({ message: `Użytkownik ${user.username} został dodane` })
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas dodawania użytkownika' });
        }
    })