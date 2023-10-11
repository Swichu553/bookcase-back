export interface SimpleAdEntity {
    id: string;
    isbn: string;
    title: string;
}

export interface AdBookEntity extends SimpleAdEntity {
    author: string;
    publisher: string;
    publicationDate: Date;
    categories: string;
    rating: string;
    description: string;
};