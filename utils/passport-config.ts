import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AdUserRecord } from '../record/adUser/adUser.record';
import { verifyPassword } from '../utils/passwordUtils';
import { AdUserEntity } from '../types';

passport.use(new LocalStrategy(
    async (username: string, password, done) => {
        try {
            const user: AdUserEntity | null = await AdUserRecord.getOneUser(username);

            if (!user) {
                return done(null, false, { message: 'Nieprawidłowe dane uwierzytelniające' });
            }

            const isPasswordValid = await verifyPassword(user.passwordHash, password);

            if (!isPasswordValid) {
                return done(null, false, { message: 'Nieprawidłowe dane uwierzytelniające' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user: AdUserEntity, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user: AdUserEntity | null = await AdUserRecord.getOneUser(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;