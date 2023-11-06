import { Response, Request, Router } from "express";
import { AdUserRecord } from "../record/adUser/adUser.record";

export const adUserRouter = Router()

    .get('/:id/books/:title?', async (req: Request, res: Response) => {
        try {
            const { id, title } = req.params
            const books = await AdUserRecord.getUserBooks(id, title ?? '');
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Błąd pobierania książek użytkownika' });
        }
    })

    .get('/:id', async (req: Request, res: Response) => {
        try {
            const user = await AdUserRecord.getOneUserId(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas pobierania użytkownika' });
        }

    })

    .post('/', async (req: Request, res: Response) => {
        try {
            const user = new AdUserRecord(req.body);
            user.updateUser();
            res.status(200).json({ message: `Dane użytkownika ${user.username} został zmienione.` })
        } catch (error) {
            res.status(500).json({ error: 'Błąd podczas zmiany danych użytkownika.' });
        }
    });