export interface AdUserEntity {
    id: string;
    login: string;
    pass: string;
    passwordHash: string | null;
    firstName: string;
    email: string;
    booksId: string | null;
    role: string;
    isActive: boolean;
};