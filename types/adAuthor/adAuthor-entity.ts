export interface SimpleAdAuthorEntity {
    id?: string;
    firstName: string;
    lastName: string;
}

export interface AdAuthorEntity extends SimpleAdAuthorEntity {
    description?: string;
};