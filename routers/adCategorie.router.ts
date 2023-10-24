import { Router } from "express";
import { AdCategorieEntity, SimpleAdCategrieEntity } from "../types/index"
import { AdCategoryRecord } from "../record/adCategorie/adCategorie.record";

export const adCategorieRouter = Router()

    .get('/search/:name?', async (req, res) => {
        const categories = await AdCategoryRecord.getAllCategorie(req.params.name ?? '');
        res.json(categories);
    })

    .get('/:id', async (req, res) => {
        const categorie = await AdCategoryRecord.getOneCategorie(req.params.id);
        res.json(categorie);
    })

    .post('/', async (req, res) => {
        const categorie = new AdCategoryRecord(req.body);
        await categorie.insertCategorie();
        res.json(categorie);
    });