export interface SimpleAdEntity {
    isbn: string;
}

export interface AdBookEntity extends SimpleAdEntity {
    title: string;
    author: string;
    publisher: string;
    publisherDate: Date;
    categories: string;
    rating: string;
    description: string;
};