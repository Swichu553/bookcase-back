import { FieldPacket } from "mysql2";
import { AdCategorieEntity } from "../../types"
import { pool } from "../../utils/db";
import { v4 as uuid } from 'uuid';
import { ValidationError } from "../../utils/errors";

type AdCategorieRecordResult = [AdCategorieEntity[], FieldPacket[]];

export class AdCategoryRecord implements AdCategorieEntity {
    public id: string;
    public name: string;
    public description: string;
    constructor(obj: AdCategorieEntity) {
        const { id, name, description } = obj;

        this.id = id;
        this.name = name;
        this.description = description;
    };

    static async getOneCategorie(id: string): Promise<AdCategoryRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `categories` WHERE `id` = :id", {
            id,
        }) as AdCategorieRecordResult;

        return results.length === 0 ? null : new AdCategoryRecord(results[0]);
    };

    static async getAllCategorie(name: string): Promise<AdCategorieEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `categories` WHERE `name` LIKE :search", {
            search: `%${name}%`
        }) as AdCategorieRecordResult;

        return results.map(result => {
            const { id, name, description } = result;

            return { id, name, description };
        });
    };

    async insertCategorie(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Nie można dodać istniejącego indexu');
        }

        //@TODO dodać sprawdzenie czy kategoria już istnieje

        await pool.execute("INSERT INTO `categories`(`id`, `name`,`description`) VALUES(:id, :name, :description)", this)

    };

}