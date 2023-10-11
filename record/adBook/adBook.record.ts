import { FieldPacket } from "mysql2";
import { AdBookEntity, SimpleAdEntity } from "../../types"
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";

type AdBookRecordResult = [AdBookEntity[], FieldPacket[]]

export class AdBookRecord implements AdBookEntity {
    id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: Date;
    categories: string;
    rating: string;
    description: string;
    constructor(obj: AdBookEntity) {
        const { id, isbn, title, author, publisher, publicationDate, categories, rating, description } = obj;

        if (!isbn) {
            throw new ValidationError("Nie podano numeru ISBN książki!!");
        }

        // @TODO add more validations

        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.categories = categories;
        this.rating = rating;
        this.description = description;
    };

    static async getOneBook(id: string): Promise<AdBookRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `id` = :id", {
            id,
        }) as AdBookRecordResult;

        return results.length === 0 ? null : new AdBookRecord(results[0]);
    };

    static async getAllBook(title: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `title` LIKE :search", {
            search: `%${title}%`,
        }) as AdBookRecordResult;

        return results.map(result => {
            const {
                id, isbn, title,
            } = result;

            return {
                id, isbn, title,
            }
        })

    }
};