import { Router } from "express";
import { adBookRouter } from './adBook.router';
import { adUserRouter } from './adUser.router';
import { adAuthorRouter } from './adAuthor.router';
import { adCategorieRouter } from './adCategorie.router';
import { authenticateToken } from "../controllers/authMiddleware";


export const appRouter = Router();

appRouter.use('/book', adBookRouter);
appRouter.use('/user', adUserRouter);
appRouter.use('/author', adAuthorRouter);
appRouter.use('/categorie', adCategorieRouter);