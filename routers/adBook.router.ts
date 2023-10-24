import { Router } from "express";
import { AdBookEntity, SimpleAdBookEntity } from "../types/index"
import { AdBookRecord } from "../record/adBook/adBook.record";


export const adBookRouter = Router()

    .get('/search/:title?', async (req, res) => {
        const books = await AdBookRecord.getAllBooks(req.params.title ?? '');
        res.json(books)
    })

    .get('/:id', async (req, res) => {
        const book = await AdBookRecord.getOneBook(req.params.id);
        res.json(book);
    })

    .post('/', async (req, res) => {
        const book = new AdBookRecord(req.body);
        await book.insertBook();
        res.json(book);
    });