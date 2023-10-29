import { Router } from "express";
import { AdUserRecord } from "../record/adUser/adUser.record";

export const adUserRouter = Router()

    .get('/:id', async (req, res) => {
        const user = await AdUserRecord.getOneUserId(req.params.id);
        res.json(user);
    })
