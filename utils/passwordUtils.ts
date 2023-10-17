import bcrypt from 'bcrypt';
import { ValidationError } from "./errors";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Błąd podczas haszowania hasła');
    }
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
    try {
        const isVerified = await bcrypt.compare(password, hash);
        return isVerified;
    } catch (error) {
        throw new ValidationError('Błąd podczas weryfikacji hasła');
    }
};

