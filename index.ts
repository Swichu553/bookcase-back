import express, { json } from 'express';
import cors from 'cors';
import { config } from './config/config';
import rateLimit from 'express-rate-limit';
import { handleError } from './utils/errors';
import { appRouter } from './routers/app.router';
import { authRouter } from './routers/auth.router';
import session from 'express-session';
import dotenv from 'dotenv';
import { generateSecretKey } from './utils/secretKey';
import passport from './utils/passport-config'; // Import Passport.js z osobnego pliku

dotenv.config();
generateSecretKey();
console.log(process.env.SESSION_SECRET);

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

// Skonfiguruj sesję z Passport.js
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Inicjalizuj Passport.js
app.use(passport.initialize());

// Uruchom Passport.js sesję
app.use(passport.session());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minut
    max: 100, // limit
}));

const router = express.Router();

// Dodaj Passport.js middleware na poziomie aplikacji, aby obejmował wszystkie trasy
app.use(passport.authenticate('local'));

// Dodaj trasy
app.use('/auth', authRouter);
app.use('/', appRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
