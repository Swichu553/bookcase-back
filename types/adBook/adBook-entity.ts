export interface SimpleAdEntity {
    id: string;
}

export interface AdBookEntity extends SimpleAdEntity {
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: Date;
    categories: string;
    rating: string;
    description: string;
};