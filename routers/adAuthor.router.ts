import { Router } from "express";
import { AdAuthorEntity, SimpleAdAuthorEntity } from "../types/index"
import { AdAuthorRecord } from "../record/adAuthor/adAuthor.record";

export const adAuthorRouter = Router()

    .get('/search/:lastName?', async (req, res) => {
        const authors = await AdAuthorRecord.getAllAuthors(req.params.lastName ?? '');
        res.json(authors)
    })

    .get(':id', async (req, res) => {
        const author = await AdAuthorRecord.getOneAuthor(req.params.id);
        res.json(author);
    })

    .post('/', async (req, res) => {
        const author = new AdAuthorRecord(req.body);
        await author.insertAuthor();
        res.json(author);
    });