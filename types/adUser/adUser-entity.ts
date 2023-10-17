export interface AdUserEntity {
    id: string;
    login: string;
    pass: string;
    passwordHash: string;
    firstName: string;
    email: string;
    booksId: string;
    role: string;
    isActive: boolean;
};