import { FieldPacket } from "mysql2";
import { AdBookEntity, SimpleAdBookEntity } from "../../types"
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";
import { v4 as uuid } from 'uuid';

type AdBookRecordResult = [AdBookEntity[], FieldPacket[]]

export class AdBookRecord implements AdBookEntity {
    public id: string;
    public isbn: string;
    public title: string;
    public authorId: string;
    public publisher: string;
    public publicationDate: Date;
    public categoriesId: string;
    public rating: string;
    public description: string;
    constructor(obj: AdBookEntity) {
        const { id, isbn, title, authorId, publisher, publicationDate, categoriesId, rating, description } = obj;

        if (!isbn) {
            throw new ValidationError("Nie podano numeru ISBN książki!!");
        }

        // @TODO add more validations

        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.authorId = authorId;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.categoriesId = categoriesId;
        this.rating = rating;
        this.description = description;
    };

    static async getOneBook(id: string): Promise<AdBookRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `id` = :id", {
            id,
        }) as AdBookRecordResult;

        return results.length === 0 ? null : new AdBookRecord(results[0]);
    };

    static async getAllBooks(title: string): Promise<SimpleAdBookEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `books` WHERE `title` LIKE :search", {
            search: `%${title}%`,
        }) as AdBookRecordResult;

        return results.map(result => {
            const {
                id, isbn, title,
            } = result;

            return {
                id, isbn, title,
            };
        });
    };

    async insertBook(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać istniejącego indexu');
        }

        await pool.execute("INSERT INTO `books`(`id`, `isbn`, `title`, `authorId`, `publisher`, `publicationDate`, `categoriesId`, `rating`, `description`) VALUES(:id, :isbn, :title, :authorId, :publisher, :publicationDate, :categoriesId, :rating, :description )", this)
    };
};

