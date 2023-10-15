import { AdAuthorEntity, SimpleAdAuthorEntity } from "../../types";
import { FieldPacket } from "mysql2";
import { pool } from "../../utils/db";
import { ValidationError } from "../../utils/errors";
import { v4 as uuid } from 'uuid';

type AdAuthorRecordResult = [AdAuthorEntity[], FieldPacket[]];

export class AdAuthorRecord implements AdAuthorEntity {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    constructor(obj: AdAuthorEntity) {
        const { id, firstName, lastName, description } = obj;
    };
    static async getOneAuthor(id: string): Promise<AdAuthorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `author` WHERE `id` = :id", {
            id,
        }) as AdAuthorRecordResult;

        return results.length === 0 ? null : new AdAuthorRecord(results[0]);
    };


    async insertAuthor(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Nie można dodać ponowanie istniejącego indexu autora');
        }

        await pool.execute("INSERT INTO `authors`(`) VALUES()", this)
    };

}