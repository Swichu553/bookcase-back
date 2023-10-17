import { randomBytes } from 'crypto';

export const generateSalt = (length: number): string => {
    return randomBytes(length).toString('hex');
}