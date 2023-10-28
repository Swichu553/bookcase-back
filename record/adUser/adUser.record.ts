import { FieldPacket, RowDataPacket } from "mysql2";
import { AdUserEntity, AdUserRecordResult } from "../../types";
import { pool } from "../../utils/db";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "../../utils/errors";
import { hashPassword, verifyPassword } from "../../utils/passwordUtils";



export class AdUserRecord implements AdUserEntity {
    id: string;
    username: string;
    password: string;
    passwordHash: string;
    firstName: string;
    email: string;
    booksId: string | null;
    role: string;
    isActive: boolean;
    constructor(obj: AdUserEntity) {
        Object.assign(this, obj);
    };

    static async getOneUserId(id: string): Promise<AdUserEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id,
        }) as AdUserRecordResult;

        return results.length === 0 ? null : new AdUserRecord(results[0]);
    };

    static async getUsername(username: string): Promise<AdUserEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `username` = :username", {
            username,
        }) as AdUserRecordResult;

        return results.length === 0 ? null : new AdUserRecord(results[0]);
    };

    static async checkPassword(name: string, pass: string): Promise<boolean> {
        const hash = (await this.getUsername(name)).passwordHash;
        return await verifyPassword(hash, pass);
    };

    async checkUserLogin(login: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT COUNT(*) as count FROM `users` WHERE `login` = :login", {
            login,
        }) as RowDataPacket[];
        const count = results[0].count;
        return count > 0;
    };

    async checkUserEmail(email: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT COUNT(*) as count FROM `users` WHERE `email` = :email", {
            email,
        }) as RowDataPacket[];
        const count = results[0].count;
        return count > 0;
    };

    async insertUser(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Nie można dodać istniejącego indexu');
        }

        if (await this.checkUserLogin(this.username)) {
            throw new ValidationError('Login jest już zajęty')
        };

        if (await this.checkUserEmail(this.email)) {
            throw new ValidationError('Na podany mail już istnieje konto')
        };

        this.passwordHash = await hashPassword(this.password);

        await pool.execute("INSERT INTO `users`(`id`, `login`, `passwordHash`, `firstName`, `email`, `booksId`, `role`, `isActive`) VALUES(:id, :login, :passwordHash, :firstName, :email, :booksId, :role, :isActive)", this)

    }
};

