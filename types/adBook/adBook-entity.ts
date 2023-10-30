import { FieldPacket } from "mysql2";

export interface SimpleAdBookEntity {
    id?: string;
    isbn: string;
    title: string;
}

export interface AdBookEntity extends SimpleAdBookEntity {
    authorId: string;
    publisher: string;
    publicationDate: Date;
    categoriesId: string;
    rating: string;
    description: string;
};

export type AdBookRecordResult = [AdBookEntity[], FieldPacket[]]
