import { FieldPacket } from "mysql2";
import { AdBookEntity, AdBookRecordResult, SimpleAdBookEntity } from "../../types"
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";
import { v4 as uuid } from 'uuid';

export class AdBookRecord implements AdBookEntity {
    public id: string;
    public isbn: string;
    public title: string;
    public author: string;
    public publisher: string;
    public publicationDate: Date;
    public categories: string;
    public rating: string;
    public description: string;
    constructor(obj: AdBookEntity) {
        Object.assign(this, obj);
        const { id, isbn, title, author, publisher, publicationDate, categories, rating, description } = obj;

        if (!isbn) {
            throw new ValidationError("Nie podano numeru ISBN książki!!");
        }

        // @TODO add more validations

    };

    static async getOneBook(id: string): Promise<AdBookRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `id` = :id", {
            id,
        }) as AdBookRecordResult;

        return results.length === 0 ? null : new AdBookRecord(results[0]);
    };

    static async getAllBooks(title: string): Promise<AdBookEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `title` LIKE :search", {
            search: `%${title}%`,
        }) as AdBookRecordResult;

        return results
        // .map(result => {
        //     const {
        //         id, isbn, title,
        //     } = result;

        //     return {
        //         id, isbn, title,
        //     };
        // });
    };

    async insertBook(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać istniejącego indexu');
        }

        await pool.execute("INSERT INTO `books`(`id`, `isbn`, `title`, `author`, `publisher`, `publicationDate`, `categories`, `rating`, `description`) VALUES(:id, :isbn, :title, :author, :publisher, :publicationDate, :categories, :rating, :description )", this)
    };

    static async delBook(bookId: string): Promise<void> {
        await pool.execute("DELETE FROM `users_books` WHERE `bookId` = :bookId", {
            bookId,
        });
        await pool.execute("DELETE FROM `books` WHERE `id` = :bookId", {
            bookId,
        });
    };

}