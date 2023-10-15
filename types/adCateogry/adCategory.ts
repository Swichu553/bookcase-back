export interface SimpleAdCategrieEntity {
    id?: string;
    name: string;
}

export interface AdCategorieEntity extends SimpleAdCategrieEntity {
    description: string;
};