import { Router } from "express";
import { AdBookEntity, SimpleAdBookEntity } from "../types/index"
import { AdBookRecord } from "../record/adBook/adBook.record";


export const adBookRouter = Router()

    .get('/search/:title?', async (req, res) => {
        try {
            const books = await AdBookRecord.getAllBooks(req.params.title ?? '');
            res.json(books)
        } catch (error) {
            res.status(500).json({ error: 'Błąd pobierania książek' });
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const book = await AdBookRecord.getOneBook(req.params.id);
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Błąd pobierania książki' });
        }
    })

    .post('/', async (req, res) => {
        try {
            const book = new AdBookRecord(req.body);
            await book.insertBook();
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Błąd dodawania książki' });
        }
    })

    .delete('/:id', async (req, res) => {
        try {
            const bookId = await AdBookRecord.delBook(req.params.id);
            if (bookId) {
                res.status(200).json({ message: 'Książka została usunięta.' });
                res.end();
            } else {
                res.status(404).json({ error: 'Książka nie znaleziona.' });
                res.end();

            }
        } catch (error) {
            res.status(500).json({ error: `Błąd usuwania książki` });
            res.end();

        }
    });