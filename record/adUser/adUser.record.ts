import { FieldPacket } from "mysql2";
import { AdUserEntity } from "../../types";
import { pool } from "../../utils/db";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "../../utils/errors";

type AdUserRecordResult = [AdUserEntity[], FieldPacket[]];


class AdUserRecord implements AdUserEntity {
    id: string;
    login: string;
    pass: string;
    firstName: string;
    email: string;
    booksId: string;
    role: string;
    isActive: boolean;
    constructor(obj: AdUserEntity) {
        const { id, login, pass, firstName, email, booksId, role, isActive } = obj;

        this.id = id;
        this.login = login;
        this.pass = pass;
        this.firstName = firstName;
        this.email = email;
        this.booksId = booksId;
        this.role = role;
        this.isActive = false;
    };

    static async getOneUser(id: string): Promise<AdUserEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id,
        }) as AdUserRecordResult;

        return results.length === 0 ? null : new AdUserRecord(results[0]);
    };

    async checkUserLogin(login: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `login` = :login", {
            login,
        }) as AdUserRecordResult;
        return results.length === 0 ? false : true;
    };

    async checkUserEmail(email: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as AdUserRecordResult;
        return results.length === 0 ? false : true;
    };

    async insertUser(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Nie można dodać istniejącego indexu');
        }

        if (this.checkUserLogin(this.login)) {
            throw new ValidationError('Login jest już zajęty')
        };

        if (this.checkUserEmail(this.email)) {
            throw new ValidationError('Na podany mail już istnieje konto')
        };

        await pool.execute("INSER INT `users`(`id`, `login`, `pass`, `firstName`, `email`, `booksId`, `role`, `isActive`) VALUSE(:id, :login, :pass, :firstName, :email, :booksId, :role)", this)

    }
};

