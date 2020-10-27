export interface IAuth {
    email?: string;
    password?: string;
}

export class Auth implements IAuth {
    constructor(public email?: string,
        public password?: string) {}
}