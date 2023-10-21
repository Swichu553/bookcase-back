import { AdAuthorEntity } from "../../types";
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


    static async getOneAuthor(value: string, byId: boolean = true): Promise<AdAuthorRecord | null> {
        const query = byId
            ? "SELECT * FROM `authors` WHERE `id` = :id"
            : "SELECT * FROM `authors` WHERE `lastName` = :lastName"

        const [results] = await pool.execute(query, {
            id: byId ? value : null,
            lastName: byId ? null : value,
        }) as AdAuthorRecordResult;

        return results.length === 0 ? null : new AdAuthorRecord(results[0]);
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