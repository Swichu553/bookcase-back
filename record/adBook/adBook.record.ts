import { FieldPacket } from "mysql2";
import { AdBookEntity, SimpleAdEntity } from "../../types"
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";

type AdBookRecordResult = [AdBookEntity[], FieldPacket[]]

export class AdBookRecord implements AdBookEntity {
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publisherDate: Date;
    categories: string;
    rating: string;
    description: string;
    constructor(obj: AdBookEntity) {
        const { isbn, title, author, publisher, publisherDate, categories, rating, description } = obj;

        if (!isbn) {
            throw new ValidationError("Nie podano numeru ISBN książki!!");
        }

        // @TODO add more validations

        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publisherDate = publisherDate;
        this.categories = categories;
        this.rating = rating;
        this.description = description;
    };

    static async getOneBook(isbn: string): Promise<AdBookRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `book` WHERE `isbn` = :isbn", {
            isbn,
        }) as AdBookRecordResult;

        return results.length === 0 ? null : new AdBookRecord(results[0]);
    };

    // @TODO add findAllBook

};