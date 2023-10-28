import { Router } from "express";
import { adBookRouter } from './adBook.router';
import { adUserRouter } from './adUser.router';
import { adAuthorRouter } from './adAuthor.router';
import { adCategorieRouter } from './adCategorie.router';
import { authenticateToken } from "../controllers/authMiddleware";


export const appRouter = Router();

appRouter.use('/book', authenticateToken, adBookRouter);
//appRouter.use('/user', adUserRouter);
appRouter.use('/author', authenticateToken, adAuthorRouter);
appRouter.use('/categorie', authenticateToken, adCategorieRouter);