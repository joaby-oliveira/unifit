export interface UserInterface {
    email: string;
    password: string;
    name: string;
    ra: string;
}
export interface ListUsersFilterInterface {
    fieldsToReturn: string[];
    filterBy: Array<{
        field: string;
        rule: string;
    }>;
}
