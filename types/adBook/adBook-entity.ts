export interface SimpleAdEntity {
    id?: string;
    isbn: string;
    title: string;
}

export interface AdBookEntity extends SimpleAdEntity {
    authorId: string;
    publisher: string;
    publicationDate: Date;
    categoriesId: string;
    rating: string;
    description: string;
};