import express, { Router, json } from 'express';
import cors from 'cors';
import { config } from './config/config';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/errors';
import { appRouter } from './routers/app.router';
import { loginRouter } from './routers/login.router';
import { generateSecretKey } from './utils/secretKey';

const app = express();
generateSecretKey();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, //15min
    max: 100, //limit
}));

const router = Router();
app.use('/login', loginRouter);

app.use('/', appRouter)


app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});