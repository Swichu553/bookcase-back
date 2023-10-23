import crypto from 'crypto';

export const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    process.env.SESSION_SECRET = secretKey;
    return secretKey;
}