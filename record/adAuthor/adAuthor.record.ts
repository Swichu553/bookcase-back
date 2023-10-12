import { AdAuthorEntity } from "../../types";


export class AdAuthorRecord implements AdAuthorEntity {
    id: string;
    name: string;
    description: string;
    books: string;
    constructor(obj: AdAuthorEntity) {
        const { id, name, description, books } = obj;
    }
}