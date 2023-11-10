import { FieldPacket, RowDataPacket } from "mysql2";
import { AdBookEntity, AdBookRecordResult, AdUserEntity } from "../../types";
import { pool } from "../../utils/db";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "../../utils/errors";
import { hashPassword, verifyPassword } from "../../utils/passwordUtils";
import { AdBookRecord } from "../adBook/adBook.record";

export type AdUserRecordResult = [AdUserEntity[], FieldPacket[]];


export class AdUserRecord implements AdUserEntity {
    id: string;
    username: string;
    password: string;
    passwordHash: string;
    firstName: string;
    email: string;
    role: string;
    isActive: boolean;
    constructor(obj: AdUserEntity) {
        Object.assign(this, obj);
    };

    static async getOneUserId(id: string): Promise<AdUserEntity | null> {
        const [results] = await pool.execute("SELECT `id`, `username`, `firstName`, `email`, `role` FROM `users` WHERE `id` = :id", {
            id,
        }) as AdUserRecordResult;

        return results.length === 0 ? null
            : new AdUserRecord(results[0]);
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

    async checkUserLogin(username: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT COUNT(*) as count FROM `users` WHERE `username` = :username", {
            username,
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
            throw new ValidationError('Login jest już zajęty');
        };

        if (await this.checkUserEmail(this.email)) {
            throw new ValidationError('Na podany email już istnieje konto');
        };

        this.passwordHash = await hashPassword(this.password);

        await pool.execute("INSERT INTO `users`(`id`, `username`, `passwordHash`, `firstName`, `email`) VALUES(:id, :username, :passwordHash, :firstName, :email)", this)
    };

    async updateUser(): Promise<string> {
        const user = await pool.execute("UPDATE `users` SET `username` = :username, `firstName` = :firstName, `email` = :email  WHERE `id` = :id;", this);
        return this.id;
    }

    static async getUserBooks(id: string, title: string): Promise<AdBookEntity[] | null> {
        const [results] = await pool.execute("SELECT `books`.* FROM `users` JOIN `users_books` ON `users`.`id` = `users_books`.`userId` JOIN `books` ON `users_books`.`bookId` = `books`.`id` WHERE `users`.`id` = :id AND `books`.`title` LIKE :search", {
            id,
            search: `%${title}%`,
        }) as AdBookRecordResult;

        return results.length === 0 ? [] : results;
    };

    static async insertUserBook(userId: string, bookId: string): Promise<void> {

        const usersBooksId = uuid();

        await pool.execute("INSERT INTO `users_books`(`id`, `userId`, `bookId`) VALUES(:usersBooksId, :userId, :bookId)", {
            usersBooksId,
            userId,
            bookId,
        });
    };

    static async delUserBook(userId: string, bookId: string): Promise<void> {

        await pool.execute("DELETE FROM `users_books` WHERE `userId` = :userId AND `bookId` = :bookId", {
            userId,
            bookId,
        });
    };
};

