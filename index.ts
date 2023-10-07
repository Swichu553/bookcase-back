import express, { json } from 'express';
import cors from 'cors';
import { config } from './config/config';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, //15min
    max: 100, //limit
}));


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});