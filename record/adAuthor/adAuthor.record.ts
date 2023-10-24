import { AdAuthorEntity, SimpleAdAuthorEntity } from "../../types";
import { FieldPacket } from "mysql2";
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";
import { v4 as uuid } from 'uuid';

type AdAuthorRecordResult = [AdAuthorEntity[], FieldPacket[]];

export class AdAuthorRecord implements AdAuthorEntity {
    public id: string;
    public firstName: string;
    public lastName: string;
    public description: string;
    constructor(obj: AdAuthorEntity) {
        const { id, firstName, lastName, description } = obj;

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
    };


    static async getOneAuthor(id: string): Promise<AdAuthorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `authors` WHERE `id` = :id", {
            id,
        }) as AdAuthorRecordResult;

        return results.length === 0 ? null : new AdAuthorRecord(results[0]);
    };

    static async getAllAuthors(lastName: string): Promise<SimpleAdAuthorEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `authors` WHERE `lastName` LIKE :search", {
            search: `%${lastName}%`,
        }) as AdAuthorRecordResult;

        return results.map(result => {
            const {
                id, firstName, lastName,
            } = result;

            return {
                id, firstName, lastName,
            }
        })

    };

    async insertAuthor(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać ponowanie istniejącego indexu autora');
        }

        await pool.execute("INSERT INTO `authors`(`id`, `firstName`, `lastName`, `description`) VALUES(:id, :firstName, :lastName, :description)", this)
    };

}