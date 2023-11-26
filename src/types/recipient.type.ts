export type RecipientType = {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
    };
    isSigned: boolean;
    signLink: string;
}