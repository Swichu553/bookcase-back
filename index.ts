import express, { Router, json } from 'express';
import cors from 'cors';
import { config } from './config/config';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/errors';
import { adBookRouter } from './routers/adbook.router';
import { adUserRouter } from './routers/adUser.router';
import { adAuthorRouter } from './routers/adAuthor.router';
import { adCategorieRouter } from './routers/adCategorie.router';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, //15min
    max: 100, //limit
}));

const router = Router();

app.use('/book', adBookRouter);
app.use('/user', adUserRouter);
app.use('/author', adAuthorRouter);
app.use('/categorie', adCategorieRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});