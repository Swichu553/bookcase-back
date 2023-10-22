import { Router } from "express";
import { AdUserEntity } from "../types/index"
import { AdUserRecord } from "../record/adUser/adUser.record";

export const authRouter = Router()


    .get('/login', async (req, res) => {
        const { login, pass } = req.body;
        const user = await AdUserRecord.checkPassword(login, pass);

        res.json(user);
    })

