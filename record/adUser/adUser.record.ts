import { FieldPacket } from "mysql2";
import { AdUserEntity } from "../../types";
import { pool } from "../../utils/db";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "../../utils/errors";
import { hashPassword, verifyPassword } from "../../utils/passwordUtils";

type AdUserRecordResult = [AdUserEntity[], FieldPacket[]];
type test = [string[], FieldPacket[]]


class AdUserRecord implements AdUserEntity {
    id: string;
    login: string;
    pass: string;
    passwordHash: string;
    firstName: string;
    email: string;
    booksId: string;
    role: string;
    isActive: boolean;
    constructor(obj: AdUserEntity) {
        const { id, login, pass, passwordHash, firstName, email, booksId, role, isActive } = obj;

        this.id = id;
        this.login = login;
        this.pass = pass;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.email = email;
        this.booksId = booksId;
        this.role = role;
        this.isActive = isActive;
    };

    static async getOneUser(name: string): Promise<AdUserEntity | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `name` = :name", {
            name,
        }) as AdUserRecordResult;

        return results.length === 0 ? null : new AdUserRecord(results[0]);
    };

    static async checkPassword(name: string, pass: string): Promise<boolean> {
        const hash = (await this.getOneUser(name)).passwordHash;
        return await verifyPassword(hash, pass);
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

        this.passwordHash = await hashPassword(this.pass);

        await pool.execute("INSER INT `users`(`id`, `login`, `passwordHash`, `firstName`, `email`, `booksId`, `role`, `isActive`) VALUSE(:id, :login, :passwordHash, :firstName, :email, :booksId, :role,)", this)

    }
};

