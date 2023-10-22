import { Router } from "express";
import { adBookRouter } from './adBook.router';
import { adUserRouter } from './adUser.router';
import { adAuthorRouter } from './adAuthor.router';
import { adCategorieRouter } from './adCategorie.router';
import { authRouter } from "./auth.router";
import { AdUserEntity } from "../types/index";


export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/book', adBookRouter);
appRouter.use('/user', adUserRouter);
appRouter.use('/author', adAuthorRouter);
appRouter.use('/categorie', adCategorieRouter);