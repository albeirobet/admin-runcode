import { IUser } from './user';

export interface IAccount {
    user?: IUser;
    authorities?: string[];
}

export class Account implements IAccount {
    constructor(
        public user?: IUser,
        public authorities?: string[]) {}
}