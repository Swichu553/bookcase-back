
export interface AdUserEntity {
    id: string;
    username: string;
    password: string;
    passwordHash: string | null;
    firstName: string;
    email: string;
    booksId: string | null;
    role: string;
    isActive: boolean;
};

