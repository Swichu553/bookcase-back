import { Router } from "express";
import { adBookRouter } from './adBook.router';
import { adUserRouter } from './adUser.router';
import { adAuthorRouter } from './adAuthor.router';
import { adCategorieRouter } from './adCategorie.router';
import { authenticateToken } from "../controllers/authMiddleware";


export const appRouter = Router()

    .use('/book', authenticateToken, adBookRouter)
    .use('/user', authenticateToken, adUserRouter)
    .use('/author', authenticateToken, adAuthorRouter)
    .use('/categorie', authenticateToken, adCategorieRouter);